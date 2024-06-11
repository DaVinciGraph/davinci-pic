import { LpTokenEntity, PoolContractEntity } from "../types/entities";
import { DavinciPicsSvgCircle } from "../types/svg";
import { PicsContextType } from "../types/picsCommonTypes";

const PicsMergedLiquidityTokenTemplate = document.createElement("template");
PicsMergedLiquidityTokenTemplate.innerHTML = `
<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlnsXlink="http://www.w3.org/1999/xlink"
	version="1.1"
	viewBox="0 0 100 100">
	<defs>
		<clipPath id="token0-path">
			<rect x="0" y="0"></rect>
		</clipPath>
		<clipPath id="token1-path">
			<rect x="50" y="0"></rect>
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

		<pattern id="token0-pattern" patternUnits="objectBoundingBox" width="1" height="1">
			<image href="" x="0" y="0" width="0" height="0" />
		</pattern>
		<pattern id="token1-pattern" patternUnits="objectBoundingBox" width="1" height="1">
			<image href="" x="0" y="0" width="0" height="0" />
		</pattern>
	</defs>

	<circle id="token0-bg-circle"></circle>
	<circle fill="none" id="token0-image"><title></title></circle>

	<circle id="token1-bg-circle"></circle>
	<circle fill="none" id="token1-image"><title></title></circle>

	<circle id="context-bg-circle"></circle>
	<image preserveAspectRatio="xMidYMid slice" id="context-image"><title></title></image>
	<circle fill="none" id="context-circle"></circle>
</svg>
`;

export default PicsMergedLiquidityTokenTemplate;

export function setMergedLpPath(
	svg: SVGSVGElement | DocumentFragment,
	token0PicUrl: string = "",
	token1PicUrl: string = "",
	mustPicture0BeCensored: boolean = false,
	mustPicture1BeCensored: boolean = false,
	uniqueID: string,
	tokenCircleData: DavinciPicsSvgCircle,
	contextCircleData: DavinciPicsSvgCircle
) {
	const token0PathElem = svg.querySelector("#token0-path");
	if (token0PathElem) {
		token0PathElem.id = `bg-0-${uniqueID}`;

		const token0pathRectElem = token0PathElem.firstElementChild;

		if (token0pathRectElem) {
			token0pathRectElem.setAttribute("width", `${tokenCircleData.cx}`);
			token0pathRectElem.setAttribute("height", `${tokenCircleData.cy * 2}`);
		}
	}

	const token1PathElem = svg.querySelector("#token1-path");
	if (token1PathElem) {
		token1PathElem.id = `bg-1-${uniqueID}`;

		const token1PathRectElem = token1PathElem.firstElementChild;

		if (token1PathRectElem) {
			token1PathRectElem.setAttribute("width", `${tokenCircleData.cx}`);
			token1PathRectElem.setAttribute("height", `${tokenCircleData.cy * 2}`);
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

	const token0PatternElem = svg.querySelector("#token0-pattern");
	if (token0PatternElem) {
		token0PatternElem.id = `image0-${uniqueID}`;

		const token0Image = token0PatternElem.firstElementChild;

		if (token0Image) {
			token0Image.setAttribute("href", `${token0PicUrl}`);
			token0Image.setAttribute("width", `${tokenCircleData.r * 2}`);
			token0Image.setAttribute("height", `${tokenCircleData.r * 2}`);
			if (mustPicture0BeCensored) token0Image.setAttribute("filter", `url(#blur0-${uniqueID})`);
		}
	}

	const token1PatternElem = svg.querySelector("#token1-pattern");
	if (token1PatternElem) {
		token1PatternElem.id = `image1-${uniqueID}`;

		const token1Image = token1PatternElem.firstElementChild;

		if (token1Image) {
			token1Image.setAttribute("href", `${token1PicUrl}`);
			token1Image.setAttribute("width", `${tokenCircleData.r * 2}`);
			token1Image.setAttribute("height", `${tokenCircleData.r * 2}`);
			if (mustPicture1BeCensored) token1Image.setAttribute("filter", `url(#blur1-${uniqueID})`);
		}
	}
}

export function setMergedLpTokenShapes(
	svg: SVGSVGElement | DocumentFragment,
	uniqueID: string,
	tokenCircleData: DavinciPicsSvgCircle,
	mustPicture0BeCensored: boolean,
	mustPicture1BeCensored: boolean,
	data: LpTokenEntity | PoolContractEntity,
	strokeColor: string,
	strokeWidth: number,
	applyStroke: boolean
) {
	const supportingBg0 = svg.querySelector("#token0-bg-circle");
	if (supportingBg0) {
		supportingBg0.setAttribute("cx", `${tokenCircleData.cx}`);
		supportingBg0.setAttribute("cy", `${tokenCircleData.cy}`);
		supportingBg0.setAttribute("r", `${tokenCircleData.r}`);
		supportingBg0.setAttribute("clipPath", `url(#bg-0-${uniqueID})`);
		supportingBg0.setAttribute("fill", data.token0.bgColor);
	}

	const image0CircleElem = svg.querySelector("#token0-image");
	if (image0CircleElem) {
		image0CircleElem.setAttribute("cx", `${tokenCircleData.cx}`);
		image0CircleElem.setAttribute("cy", `${tokenCircleData.cy}`);
		image0CircleElem.setAttribute("r", `${tokenCircleData.r}`);
		image0CircleElem.setAttribute("stroke-width", String(applyStroke ? strokeWidth : 0));
		image0CircleElem.setAttribute("stroke", strokeColor);
		image0CircleElem.setAttribute("fill", `url(#image0-${uniqueID})`);
		image0CircleElem.setAttribute("clip-path", `url(#bg-0-${uniqueID})`);

		const mainTitle0Elem = image0CircleElem?.firstElementChild;
		if (mainTitle0Elem && !mustPicture0BeCensored) {
			mainTitle0Elem.textContent = data.token0.title || data.token0.address;
		}
	}

	const supportingBg1 = svg.querySelector("#token1-bg-circle");
	if (supportingBg1) {
		supportingBg1.setAttribute("cx", `${tokenCircleData.cx}`);
		supportingBg1.setAttribute("cy", `${tokenCircleData.cy}`);
		supportingBg1.setAttribute("r", `${tokenCircleData.r}`);
		supportingBg1.setAttribute("clip-path", `url(#bg-1-${uniqueID})`);
		supportingBg1.setAttribute("fill", data.token1.bgColor);
	}

	const image1CircleElem = svg.querySelector("#token1-image");
	if (image1CircleElem) {
		image1CircleElem.setAttribute("cx", `${tokenCircleData.cx}`);
		image1CircleElem.setAttribute("cy", `${tokenCircleData.cy}`);
		image1CircleElem.setAttribute("r", `${tokenCircleData.r}`);
		image1CircleElem.setAttribute("stroke-width", String(applyStroke ? strokeWidth : 0));
		image1CircleElem.setAttribute("stroke", strokeColor);
		image1CircleElem.setAttribute("fill", `url(#image1-${uniqueID})`);
		image1CircleElem.setAttribute("clip-path", `url(#bg-1-${uniqueID})`);

		const mainTitle1Elem = image1CircleElem?.firstElementChild;
		if (mainTitle1Elem && !mustPicture1BeCensored) {
			mainTitle1Elem.textContent = data.token1.title || data.token1.address;
		}
	}
}

export function getMergedLpCircleData(contextType: PicsContextType, strokeWidth: number) {
	return {
		cx: 50,
		cy: 50,
		r: (contextType === "none" ? 50 : 40) - strokeWidth / 2,
	};
}
