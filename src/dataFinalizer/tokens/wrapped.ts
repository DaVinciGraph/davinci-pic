import { WrappedTokenEntity } from "../../types/entities";
import { DavinciPicTokenAttributes } from "../../types/attributes";
import { finalFailedBgColor, finalFailedPictureUrl, finalSuccessfulBgColor, finalSuccessfulPictureUrl } from "../helpers";

export const finalizeFailedWrappedData = (
	options: DavinciPicTokenAttributes,
	initialData: WrappedTokenEntity,
	failedPlaceholderColor: string,
	failedPlaceholderPicture: string
) => {
	initialData.originalToken.pic = finalFailedPictureUrl(options.dataPicUrl, failedPlaceholderPicture);
	initialData.originalToken.supportingBackgroundColor = finalFailedBgColor(initialData.originalToken.pic, failedPlaceholderColor);

	if (initialData.app && options.context === "app") {
		initialData.app.pic = options.dataContextPicUrl || "";
		initialData.app.supportingBackgroundColor = "transparent";
	}

	initialData.network.pic = options.dataContextPicUrl || "";
	initialData.network.supportingBackgroundColor = "transparent";

	return initialData;
};

export const finalizeSuccessfulWrappedData = (
	options: DavinciPicTokenAttributes,
	remoteData: WrappedTokenEntity,
	failedPlaceholderColor: string,
	failedPlaceholderPicture: string
) => {
	remoteData.originalToken.title = remoteData.originalToken.title || options.dataTitle || "";
	remoteData.originalToken.pic = finalSuccessfulPictureUrl(remoteData.originalToken.pic, options.dataContextPicUrl, failedPlaceholderPicture);
	remoteData.originalToken.supportingBackgroundColor = finalSuccessfulBgColor(
		remoteData.originalToken.supportingBackgroundColor,
		remoteData.originalToken.pic,
		failedPlaceholderColor
	);

	if (remoteData.app) {
		remoteData.app.title = remoteData?.app?.title || options.dataContextTitle || "";
		remoteData.app.pic = remoteData?.app?.pic || options.dataContextPicUrl || "";
		remoteData.app.supportingBackgroundColor = remoteData?.app?.supportingBackgroundColor || "transparent";
	}

	remoteData.network.title = remoteData.network.title || options.dataContextTitle || "";
	remoteData.network.pic = remoteData.network.pic || options.dataContextTitle || failedPlaceholderPicture;
	remoteData.network.supportingBackgroundColor = remoteData.network?.supportingBackgroundColor || "transparent";

	return remoteData;
};
