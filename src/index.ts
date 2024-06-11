import davinciPicsLoad from "./modules/dataLoader";
import finalizeData from "./dataFinalizer";
import integrateAttributes from "./modules/attributeIntegrator";
import initializeData, { getInitialPlaceholders } from "./modules/dataInitializer";
import generateSvg from "./svgGenerator";
import updateSvg from "./svgUpdator";
import { isEntityResponseEmpty, isPicsContextPositionType, isPicsContextType, isPicsShapeType, isPicsType } from "./types/guards";
import {
	PicsContextPositionType,
	PicsContextType,
	PicsLpTokensPositionType,
	PicsShapeType,
	PicsShowContextForType,
	PicsShowPairAppsType,
	PicsTopTokenType,
	PicsType,
	picsLpTokensPositionTypes,
	picsShowContextForType,
	picsShowPairAppsTypes,
	picsTopTokenTypes,
} from "./types/picsCommonTypes";
import { EntityResponseType } from "./types/entities";

export let davinciPicsConfig = {
	apiUrl: "https://s1.pics.davincigraph.io/api/v2",
	backupApiUrl: "https://s2.pics.davincigraph.io/api/v2",
	counter: 0,
	colorRegex: /#(?:[0-9A-Fa-f]{3}){1,2}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|transparent/,
};

/**
 * The DavinciPic class is a custom HTML element that encapsulates the logic for
 * fetching and displaying various types of images based on the PicsType.
 *
 * This element provides several customizable attributes like `type`, `address`, `network`, etc.
 * to configure its behavior. It supports both online and offline modes, fetching data
 * via the DataLoader class or using provided attributes in the offline mode.
 *
 * The class utilizes IntersectionObserver to fetch data when the element scrolls into view.
 * It uses the SvgGenerator for rendering SVG based on the fetched or provided data.
 *
 * Author: Davincigraph Team
 *
 * Usage:
 * <davinci-pic type="token" address="someAddress" network="hedera"></davinci-pic>
 *
 * The class also handles various edge cases like missing data and allows fallback mechanisms.
 */
export class DavinciPic extends HTMLElement {
	set type(value: PicsType) {
		this.setAttribute("type", value);
	}

	get type(): PicsType {
		const value = this.getAttribute("type");

		if (value && isPicsType(value)) {
			return value;
		}

		throw new Error("Type is mandatory.");
	}

	// not applied to app type
	set network(value: string) {
		this.setAttribute("network", value);
	}

	// not applied to app type
	get network(): string {
		const value = this.getAttribute("network");

		if (this.type !== "app" && !value) {
			throw new Error("Network is not defined on the element.");
		}

		return value || "";
	}

	set address(value: string) {
		this.setAttribute("address", value);
	}

	// not applied to network and app entities
	get address(): string {
		const value = this.getAttribute("address");

		if (this.type !== "app" && this.type !== "network" && !value) {
			throw new Error("Network is not defined on the element.");
		}

		return value || "";
	}

	// only applies to app entities
	set name(value: string) {
		this.setAttribute("name", value);
	}

	// only applies to app entities
	get name(): string {
		const value = this.getAttribute("name");

		if (this.type === "app" && value) {
			return value;
		}

		throw new Error("Name is necessary for an app.");
	}

	set offlineMode(value: boolean) {
		value ? this.setAttribute("offline-mode", "") : this.removeAttribute("offline-mode");
	}

	get offlineMode(): boolean {
		return this.hasAttribute("offline-mode");
	}

	set noCache(value: boolean) {
		value ? this.setAttribute("no-cache", "") : this.removeAttribute("no-cache");
	}

	get noCahce(): boolean {
		return this.hasAttribute("no-cache");
	}

	set theme(value: "dark" | "light") {
		this.setAttribute("theme", value === "dark" || value === "light" ? value : "light");
	}

	get theme(): "dark" | "light" {
		const value = this.getAttribute("theme");

		return value === "dark" || value === "light" ? value : "light";
	}

