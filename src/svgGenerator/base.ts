import { davinciPicsConfig } from "..";
import PicsBaseSvgTemplate, { setBaseBgRect, setBaseImage, setBasePathRect, setBaseRect } from "../templates/baseSVG";
import { DavinciPicAttributes, DavinciPicBannerAttributes } from "../types/attributes";

// reads the base template and add the inital data to it
const generateBaseSvg = (title: string, pictureUrl: string, bgColor: string, options: Exclude<DavinciPicAttributes, DavinciPicBannerAttributes>): SVGSVGElement => {
	const uniqueID = `${++davinciPicsConfig.counter}`;
	const strokeWidth = options.strokeWidth || 0;

	// cloning the svg template
	const clonedSvg = document.importNode(PicsBaseSvgTemplate.content, true);
	const svg = clonedSvg.querySelector("svg");

	if (svg) {
		svg.setAttribute("width", `${options.size}`);
		svg.setAttribute("height", `${options.size}`);
		svg.setAttribute("data-unique-id", uniqueID);
		svg.setAttribute("data-template-type", "base");

		setBasePathRect(clonedSvg, uniqueID, strokeWidth, options.shape);
		setBaseBgRect(clonedSvg, bgColor, strokeWidth, options.shape);
		setBaseImage(clonedSvg, pictureUrl, uniqueID, strokeWidth, title);
		setBaseRect(clonedSvg, title, strokeWidth, options, false);
	}

	return svg!;
};

export default generateBaseSvg;
