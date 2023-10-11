import finalizeBannerData from "./banner";
import getFailedPlaceholders from "./failedPlaceholders";
import { isAppEntity, isBannerEntity, isNetworkEntity, isNodeEntity, isProfileEntity } from "../types/guards";
import { PicsType } from "../types/picsCommonTypes";
import finalizeTokenData from "./token";
import finalizeBaseData from "./base";
import { DavinciPicAttributes, DavinciPicPlaceholder } from "../types/attributes";
import { DavinciPicEntity, EntityResponseType } from "../types/entities";

/**
 * This functions will combine the remote data with possible alternative data or placeholders
 * @param initialData The data which was initally was constructed for the element
 * @param remoteData The data which was retrieved from the API
 * @param options The attributes
 * @param placeholders The placeholders, which was initially generated for the loading purposes
 * @returns
 */

const finalizeData = <T extends PicsType>(
	initialData: DavinciPicEntity,
	remoteData: EntityResponseType<T>,
	options: DavinciPicAttributes,
	placeholders: DavinciPicPlaceholder
): DavinciPicEntity => {
	const { color: failedPlaceholderColor, url: failedPlaceholderPicture } = getFailedPlaceholders(options, placeholders);

	if (options.type === "token") {
		return finalizeTokenData(options, initialData, remoteData, failedPlaceholderPicture, failedPlaceholderColor);
	}

	if (options.type === "profile" && isProfileEntity(initialData)) {
		return finalizeBaseData(options, remoteData, initialData, failedPlaceholderColor, failedPlaceholderPicture);
	}

	if (options.type === "banner" && isBannerEntity(initialData)) {
		return finalizeBannerData(options, remoteData, initialData, failedPlaceholderColor, failedPlaceholderPicture);
	}

	if (options.type === "node" && isNodeEntity(initialData)) {
		return finalizeBaseData(options, remoteData, initialData, failedPlaceholderColor, failedPlaceholderPicture);
	}

	if (options.type === "network" && isNetworkEntity(initialData)) {
		return finalizeBaseData(options, remoteData, initialData, failedPlaceholderColor, failedPlaceholderPicture);
	}

	if (options.type === "app" && isAppEntity(initialData)) {
		return finalizeBaseData(options, remoteData, initialData, failedPlaceholderColor, failedPlaceholderPicture);
	}

	throw new Error(`Data couldn't be finalized, missing type. ${options?.type}`);
};

export default finalizeData;