	// only applies to token entities
	set complexTokenType(value: "lp" | "wrapped" | undefined) {
		if (this.type !== "token" && this.type !== "contract") {
			throw new Error("Complex token type is specifically for token and contract types.");
		}

		if (value !== "lp" && value !== "wrapped") {
			throw new Error("The value given for complex token type is invalid.");
		}

		this.setAttribute("complex-token-type", value);
	}

	// only applies to token entities
	get complexTokenType(): "lp" | "wrapped" | undefined {
		const value = this.getAttribute("complex-token-type");

		if (value === "lp" || value === "wrapped") {
			return value;
		}

		return undefined;
	}

	// only applies to token entities
	set lpTokensPosition(value: PicsLpTokensPositionType) {
		if (this.type !== "token") {
			throw new Error("Lp Tokens Position is specifically for token type.");
		}

		if (!value || !picsLpTokensPositionTypes.includes(value)) {
			value = "intersected";
		}

		this.setAttribute("lp-tokens-position", value);
	}

	// only applies to token entities
	get lpTokensPosition(): PicsLpTokensPositionType {
		const value = this.getAttribute("lp-tokens-position");

		if (value && picsLpTokensPositionTypes.includes(value)) {
			return value as PicsLpTokensPositionType;
		}

		return "intersected";
	}
	// only applies to contract entities
	set poolPairPosition(value: PicsLpTokensPositionType) {
		if (this.type !== "contract") {
			throw new Error("Pool Contract Position is specifically for contract type.");
		}

		if (!value || !picsLpTokensPositionTypes.includes(value)) {
			value = "intersected";
		}

		this.setAttribute("pool-pair-position", value);
	}

	// only applies to contract entities
	get poolPairPosition(): PicsLpTokensPositionType {
		const value = this.getAttribute("pool-pair-position");

		if (value && picsLpTokensPositionTypes.includes(value)) {
			return value as PicsLpTokensPositionType;
		}

		return "intersected";
	}

	// only applies to contract & token entities
	set showPairApps(value: PicsShowPairAppsType) {
		if (this.type !== "contract" && this.type !== "token") {
			throw new Error("show pair apps flag is specifically for contract and token types.");
		}

		if (!picsShowPairAppsTypes.includes(value)) {
			value = "when_identical";
		}

		this.setAttribute("show-pair-apps", String(value));
	}

	// only applies to contract and token entities
	get showPairApps(): PicsShowPairAppsType {
		const value = this.getAttribute("show-pair-apps");

		if (value && picsShowPairAppsTypes.includes(value)) {
			return value as PicsShowPairAppsType;
		}

		return "when_identical";
	}

	// only applies to token entities
	set showAppForType(value: PicsShowContextForType) {
		if (this.type !== "token") {
			throw new Error("Pool Contract Position is specifically for token types.");
		}

		if (!picsShowContextForType.includes(value)) {
			value = "all";
		}

		this.setAttribute("show-app-for-type", String(value));
	}

	// only applies to contract entities
	get showAppForType(): PicsShowContextForType {
		const value = this.getAttribute("show-app-for-type");

		if (value && picsShowContextForType.includes(value)) {
			return value as PicsShowContextForType;
		}

		return "all";
	}

	// only applies to contract entities
	set topToken(value: PicsTopTokenType) {
		if (this.type !== "contract" && this.type !== "token") {
			throw new Error("Top Token is specifically for contract and token types.");
		}

		if (!picsTopTokenTypes.includes(value)) {
			value = "one";
		}

		this.setAttribute("top-token", value);
	}

	// only applies to contract entities
	get topToken(): PicsTopTokenType {
		const value = this.getAttribute("top-token");

		if (value && picsTopTokenTypes.includes(value)) {
			return value as PicsTopTokenType;
		}

		return "one";
	}

