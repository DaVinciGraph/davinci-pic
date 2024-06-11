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
import generateBannerSvg from "./banner";
import generateBaseSvg from "./base";
import generateContextualTokenSvg from "./contextual";
import generateLpTokenSvg from "./lp";

const generateSvg = (data: DavinciPicEntity, options: DavinciPicAttributes): SVGSVGElement => {
	if (options.type === "token") {
		if (isLpTokenEntity(data)) {
			return generateLpTokenSvg(data, options);
		}

		if (isWrappedTokenEntity(data)) {
			const contextData = getContextData(options, data);
			return generateContextualTokenSvg(data.title, data.pic, contextData.title, contextData.pic, data.bgColor, contextData.bgColor, options);
		}

		if (isTokenEntity(data)) {
			if (options.context === "network") {
				return generateContextualTokenSvg(data.title, data.pic, data.network.title, data.network.pic, data.bgColor, data.network?.bgColor || "", options);
			}

			return generateBaseSvg(data.title, data.pic, data.bgColor, options);
		}
	}

	if (options.type === "contract") {
		if (isPoolContractEntity(data)) {
			return generateLpTokenSvg(data, options);
		} else if (isContractEntity(data)) {
			// normal contract
			if (options.context === "network") {
				return generateContextualTokenSvg(data.title, data.pic, data.network.title, data.network.pic, data.bgColor, data.network?.bgColor || "", options);
			}

			if (options.context === "app" && data?.app) {
				return generateContextualTokenSvg(data.title, data.pic, data?.app?.title || "", data?.app?.pic || "", data.bgColor, data?.app?.bgColor || "", options);
			}

			return generateBaseSvg(data.title, data.pic, data.bgColor, options);
		}
	}

	if (options.type === "profile" && isProfileEntity(data)) {
		// return generateProfileSvg(data, options);
		return generateBaseSvg(data.title, data.pic, data.bgColor, options);
	}

	if (options.type === "banner" && isBannerEntity(data)) {
		return generateBannerSvg(data);
	}

	if (options.type === "node" && isNodeEntity(data)) {
		return generateBaseSvg(data.title, data.pic, data.bgColor || "", options);
	}

	if (options.type === "network" && isNetworkEntity(data)) {
		return generateBaseSvg(data.title, data.pic, data.bgColor || "", options);
	}

	if (options.type === "app" && isAppEntity(data)) {
		return generateBaseSvg(data.title, data.pic, data.bgColor || "", options);
	}

	throw new Error("svg couldn't be generated.");
};

export default generateSvg;
