import { LpTokenEntity } from "../types/entities";
import { davinciPicsConfig } from "..";
import { getContextData } from "../modules/helpers";
import PicsLiquidityTokenTemplate, {
	calculateCircleData,
	getLpTokenContextData,
	setLpContextShapes,
	setLpPath,
	setLpTokenShapes,
} from "../templates/LPTokenSVG";
import { DavinciPicTokenAttributes } from "../types/attributes";
import PicsMergedLiquidityTokenTemplate, { getMergedLpCircleData, setMergedLpPath, setMergedLpTokenShapes } from "../templates/LPMergedTokenSVG";
import { getContextualContextShapeData, setContextualContextShape } from "../templates/contextualTokenSVG";

// reads the lp template and add the inital data to it
const generateLpTokenSvg = (data: LpTokenEntity, options: DavinciPicTokenAttributes): SVGSVGElement => {
	const strokeWidth = options.strokeWidth || 0;
	const uniqueID = `${++davinciPicsConfig.counter}`;
	const contextData = getContextData(options, data);

	// clone the the lp template, either merged or separated
	const clonedSvg = document.importNode(
		options.lpTokensPosition === "merged" ? PicsMergedLiquidityTokenTemplate.content : PicsLiquidityTokenTemplate.content,
		true
	);
	const svg = clonedSvg.querySelector("svg");

	if (svg) {
		svg.setAttribute("width", `${options.size}`);
		svg.setAttribute("height", `${options.size}`);
		svg.setAttribute("data-unique-id", uniqueID);
		svg.setAttribute("data-template-type", "lp");

		// ====== case 1: Unmerged lp templated
		if (options.lpTokensPosition !== "merged") {
			const [token0CircleData, token1CircleData] = calculateCircleData(
				contextData.type !== "none",
				options.lpTokensPosition === "intimate",
				strokeWidth
			);

			const contextCircleData = getLpTokenContextData(options, token0CircleData, token1CircleData, strokeWidth);
			setLpPath(clonedSvg, uniqueID, token0CircleData, token1CircleData, contextCircleData);
			setLpTokenShapes(
				clonedSvg,
				uniqueID,
				token0CircleData,
				token1CircleData,
				false,
				false,
				data,
				options.strokeColor || "",
				strokeWidth,
				false
			);

			// context
			if (contextData.type !== "none") {
				setLpContextShapes(clonedSvg, uniqueID, contextCircleData, contextData, options.strokeColor || "", strokeWidth, false);
			}
		} else {
			// ====== case 1: Merged lp templated
			const tokenCircleData = getMergedLpCircleData(contextData.type, strokeWidth);
			const contextCircleData = getContextualContextShapeData(options, tokenCircleData, strokeWidth);
			setMergedLpPath(clonedSvg, data.token0.pic, data.token1.pic, false, false, uniqueID, tokenCircleData, contextCircleData);
			setMergedLpTokenShapes(clonedSvg, uniqueID, tokenCircleData, false, false, data, options.strokeColor || "", strokeWidth, false);

			// context
			if (contextData.type !== "none") {
				setContextualContextShape(
					clonedSvg,
					uniqueID,
					contextCircleData,
					contextData.pic,
					contextData.title,
					contextData.supportingBackgroundColor,
					strokeWidth,
					options.strokeColor || "",
					false
				);
			}
		}
	}

	return svg!;
};

export default generateLpTokenSvg;