	set isPool(value: boolean) {
		value ? this.setAttribute("is-pool", "") : this.removeAttribute("is-pool");
	}

	get isPool(): boolean {
		return this.hasAttribute("is-pool");
	}

	// not applies to banner
	set size(value: number) {
		this.setAttribute("size", value.toString());
	}

	// not applies to banner
	get size(): number {
		const value = this.getAttribute("size");
		return value ? parseFloat(value) : 100;
	}

	// not applies to banners & complex and contextual tokens
	set shape(value: PicsShapeType) {
		this.setAttribute("shape", value);
	}

	// not applies to banners & complex and contextual tokens
	get shape(): PicsShapeType {
		const value = this.getAttribute("shape");
		return isPicsShapeType(value) ? value : "circle";
	}

	// only applies to token, specially Wrapped and liquidity
	set context(value: PicsContextType) {
		this.setAttribute("context", value);
	}

	// only applies to token, specially Wrapped and liquidity
	get context(): PicsContextType {
		const value = this.getAttribute("context");
		return isPicsContextType(value) ? value : "none";
	}

	// only applies to token, specially Wrapped and liquidity
	set contextPosition(value: PicsContextPositionType) {
		this.setAttribute("context-position", value);
	}

	// only applies to token, specially Wrapped and liquidity
	get contextPosition(): PicsContextPositionType {
		const value = this.getAttribute("context-position");
		return isPicsContextPositionType(value) ? value : "bottomRight";
	}

	// not applies to banner
	set strokeWidth(value: number) {
		this.setAttribute("stroke-width", value.toString());
	}

	// not applies to banner
	get strokeWidth(): number {
		const value = this.getAttribute("stroke-width");
		return value && !isNaN(Number(value)) ? parseFloat(value) : 0;
	}

	// not applies to banner
	set strokeColor(value: string) {
		this.setAttribute("stroke-color", value);
	}

	// not applies to banner
	get strokeColor() {
		return this.getAttribute("stroke-color") || "gray";
	}

	set censor(value: string | string[]) {
		if (!value) this.removeAttribute("censor");

		this.setAttribute("censor", typeof value === "string" ? value : value?.length ? JSON.stringify(value) : "");
	}

	get censor(): string | string[] {
		const value = this.getAttribute("censor");

		if (!value) return ["copyright-violated"];

		try {
			return JSON.parse(value);
		} catch {
			return value;
		}
	}

	set dataTitle(value: string) {
		this.setAttribute("data-type", value);
	}

	get dataTitle(): string {
		return this.getAttribute("data-title") || "";
	}

	set dataPicUrl(value: string) {
		this.setAttribute("data-pic-url", value);
	}

	get dataPicUrl() {
		return this.getAttribute("data-pic-url") || "";
	}

	set dataBgColor(value: string) {
		this.setAttribute("data-bg-color", value);
	}

	get dataBgColor() {
		return this.getAttribute("data-bg-color") || "";
	}

	// only applies to token, specially Wrapped and liquidity
	set dataContextTitle(value: string) {
		this.setAttribute("data-context-title", value);
	}

	// only applies to token, specially Wrapped and liquidity
	get dataContextTitle(): string {
		return this.getAttribute("data-context-title") || "";
	}

	// only applies to token, specially Wrapped and liquidity
	set dataContextPicUrl(value: string) {
		this.setAttribute("data-context-pic-url", value);
	}

	// only applies to token, specially Wrapped and liquidity
	get dataContextPicUrl(): string {
		return this.getAttribute("data-context-pic-url") || "";
	}

	// only applies to token, specially Wrapped and liquidity
	set dataContextBgColor(value: string) {
		this.setAttribute("data-context-bg-color", value);
	}

	// only applies to token, specially Wrapped and liquidity
	get dataContextBgColor(): string {
		return this.getAttribute("data-context-bg-color") || "";
	}

	set placeholder(value: string) {
		this.setAttribute("placeholder", value);
	}

