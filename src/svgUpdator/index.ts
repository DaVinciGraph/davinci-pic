import { DavinciPicEntity } from "../types/entities";
import { getContextData } from "../modules/helpers";
import { DavinciPicAttributes } from "../types/attributes";
import {
	isAppEntity,
	isBannerEntity,
	isContractEntity,
	isLpTokenEntity,
	isNetworkEntity,
	isNodeEntity,
	isPoolContractEntity,
	isProfileEntity,
	isTokenEntity,
	isWrappedTokenEntity,
} from "../types/guards";
import { PicsResponseType } from "../types/picsCommonTypes";
import updateBannerSvg from "./banner";
import updateBaseSvg from "./base";
import updateContextualTokenSvg from "./contextual";
import updateLpTokenSvg from "./lp";

/**
 * updates or might regenerate the svg element with the final data
 * @param svg the inital generated svg element
 * @param data the final data
 * @param options attributes object
 * @param status was the finalizing data was successful or failed
 * @returns
 */
const updateSvg = (svg: SVGSVGElement, data: DavinciPicEntity, options: DavinciPicAttributes, status: PicsResponseType): void => {
	svg.style.display = "inline";
	if (options.type === "token") {
		if (isLpTokenEntity(data)) {
			return updateLpTokenSvg(svg, data, options, status);
		}

		if (isWrappedTokenEntity(data)) {
			const contextData = getContextData(options, data);
			return updateContextualTokenSvg(svg, data.title, data.pic, contextData.title, contextData.pic, data.sensitivity, data.bgColor, contextData.bgColor, options, status);
		}

		if (isTokenEntity(data)) {
			if (options.context === "network") {
				return updateContextualTokenSvg(svg, data.title, data.pic, data.network.title, data.network.pic, data.sensitivity, data.bgColor, data.network?.bgColor || "", options, status);
			}

			return updateBaseSvg(svg, data.title, data.pic, data.bgColor, data.sensitivity, options, status);
		}
	}

	if (options.type === "contract") {
		if (isPoolContractEntity(data)) {
			return updateLpTokenSvg(svg, data, options, status);
		} else if (isContractEntity(data)) {
			// normal contract
			if (options.context === "network") {
				return updateContextualTokenSvg(svg, data.title, data.pic, data.network.title, data.network.pic, data.sensitivity, data.bgColor, data.network?.bgColor || "", options, status);
			}

			if (options.context === "app" && data?.app) {
				return updateContextualTokenSvg(svg, data.title, data.pic, data.app?.title! || "", data.app?.pic! || "", data.sensitivity, data.bgColor, data.app?.bgColor || "", options, status);
			}

			return updateBaseSvg(svg, data.title, data.pic, data.bgColor, data.sensitivity, options, status);
		}
	}

	if (options.type === "profile" && isProfileEntity(data)) {
		// return updateProfileSvg(svg, data, options, status);
		return updateBaseSvg(svg, data.title, data.pic, data.bgColor, data.sensitivity, options, status);
	}

	if (options.type === "banner" && isBannerEntity(data)) {
		return updateBannerSvg(svg, data, options);
	}

	if (options.type === "node" && isNodeEntity(data)) {
		return updateBaseSvg(svg, data.title, data.pic, data.bgColor || "", "safe", options, status);
	}

	if (options.type === "network" && isNetworkEntity(data)) {
		return updateBaseSvg(svg, data.title, data.pic, data.bgColor || "", "safe", options, status);
	}

	if (options.type === "app" && isAppEntity(data)) {
		return updateBaseSvg(svg, data.title, data.pic, data.bgColor || "", "safe", options, status);
	}

	throw new Error("svg couldn't be generated.");
};

export default updateSvg;
