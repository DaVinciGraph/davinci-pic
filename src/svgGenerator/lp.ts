import { LpTokenEntity } from "../types/entities";
import { davinciPicsConfig } from "..";
import { getContextData } from "../modules/helpers";
import PicsLiquidityTokenTemplate, {
	getLpToken0CircleData,
	getLpToken1CircleData,
	getLpTokenContextData,
	setLpContextShapes,
	setLpPath,
	setLpTokenShapes,
} from "../templates/LPTokenSVG";
import { DavinciPicTokenAttributes } from "../types/attributes";

// reads the lp template and add the inital data to it
const generateLpTokenSvg = (data: LpTokenEntity, options: DavinciPicTokenAttributes): SVGSVGElement => {
	const strokeWidth = options.strokeWidth || 0;
	const uniqueID = `lp-${++davinciPicsConfig.counter}`;
	const token0CircleData = getLpToken0CircleData();
	const token1CircleData = getLpToken1CircleData();

	const contextCircleData = getLpTokenContextData(options, token0CircleData, token1CircleData, strokeWidth);
	const contextData = getContextData(options, data);

	// clone the template
	const clonedSvg = document.importNode(PicsLiquidityTokenTemplate.content, true);
	const svg = clonedSvg.querySelector("svg");

	if (svg) {
		svg.setAttribute("width", `${options.size}`);
		svg.setAttribute("height", `${options.size}`);
		svg.setAttribute("data-unique-id", uniqueID);
		svg.setAttribute("data-template-type", "lp");

		setLpPath(clonedSvg, uniqueID, token0CircleData, token1CircleData, contextCircleData);
		setLpTokenShapes(clonedSvg, uniqueID, token0CircleData, token1CircleData, false, false, data, options.strokeColor || "", strokeWidth, false);

		// context
		if (contextData.type !== "none") {
			setLpContextShapes(clonedSvg, uniqueID, contextCircleData, contextData, options.strokeColor || "", strokeWidth, false);
		}
	}

	return svg!;
};

export default generateLpTokenSvg;
