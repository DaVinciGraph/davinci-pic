import { LpTokenEntity, PoolContractEntity } from "../types/entities";
import { getContextData, mustBeCensored } from "../modules/helpers";
import { PicsLiquidityTokenTemplateZeroOnTop, calculateCircleData, getLpTokenContextData, setLpContextShapes, setLpPath, setLpTokenFilters, setLpTokenShapes } from "../templates/LPTokenSVG";
import { DavinciPicContractAttributes, DavinciPicTokenAttributes } from "../types/attributes";
import { PicsResponseType } from "../types/picsCommonTypes";
import PicsMergedLiquidityTokenTemplate, { getMergedLpCircleData, setMergedLpPath, setMergedLpTokenShapes } from "../templates/LPMergedTokenSVG";
import { getContextualContextShapeData, setContextualContextShape } from "../templates/contextualTokenSVG";
import PicsLiquidityTokenTemplate from "../templates/LPTokenSVG";

/**
 * since there is too many case of lp templates and intial templates,
 * it's not worth to update the elements but it's better to reconstruct them
 */
const updateLpTokenSvg = (initialSvg: SVGSVGElement, data: LpTokenEntity | PoolContractEntity, options: DavinciPicTokenAttributes | DavinciPicContractAttributes, status: PicsResponseType): void => {
	const uniqueID = initialSvg.getAttribute("data-unique-id")!;
	const strokeWidth = status === "success" ? options.strokeWidth || 0 : 0;
	const mustPicture0BeCensored = mustBeCensored(options.censor, data.token0.sensitivity);
	const mustPicture1BeCensored = mustBeCensored(options.censor, data.token1.sensitivity);
	const contextData = getContextData(options, data);

	const pairPosition = (options as DavinciPicTokenAttributes)?.lpTokensPosition || (options as DavinciPicContractAttributes)?.poolPairPosition;

	// clone the template
	const clonedSvg = document.importNode(
		pairPosition === "merged" ? PicsMergedLiquidityTokenTemplate.content : (options?.topToken === "zero" ? PicsLiquidityTokenTemplateZeroOnTop : PicsLiquidityTokenTemplate).content,
		true
	);
	const svg = clonedSvg.querySelector("svg");

	// the svg must exits
	if (!initialSvg || !svg) return;

	// replace the inital svg generated for loading stage with a new one
	// this removes the case of mismatched templates
	initialSvg.replaceWith(svg);

	// get filters appropriate unique ids or remove them
	setLpTokenFilters(svg, uniqueID, mustPicture0BeCensored, mustPicture1BeCensored);

	// ===== Case 1. update unmerged positioned svg
	if (pairPosition !== "merged") {
		const someHasApp = Boolean(data.token0?.app || data.token1?.app);
		const picIsIdentical = (data.token0?.pic && data.token0?.pic === data.token1?.pic) || (data.token0?.darkPic && data.token0?.darkPic === data.token1?.darkPic);

		const showPairApps = Boolean((options.showPairApps === "true" && someHasApp) || (options.showPairApps === "when_identical" && picIsIdentical));

		// get each token's positions
		const [token0CircleData, token1CircleData] = calculateCircleData(contextData.type !== "none" || showPairApps, pairPosition === "intimate", strokeWidth);

		// get the position of context circle
		const contextCircleData = getLpTokenContextData(options, token0CircleData, token1CircleData, strokeWidth);

		const token0AppCircleData = showPairApps
			? getLpTokenContextData(
					{
						...options,
						contextPosition:
							options.context === "app"
								? options?.contextPosition?.startsWith("top")
									? "bottomLeft"
									: "topLeft"
								: options?.contextPosition?.startsWith("top")
								? "topLeft"
								: "bottomLeft",
					},
					token0CircleData,
					token1CircleData,
					strokeWidth
			  )
			: undefined;

		const token1AppCircleData = showPairApps
			? getLpTokenContextData(
					{
						...options,
						contextPosition:
							options.context === "app"
								? options?.contextPosition?.startsWith("top")
									? "bottomRight"
									: "topRight"
								: options?.contextPosition?.startsWith("top")
								? "topRight"
								: "bottomRight",
					},
					token0CircleData,
					token1CircleData,
					strokeWidth
			  )
			: undefined;

		// set up the svg paths
		setLpPath(svg, uniqueID, token0CircleData, token0AppCircleData, token1CircleData, token1AppCircleData, contextCircleData);

		// set up the tokens shapes
		setLpTokenShapes(
			svg,
			uniqueID,
			token0CircleData,
			token0AppCircleData,
			token1CircleData,
			token1AppCircleData,
			mustPicture0BeCensored,
			mustPicture1BeCensored,
			data,
			options.strokeColor || "",
			strokeWidth,
			true
		);

		// setup the context
		if (contextData.type !== "none") {
			setLpContextShapes(svg, uniqueID, contextCircleData, contextData, options.strokeColor || "", strokeWidth, true);
		}

		return;
	}

	// ====== Case 2. update merged positioned lp template
	// get token circle position
	const tokenCircleData = getMergedLpCircleData(contextData.type, strokeWidth);

	// get context circle position
	const contextCircleData = getContextualContextShapeData(options, tokenCircleData, strokeWidth);

	// setup the paths
	setMergedLpPath(svg, data.token0.pic, data.token1.pic, mustPicture0BeCensored, mustPicture1BeCensored, uniqueID, tokenCircleData, contextCircleData);

	// setup tokens shapes
	setMergedLpTokenShapes(svg, uniqueID, tokenCircleData, mustPicture0BeCensored, mustPicture1BeCensored, data, options.strokeColor || "", strokeWidth, true);

	// setup context
	if (contextData.type !== "none") {
		setContextualContextShape(svg, uniqueID, contextCircleData, contextData.pic, contextData.title, contextData.bgColor, strokeWidth, options.strokeColor || "", true);
	}
};

export default updateLpTokenSvg;
