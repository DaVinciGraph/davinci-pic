import { BannerEntity } from "../types/entities";
import { mustBeCensored } from "../modules/helpers";
import { DavinciPicBannerAttributes } from "../types/attributes";

// update the banner elements with final data
const updateBannerSvg = (svg: SVGSVGElement, data: BannerEntity, options: DavinciPicBannerAttributes): void => {
	const mustPictureBeCensored = mustBeCensored(options.censor, data?.sensitivity);

	if (svg) {
		const uniqueID = svg.getAttribute("data-unique-id");

		const filterElem = svg.querySelector("filter");
		if (filterElem && mustPictureBeCensored) {
			filterElem.id = `blur-${uniqueID}`;
		} else {
			filterElem?.remove();
		}

		const BgElem = svg.querySelector("#rect-bg");
		if (BgElem) {
			BgElem.setAttribute("fill", data.bgColor || "none");
		}

		const imageElem = svg.querySelector("image");
		if (imageElem) {
			imageElem.setAttribute("href", data.banner || "");

			if (mustPictureBeCensored) imageElem.setAttribute("filter", `url(#blur-${uniqueID})`);
		}
	}
};

export default updateBannerSvg;