	get placeholder() {
		return this.getAttribute("placeholder") || "default";
	}

	set loadingEffect(value: string) {
		this.setAttribute("loading-effect", value);
	}

	get loadingEffect() {
		return this.getAttribute("loading-effect") || "transparent";
	}

	set FailureEffect(value: string) {
		this.setAttribute("failure-effect", value);
	}

	get FailureEffect() {
		return this.getAttribute("failure-effect") || "placeholder";
	}

	// for test
	set delayResponseTime(value: number) {
		this.setAttribute("delay-response-time", value.toString());
	}

	// for test
	get delayResponseTime(): number {
		const value = this.getAttribute("delay-response-time");
		return value && !isNaN(Number(value)) ? parseFloat(value) : 0;
	}

	private observer: IntersectionObserver;
	private interval: any;

	constructor() {
		super();
		this.observer = new IntersectionObserver(this.handleIntersection.bind(this), { root: null, rootMargin: "200px 0px", threshold: 0 });
	}

	connectedCallback() {
		this.style.display = "inline-block";
		this.style.verticalAlign = "top";
		this.style.transition = "opacity 1s";
		this.style.opacity = "1";

		this.observer.observe(this);
	}

	disconnectedCallback(): void {
		this.observer.unobserve(this);
		this.clearInterval();
	}

	/**
	 * when the component reached viewport, get the data and generate the appropriate picture
	 * @param entries
	 * @param observer
	 */
	async handleIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver): Promise<void> {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				observer.unobserve(entry.target);
				try {
					// integrate attributes to an object
					const attributes = integrateAttributes(this);

					// get loading placeholders
					const placeholders = getInitialPlaceholders(
						((!attributes.loadingEffect || attributes.loadingEffect.endsWith("placeholder") ? attributes.placeholder : attributes.loadingEffect) as string) || "transparent",
						attributes.type
					);

					// construct initial data
					const initialData = initializeData(attributes, placeholders);

					// generate the svg element
					let svgElement: SVGSVGElement = generateSvg(initialData, attributes);

					// some primary styling
					if (svgElement) {
						// during loading stage hide the element is needed
						svgElement.style.display = attributes.loadingEffect === "hide" ? "none" : "inline";

						// add the generated svg to the custom element
						this.appendChild(svgElement);

						// apply sizes
						if (attributes.type === "banner") {
							this.style.width = "100%";
						} else {
							this.style.width = `${this.size}px`;
							this.style.height = `${this.size}px`;
						}

						// pulse
						if (attributes.loadingEffect?.startsWith("pulse") || attributes.loadingEffect?.startsWith("'pulse")) {
							this.interval = setInterval(() => {
								this.style.opacity = this.style.opacity === "1" ? "0.5" : "1";
							}, 1000);
						}
					}

					// for test purposes
					await this.delay();

					// fetch the remote data, or in case of offline mode just an empty object
					const remoteData: EntityResponseType<PicsType> = attributes.offlineMode === true ? "" : await davinciPicsLoad(attributes);

					// combine remote data with possible local data and placeholders
					const finalData = finalizeData(initialData, remoteData, attributes, placeholders);

					// if pulse was activated during loading, remove it
					this.clearInterval();

					// a shallow status determining the data presence or not
					const status = !isEntityResponseEmpty(remoteData) || attributes.dataPicUrl ? "success" : "failed";

					//finalizing
					if (status === "failed" && attributes.FailureEffect === "hide") {
						//remove the element if the request failed and failure effect is set to hide
						this.remove();
					} else {
						// make changes to the svg
						updateSvg(svgElement, finalData, attributes, status);
					}
				} catch (error: any) {
					console.error(`DavinciPics: ${error.message}`);
				}
			}
		}
	}

	delay = () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, this.delayResponseTime);
		});
	};

	clearInterval = () => {
		clearInterval(this.interval);
		this.style.opacity = "1";
	};
}

customElements.define("davinci-pic", DavinciPic);
