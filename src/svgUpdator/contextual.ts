import { mustBeCensored } from "../modules/helpers";
import PicsContextualTokenTemplate, {
	getContextualContextShapeData,
	getContextualTokenShapeData,
	setContextualContextShape,
	setContextualFilter,
	setContextualPath,
	setContextualTokenShapes,
} from "../templates/contextualTokenSVG";
import { DavinciPicTokenAttributes } from "../types/attributes";
import { PicsResponseType, PicsSensitivityType } from "../types/picsCommonTypes";

/**
 * update the wrapped or contextual token elements with final data, there is two case in wrapped tokens because the element's inital template is the base template
 * but when the API specifies that it must be wrapped, we must reconstruct it
 * in the case when the element has a complex-token-type of wrapped, the template is correct and it will be updated
 */
const updateContextualTokenSvg = (
	initialSvg: SVGSVGElement,
	title: string,
	pictureUrl: string,
	contextTitle: string,
	contextPictureUrl: string,
	sensitivity: PicsSensitivityType,
	supportingBackgroundColor: string,
	contextSupportingBackgroundColor: string,
	options: DavinciPicTokenAttributes,
	status: PicsResponseType
): void => {
	const uniqueID = initialSvg.getAttribute("data-unique-id")!;
	const strokeWidth = options.strokeWidth || 0;
	const mustPictureBeCensored = mustBeCensored(options.censor, sensitivity);

	if (initialSvg && initialSvg?.getAttribute("data-template-type") === "contextual") {
		setContextualFilter(initialSvg, uniqueID, mustPictureBeCensored);

		const bgElem = initialSvg.querySelector("#contextual-bg-circle");
		bgElem?.setAttribute("fill", supportingBackgroundColor || "transparent");

		const imageElem = initialSvg.querySelector("#contextual-image");
		if (imageElem) {
			imageElem.setAttribute("href", pictureUrl);

			if (mustPictureBeCensored) {
				imageElem.setAttribute("filter", `url(#contextual-blur-${uniqueID})`);
			}
		}

		const tokenCircleElem = initialSvg.querySelector("#contextual-circle");
		if (tokenCircleElem) {
			if (status === "success") tokenCircleElem.setAttribute("stroke-width", `${strokeWidth}`);

			if (!mustPictureBeCensored) {
				const mainTitleElem = tokenCircleElem.firstElementChild;
				if (mainTitleElem) mainTitleElem.textContent = title || "";
			}
		}

		const contextImageElem = initialSvg.querySelector("#context-image");
		const contextCircleElem = initialSvg.querySelector("#context-circle");

		if (contextImageElem && contextCircleElem && options.context !== "none") {
			const contextBgElem = initialSvg.querySelector("#context-bg-circle");
			contextBgElem?.setAttribute("fill", contextSupportingBackgroundColor || "transparent");

			contextImageElem.setAttribute("href", contextPictureUrl || "");

			if (contextPictureUrl && status === "success") contextCircleElem.setAttribute("stroke-width", `${strokeWidth}`);
			contextCircleElem.setAttribute("fill", "transparent");

			const contextTitleElem = contextCircleElem.firstElementChild;
			if (contextTitleElem) contextTitleElem.textContent = contextTitle || "";
		}

		return;
	}

	const tokenCircleData = getContextualTokenShapeData(options.context);
	const contextCircleData = getContextualContextShapeData(options, tokenCircleData, strokeWidth);

	// combine the svg template with the data
	const clonedSvg = document.importNode(PicsContextualTokenTemplate.content, true);
	const svg = clonedSvg.querySelector("svg");

	if (initialSvg && svg) {
		initialSvg.replaceWith(svg);

		setContextualPath(svg, uniqueID, tokenCircleData, contextCircleData);

		setContextualFilter(svg, uniqueID, mustPictureBeCensored);

		setContextualTokenShapes(
			svg,
			uniqueID,
			tokenCircleData,
			mustPictureBeCensored,
			pictureUrl,
			title,
			supportingBackgroundColor,
			strokeWidth,
			options.strokeColor || "",
			true
		);

		if (options.context && options.context !== "none") {
			setContextualContextShape(
				svg,
				uniqueID,
				contextCircleData,
				contextPictureUrl,
				contextTitle,
				contextSupportingBackgroundColor,
				strokeWidth,
				options.strokeColor || "",
				true
			);
		}
	}
};

export default updateContextualTokenSvg;
