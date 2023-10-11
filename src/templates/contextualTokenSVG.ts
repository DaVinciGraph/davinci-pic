import { DavinciPicTokenAttributes } from "../types/attributes";
import { DavinciPicsSvgCircle } from "../types/svg";

const PicsContextualTokenTemplate = document.createElement("template");
PicsContextualTokenTemplate.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
	<defs>
		<clipPath id="contextual-path">
			<circle cx="0" cy="0" r="0"></circle>
		</clipPath>
		<clipPath id="context-path">
			<circle cx="0" cy="0" r="0"></circle>
		</clipPath>

		<filter id="contextual-blur">
			<feGaussianBlur in="SourceGraphic" stdDeviation="7" />
		</filter>
	</defs>

	<circle id="contextual-bg-circle" fill="transparent"></circle>
	<image
		id="contextual-image"
		preserveAspectRatio="xMidYMid slice">
	</image>
	<circle
		id="contextual-circle"
		fill="transparent">
		<title></title>
	</circle>

	<circle id="context-bg-circle" fill="transparent"></circle>
	<image
		id="context-image"
		preserveAspectRatio="xMidYMid slice">
	</image>
	<circle
		id="context-circle"
		fill="transparent">
		<title></title>
	</circle>
</svg>
`;

export default PicsContextualTokenTemplate;

export function setContextualPath(
	svg: SVGSVGElement | DocumentFragment,
	uniqueID: string,
	tokenCircleData: DavinciPicsSvgCircle,
	contextCircleData: DavinciPicsSvgCircle
) {
	const tokenPathElem = svg.querySelector("#contextual-path");
	if (tokenPathElem) {
		tokenPathElem.id = `contextual-circle-${uniqueID}`;

		const tokenPathCircleElem = tokenPathElem.firstElementChild;

		if (tokenPathCircleElem) {
			tokenPathCircleElem.setAttribute("cx", `${tokenCircleData.cx}`);
			tokenPathCircleElem.setAttribute("cy", `${tokenCircleData.cy}`);
			tokenPathCircleElem.setAttribute("r", `${tokenCircleData.r}`);
		}
	}

	const contextPathElem = svg.querySelector("#context-path");
	if (contextPathElem) {
		contextPathElem.id = `context-circle-${uniqueID}`;

		const contextPathCircleElem = contextPathElem.firstElementChild;
		if (contextPathCircleElem) {
			contextPathCircleElem.setAttribute("cx", `${contextCircleData.cx}`);
			contextPathCircleElem.setAttribute("cy", `${contextCircleData.cy}`);
			contextPathCircleElem.setAttribute("r", `${contextCircleData.r}`);
		}
	}
}

export function setContextualTokenShapes(
	svg: SVGSVGElement | DocumentFragment,
	uniqueID: string,
	tokenCircleData: DavinciPicsSvgCircle,
	mustBeCensored: boolean = false,
	pictureUrl: string,
	title: string,
	supportingBackgroundColor: string,
	strokeWidth: number,
	strokeColor: string,
	applyStroke: boolean = false
) {
	const bgElem = svg.querySelector("#contextual-bg-circle");
	if (bgElem) {
		bgElem.setAttribute("cx", `${tokenCircleData.cx}`);
		bgElem.setAttribute("cy", `${tokenCircleData.cy}`);
		bgElem.setAttribute("r", `${tokenCircleData.r}`);
		bgElem.setAttribute("fill", supportingBackgroundColor || "transparent");
	}

	const imageElem = svg.querySelector("#contextual-image");
	if (imageElem) {
		imageElem.setAttribute("x", `${tokenCircleData.cx - tokenCircleData.r}`);
		imageElem.setAttribute("y", `${tokenCircleData.cy - tokenCircleData.r}`);
		imageElem.setAttribute("width", `${2 * tokenCircleData.r}`);
		imageElem.setAttribute("height", `${2 * tokenCircleData.r}`);
		imageElem.setAttribute("href", pictureUrl);
		imageElem.setAttribute("clip-path", `url(#contextual-circle-${uniqueID})`);
		if (mustBeCensored) imageElem.setAttribute("filter", `url(#contextual-blur-${uniqueID})`);
	}

	const tokenCircleElem = svg.querySelector("#contextual-circle");
	if (tokenCircleElem) {
		tokenCircleElem.setAttribute("cx", `${tokenCircleData.cx}`);
		tokenCircleElem.setAttribute("cy", `${tokenCircleData.cy}`);
		tokenCircleElem.setAttribute("r", `${tokenCircleData.r}`);
		tokenCircleElem.setAttribute("stroke", strokeColor);
		tokenCircleElem.setAttribute("stroke-width", String(applyStroke ? strokeWidth : 0));

		const mainTitleElem = tokenCircleElem.firstElementChild;
		if (mainTitleElem) mainTitleElem.textContent = title || "";
	}
}

