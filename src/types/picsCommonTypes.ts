export type PicsType = "token" | "contract" | "profile" | "banner" | "node" | "network" | "app";
export const picsTypes = ["token", "contract", "profile", "banner", "node", "network", "app"];

export type PicsTokenType = "token" | "lp" | "wrapped" | "currency";
export const picsTokenTypes = ["token", "lp", "wrapped", "currency"];

export type PicsContextType = "none" | "app" | "network";
export const picsContextTypes = ["none", "app", "network"];

export type PicsComplexTokenType = "lp" | "wrapped";
export const picsComplexTokenTypes = ["lp", "wrapped"];

export type PicsContextPositionType = "topRight" | "topLeft" | "bottomRight" | "bottomLeft";
export const picsContextPositionTypes = ["topRight", "topLeft", "bottomRight", "bottomLeft"];

export type PicsLpTokensPositionType = "intersected" | "intimate" | "merged";
export const picsLpTokensPositionTypes = ["intersected", "intimate", "merged"];

export type PicsShapeType = "circle" | "square" | "smoothSquare";
export const picsShapeTypes = ["circle", "square", "smoothSquare"];

export type PicsSensitivityType = "safe" | "uncategorized" | "sensitive" | "inappropriate" | "copyright-violated";
export const picsSensitivityTypes = ["safe", "uncategorized", "sensitive", "inappropriate", "copyright-violated"];

export type PicsShowPairAppsType = "true" | "false" | "when_identical";
export const picsShowPairAppsTypes = ["true", "false", "when_identical"];

export type PicsShowContextForType = "all" | "lp" | "wrapped";
export const picsShowContextForType = ["all", "lp", "wrapped"];

export type PicsTopTokenType = "zero" | "one";
export const picsTopTokenTypes = ["zero", "one"];

export type PicsResponseType = "success" | "failed";
