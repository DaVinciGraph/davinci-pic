import { LpTokenEntity } from "../types/entities";
import { DavinciPicTokenAttributes } from "../types/attributes";
import { DavinciPicsSvgCircle } from "../types/svg";

const PicsLiquidityTokenTemplate = document.createElement("template");
PicsLiquidityTokenTemplate.innerHTML = `
<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlnsXlink="http://www.w3.org/1999/xlink"
	version="1.1"
	viewBox="0 0 100 100">
	<defs>
		<clipPath id="token0-path">
			<circle></circle>
		</clipPath>
		<clipPath id="token1-path">
			<circle></circle>
		</clipPath>
		<clipPath id="context-path">
			<circle></circle>
		</clipPath>

		<filter id="blur0">
			<feGaussianBlur in="SourceGraphic" stdDeviation="7" />
		</filter>
		<filter id="blur1">
			<feGaussianBlur in="SourceGraphic" stdDeviation="7" />
		</filter>
	</defs>

	<circle id="token0-bg-circle"></circle>
	<image preserveAspectRatio="xMidYMid slice" id="token0-image"></image>
	<circle fill="transparent" id="token0-circle"> <title></title></circle>

	<circle id="token1-bg-circle"></circle>
	<image preserveAspectRatio="xMidYMid slice" id="token1-image"></image>
	<circle fill="transparent" id="token1-circle">
		<title></title>
	</circle>

	<circle id="context-bg-circle"></circle>
	<image preserveAspectRatio="xMidYMid slice" id="context-image"></image>
	<circle fill="transparent" id="context-circle">
		<title></title>
	</circle>
</svg>
`;

export default PicsLiquidityTokenTemplate;

export function setLpPath(
	svg: SVGSVGElement | DocumentFragment,
	uniqueID: string,
	token0CircleData: DavinciPicsSvgCircle,
	token1CircleData: DavinciPicsSvgCircle,
	contextCircleData: DavinciPicsSvgCircle
) {
	const token0PathElem = svg.querySelector("#token0-path");
	if (token0PathElem) {
		token0PathElem.id = `token0-circle-${uniqueID}`;

		const token0pathCircleElem = token0PathElem.firstElementChild;

		if (token0pathCircleElem) {
			token0pathCircleElem.setAttribute("cx", `${token0CircleData.cx}`);
			token0pathCircleElem.setAttribute("cy", `${token0CircleData.cy}`);
			token0pathCircleElem.setAttribute("r", `${token0CircleData.r}`);
		}
	}

	const token1PathElem = svg.querySelector("#token1-path");
	if (token1PathElem) {
		token1PathElem.id = `token1-circle-${uniqueID}`;

		const token1PathCircleElem = token1PathElem.firstElementChild;

		if (token1PathCircleElem) {
			token1PathCircleElem.setAttribute("cx", `${token1CircleData.cx}`);
			token1PathCircleElem.setAttribute("cy", `${token1CircleData.cy}`);
			token1PathCircleElem.setAttribute("r", `${token1CircleData.r}`);
		}
	}

	const ContextPathElem = svg.querySelector("#context-path");
	if (ContextPathElem) {
		ContextPathElem.id = `context-circle-${uniqueID}`;

		const ContextPathCircleElem = ContextPathElem.firstElementChild;
		if (ContextPathCircleElem) {
			ContextPathCircleElem.setAttribute("cx", `${contextCircleData.cx}`);
			ContextPathCircleElem.setAttribute("cy", `${contextCircleData.cy}`);
			ContextPathCircleElem.setAttribute("r", `${contextCircleData.r}`);
		}
	}
}

export function setLpTokenFilters(
	svg: SVGSVGElement | DocumentFragment,
	uniqueID: string,
	mustPicture0BeCensored: boolean,
	mustPicture1BeCensored: boolean
) {
	const filter0Elem = svg.querySelector("#blur0");
	if (filter0Elem && mustPicture0BeCensored) {
		filter0Elem.id = `blur0-${uniqueID}`;
	} else {
		filter0Elem?.remove();
	}

	const filter1Elem = svg.querySelector("#blur1");
	if (filter1Elem && mustPicture1BeCensored) {
		filter1Elem.id = `blur1-${uniqueID}`;
	} else {
		filter1Elem?.remove();
	}
}

