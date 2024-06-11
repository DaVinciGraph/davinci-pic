import { LpTokenEntity, PoolContractEntity } from "../types/entities";
import { davinciPicsConfig } from "..";
import { getContextData } from "../modules/helpers";
import { PicsLiquidityTokenTemplateZeroOnTop, calculateCircleData, getLpTokenContextData, setLpContextShapes, setLpPath, setLpTokenShapes } from "../templates/LPTokenSVG";
import { DavinciPicContractAttributes, DavinciPicTokenAttributes } from "../types/attributes";
import PicsMergedLiquidityTokenTemplate, { getMergedLpCircleData, setMergedLpPath, setMergedLpTokenShapes } from "../templates/LPMergedTokenSVG";
import { getContextualContextShapeData, setContextualContextShape } from "../templates/contextualTokenSVG";
import PicsLiquidityTokenTemplate from "../templates/LPTokenSVG";

// reads the lp template and add the inital data to it
const generateLpTokenSvg = (data: LpTokenEntity | PoolContractEntity, options: DavinciPicTokenAttributes | DavinciPicContractAttributes): SVGSVGElement => {
	const strokeWidth = options.strokeWidth || 0;
	const uniqueID = `${++davinciPicsConfig.counter}`;
	const contextData = getContextData(options, data);

	const pairPosition = (options as DavinciPicTokenAttributes)?.lpTokensPosition || (options as DavinciPicContractAttributes)?.poolPairPosition;

	// clone the the lp template, either merged or unmerged
	const clonedSvg = document.importNode(
		pairPosition === "merged" ? PicsMergedLiquidityTokenTemplate.content : (options?.topToken === "zero" ? PicsLiquidityTokenTemplateZeroOnTop : PicsLiquidityTokenTemplate).content,
		true
	);
	const svg = clonedSvg.querySelector("svg");

	if (svg) {
		svg.setAttribute("width", `${options.size}`);
		svg.setAttribute("height", `${options.size}`);
		svg.setAttribute("data-unique-id", uniqueID);
		svg.setAttribute("data-template-type", "lp");

		// ====== case 1: Unmerged lp templated
		if (pairPosition !== "merged") {
			const someHasApp = Boolean(data.token0?.app || data.token1?.app);
			const picIsIdentical = (data.token0?.pic && data.token0?.pic === data.token1?.pic) || (data.token0?.darkPic && data.token0?.darkPic === data.token1?.darkPic);

			const showPairApps = Boolean((options.showPairApps === "true" && someHasApp) || (options.showPairApps === "when_identical" && picIsIdentical));

			const [token0CircleData, token1CircleData] = calculateCircleData(contextData.type !== "none" || options.showPairApps !== "false", pairPosition === "intimate", strokeWidth);

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

			setLpPath(clonedSvg, uniqueID, token0CircleData, token0AppCircleData, token1CircleData, token1AppCircleData, contextCircleData);
			setLpTokenShapes(clonedSvg, uniqueID, token0CircleData, token0AppCircleData, token1CircleData, token1AppCircleData, false, false, data, options.strokeColor || "", strokeWidth, false);

			// context
			if (contextData.type !== "none") {
				setLpContextShapes(clonedSvg, uniqueID, contextCircleData, contextData, options.strokeColor || "", strokeWidth, false);
			}
		} else {
			// ====== case 2: Merged lp templated
			const tokenCircleData = getMergedLpCircleData(contextData.type, strokeWidth);
			const contextCircleData = getContextualContextShapeData(options, tokenCircleData, strokeWidth);
			setMergedLpPath(clonedSvg, data.token0.pic, data.token1.pic, false, false, uniqueID, tokenCircleData, contextCircleData);
			setMergedLpTokenShapes(clonedSvg, uniqueID, tokenCircleData, false, false, data, options.strokeColor || "", strokeWidth, false);

			// context
			if (contextData.type !== "none") {
				setContextualContextShape(clonedSvg, uniqueID, contextCircleData, contextData.pic, contextData.title, contextData.bgColor, strokeWidth, options.strokeColor || "", false);
			}
		}
	}

	return svg!;
};

export default generateLpTokenSvg;