export function setContextualContextShape(
	svg: SVGSVGElement | DocumentFragment,
	uniqueID: string,
	contextCircleData: DavinciPicsSvgCircle,
	pictureUrl: string,
	title: string,
	supportingBackgroundColor: string,
	strokeWidth: number,
	strokeColor: string,
	applyStroke: boolean = false
) {
	const contextImageElem = svg.querySelector("#context-image");
	const contextCircleElem = svg.querySelector("#context-circle");

	if (contextImageElem && contextCircleElem) {
		const contextBgElem = svg.querySelector("#context-bg-circle");
		if (contextBgElem) {
			contextBgElem.setAttribute("cx", String(contextCircleData.cx));
			contextBgElem.setAttribute("cy", String(contextCircleData.cy));
			contextBgElem.setAttribute("r", String(contextCircleData.r));
			contextBgElem.setAttribute("fill", supportingBackgroundColor || "transparent");
		}

		contextImageElem.setAttribute("href", pictureUrl || "");
		contextImageElem.setAttribute("x", String(contextCircleData.cx - contextCircleData.r));
		contextImageElem.setAttribute("y", String(contextCircleData.cy - contextCircleData.r));
		contextImageElem.setAttribute("width", String(2 * contextCircleData.r));
		contextImageElem.setAttribute("height", String(2 * contextCircleData.r));
		contextImageElem.setAttribute("clip-path", `url(#context-circle-${uniqueID})`);

		contextCircleElem.setAttribute("cx", String(contextCircleData.cx));
		contextCircleElem.setAttribute("cy", String(contextCircleData.cy));
		contextCircleElem.setAttribute("r", String(contextCircleData.r));
		contextCircleElem.setAttribute("stroke", strokeColor);
		contextCircleElem.setAttribute("stroke-width", String(applyStroke ? strokeWidth : 0));
		contextCircleElem.setAttribute("fill", "transparent");

		const contextTitleElem = contextCircleElem.firstElementChild;
		if (contextTitleElem && title) contextTitleElem.textContent = title;
	}
}

export function setContextualFilter(svg: SVGSVGElement | DocumentFragment, uniqueID: string, mustPictureBeCensored: boolean) {
	const filterElem = svg.querySelector("#contextual-blur");
	if (filterElem && mustPictureBeCensored) {
		filterElem.id = `contextual-blur-${uniqueID}`;
	} else {
		filterElem?.remove();
	}
}

export function getContextualTokenShapeData(): DavinciPicsSvgCircle {
	return { cx: 50, cy: 50, r: 40 };
}

export function getContextualContextShapeData(options: DavinciPicTokenAttributes, tokenCircleData: DavinciPicsSvgCircle, strokeWidth: number) {
	const contextCircleRadius = 20;
	return {
		cx:
			options.contextPosition === "bottomRight" || options.contextPosition === "topRight"
				? tokenCircleData.cx! + tokenCircleData.r - contextCircleRadius / 2 - strokeWidth / 2
				: tokenCircleData.cx! - tokenCircleData.r! + contextCircleRadius / 2 + strokeWidth / 2,
		cy:
			options.contextPosition === "bottomRight" || options.contextPosition === "bottomLeft"
				? tokenCircleData.cy! + tokenCircleData.r! - contextCircleRadius / 2 - strokeWidth / 2
				: tokenCircleData.cy! - tokenCircleData.r! + contextCircleRadius / 2 + strokeWidth / 2,
		r: contextCircleRadius,
	};
}