export function setLpTokenShapes(
	svg: SVGSVGElement | DocumentFragment,
	uniqueID: string,
	token0CircleData: DavinciPicsSvgCircle,
	token1CircleData: DavinciPicsSvgCircle,
	mustPicture0BeCensored: boolean = false,
	mustPicture1BeCensored: boolean = false,
	data: LpTokenEntity,
	strokeColor: string,
	strokeWidth: number,
	applyStroke: boolean
) {
	const supportingBg0 = svg.querySelector("#token0-bg-circle");
	if (supportingBg0) {
		supportingBg0.setAttribute("cx", `${token0CircleData.cx}`);
		supportingBg0.setAttribute("cy", `${token0CircleData.cy}`);
		supportingBg0.setAttribute("r", `${token0CircleData.r}`);
		supportingBg0.setAttribute("fill", data.token0.supportingBackgroundColor || "transparent");
	}

	const image0Elem = svg.querySelector("#token0-image");
	if (image0Elem) {
		image0Elem.setAttribute("x", `${token0CircleData.cx - token0CircleData.r}`);
		image0Elem.setAttribute("y", `${token0CircleData.cy - token0CircleData.r}`);
		image0Elem.setAttribute("width", `${2 * token0CircleData.r}`);
		image0Elem.setAttribute("height", `${2 * token0CircleData.r}`);
		image0Elem.setAttribute("href", data.token0.pic);
		image0Elem.setAttribute("clip-path", `url(#token0-circle-${uniqueID})`);
		if (mustPicture0BeCensored) image0Elem.setAttribute("filter", `url(#blur0-${uniqueID})`);
	}

	const token0CircleElem = svg.querySelector("#token0-circle");
	if (token0CircleElem) {
		token0CircleElem.setAttribute("cx", `${token0CircleData.cx}`);
		token0CircleElem.setAttribute("cy", `${token0CircleData.cy}`);
		token0CircleElem.setAttribute("r", `${token0CircleData.r}`);
		token0CircleElem.setAttribute("stroke", strokeColor);
		token0CircleElem.setAttribute("stroke-width", String(applyStroke ? strokeWidth : 0));

		const mainTitle0Elem = token0CircleElem?.firstElementChild;
		if (mainTitle0Elem && !mustPicture0BeCensored) mainTitle0Elem.textContent = data.token0.title || data.token0.address;
	}

	const supportingBg1 = svg.querySelector("#token1-bg-circle");
	if (supportingBg1) {
		supportingBg1.setAttribute("cx", `${token1CircleData.cx}`);
		supportingBg1.setAttribute("cy", `${token1CircleData.cy}`);
		supportingBg1.setAttribute("r", `${token1CircleData.r}`);
		supportingBg1.setAttribute("fill", data.token1.supportingBackgroundColor || "transparent");
	}

	const image1Elem = svg.querySelector("#token1-image");
	if (image1Elem) {
		image1Elem.setAttribute("x", `${token1CircleData.cx - token1CircleData.r}`);
		image1Elem.setAttribute("y", `${token1CircleData.cy - token1CircleData.r}`);
		image1Elem.setAttribute("width", `${2 * token1CircleData.r}`);
		image1Elem.setAttribute("height", `${2 * token1CircleData.r}`);
		image1Elem.setAttribute("href", data.token1.pic);
		image1Elem.setAttribute("clip-path", `url(#token1-circle-${uniqueID})`);
		if (mustPicture1BeCensored) image1Elem.setAttribute("filter", `url(#blur1-${uniqueID})`);
	}

	const token1PathCircleElem = svg.querySelector("#token1-circle");
	if (token1PathCircleElem) {
		token1PathCircleElem.setAttribute("cx", `${token1CircleData.cx}`);
		token1PathCircleElem.setAttribute("cy", `${token1CircleData.cy}`);
		token1PathCircleElem.setAttribute("r", `${token1CircleData.r}`);
		token1PathCircleElem.setAttribute("stroke", strokeColor);
		token1PathCircleElem.setAttribute("stroke-width", String(applyStroke ? strokeWidth : 0));

		const mainTitle1Elem = token1PathCircleElem?.firstElementChild;
		if (mainTitle1Elem && !mustPicture1BeCensored) mainTitle1Elem.textContent = data.token1.title || data.token1.address;
	}
}

