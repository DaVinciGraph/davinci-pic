import { mustBeCensored } from "../modules/helpers";
import PicsBaseSvgTemplate, { setBaseBgRect, setBaseFilter, setBaseImage, setBasePathRect, setBaseRect } from "../templates/baseSVG";
import { DavinciPicAttributes, DavinciPicBannerAttributes } from "../types/attributes";
import { PicsResponseType, PicsSensitivityType } from "../types/picsCommonTypes";

// update the base elements with final data
const updateBaseSvg = (
	initialSvg: SVGSVGElement,
	title: string,
	pictureUrl: string,
	supportingBackgroundColor: string,
	sensitivity: PicsSensitivityType,
	options: Exclude<DavinciPicAttributes, DavinciPicBannerAttributes>,
	status: PicsResponseType
): void => {
	const uniqueID = initialSvg.getAttribute("data-unique-id")!;
	const strokeWidth = options.strokeWidth || 0;
	const mustPictureBeCensored = mustBeCensored(options.censor, sensitivity);

	// when the wrong template is generated for loading phase, generate the svg again with the right template
	if (initialSvg?.getAttribute("data-template-type") !== "base") {
		// cloning the svg template
		const clonedSvg = document.importNode(PicsBaseSvgTemplate.content, true);
		const svg = clonedSvg.querySelector("svg");

		if (svg) {
			initialSvg.replaceWith(svg);

			setBasePathRect(svg, uniqueID, strokeWidth, options.shape);
			setBaseFilter(svg, mustPictureBeCensored, uniqueID);
			setBaseBgRect(svg, supportingBackgroundColor, strokeWidth, options.shape);
			setBaseImage(svg, pictureUrl, uniqueID, strokeWidth);
			setBaseRect(svg, title, strokeWidth, options, true);
		}

		return;
	}

	// since right template is generated during the loading phase, continue with updating the elements
	if (initialSvg) {
		setBaseFilter(initialSvg, mustPictureBeCensored, uniqueID);

		const bgColorElem = initialSvg.querySelector(`#bg-color`);
		if (bgColorElem) {
			bgColorElem.setAttribute("fill", supportingBackgroundColor || "transparent");
		}

		const imageElem = initialSvg.querySelector("image");
		if (imageElem) {
			imageElem.setAttribute("href", pictureUrl);

			if (mustPictureBeCensored) imageElem.setAttribute("filter", `url(#blur-${uniqueID})`);
		}

		const rectElem = imageElem?.nextElementSibling;
		if (rectElem) {
			if (status === "success") rectElem.setAttribute("stroke-width", String(strokeWidth));

			if (!mustPictureBeCensored) {
				const mainTitleElem = rectElem.firstElementChild;
				if (mainTitleElem) mainTitleElem.textContent = title;
			}
		}
	}
};

export default updateBaseSvg;
