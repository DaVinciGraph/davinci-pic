import { davinciPicsConfig } from "..";
import { DavinciPicAttributes } from "../types/attributes";
import { EntityResponseType } from "../types/entities";

/**
 * sends the get request to the API and return the approprite entity data.
 * in case of not found an the API it returns an empty object with status of 200, which is expected
 * @param attributes
 * @returns
 */
const davinciPicsLoad = async <T extends DavinciPicAttributes>(attributes: T): Promise<EntityResponseType<T["type"]>> => {
	if (attributes.offlineMode !== true) {
		let url =
			attributes.type === "network"
				? `${davinciPicsConfig.apiUrl}/networks/${attributes.network}`
				: attributes.type === "app"
				? `${davinciPicsConfig.apiUrl}/apps/${attributes.name}`
				: `${davinciPicsConfig.apiUrl}/${attributes.type === "banner" || attributes.type === "profile" ? "account" : attributes.type}s/${
						attributes.network
				  }/${attributes.address}`;

		try {
			const response = await fetch(url);

			// Check for HTTP errors
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			// Parse JSON response
			const data = (await response.json()) as EntityResponseType<T>;
			return data;
		} catch (error: any) {
			console.error(`DavinciPic Fetch Error: ${error.message}`);
		}
	}

	return {};
};

export default davinciPicsLoad;
