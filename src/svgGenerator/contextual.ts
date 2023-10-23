import { davinciPicsConfig } from "..";
import PicsContextualTokenTemplate, {
	getContextualContextShapeData,
	getContextualTokenShapeData,
	setContextualContextShape,
	setContextualPath,
	setContextualTokenShapes,
} from "../templates/contextualTokenSVG";
import { DavinciPicTokenAttributes } from "../types/attributes";

// reads the contextual template and add the inital data to it
const generateContextualTokenSvg = (
	title: string,
	pictureUrl: string,
	contextTitle: string,
	contextPictureUrl: string,
	supportingBackgroundColor: string,
	contextSupportingBackgroundColor: string,
	options: DavinciPicTokenAttributes
): SVGSVGElement => {
	const strokeWidth = options.strokeWidth || 0;
	const uniqueID = `${++davinciPicsConfig.counter}`;
	const tokenCircleData = getContextualTokenShapeData(options.context, strokeWidth);
	const contextCircleData = getContextualContextShapeData(options, tokenCircleData, strokeWidth);

	// combine the svg template with the data
	const clonedSvg = document.importNode(PicsContextualTokenTemplate.content, true);
	const svg = clonedSvg.querySelector("svg");

	if (svg) {
		svg.setAttribute("width", `${options.size}`);
		svg.setAttribute("height", `${options.size}`);
		svg.setAttribute("data-unique-id", uniqueID);
		svg.setAttribute("data-template-type", "contextual");

		setContextualPath(clonedSvg, uniqueID, tokenCircleData, contextCircleData);

		setContextualTokenShapes(
			clonedSvg,
			uniqueID,
			tokenCircleData,
			false,
			pictureUrl,
			title,
			supportingBackgroundColor,
			strokeWidth,
			options.strokeColor || "",
			false
		);

		if (options.context && options.context !== "none") {
			setContextualContextShape(
				clonedSvg,
				uniqueID,
				contextCircleData,
				contextPictureUrl,
				contextTitle,
				contextSupportingBackgroundColor,
				strokeWidth,
				options.strokeColor || "",
				false
			);
		}
	}

	return svg!;
};

export default generateContextualTokenSvg;
