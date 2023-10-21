import { LpTokenEntity } from "../types/entities";
import { getContextData, mustBeCensored } from "../modules/helpers";
import PicsLiquidityTokenTemplate, {
	calculateCircleData,
	getLpTokenContextData,
	setLpContextShapes,
	setLpPath,
	setLpTokenFilters,
	setLpTokenShapes,
} from "../templates/LPTokenSVG";
import { DavinciPicTokenAttributes } from "../types/attributes";
import { PicsResponseType } from "../types/picsCommonTypes";
import PicsMergedLiquidityTokenTemplate, { getMergedLpCircleData, setMergedLpPath, setMergedLpTokenShapes } from "../templates/LPMergedTokenSVG";
import { getContextualContextShapeData, setContextualContextShape } from "../templates/contextualTokenSVG";

/**
 * since there is too many case of lp templates and intial templates,
 * it's not worth to update the elements but it's better to reconstruct them
 */
const updateLpTokenSvg = (initialSvg: SVGSVGElement, data: LpTokenEntity, options: DavinciPicTokenAttributes, status: PicsResponseType): void => {
	const uniqueID = initialSvg.getAttribute("data-unique-id")!;
	const strokeWidth = status === "success" ? options.strokeWidth || 0 : 0;
	const mustPicture0BeCensored = mustBeCensored(options.censor, data.token0.sensitivity);
	const mustPicture1BeCensored = mustBeCensored(options.censor, data.token1.sensitivity);
	const contextData = getContextData(options, data);

	// clone the template
	const clonedSvg = document.importNode(
		options.lpTokensPosition === "merged" ? PicsMergedLiquidityTokenTemplate.content : PicsLiquidityTokenTemplate.content,
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
	if (options.lpTokensPosition !== "merged") {
		// get each token's positions
		const [token0CircleData, token1CircleData] = calculateCircleData(
			contextData.type !== "none",
			options.lpTokensPosition === "intimate",
			strokeWidth
		);

		// get the position of context circle
		const contextCircleData = getLpTokenContextData(options, token0CircleData, token1CircleData, strokeWidth);

		// set up the svg paths
		setLpPath(svg, uniqueID, token0CircleData, token1CircleData, contextCircleData);

		// set up the tokens shapes
		setLpTokenShapes(
			svg,
			uniqueID,
			token0CircleData,
			token1CircleData,
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
	setMergedLpPath(
		svg,
		data.token0.pic,
		data.token1.pic,
		mustPicture0BeCensored,
		mustPicture1BeCensored,
		uniqueID,
		tokenCircleData,
		contextCircleData
	);

	// setup tokens shapes
	setMergedLpTokenShapes(
		svg,
		uniqueID,
		tokenCircleData,
		mustPicture0BeCensored,
		mustPicture1BeCensored,
		data,
		options.strokeColor || "",
		strokeWidth,
		true
	);

	// setup context
	if (contextData.type !== "none") {
		setContextualContextShape(
			svg,
			uniqueID,
			contextCircleData,
			contextData.pic,
			contextData.title,
			contextData.supportingBackgroundColor,
			strokeWidth,
			options.strokeColor || "",
			true
		);
	}
};

export default updateLpTokenSvg;
