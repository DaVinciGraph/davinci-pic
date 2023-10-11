import { PicsContextPositionType, PicsContextType, PicsSensitivityType, PicsShapeType, PicsType } from "./picsCommonTypes";

/**
 * Types of davinci-pic attributes
 */

export type DavinciPicsPlaceholderType =
	| "transparent"
	| "default"
	| "defaultBright"
	| "defaultDark"
	| "questionMarkBright"
	| "questionMark"
	| "questionMarkDark"
	| "exclamationMarkBight"
	| "exclamationMark"
	| "exclamationMarkDark"
	| "randomColor"
	| Omit<
			string,
			| "transparent"
			| "default"
			| "defaultBright"
			| "defaultDark"
			| "questionMarkBright"
			| "questionMark"
			| "questionMarkDark"
			| "exclamationMarkBight"
			| "exclamationMark"
			| "exclamationMarkDark"
			| "randomColor"
	  >;

export type DavinciPicLoadingEffectType =
	| "hide"
	| "transparent"
	| "placeholder"
	| "pulse:placeholder"
	| "randomColor"
	| "pulse:randomColor"
	| Omit<string, "hide" | "transparent" | "placeholder" | "pulse:placeholder" | "randomColor" | "pulse:randomColor">;

export type DavinciPicFailureEffectType = "hide" | "transparent" | "placeholder" | Omit<string, "hide" | "transparent" | "placeholder">;

export type DavinciPicBaseAttributes = {
	type: PicsType;
	network: string;
	address: string;
	offlineMode?: boolean;
	shape?: PicsShapeType;
	size?: number;
	strokeWidth?: number;
	strokeColor?: string;
	censor?: PicsSensitivityType;
	dataTitle?: string;
	dataPicUrl?: string;
	placeholder?: DavinciPicsPlaceholderType;
	loadingEffect?: DavinciPicLoadingEffectType;
	FailureEffect?: DavinciPicFailureEffectType;
	delayResponseTime?: number;
};

type DavinciPicBaseAttributesOnline = DavinciPicBaseAttributes & {
	offlineMode?: false;
	dataPicUrl?: string;
};

type DavinciPicBaseAttributessOffline = DavinciPicBaseAttributes & {
	offlineMode?: true;
	dataPicUrl: string;
};

/*  Davinci Pics Token Type  */
export type DavinciPicTokenAttributes = (DavinciPicBaseAttributesOnline | DavinciPicBaseAttributessOffline) & {
	type: "token";
	complexTokenType?: "lp" | "wrapped";
	context?: PicsContextType;
	contextPosition?: PicsContextPositionType;
	dataContextTitle?: string;
	dataContextPicUrl?: string;
};

export type DavinciPicProfileAttributes = (DavinciPicBaseAttributesOnline | DavinciPicBaseAttributessOffline) & {
	type: "profile";
	placeholder?:
		| "default"
		| "transparent"
		| "defaultBright"
		| "defaultDark"
		| "randomColor"
		| Omit<string, "default" | "transparent" | "defaultBright" | "defaultDark" | "randomColor">;
};

export type DavinciPicBannerAttributes = (
	| Omit<DavinciPicBaseAttributesOnline, "size" | "shape" | "strokeWidth" | "strokeColor">
	| Omit<DavinciPicBaseAttributessOffline, "size" | "shape" | "strokeWidth" | "strokeColor">
) & {
	type: "banner";
	placeholder?: "randomColor" | "transparent" | Omit<string, "randomColor" | "transparent">;
};

export type DavinciPicNodeAttributes = (DavinciPicBaseAttributesOnline | DavinciPicBaseAttributessOffline) & {
	type: "node";
};

export type DavinciPicNetworkAttributes = (Omit<DavinciPicBaseAttributesOnline, "address"> | Omit<DavinciPicBaseAttributessOffline, "address">) & {
	type: "network";
};

export type DavinciPicAppAttributes = (
	| Omit<DavinciPicBaseAttributesOnline, "address" | "network">
	| Omit<DavinciPicBaseAttributessOffline, "address" | "network">
) & {
	type: "app";
	name: string;
};

export type DavinciPicAttributes =
	| DavinciPicTokenAttributes
	| DavinciPicProfileAttributes
	| DavinciPicBannerAttributes
	| DavinciPicNodeAttributes
	| DavinciPicNetworkAttributes
	| DavinciPicAppAttributes;

export type DavinciPicPlaceholder = {
	color: string;
	url: string;
};