export function setLpContextShapes(
	svg: SVGSVGElement | DocumentFragment,
	uniqueID: string,
	contextCircleData: DavinciPicsSvgCircle,
	contextData: any,
	strokeColor: string,
	strokeWidth: number,
	applyStroke: boolean
) {
	const contextImageElem = svg.querySelector("#context-image");
	const contextCircleElem = svg.querySelector("#context-circle");

	if (contextImageElem && contextCircleElem) {
		const contextBg = svg.querySelector("#context-bg-circle");
		if (contextBg) {
			contextBg.setAttribute("cx", `${contextCircleData.cx}`);
			contextBg.setAttribute("cy", `${contextCircleData.cy}`);
			contextBg.setAttribute("r", `${contextCircleData.r}`);
			contextBg.setAttribute("fill", contextData?.supportingBackgroundColor || "transparent");
		}

		contextImageElem.setAttribute("href", contextData?.pic || "");
		contextImageElem.setAttribute("x", String(contextCircleData.cx - contextCircleData.r));
		contextImageElem.setAttribute("y", String(contextCircleData.cy - contextCircleData.r));
		contextImageElem.setAttribute("width", String(2 * contextCircleData.r));
		contextImageElem.setAttribute("height", String(2 * contextCircleData.r));
		contextImageElem.setAttribute("clip-path", `url(#context-circle-${uniqueID})`);

		contextCircleElem.setAttribute("cx", String(contextCircleData.cx));
		contextCircleElem.setAttribute("cy", String(contextCircleData.cy));
		contextCircleElem.setAttribute("r", String(contextCircleData.r));
		contextCircleElem.setAttribute("stroke", strokeColor || "");
		contextCircleElem.setAttribute("stroke-width", String(applyStroke ? strokeWidth : 0));
		contextCircleElem.setAttribute("fill", "transparent");

		const contextTitle = contextCircleElem.firstElementChild;
		if (contextTitle && contextData?.title) contextTitle.textContent = contextData.title;
	}
}

export function getLpTokenContextData(
	options: DavinciPicTokenAttributes,
	token0CircleData: DavinciPicsSvgCircle,
	token1CircleData: DavinciPicsSvgCircle,
	strokeWidth: number
) {
	const contextRadius = token1CircleData.r / 2;
	return {
		r: contextRadius,
		cx:
			options.contextPosition === "bottomRight" || options.contextPosition === "topRight"
				? token1CircleData.cx + token1CircleData.r - contextRadius / 2 - strokeWidth / 2
				: token0CircleData.cx - token0CircleData.r + contextRadius / 2 + strokeWidth / 2,
		cy:
			options.contextPosition === "bottomRight" || options.contextPosition === "bottomLeft"
				? token1CircleData.cy + token1CircleData.r - contextRadius / 2 - strokeWidth / 2
				: token0CircleData.cy - token0CircleData.r + contextRadius / 2 + strokeWidth / 2,
	};
}

export function calculateCircleData(hasContext: boolean, intimateLp: boolean, strokeWidth: number): [DavinciPicsSvgCircle, DavinciPicsSvgCircle] {
	const token0CircleData: DavinciPicsSvgCircle = { cx: 30, cy: 50, r: 30 };
	const token1CircleData: DavinciPicsSvgCircle = { cx: 70, cy: 50, r: 30 };

	if (hasContext) {
		if (intimateLp) {
			token0CircleData.cx = 36;
			token0CircleData.r = 29;

			token1CircleData.cx = 63;
			token1CircleData.r = 29;
		} else {
			token0CircleData.cx = 32;
			token0CircleData.r = 25;

			token1CircleData.cx = 68;
			token1CircleData.r = 25;
		}
	} else if (intimateLp) {
		token0CircleData.cx = 35;
		token0CircleData.r = 35;

		token1CircleData.cx = 65;
		token1CircleData.r = 35;
	}

	token0CircleData.r = token0CircleData.r - strokeWidth / 2;
	token1CircleData.r = token1CircleData.r - strokeWidth / 2;

	return [token0CircleData, token1CircleData];
}
