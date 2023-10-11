import { LpTokenEntity } from "../types/entities";
import { getContextData, mustBeCensored } from "../modules/helpers";
import PicsLiquidityTokenTemplate, {
	getLpToken0CircleData,
	getLpToken1CircleData,
	getLpTokenContextData,
	setLpContextShapes,
	setLpPath,
	setLpTokenFilters,
	setLpTokenShapes,
} from "../templates/LPTokenSVG";
import { DavinciPicTokenAttributes } from "../types/attributes";
import { PicsResponseType } from "../types/picsCommonTypes";

/**
 * update the lp token elements with final data, there is two case in lp tokens because the element's inital template is the base template
 * but when the API specifies that it must be lp, we must reconstruct it
 * in the case when the element has a complex-token-type of lp, the template is correct and it will be updated
 */
const updateLpTokenSvg = (initialSvg: SVGSVGElement, data: LpTokenEntity, options: DavinciPicTokenAttributes, status: PicsResponseType): void => {
	const uniqueID = initialSvg.getAttribute("data-unique-id")!;
	const strokeWidth = options.strokeWidth || 0;
	const mustPicture0BeCensored = mustBeCensored(options.censor, data.token0.sensitivity);
	const mustPicture1BeCensored = mustBeCensored(options.censor, data.token1.sensitivity);
	const contextData = getContextData(options, data);

	if (initialSvg && initialSvg?.getAttribute("data-template-type") === "lp") {
		// token0
		setLpTokenFilters(initialSvg, uniqueID, mustPicture0BeCensored, mustPicture1BeCensored);

		const supportingBg0 = initialSvg.querySelector("#token0-bg-circle");
		if (supportingBg0) {
			supportingBg0.setAttribute("fill", data.token0.supportingBackgroundColor || "transparent");
		}

		const image0Elem = initialSvg.querySelector("#token0-image");
		if (image0Elem) {
			image0Elem.setAttribute("href", data.token0.pic);
			if (mustPicture0BeCensored) image0Elem.setAttribute("filter", `url(#blur0-${uniqueID})`);
		}

		const token0CircleElem = initialSvg.querySelector("#token0-circle");
		if (token0CircleElem) {
			if (status === "success") token0CircleElem.setAttribute("stroke-width", `${strokeWidth}`);

			if (!mustPicture0BeCensored) {
				const mainTitle0Elem = token0CircleElem?.firstElementChild;
				if (mainTitle0Elem) mainTitle0Elem.textContent = data.token0.title || data.token0.address;
			}
		}

		// token1
		const supportingBg1 = initialSvg.querySelector("#token1-bg-circle");
		if (supportingBg1) {
			supportingBg1.setAttribute("fill", data.token1.supportingBackgroundColor || "transparent");
		}

		const image1Elem = initialSvg.querySelector("#token1-image");
		if (image1Elem) {
			image1Elem.setAttribute("href", data.token1.pic);

			if (mustPicture1BeCensored) image1Elem.setAttribute("filter", `url(#blur1-${uniqueID})`);
		}

		const token1PathCircleElem = initialSvg.querySelector("#token1-circle");
		if (token1PathCircleElem) {
			if (status === "success") token1PathCircleElem.setAttribute("stroke-width", `${strokeWidth}`);

			if (!mustPicture1BeCensored) {
				const mainTitle1Elem = token1PathCircleElem?.firstElementChild;
				if (mainTitle1Elem) mainTitle1Elem.textContent = data.token1.title || data.token1.address;
			}
		}

		// context
		const contextImageElem = initialSvg.querySelector("#context-image");
		const contextCircleElem = initialSvg.querySelector("#context-circle");

		if (contextImageElem && contextCircleElem && contextData.type !== "none") {
			const contextBg = initialSvg.querySelector("#context-bg-circle");
			if (contextBg) {
				contextBg.setAttribute("fill", contextData.supportingBackgroundColor || "transparent");
			}

			contextImageElem.setAttribute("href", contextData.pic || "");

			if (status === "success" && contextData.pic) contextCircleElem.setAttribute("stroke-width", `${strokeWidth}`);

			const contextTitle = contextCircleElem.firstElementChild;
			if (contextTitle) contextTitle.textContent = contextData.title;
		}

		return;
	}

	const token0CircleData = getLpToken0CircleData();
	const token1CircleData = getLpToken1CircleData();
	const contextCircleData = getLpTokenContextData(options, token0CircleData, token1CircleData, strokeWidth);

	// clone the template
	const clonedSvg = document.importNode(PicsLiquidityTokenTemplate.content, true);
	const svg = clonedSvg.querySelector("svg");

	if (initialSvg && svg) {
		initialSvg.replaceWith(svg);

		setLpPath(svg, uniqueID, token0CircleData, token1CircleData, contextCircleData);
		setLpTokenFilters(svg, uniqueID, mustPicture0BeCensored, mustPicture1BeCensored);
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

		// context
		if (contextData.type !== "none") {
			setLpContextShapes(svg, uniqueID, contextCircleData, contextData, options.strokeColor || "", strokeWidth, true);
		}
	}
};

export default updateLpTokenSvg;
