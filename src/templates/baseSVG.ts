import { getShapeRadius } from "../modules/helpers";
import { DavinciPicAttributes, DavinciPicBannerAttributes } from "../types/attributes";
import { PicsShapeType } from "../types/picsCommonTypes";

const PicsBaseSvgTemplate = document.createElement("template");
PicsBaseSvgTemplate.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
	<defs>
		<clipPath>
			<rect></rect>
		</clipPath>
		<filter>
			<feGaussianBlur in="SourceGraphic" stdDeviation="7" />
		</filter>
	</defs>

	<rect id="bg-color" fill="transparent"></rect>
	<image preserveAspectRatio="xMidYMid slice"></image>
	<rect fill="transparent" id="mask">
		<title></title>
	</rect>
</svg>
`;
export default PicsBaseSvgTemplate;

/** setup the rect shape of the base svg */
export const setBasePathRect = (svg: SVGSVGElement | DocumentFragment, uniqueID: string, strokeWidth: number, shape?: PicsShapeType) => {
	const pathElem = svg.querySelector("clipPath");
	if (pathElem) {
		pathElem.id = `rect-${uniqueID}`;

		const pathRectElem = pathElem.firstElementChild;
		if (pathRectElem) {
			pathRectElem.setAttribute("x", `${strokeWidth / 2}`);
			pathRectElem.setAttribute("y", `${strokeWidth / 2}`);
			pathRectElem.setAttribute("width", `${100 - strokeWidth}`);
			pathRectElem.setAttribute("height", `${100 - strokeWidth}`);
			pathRectElem.setAttribute("rx", getShapeRadius(shape, 100));
			pathRectElem.setAttribute("ry", getShapeRadius(shape, 100));
		}
	}
};

export const setBaseBgRect = (svg: SVGSVGElement | DocumentFragment, bgColor: string, strokeWidth: number, shape?: PicsShapeType) => {
	const bgColorElem = svg.querySelector(`#bg-color`);
	if (bgColorElem) {
		bgColorElem.setAttribute("x", `${strokeWidth / 2}`);
		bgColorElem.setAttribute("y", `${strokeWidth / 2}`);
		bgColorElem.setAttribute("width", `${100 - strokeWidth}`);
		bgColorElem.setAttribute("height", `${100 - strokeWidth}`);
		bgColorElem.setAttribute("rx", getShapeRadius(shape, 100));
		bgColorElem.setAttribute("ry", getShapeRadius(shape, 100));
		bgColorElem.setAttribute("fill", bgColor || "transparent");
	}
};

export const setBaseImage = (svg: SVGSVGElement | DocumentFragment, pictureUrl: string, uniqueID: string, strokeWidth: number) => {
	const imageElem = svg.querySelector("image");
	if (imageElem) {
		imageElem.setAttribute("x", `${strokeWidth / 2}`);
		imageElem.setAttribute("y", `${strokeWidth / 2}`);
		imageElem.setAttribute("width", `${100 - strokeWidth}`);
		imageElem.setAttribute("height", `${100 - strokeWidth}`);
		imageElem.setAttribute("href", pictureUrl);
		imageElem.setAttribute("clip-path", `url(#rect-${uniqueID})`);
	}
};

export const setBaseRect = (
	svg: SVGSVGElement | DocumentFragment,
	title: string,
	strokeWidth: number,
	options: Exclude<DavinciPicAttributes, DavinciPicBannerAttributes>,
	applyStroke: boolean = false
) => {
	const rectElem = svg.querySelector("#mask");
	if (rectElem) {
		rectElem.setAttribute("x", `${strokeWidth / 2}`);
		rectElem.setAttribute("y", `${strokeWidth / 2}`);
		rectElem.setAttribute("width", `${100 - strokeWidth}`);
		rectElem.setAttribute("height", `${100 - strokeWidth}`);
		rectElem.setAttribute("rx", getShapeRadius(options.shape, 100));
		rectElem.setAttribute("ry", getShapeRadius(options.shape, 100));
		rectElem.setAttribute("stroke", options.strokeColor || "");
		rectElem.setAttribute("stroke-width", String(applyStroke ? strokeWidth : 0));

		if (rectElem?.firstElementChild) rectElem.firstElementChild.textContent = title || "";
	}
};

export function setBaseFilter(svg: SVGSVGElement | DocumentFragment, mustPictureBeCensored: boolean, uniqueID: string) {
	const filterElem = svg.querySelector("filter");
	if (filterElem && mustPictureBeCensored) {
		filterElem.id = `blur-${uniqueID}`;
		return;
	}

	filterElem?.remove();
}
