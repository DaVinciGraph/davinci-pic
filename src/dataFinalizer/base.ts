import { AppEntity, DavinciPicEntity, EntityResponseType, NetworkEntity, NodeEntity, ProfileEntity } from "../types/entities";
import { DavinciPicAttributes } from "../types/attributes";
import { isAppEntity, isNetworkEntity, isNodeEntity, isProfileEntity } from "../types/guards";
import { PicsType } from "../types/picsCommonTypes";
import { finalFailedBgColor, finalFailedPictureUrl, finalSuccessfulBgColor, finalSuccessfulPictureUrl } from "./helpers";
import { getThemedBgColor, getThemedPictureUrl } from "../modules/helpers";

const finalizeProfileData = <T extends PicsType>(
	options: DavinciPicAttributes,
	remoteData: EntityResponseType<T>,
	initialData: NetworkEntity | NodeEntity | ProfileEntity | AppEntity,
	failedPlaceholderColor: string,
	failedPlaceholderPicture: string
): DavinciPicEntity => {
	if (isProfileEntity(remoteData) || isNetworkEntity(remoteData) || isNodeEntity(remoteData) || isAppEntity(remoteData)) {
		remoteData.title = remoteData.title || initialData.title;
		remoteData.pic = finalSuccessfulPictureUrl(getThemedPictureUrl(remoteData, options.theme!), options.dataPicUrl, failedPlaceholderPicture);
		remoteData.bgColor = finalSuccessfulBgColor(getThemedBgColor(remoteData, options.theme!), getThemedPictureUrl(remoteData, options.theme!), failedPlaceholderColor, options.dataBgColor || "");

		return remoteData;
	}

	initialData.pic = finalFailedPictureUrl(options.dataPicUrl, failedPlaceholderPicture);
	initialData.bgColor = finalFailedBgColor(initialData.pic, failedPlaceholderColor, options.dataBgColor || "");

	return initialData;
};

export default finalizeProfileData;
