import { BannerEntity } from "../types/entities";
import { davinciPicsConfig } from "..";
import PicsBannerSvgTemplate from "../templates/bannerSVG";

// reads the banner template and add the inital data to it
const generateBannerSvg = (data: BannerEntity): SVGSVGElement => {
	const uniqueID = `banner-${++davinciPicsConfig.counter}`;

	// combine the svg template with the data
	const clonedSvg = document.importNode(PicsBannerSvgTemplate.content, true);
	const svg = clonedSvg.querySelector("svg");

	if (svg) {
		svg.setAttribute("data-unique-id", uniqueID);

		const rectPathElem = clonedSvg.querySelector("clipPath");
		if (rectPathElem) rectPathElem.id = `shape-${uniqueID}`;

		const BgElem = clonedSvg.querySelector("#rect-bg");
		if (BgElem) {
			BgElem.setAttribute("fill", data.supportingBackgroundColor);
		}

		const imageElem = clonedSvg.querySelector("image");
		if (imageElem) {
			imageElem.setAttribute("href", data.banner || "");
			imageElem.setAttribute("clip-path", `url(#shape-${uniqueID})`);
		}
	}

	return svg!;
};

export default generateBannerSvg;
