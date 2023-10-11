export const finalSuccessfulPictureUrl = (remotePictureUrl: string, localPictureUrl: string = "", failedPlaceholderPicture: string) => {
	return remotePictureUrl || localPictureUrl || failedPlaceholderPicture;
};

export const finalFailedPictureUrl = (localPictureUrl: string = "", failedPlaceholderPicture: string) => {
	return localPictureUrl || failedPlaceholderPicture;
};

export const finalSuccessfulBgColor = (remoteColor: string, placeholderColor: string) => {
	return remoteColor ? remoteColor || "transparent" : placeholderColor;
};

export const finalFailedBgColor = (finalPictureUrl: string, placeholderColor: string) => {
	return !finalPictureUrl ? placeholderColor : "transparent";
};
