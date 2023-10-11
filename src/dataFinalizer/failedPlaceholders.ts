import { davinciPicsConfig } from "..";
import { getMissingURL, getRandomColor } from "../modules/helpers";
import { DavinciPicAttributes, DavinciPicPlaceholder } from "../types/attributes";

// this function return an object of placeholder containing a color and a url, for the case of full failure or missing pictures to show on failure effect
const getFailedPlaceholders = (options: DavinciPicAttributes, initialPlaceholder: DavinciPicPlaceholder): { color: string; url: string } => {
	const placeholders = { color: "transparent", url: "" };
	if (options.FailureEffect === "transparent") {
		return placeholders;
	}

	if (options.placeholder === "randomColor") {
		if (initialPlaceholder.color && options.loadingEffect === "randomColor") {
			placeholders.color = initialPlaceholder.color;
			return placeholders;
		}

		placeholders.color = getRandomColor();
		return placeholders;
	}

	let possbileBgColor = options.placeholder?.match(davinciPicsConfig.colorRegex);
	if (possbileBgColor) {
		placeholders.color = possbileBgColor[0];
		return placeholders;
	}

	placeholders.url = getMissingURL(options.type, options.placeholder);
	return placeholders;
};

export default getFailedPlaceholders;
