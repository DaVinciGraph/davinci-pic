import { TokenEntity } from "../../types/entities";
import { DavinciPicTokenAttributes } from "../../types/attributes";
import { finalFailedPictureUrl, finalSuccessfulBgColor, finalSuccessfulPictureUrl } from "../helpers";

export const finalizeFailedSimpleTokenData = (
	options: DavinciPicTokenAttributes,
	initialData: TokenEntity,
	failedPlaceholderColor: string,
	failedPlaceholderPicture: string
) => {
	initialData.pic = finalFailedPictureUrl(options.dataPicUrl, failedPlaceholderPicture);
	initialData.supportingBackgroundColor = !initialData.pic ? failedPlaceholderColor : "transparent";

	initialData.network.pic = options.dataContextPicUrl || "";
	initialData.network.supportingBackgroundColor = "";

	return initialData;
};

export const finalizeSuccessfulSimpleTokenData = (
	options: DavinciPicTokenAttributes,
	remoteData: TokenEntity,
	failedPlaceholderColor: string,
	failedPlaceholderPicture: string
) => {
	remoteData.title = remoteData.title || options.dataTitle || "";
	remoteData.pic = finalSuccessfulPictureUrl(remoteData.pic, options.dataPicUrl, failedPlaceholderPicture);
	remoteData.supportingBackgroundColor = finalSuccessfulBgColor(remoteData.supportingBackgroundColor, failedPlaceholderColor);

	remoteData.network.title = remoteData.network.title || options.dataContextTitle || "";
	remoteData.network.pic = remoteData.network.pic || failedPlaceholderPicture;
	remoteData.network.supportingBackgroundColor = remoteData.network.supportingBackgroundColor || failedPlaceholderColor;

	return remoteData;
};
