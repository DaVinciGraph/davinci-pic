import { DavinciPic } from "..";
import {
	DavinciPicAppAttributes,
	DavinciPicAttributes,
	DavinciPicBannerAttributes,
	DavinciPicNetworkAttributes,
	DavinciPicNodeAttributes,
	DavinciPicProfileAttributes,
	DavinciPicTokenAttributes,
} from "../types/attributes";

/**
 * out of all the possible attributes of the element, it construct an object appropriate to the type of the entity
 * @param PicElement
 * @returns DavinciPicAttributes
 */
const integrateAttributes = (PicElement: DavinciPic): DavinciPicAttributes => {
	if (PicElement.offlineMode && !PicElement.dataPicUrl) {
		throw new Error("Defining alternative picture url is necessary when using offline mode.");
	}

	switch (PicElement.type) {
		case "token": {
			const tokenAttrs: DavinciPicTokenAttributes = {
				type: "token",
				network: PicElement.network,
				address: PicElement.address,
				offlineMode: PicElement.offlineMode,
				shape: PicElement.shape,
				size: PicElement.size,
				strokeWidth: PicElement.strokeWidth,
				strokeColor: PicElement.strokeColor,
				censor: PicElement.censor,
				complexTokenType: PicElement.complexTokenType,
				context: PicElement.context,
				contextPosition: PicElement.contextPosition,
				lpTokensPosition: PicElement.lpTokensPosition,
				dataContextTitle: PicElement.dataContextTitle,
				dataContextPicUrl: PicElement.dataContextPicUrl,
				dataTitle: PicElement.dataTitle,
				dataPicUrl: PicElement.dataPicUrl,
				placeholder: PicElement.placeholder,
				loadingEffect: PicElement.loadingEffect,
				FailureEffect: PicElement.FailureEffect,
				delayResponseTime: PicElement.delayResponseTime,
			};

			return tokenAttrs;
		}
		case "profile": {
			const profileAttrs: DavinciPicProfileAttributes = {
				type: "profile",
				network: PicElement.network,
				address: PicElement.address,
				offlineMode: PicElement.offlineMode,
				size: PicElement.size,
				strokeWidth: PicElement.strokeWidth,
				strokeColor: PicElement.strokeColor,
				censor: PicElement.censor,
				dataTitle: PicElement.dataTitle,
				dataPicUrl: PicElement.dataPicUrl,
				placeholder: PicElement.placeholder,
				loadingEffect: PicElement.loadingEffect,
				FailureEffect: PicElement.FailureEffect,
				delayResponseTime: PicElement.delayResponseTime,
				shape: PicElement.shape,
			};
			return profileAttrs;
		}
		case "banner": {
			const bannerAttrs: DavinciPicBannerAttributes = {
				type: "banner",
				network: PicElement.network,
				address: PicElement.address,
				offlineMode: PicElement.offlineMode,
				censor: PicElement.censor,
				dataTitle: PicElement.dataTitle,
				dataPicUrl: PicElement.dataPicUrl,
				placeholder: PicElement.placeholder,
				loadingEffect: PicElement.loadingEffect,
				FailureEffect: PicElement.FailureEffect,
				delayResponseTime: PicElement.delayResponseTime,
			};

			return bannerAttrs;
		}
		case "node": {
			const nodeAttrs: DavinciPicNodeAttributes = {
				type: "node",
				network: PicElement.network,
				address: PicElement.address,
				offlineMode: PicElement.offlineMode,
				size: PicElement.size,
				shape: PicElement.shape,
				strokeWidth: PicElement.strokeWidth,
				strokeColor: PicElement.strokeColor,
				censor: PicElement.censor,
				dataTitle: PicElement.dataTitle,
				dataPicUrl: PicElement.dataPicUrl,
				placeholder: PicElement.placeholder,
				loadingEffect: PicElement.loadingEffect,
				FailureEffect: PicElement.FailureEffect,
				delayResponseTime: PicElement.delayResponseTime,
			};
			return nodeAttrs;
		}
		case "network": {
			const networksAttrs: DavinciPicNetworkAttributes = {
				type: "network",
				network: PicElement.network,
				offlineMode: PicElement.offlineMode,
				size: PicElement.size,
				shape: PicElement.shape,
				strokeWidth: PicElement.strokeWidth,
				strokeColor: PicElement.strokeColor,
				censor: PicElement.censor,
				dataTitle: PicElement.dataTitle,
				dataPicUrl: PicElement.dataPicUrl,
				placeholder: PicElement.placeholder,
				loadingEffect: PicElement.loadingEffect,
				FailureEffect: PicElement.FailureEffect,
				delayResponseTime: PicElement.delayResponseTime,
			};
			return networksAttrs;
		}
		case "app": {
			const appAttrs: DavinciPicAppAttributes = {
				type: "app",
				name: PicElement.name,
				offlineMode: PicElement.offlineMode,
				size: PicElement.size,
				shape: PicElement.shape,
				strokeWidth: PicElement.strokeWidth,
				strokeColor: PicElement.strokeColor,
				censor: PicElement.censor,
				dataTitle: PicElement.dataTitle,
				dataPicUrl: PicElement.dataPicUrl,
				placeholder: PicElement.placeholder,
				loadingEffect: PicElement.loadingEffect,
				FailureEffect: PicElement.FailureEffect,
				delayResponseTime: PicElement.delayResponseTime,
			};

			return appAttrs;
		}
	}
};

export default integrateAttributes;
