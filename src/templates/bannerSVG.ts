const PicsBannerSvgTemplate = document.createElement("template");
PicsBannerSvgTemplate.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 100">
	<defs>
		<clipPath>
			<rect x="0" y="0" width="400" height="100" />
		</clipPath>
		<filter>
			<feGaussianBlur in="SourceGraphic" stdDeviation="7" />
		</filter>
	</defs>

	<rect id="rect-bg" x="0" y="0" width="400" height="100" fill="transparent" ></rect>
	<image
		x="0"
		y="0"
		width="400"
		height="100"
		filter=""
		preserveAspectRatio="xMidYMid slice"></image>

	<rect x="0" y="0" width="400" height="100" fill="transparent" ></rect>
</svg>
`;

export default PicsBannerSvgTemplate;
