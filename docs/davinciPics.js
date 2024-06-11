(() => {
	"use strict";
	var t = {
		d: (e, r) => {
			for (var i in r) t.o(r, i) && !t.o(e, i) && Object.defineProperty(e, i, { enumerable: !0, get: r[i] });
		},
		o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
	};
	t.d({}, { I: () => Dt });
	const e = async (t) => {
			if (!0 !== t.offlineMode) {
				const e = !(("token" !== t.type && "contract" !== t.type) || ("none" === t.context && "false" === t.showPairApps)),
					r = t.noCache ? `&t=${Date.now()}` : "",
					i = (i) => {
						const o = `?scope=supplementary&noMissingError=true&includeBgColor=true${r}`;
						return "network" === t.type
							? `${i}/networks/${t.network}${o}`
							: "app" === t.type
							? `${i}/apps/${t.name}${o}`
							: `${i}/${"banner" === t.type || "profile" === t.type ? "account" : t.type}s/${t.network}/${t.address}${o}&context=${e}`;
					};
				let o = !1;
				const n = async (t) => {
					try {
						const e = await fetch(t);
						if (!e.ok) {
							if (404 !== e.status && !o) {
								const t = i(Dt.backupApiUrl);
								return (o = !0), n(t);
							}
							throw new Error(`HTTP error! status: ${e.status}`);
						}
						const r = e.headers.get("content-type");
						return r && r.includes("application/json") ? await e.json() : await e.text();
					} catch (t) {
						throw (console.error(`DavinciPic Fetch Error: ${t.message}`), t);
					}
				};
				return n(i(Dt.apiUrl));
			}
			return "";
		},
		r = ["token", "contract", "profile", "banner", "node", "network", "app"],
		i = ["none", "app", "network"],
		o = ["topRight", "topLeft", "bottomRight", "bottomLeft"],
		n = ["intersected", "intimate", "merged"],
		c = ["circle", "square", "smoothSquare"],
		s = ["true", "false", "when_identical"],
		l = ["all", "lp", "wrapped"],
		a = ["zero", "one"];
	function p(t) {
		return t && ("TOKEN" === t?.type || "CURRENCY" === t?.type);
	}
	function u(t) {
		return t && "LP" === t?.type && t?.token0 && t?.token1;
	}
	function d(t) {
		return t && "WRAPPED" === t?.type;
	}
	function h(t) {
		return t && t?.address;
	}
	function b(t) {
		return t && t?.isPool && t?.token0 && t?.token1;
	}
	function f(t) {
		return t && t?.address;
	}
	function g(t) {
		return t && t?.address;
	}
	function k(t) {
		return t && t?.address;
	}
	function y(t) {
		return t && t?.id;
	}
	function x(t) {
		return t && t?.name;
	}
	const A = (t, e = "", r) => t || e || r,
		C = (t = "", e) => t || e || "",
		w = (t, e, r, i) => t || i || (e ? "none" : r),
		m = (t, e, r) => r || (t ? "none" : e),
		P = (t, e, r, i, o) =>
			g(e)
				? ((e.title = e.title || r.title), (e.banner = A(e.banner, t.dataPicUrl, o)), (e.bgColor = w(e.bgColor, e.banner, i, t.dataBgColor || "")), e)
				: ((r.banner = C(t.dataPicUrl, o)), (r.bgColor = m(r.banner, i, t.dataBgColor || "")), r),
		$ = {
			token: {
				defaultBright: "https://arweave.net/ZAMK4tuU1MZ9TkNl2ARV2QDRumGT5Yxw13uCpW3kX6w",
				default: "https://arweave.net/wW4bp6129XobnasaZbDB4RxdnpipGR8XyK0tUXGiVL0",
				defaultDark: "https://arweave.net/j5B7_CYAOdrk6YJNVeJMeOHn4HbySsgkObUSfpvUuDA",
				questionMarkBright: "https://arweave.net/z-5G9bNj_gisiQhVECwaUdSzuXMxl9Gi9UxYqrwUrq4",
				questionMark: "https://arweave.net/u9t3--97iFNeFB4XaX7auIdcJWjNWF090BFcJdnBmiQ",
				questionMarkDark: "https://arweave.net/HDVERv0ghkA91qhI2ud7qVUU_FFtAIyYELHHxQ9t2BQ",
				exclamationMarkBight: "https://arweave.net/HS0RGj5YSKgcNch2US1E8saZKdM8RGlQWpxwhk5eKrk",
				exclamationMark: "https://arweave.net/KwbKX4FOOM59KmFrAvtRhr5U-8MqWsSzU0rSA3Z7Z4A",
				exclamationMarkDark: "https://arweave.net/A3Ja0tV3kU6EhVvN1EQejG-kmtY_yEcbgQ6pShYRXHo",
			},
			profile: {
				defaultBright: "https://arweave.net/WxLlax6NBCapLUuKcuy-wvLlKLBTqxTV40yJt7Yc26Q",
				default: "https://arweave.net/qsn_zIlG_7_Ob4_qS6Bpc8vLEc5bPScw6JMly_shxlk",
				defaultDark: "https://arweave.net/ZHWeQz5R6VHBHOg6eOGekMsudTyy7uNBdnrul5gIIu0",
			},
		},
		T = ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e"];
	function v(t, e) {
		const r = (e = e || "defaultBright").match(/url\(['"]?(.*?)['"]?\)/);
		if (r) return r[1];
		if ("banner" === t) return "";
		const i = $["profile" === t ? "profile" : "token"][e];
		return i || $["profile" === t ? "profile" : "token"].defaultBright;
	}
	const S = (t, e) => {
		if (void 0 === e || void 0 === t) return !1;
		"string" == typeof t && (t = t.split(","));
		return !!t.map((t) => t.trim().toUpperCase()).includes(e);
	};
	function E() {
		const t = Math.floor(Math.random() * T.length);
		return T[t];
	}
	function B(t, e = 100) {
		return t || (t = "circle"), String("circle" === t ? e / 2 : "smoothSquare" === t ? 0.15 * e : 0);
	}
	const q = (t, e) => {
			if ("app" === t.context && e?.app) {
				const r = u(e) ? "LP Token, Originated" : b(e) ? "Pool Contract, Deployed" : "Wrapped Token, Originated";
				return { type: "app", pic: M(e?.app, t.theme) || "", title: e.app.title ? `${r} by ${e.app.title}` : "", bgColor: e.app.bgColor || "none" };
			}
			return "network" === t.context && e?.network
				? { type: "network", pic: M(e?.network, t.theme) || "", title: e.network.title ? `Originated on ${e.network.title}` : "", bgColor: e.network.bgColor || "none" }
				: { type: "none", pic: "", title: "", bgColor: "none" };
		},
		U = (t, e) => "contract" === e.type || "all" === e.showAppForType || e.showAppForType === t,
		M = (t, e) => ("dark" === e ? t?.darkPic || t?.pic || "" : t?.pic || t?.darkPic || ""),
		R = (t, e) => ("dark" === e && t?.darkPic ? t?.darkBgColor : t?.pic ? t?.bgColor : ""),
		W = (t, e) => {
			const r = { color: "none", url: "" };
			if ("transparent" === t.FailureEffect) return r;
			if ("randomColor" === t.placeholder) return e.color && "randomColor" === t.loadingEffect ? ((r.color = e.color), r) : ((r.color = E()), r);
			let i = t.placeholder?.match(Dt.colorRegex);
			return i ? ((r.color = i[0]), r) : ((r.url = v(t.type, t.placeholder)), r);
		},
		z = (t, e, r, i) => {
			const { token0Pic: o, token1Pic: n, token0BgColor: c, token1BgColor: s } = N(t);
			return (
				(e.token0.pic = C(o, i)),
				(e.token0.bgColor = m(e.token0.pic, r, c)),
				(e.token1.pic = C(n, i)),
				(e.token1.bgColor = m(e.token1.pic, r, s)),
				e.app && "app" === t.context && ((e.app.pic = t.dataContextPicUrl || ""), (e.app.bgColor = t.dataContextBgColor || "none")),
				(e.network.pic = t.dataContextPicUrl || ""),
				(e.network.bgColor = t.dataContextBgColor || "none"),
				e
			);
		},
		F = (t, e, r, i) => {
			const { token0Title: o, token1Title: n, token0Pic: c, token1Pic: s, token0BgColor: l, token1BgColor: a } = N(t);
			return (
				(e.token0.title = e.token0.title || o),
				(e.token0.pic = A(M(e.token0, t.theme), c, i)),
				(e.token0.bgColor = w(R(e.token0, t.theme), M(e.token0, t.theme), r, l)),
				(e.token1.title = e.token1.title || n),
				(e.token1.pic = A(M(e.token1, t.theme), s, i)),
				(e.token1.bgColor = w(R(e.token1, t.theme), M(e.token1, t.theme), r, a)),
				e?.app &&
					(U("lp", t)
						? ((e.app.title = e.app?.title || t.dataContextTitle || ""),
						  (e.app.pic = M(e.app, t.theme) || t.dataContextPicUrl || ""),
						  (e.app.bgColor = R(e.app, t.theme) || t.dataContextBgColor || "none"))
						: ((e.app.title = ""), (e.app.pic = ""), (e.app.bgColor = "none"))),
				e?.token0?.app && ((e.token0.app.pic = M(e.token0.app, t.theme)), (e.token0.app.bgColor = R(e.token0.app, t.theme) || "none")),
				e?.token1?.app && ((e.token1.app.pic = M(e.token1.app, t.theme)), (e.token1.app.bgColor = R(e.token1.app, t.theme) || "none")),
				"string" == typeof e?.network
					? (e.network = { id: e.network, title: e.network || t?.dataContextTitle || "", pic: "", bgColor: t?.dataContextBgColor || "none" })
					: ((e.network.title = e?.network?.title || t.dataContextTitle || ""),
					  (e.network.pic = M(e?.network, t.theme) || t.dataContextPicUrl || i),
					  (e.network.bgColor = R(e?.network, t.theme) || t.dataContextBgColor || "none")),
				e
			);
		},
		N = (t) => {
			let e = "",
				r = "",
				i = "",
				o = "",
				n = "",
				c = "";
			if (t.dataPicUrl?.includes("|")) {
				const i = t.dataPicUrl.split("|");
				(e = i[0]), (r = i[1]);
			}
			if (t.dataTitle?.includes("|")) {
				const e = t.dataTitle.split("|");
				(i = e[0]), (o = e[1]);
			}
			if (t.dataBgColor?.includes("|")) {
				const e = t.dataBgColor.split("|");
				(n = e[0]), (c = e[1]);
			}
			return { token0Pic: e, token1Pic: r, token0Title: i, token1Title: o, token0BgColor: n, token1BgColor: c };
		},
		L = (t, e, r, i, o) => {
			if (!r?.type) {
				if (u(e)) return z(t, e, o, i);
				if (d(e))
					return ((t, e, r, i) => (
						(e.pic = C(t.dataPicUrl, i)),
						(e.bgColor = m(e.pic, r, t.dataBgColor || "")),
						e.app && "app" === t.context && ((e.app.pic = t.dataContextPicUrl || ""), (e.app.bgColor = t.dataContextBgColor || "none")),
						(e.network.pic = t.dataContextPicUrl || ""),
						(e.network.bgColor = t.dataContextBgColor || "none"),
						e
					))(t, e, o, i);
				if (p(e))
					return ((t, e, r, i) => (
						(e.pic = C(t.dataPicUrl, i)),
						(e.bgColor = m(e.pic, r, t.dataBgColor || "")),
						(e.network.pic = t.dataContextPicUrl || ""),
						(e.network.bgColor = t.dataContextBgColor || "none"),
						e
					))(t, e, o, i);
			}
			if (u(r)) return F(t, r, o, i);
			if (d(r))
				return ((t, e, r, i) => (
					(e.title = e.title || t.dataTitle || ""),
					(e.pic = A(M(e, t.theme), t.dataContextPicUrl, i)),
					(e.bgColor = w(R(e, t.theme) || "", M(e, t.theme), r, t.dataBgColor || "")),
					e.app &&
						"app" === t.context &&
						(U("wrapped", t)
							? ((e.app.title = e?.app?.title || t.dataContextTitle || ""),
							  (e.app.pic = M(e?.app, t.theme) || t.dataContextPicUrl || ""),
							  (e.app.bgColor = R(e?.app, t.theme) || t.dataContextBgColor || "none"))
							: ((e.app.title = ""), (e.app.pic = ""), (e.app.bgColor = "none"))),
					"string" == typeof e?.network
						? (e.network = { id: e.network, title: e.network || t?.dataContextTitle || "", pic: "", bgColor: t?.dataContextBgColor || "none" })
						: ((e.network.title = e.network.title || t.dataContextTitle || ""),
						  (e.network.pic = M(e.network, t.theme) || t.dataContextTitle || i),
						  (e.network.bgColor = R(e.network, t.theme) || t.dataContextBgColor || "none")),
					e
				))(t, r, o, i);
			if (p(r))
				return ((t, e, r, i) => (
					(e.title = e.title || t.dataTitle || ""),
					(e.pic = A(M(e, t.theme), t.dataPicUrl, i)),
					(e.bgColor = w(R(e, t.theme), M(e, t.theme), r, t.dataBgColor || "")),
					"string" == typeof e?.network
						? (e.network = { id: e.network, title: e.network || t?.dataContextTitle || "", pic: "", bgColor: t?.dataContextBgColor || "none" })
						: ((e.network.title = e.network.title || t.dataContextTitle || ""),
						  (e.network.pic = M(e.network, t.theme) || i),
						  (e.network.bgColor = R(e?.network, t.theme) || t.dataContextBgColor || "none")),
					e
				))(t, r, o, i);
			throw new Error("Data couldn't be finalized for the token, failed to combine data.");
		},
		D = (t, e, r, i, o) =>
			f(e) || y(e) || k(e) || x(e)
				? ((e.title = e.title || r.title), (e.pic = A(M(e, t.theme), t.dataPicUrl, o)), (e.bgColor = w(R(e, t.theme), M(e, t.theme), i, t.dataBgColor || "")), e)
				: ((r.pic = C(t.dataPicUrl, o)), (r.bgColor = m(r.pic, i, t.dataBgColor || "")), r),
		G = (t, e, r, i, o) => {
			if (!r?.address) {
				if (b(e)) return z(t, e, o, i);
				if (h(e)) return Y(t, e, o, i);
			}
			if (b(r)) return F(t, r, o, i);
			if (h(r)) return O(t, r, o, i);
			throw new Error("Data couldn't be finalized for the contract, failed to combine data.");
		},
		O = (t, e, r, i) => (
			(e.title = e.title || t.dataTitle || ""),
			(e.pic = A(M(e, t.theme), t.dataPicUrl, i)),
			(e.bgColor = w(R(e, t.theme), M(e, t.theme), r, t.dataBgColor || "")),
			e.app &&
				((e.app.title = e?.app?.title || t.dataContextTitle || ""),
				(e.app.pic = M(e?.app, t.theme) || t.dataContextPicUrl || ""),
				(e.app.bgColor = R(e?.app, t.theme) || t.dataContextBgColor || "none")),
			"string" == typeof e?.network
				? (e.network = { id: e.network, title: e.network || t?.dataContextTitle || "", pic: "", bgColor: t?.dataContextBgColor || "none" })
				: ((e.network.title = e.network.title || t.dataContextTitle || ""),
				  (e.network.pic = M(e.network, t.theme) || i),
				  (e.network.bgColor = R(e.network, t.theme) || t.dataContextBgColor || "none")),
			e
		),
		Y = (t, e, r, i) => (
			(e.pic = C(t.dataPicUrl, i)),
			(e.bgColor = m(e.pic, r, t.dataBgColor || "")),
			e.app && "app" === t.context && ((e.app.pic = t.dataContextPicUrl || ""), (e.app.bgColor = t.dataContextBgColor || "none")),
			(e.network.pic = t.dataContextPicUrl || ""),
			(e.network.bgColor = t.dataContextBgColor || "none"),
			e
		),
		H = (t, e, r, i) => {
			const { color: o, url: n } = W(r, i);
			if ("token" === r.type) return L(r, t, e, n, o);
			if ("contract" === r.type) return G(r, t, e, n, o);
			if ("profile" === r.type && f(t)) return D(r, e, t, o, n);
			if ("banner" === r.type && g(t)) return P(r, e, t, o, n);
			if ("node" === r.type && k(t)) return D(r, e, t, o, n);
			if ("network" === r.type && y(t)) return D(r, e, t, o, n);
			if ("app" === r.type && x(t)) return D(r, e, t, o, n);
			throw new Error(`Data couldn't be finalized, missing type. ${r?.type}`);
		},
		I = (t) => {
			if (t.offlineMode && !t.dataPicUrl) throw new Error("Defining alternative picture url is necessary when using offline mode.");
			switch (t.type) {
				case "token":
					return {
						type: "token",
						network: t.network,
						address: t.address,
						offlineMode: t.offlineMode,
						shape: t.shape,
						size: t.size,
						strokeWidth: t.strokeWidth,
						strokeColor: t.strokeColor,
						censor: t.censor,
						complexTokenType: t.complexTokenType,
						context: t.context,
						contextPosition: t.contextPosition,
						lpTokensPosition: t.lpTokensPosition,
						dataContextTitle: t.dataContextTitle,
						dataContextPicUrl: t.dataContextPicUrl,
						showPairApps: t.showPairApps,
						showAppForType: t.showAppForType,
						topToken: t.topToken,
						dataTitle: t.dataTitle,
						dataPicUrl: t.dataPicUrl,
						placeholder: t.placeholder,
						loadingEffect: t.loadingEffect,
						FailureEffect: t.FailureEffect,
						delayResponseTime: t.delayResponseTime,
						noCache: t.noCache,
						dataBgColor: t.dataBgColor,
						dataContextBgColor: t.dataContextBgColor,
						theme: t.theme,
					};
				case "contract":
					return {
						type: "contract",
						network: t.network,
						address: t.address,
						offlineMode: t.offlineMode,
						shape: t.shape,
						size: t.size,
						strokeWidth: t.strokeWidth,
						strokeColor: t.strokeColor,
						censor: t.censor,
						isPool: Boolean(t.isPool),
						context: t.context,
						contextPosition: t.contextPosition,
						poolPairPosition: t.poolPairPosition,
						dataContextTitle: t.dataContextTitle,
						dataContextPicUrl: t.dataContextPicUrl,
						showPairApps: t.showPairApps,
						topToken: t.topToken,
						dataTitle: t.dataTitle,
						dataPicUrl: t.dataPicUrl,
						placeholder: t.placeholder,
						loadingEffect: t.loadingEffect,
						FailureEffect: t.FailureEffect,
						delayResponseTime: t.delayResponseTime,
						noCache: t.noCache,
						dataBgColor: t.dataBgColor,
						dataContextBgColor: t.dataContextBgColor,
						theme: t.theme,
					};
				case "profile":
					return {
						type: "profile",
						network: t.network,
						address: t.address,
						offlineMode: t.offlineMode,
						size: t.size,
						strokeWidth: t.strokeWidth,
						strokeColor: t.strokeColor,
						censor: t.censor,
						dataTitle: t.dataTitle,
						dataPicUrl: t.dataPicUrl,
						placeholder: t.placeholder,
						loadingEffect: t.loadingEffect,
						FailureEffect: t.FailureEffect,
						delayResponseTime: t.delayResponseTime,
						shape: t.shape,
						noCache: t.noCache,
						dataBgColor: t.dataBgColor,
						theme: t.theme,
					};
				case "banner":
					return {
						type: "banner",
						network: t.network,
						address: t.address,
						offlineMode: t.offlineMode,
						censor: t.censor,
						dataTitle: t.dataTitle,
						dataPicUrl: t.dataPicUrl,
						placeholder: t.placeholder,
						loadingEffect: t.loadingEffect,
						FailureEffect: t.FailureEffect,
						delayResponseTime: t.delayResponseTime,
						noCache: t.noCache,
						dataBgColor: t.dataBgColor,
						theme: t.theme,
					};
				case "node":
					return {
						type: "node",
						network: t.network,
						address: t.address,
						offlineMode: t.offlineMode,
						size: t.size,
						shape: t.shape,
						strokeWidth: t.strokeWidth,
						strokeColor: t.strokeColor,
						censor: t.censor,
						dataTitle: t.dataTitle,
						dataPicUrl: t.dataPicUrl,
						placeholder: t.placeholder,
						loadingEffect: t.loadingEffect,
						FailureEffect: t.FailureEffect,
						delayResponseTime: t.delayResponseTime,
						noCache: t.noCache,
						dataBgColor: t.dataBgColor,
						theme: t.theme,
					};
				case "network":
					return {
						type: "network",
						network: t.network,
						offlineMode: t.offlineMode,
						size: t.size,
						shape: t.shape,
						strokeWidth: t.strokeWidth,
						strokeColor: t.strokeColor,
						censor: t.censor,
						dataTitle: t.dataTitle,
						dataPicUrl: t.dataPicUrl,
						placeholder: t.placeholder,
						loadingEffect: t.loadingEffect,
						FailureEffect: t.FailureEffect,
						delayResponseTime: t.delayResponseTime,
						noCache: t.noCache,
						dataBgColor: t.dataBgColor,
						theme: t.theme,
					};
				case "app":
					return {
						type: "app",
						name: t.name,
						offlineMode: t.offlineMode,
						size: t.size,
						shape: t.shape,
						strokeWidth: t.strokeWidth,
						strokeColor: t.strokeColor,
						censor: t.censor,
						dataTitle: t.dataTitle,
						dataPicUrl: t.dataPicUrl,
						placeholder: t.placeholder,
						loadingEffect: t.loadingEffect,
						FailureEffect: t.FailureEffect,
						delayResponseTime: t.delayResponseTime,
						noCache: t.noCache,
						dataBgColor: t.dataBgColor,
						theme: t.theme,
					};
			}
		},
		_ = (t, e) => {
			switch (t.type) {
				case "token": {
					let r = { type: "TOKEN", address: t.address, bgColor: K(e), network: { id: t.network, title: ("network" === t.context && t.dataContextTitle) || "", pic: "", bgColor: e.color } };
					const i = t.dataPicUrl?.includes("|"),
						o = t.dataTitle?.includes("|");
					if ("lp" === t.complexTokenType || i || o) {
						let i = e.url,
							n = e.url,
							c = "",
							s = "";
						if (o && t.dataTitle) {
							const e = t.dataTitle.split("|");
							(c = e[0]), (s = e[1]);
						}
						return {
							...r,
							type: "LP",
							title: "",
							sensitivity: "safe",
							token0: { network: t.network, address: t.address, sensitivity: "safe", pic: i, bgColor: K(e), title: c },
							token1: { network: t.network, address: t.address, sensitivity: "safe", pic: n, bgColor: K(e), title: s },
							app: j(t, e),
						};
					}
					return "wrapped" === t.complexTokenType
						? { ...r, type: "WRAPPED", title: t.dataTitle || "", sensitivity: "safe", pic: e.url, darkPic: "", bgColor: K(e), app: j(t, e) }
						: { ...r, title: t.dataTitle || "", pic: e.url, bgColor: K(e) };
				}
				case "contract": {
					let r = {
						type: "CONTRACT",
						isPool: !1,
						address: t.address,
						bgColor: K(e),
						network: { id: t.network, title: ("network" === t.context && t.dataContextTitle) || "", pic: "", darkPic: "", bgColor: e.color },
						app: j(t, e),
					};
					const i = t.dataPicUrl?.includes("|"),
						o = t.dataTitle?.includes("|");
					if (t.isPool || i || o) {
						let i = e.url,
							n = e.url,
							c = "",
							s = "";
						if (o && t.dataTitle) {
							const e = t.dataTitle.split("|");
							(c = e[0]), (s = e[1]);
						}
						return {
							...r,
							isPool: !0,
							title: "",
							sensitivity: "safe",
							token0: { network: t.network, address: t.address, sensitivity: "safe", pic: i, darkPic: "", bgColor: K(e), title: c },
							token1: { network: t.network, address: t.address, sensitivity: "safe", pic: n, darkPic: "", bgColor: K(e), title: s },
						};
					}
					return { ...r, title: t.dataTitle || "", pic: e.url, darkPic: "", sensitivity: "safe", bgColor: K(e) };
				}
				case "profile":
					return { network: t.network, address: t.address, title: t.dataTitle || "", sensitivity: "safe", pic: e.url, bgColor: K(e) };
				case "banner":
					return { network: t.network, address: t.address, title: t.dataTitle || "", sensitivity: "safe", banner: e.url, bgColor: K(e) };
				case "node":
					return { network: t.network, address: t.address, title: t.dataTitle || "", bgColor: K(e), pic: e.url };
				case "network":
					return { id: t.network, title: t.dataTitle || "", pic: e.url, bgColor: K(e) };
				case "app":
					return { name: " ", title: t.dataTitle || "", pic: e.url, bgColor: K(e) };
			}
		},
		X = (t, e) => {
			const r = { color: "none", url: "" };
			if ("transparent" === t) return r;
			if (t.endsWith("randomColor") || t.endsWith("randomColor'")) return (r.color = E()), r;
			let i = t.match(Dt.colorRegex);
			return i ? ((r.color = i[0]), r) : ((r.url = v(e, t)), r);
		},
		j = (t, e) => ({ title: t.dataContextTitle || "", pic: "", bgColor: e.color || "none" }),
		K = (t) => (t.url ? "none" : t.color),
		Q = document.createElement("template");
	Q.innerHTML =
		'\n<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 100">\n\t<defs>\n\t\t<clipPath>\n\t\t\t<rect x="0" y="0" width="400" height="100" />\n\t\t</clipPath>\n\t\t<filter>\n\t\t\t<feGaussianBlur in="SourceGraphic" stdDeviation="7" />\n\t\t</filter>\n\t</defs>\n\n\t<rect id="rect-bg" x="0" y="0" width="400" height="100" fill="none" ></rect>\n\t<image\n\t\tx="0"\n\t\ty="0"\n\t\twidth="400"\n\t\theight="100"\n\t\tfilter=""\n\t\tpreserveAspectRatio="xMidYMid slice"></image>\n\n\t<rect x="0" y="0" width="400" height="100" fill="none" ></rect>\n</svg>\n';
	const V = Q,
		J = (t) => {
			const e = "banner-" + ++Dt.counter,
				r = document.importNode(V.content, !0),
				i = r.querySelector("svg");
			if (i) {
				i.setAttribute("data-unique-id", e);
				const o = r.querySelector("clipPath");
				o && (o.id = `shape-${e}`);
				const n = r.querySelector("#rect-bg");
				n && n.setAttribute("fill", t.bgColor);
				const c = r.querySelector("image");
				c && (c.setAttribute("href", t.banner || ""), c.setAttribute("clip-path", `url(#shape-${e})`));
			}
			return i;
		},
		Z = document.createElement("template");
	Z.innerHTML =
		'\n<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">\n\t<defs>\n\t\t<clipPath>\n\t\t\t<rect></rect>\n\t\t</clipPath>\n\t\t<filter>\n\t\t\t<feGaussianBlur in="SourceGraphic" stdDeviation="7" />\n\t\t</filter>\n\t</defs>\n\n\t<rect id="bg-color" fill="none"></rect>\n\t<image preserveAspectRatio="xMidYMid slice"><title></title></image>\n\t<rect fill="none" id="mask"></rect>\n</svg>\n';
	const tt = Z,
		et = (t, e, r, i) => {
			const o = t.querySelector("clipPath");
			if (o) {
				o.id = `rect-${e}`;
				const t = o.firstElementChild;
				t &&
					(t.setAttribute("x", "" + r / 2),
					t.setAttribute("y", "" + r / 2),
					t.setAttribute("width", "" + (100 - r)),
					t.setAttribute("height", "" + (100 - r)),
					t.setAttribute("rx", B(i, 100)),
					t.setAttribute("ry", B(i, 100)));
			}
		},
		rt = (t, e, r, i) => {
			const o = t.querySelector("#bg-color");
			o &&
				(o.setAttribute("x", "" + r / 2),
				o.setAttribute("y", "" + r / 2),
				o.setAttribute("width", "" + (100 - r)),
				o.setAttribute("height", "" + (100 - r)),
				o.setAttribute("rx", B(i, 100)),
				o.setAttribute("ry", B(i, 100)),
				o.setAttribute("fill", e));
		},
		it = (t, e, r, i, o) => {
			const n = t.querySelector("image");
			n &&
				(n.setAttribute("x", "" + i / 2),
				n.setAttribute("y", "" + i / 2),
				n.setAttribute("width", "" + (100 - i)),
				n.setAttribute("height", "" + (100 - i)),
				n.setAttribute("href", e),
				n.setAttribute("clip-path", `url(#rect-${r})`),
				n?.firstElementChild && (n.firstElementChild.textContent = o || ""));
		},
		ot = (t, e, r, i, o = !1) => {
			const n = t.querySelector("#mask");
			n &&
				(n.setAttribute("x", "" + r / 2),
				n.setAttribute("y", "" + r / 2),
				n.setAttribute("width", "" + (100 - r)),
				n.setAttribute("height", "" + (100 - r)),
				n.setAttribute("rx", B(i.shape, 100)),
				n.setAttribute("ry", B(i.shape, 100)),
				n.setAttribute("stroke", i.strokeColor || ""),
				n.setAttribute("stroke-width", String(o ? r : 0)));
		};
	function nt(t, e, r) {
		const i = t.querySelector("filter");
		i && e ? (i.id = `blur-${r}`) : i?.remove();
	}
	const ct = (t, e, r, i) => {
			const o = "" + ++Dt.counter,
				n = i.strokeWidth || 0,
				c = document.importNode(tt.content, !0),
				s = c.querySelector("svg");
			return (
				s &&
					(s.setAttribute("width", `${i.size}`),
					s.setAttribute("height", `${i.size}`),
					s.setAttribute("data-unique-id", o),
					s.setAttribute("data-template-type", "base"),
					et(c, o, n, i.shape),
					rt(c, r, n, i.shape),
					it(c, e, o, n, t),
					ot(c, 0, n, i, !1)),
				s
			);
		},
		st = document.createElement("template");
	st.innerHTML =
		'\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">\n\t<defs>\n\t\t<clipPath id="contextual-path">\n\t\t\t<circle cx="0" cy="0" r="0"></circle>\n\t\t</clipPath>\n\t\t<clipPath id="context-path">\n\t\t\t<circle cx="0" cy="0" r="0"></circle>\n\t\t</clipPath>\n\n\t\t<filter id="contextual-blur">\n\t\t\t<feGaussianBlur in="SourceGraphic" stdDeviation="7" />\n\t\t</filter>\n\t</defs>\n\n\t<circle id="contextual-bg-circle" fill="none"></circle>\n\t<image\n\t\tid="contextual-image"\n\t\tpreserveAspectRatio="xMidYMid slice">\n\t\t<title></title>\n\t</image>\n\t<circle\n\t\tid="contextual-circle"\n\t\tfill="none">\n\t</circle>\n\n\t<circle id="context-bg-circle" fill="none"></circle>\n\t<image\n\t\tid="context-image"\n\t\tpreserveAspectRatio="xMidYMid slice">\n\t\t<title></title>\n\t</image>\n\t<circle\n\t\tid="context-circle"\n\t\tfill="none">\n\t</circle>\n</svg>\n';
	const lt = st;
	function at(t, e, r, i) {
		const o = t.querySelector("#contextual-path");
		if (o) {
			o.id = `contextual-circle-${e}`;
			const t = o.firstElementChild;
			t && (t.setAttribute("cx", `${r.cx}`), t.setAttribute("cy", `${r.cy}`), t.setAttribute("r", `${r.r}`));
		}
		const n = t.querySelector("#context-path");
		if (n) {
			n.id = `context-circle-${e}`;
			const t = n.firstElementChild;
			t && (t.setAttribute("cx", `${i.cx}`), t.setAttribute("cy", `${i.cy}`), t.setAttribute("r", `${i.r}`));
		}
	}
	function pt(t, e, r, i = !1, o, n, c, s, l, a = !1) {
		const p = t.querySelector("#contextual-bg-circle");
		p && (p.setAttribute("cx", `${r.cx}`), p.setAttribute("cy", `${r.cy}`), p.setAttribute("r", `${r.r}`), p.setAttribute("fill", c));
		const u = t.querySelector("#contextual-image");
		if (u) {
			u.setAttribute("x", "" + (r.cx - r.r)),
				u.setAttribute("y", "" + (r.cy - r.r)),
				u.setAttribute("width", "" + 2 * r.r),
				u.setAttribute("height", "" + 2 * r.r),
				u.setAttribute("href", o),
				u.setAttribute("clip-path", `url(#contextual-circle-${e})`),
				i && u.setAttribute("filter", `url(#contextual-blur-${e})`);
			const t = u.firstElementChild;
			t && !i && (t.textContent = n || "");
		}
		const d = t.querySelector("#contextual-circle");
		d && (d.setAttribute("cx", `${r.cx}`), d.setAttribute("cy", `${r.cy}`), d.setAttribute("r", `${r.r}`), d.setAttribute("stroke", l), d.setAttribute("stroke-width", String(a ? s : 0)));
	}
	function ut(t, e, r, i, o, n, c, s, l = !1) {
		const a = t.querySelector("#context-image"),
			p = t.querySelector("#context-circle");
		if (a && p) {
			const u = t.querySelector("#context-bg-circle");
			u && (u.setAttribute("cx", String(r.cx)), u.setAttribute("cy", String(r.cy)), u.setAttribute("r", String(r.r)), u.setAttribute("fill", n)),
				a.setAttribute("href", i || ""),
				a.setAttribute("x", String(r.cx - r.r)),
				a.setAttribute("y", String(r.cy - r.r)),
				a.setAttribute("width", String(2 * r.r)),
				a.setAttribute("height", String(2 * r.r)),
				a.setAttribute("clip-path", `url(#context-circle-${e})`);
			const d = a.firstElementChild;
			d && o && (d.textContent = o),
				p.setAttribute("cx", String(r.cx)),
				p.setAttribute("cy", String(r.cy)),
				p.setAttribute("r", String(r.r)),
				p.setAttribute("stroke", s),
				p.setAttribute("stroke-width", String(l ? c : 0)),
				p.setAttribute("fill", "none");
		}
	}
	function dt(t, e, r) {
		const i = t.querySelector("#contextual-blur");
		i && r ? (i.id = `contextual-blur-${e}`) : i?.remove();
	}
	function ht(t, e = 0) {
		return { cx: 50, cy: 50, r: (t && "none" !== t ? 40 : 50) - e / 2 };
	}
	function bt(t, e, r) {
		const i = e.r / 2;
		return {
			cx: "bottomRight" === t.contextPosition || "topRight" === t.contextPosition ? e.cx + e.r - i / 2 - r / 2 : e.cx - e.r + i / 2 + r / 2,
			cy: "bottomRight" === t.contextPosition || "bottomLeft" === t.contextPosition ? e.cy + e.r - i / 2 - r / 2 : e.cy - e.r + i / 2 + r / 2,
			r: i,
		};
	}
	const ft = (t, e, r, i, o, n, c) => {
			const s = c.strokeWidth || 0,
				l = "" + ++Dt.counter,
				a = ht(c.context, s),
				p = bt(c, a, s),
				u = document.importNode(lt.content, !0),
				d = u.querySelector("svg");
			return (
				d &&
					(d.setAttribute("width", `${c.size}`),
					d.setAttribute("height", `${c.size}`),
					d.setAttribute("data-unique-id", l),
					d.setAttribute("data-template-type", "contextual"),
					at(u, l, a, p),
					pt(u, l, a, !1, e, t, o, s, c.strokeColor || "", !1),
					c.context && "none" !== c.context && ut(u, l, p, i, r, n, s, c.strokeColor || "", !1)),
				d
			);
		},
		gt =
			'\n<circle id="token0-bg-circle"></circle>\n<image preserveAspectRatio="xMidYMid slice" id="token0-image"><title></title></image>\n<circle fill="none" id="token0-circle"></circle>\n\n<circle id="token0-app-bg-circle"></circle>\n<image preserveAspectRatio="xMidYMid slice" id="token0-app-image"><title></title></image>\n<circle fill="trasparent" id="token0-app-circle"></circle>\n',
		kt =
			'\n<circle id="token1-bg-circle"></circle>\n<image preserveAspectRatio="xMidYMid slice" id="token1-image"><title></title></image>\n<circle fill="none" id="token1-circle"></circle>\n\n<circle id="token1-app-bg-circle"></circle>\n<image preserveAspectRatio="xMidYMid slice" id="token1-app-image"><title></title></image>\n<circle fill="none" id="token1-app-circle"></circle>\n',
		yt = (t) =>
			`\n\t<svg\n\t\txmlns="http://www.w3.org/2000/svg"\n\t\txmlnsXlink="http://www.w3.org/1999/xlink"\n\t\tversion="1.1"\n\t\tviewBox="0 0 100 100">\n\t\t<defs>\n\t\t\t<clipPath id="token0-path">\n\t\t\t\t<circle></circle>\n\t\t\t</clipPath>\n\t\t\t<clipPath id="token0-app-path">\n\t\t\t\t<circle></circle>\n\t\t\t</clipPath>\n\n\t\t\t<clipPath id="token1-path">\n\t\t\t\t<circle></circle>\n\t\t\t</clipPath>\n\t\t\t<clipPath id="token1-app-path">\n\t\t\t\t<circle></circle>\n\t\t\t</clipPath>\n\n\t\t\t<clipPath id="context-path">\n\t\t\t\t<circle></circle>\n\t\t\t</clipPath>\n\t\n\t\t\t<filter id="blur0">\n\t\t\t\t<feGaussianBlur in="SourceGraphic" stdDeviation="7" />\n\t\t\t</filter>\n\t\t\t<filter id="blur1">\n\t\t\t\t<feGaussianBlur in="SourceGraphic" stdDeviation="7" />\n\t\t\t</filter>\n\t\t</defs>\n\t\n\t\t${
				"zero" === t ? kt : gt
			}\n\n\t\t${
				"zero" === t ? gt : kt
			}\n\t\n\t\t<circle id="context-bg-circle"></circle>\n\t\t<image preserveAspectRatio="xMidYMid slice" id="context-image"><title></title></image>\n\t\t<circle fill="none" id="context-circle"></circle>\n\t</svg>\n\t`,
		xt = document.createElement("template");
	xt.innerHTML = yt("one");
	const At = xt,
		Ct = document.createElement("template");
	Ct.innerHTML = yt("zero");
	const wt = Ct;
	function mt(t, e, r, i, o, n, c) {
		const s = t.querySelector("#token0-path");
		if (s) {
			s.id = `token0-circle-${e}`;
			const t = s.firstElementChild;
			t && (t.setAttribute("cx", `${r.cx}`), t.setAttribute("cy", `${r.cy}`), t.setAttribute("r", `${r.r}`));
		}
		if (i) {
			const r = t.querySelector("#token0-app-path");
			if (r) {
				r.id = `token0-app-circle-${e}`;
				const t = r.firstElementChild;
				t && (t.setAttribute("cx", `${i.cx}`), t.setAttribute("cy", `${i.cy}`), t.setAttribute("r", `${i.r}`));
			}
		}
		const l = t.querySelector("#token1-path");
		if (l) {
			l.id = `token1-circle-${e}`;
			const t = l.firstElementChild;
			t && (t.setAttribute("cx", `${o.cx}`), t.setAttribute("cy", `${o.cy}`), t.setAttribute("r", `${o.r}`));
		}
		if (n) {
			const r = t.querySelector("#token1-app-path");
			if (r) {
				r.id = `token1-app-circle-${e}`;
				const t = r.firstElementChild;
				t && (t.setAttribute("cx", `${n.cx}`), t.setAttribute("cy", `${n.cy}`), t.setAttribute("r", `${n.r}`));
			}
		}
		const a = t.querySelector("#context-path");
		if (a) {
			a.id = `context-circle-${e}`;
			const t = a.firstElementChild;
			t && (t.setAttribute("cx", `${c.cx}`), t.setAttribute("cy", `${c.cy}`), t.setAttribute("r", `${c.r}`));
		}
	}
	function Pt(t, e, r, i, o, n, c = !1, s = !1, l, a, p, u) {
		const d = t.querySelector("#token0-bg-circle");
		d && (d.setAttribute("cx", `${r.cx}`), d.setAttribute("cy", `${r.cy}`), d.setAttribute("r", `${r.r}`), d.setAttribute("fill", l.token0.bgColor || "none"));
		const h = t.querySelector("#token0-image");
		if (h) {
			h.setAttribute("x", "" + (r.cx - r.r)),
				h.setAttribute("y", "" + (r.cy - r.r)),
				h.setAttribute("width", "" + 2 * r.r),
				h.setAttribute("height", "" + 2 * r.r),
				h.setAttribute("href", l.token0?.pic || ""),
				h.setAttribute("clip-path", `url(#token0-circle-${e})`),
				c && h.setAttribute("filter", `url(#blur0-${e})`);
			const t = h?.firstElementChild;
			t && !c && (t.textContent = l.token0.title || l.token0.address);
		}
		const b = t.querySelector("#token0-circle");
		b && (b.setAttribute("cx", `${r.cx}`), b.setAttribute("cy", `${r.cy}`), b.setAttribute("r", `${r.r}`), b.setAttribute("stroke", a), b.setAttribute("stroke-width", String(u ? p : 0)));
		const f = t.querySelector("#token1-bg-circle");
		f && (f.setAttribute("cx", `${o.cx}`), f.setAttribute("cy", `${o.cy}`), f.setAttribute("r", `${o.r}`), f.setAttribute("fill", l.token1.bgColor));
		const g = t.querySelector("#token1-image");
		if (g) {
			g.setAttribute("x", "" + (o.cx - o.r)),
				g.setAttribute("y", "" + (o.cy - o.r)),
				g.setAttribute("width", "" + 2 * o.r),
				g.setAttribute("height", "" + 2 * o.r),
				g.setAttribute("href", l.token1?.pic || ""),
				g.setAttribute("clip-path", `url(#token1-circle-${e})`),
				s && g.setAttribute("filter", `url(#blur1-${e})`);
			const t = g?.firstElementChild;
			t && !s && (t.textContent = l.token1.title || l.token1.address);
		}
		const k = t.querySelector("#token1-circle");
		if (
			(k && (k.setAttribute("cx", `${o.cx}`), k.setAttribute("cy", `${o.cy}`), k.setAttribute("r", `${o.r}`), k.setAttribute("stroke", a), k.setAttribute("stroke-width", String(u ? p : 0))), i)
		) {
			const r = t.querySelector("#token0-app-bg-circle");
			r && (r.setAttribute("cx", `${i.cx}`), r.setAttribute("cy", `${i.cy}`), r.setAttribute("r", `${i.r}`), r.setAttribute("fill", l.token0?.app?.bgColor || "none"));
			const o = t.querySelector("#token0-app-image");
			if (o) {
				o.setAttribute("x", "" + (i.cx - i.r)),
					o.setAttribute("y", "" + (i.cy - i.r)),
					o.setAttribute("width", "" + 2 * i.r),
					o.setAttribute("height", "" + 2 * i.r),
					o.setAttribute("href", l.token0?.app?.pic || ""),
					o.setAttribute("clip-path", `url(#token0-app-circle-${e})`);
				const t = o?.firstElementChild;
				t && (t.textContent = l.token0?.app?.title ? `Wrapped Token, Originated by ${l.token0?.app?.title}` : "");
			}
			const n = t.querySelector("#token0-app-circle");
			n &&
				(n.setAttribute("cx", `${i.cx}`),
				n.setAttribute("cy", `${i.cy}`),
				n.setAttribute("r", `${i.r}`),
				n.setAttribute("stroke", a),
				n.setAttribute("stroke-width", String(u ? p : 0)),
				n.setAttribute("fill", "none"));
		}
		if (n) {
			const r = t.querySelector("#token1-app-bg-circle");
			r && (r.setAttribute("cx", `${n.cx}`), r.setAttribute("cy", `${n.cy}`), r.setAttribute("r", `${n.r}`), r.setAttribute("fill", l.token1?.app?.bgColor || "none"));
			const i = t.querySelector("#token1-app-image");
			if (i) {
				i.setAttribute("x", "" + (n.cx - n.r)),
					i.setAttribute("y", "" + (n.cy - n.r)),
					i.setAttribute("width", "" + 2 * n.r),
					i.setAttribute("height", "" + 2 * n.r),
					i.setAttribute("href", l.token1?.app?.pic || ""),
					i.setAttribute("clip-path", `url(#token1-app-circle-${e})`);
				const t = i?.firstElementChild;
				t && (t.textContent = l.token1?.app?.title ? `Wrapped Token, Originated by ${l.token1?.app?.title}` : "");
			}
			const o = t.querySelector("#token1-app-circle");
			o &&
				(o.setAttribute("cx", `${n.cx}`),
				o.setAttribute("cy", `${n.cy}`),
				o.setAttribute("r", `${n.r}`),
				o.setAttribute("stroke", a),
				o.setAttribute("stroke-width", String(u ? p : 0)),
				o.setAttribute("fill", "none"));
		}
	}
	function $t(t, e, r, i, o, n, c) {
		const s = t.querySelector("#context-image"),
			l = t.querySelector("#context-circle");
		if (s && l) {
			const a = t.querySelector("#context-bg-circle");
			a && (a.setAttribute("cx", `${r.cx}`), a.setAttribute("cy", `${r.cy}`), a.setAttribute("r", `${r.r}`), a.setAttribute("fill", i?.bgColor)),
				s.setAttribute("href", i?.pic || ""),
				s.setAttribute("x", String(r.cx - r.r)),
				s.setAttribute("y", String(r.cy - r.r)),
				s.setAttribute("width", String(2 * r.r)),
				s.setAttribute("height", String(2 * r.r)),
				s.setAttribute("clip-path", `url(#context-circle-${e})`);
			const p = s.firstElementChild;
			p && i?.title && (p.textContent = i.title),
				l.setAttribute("cx", String(r.cx)),
				l.setAttribute("cy", String(r.cy)),
				l.setAttribute("r", String(r.r)),
				l.setAttribute("stroke", o || ""),
				l.setAttribute("stroke-width", String(c ? n : 0)),
				l.setAttribute("fill", "none");
		}
	}
	function Tt(t, e, r, i) {
		const o = r.r / 2;
		return {
			r: o,
			cx: "bottomRight" === t.contextPosition || "topRight" === t.contextPosition ? r.cx + r.r - o / 2 - i / 2 : e.cx - e.r + o / 2 + i / 2,
			cy: "bottomRight" === t.contextPosition || "bottomLeft" === t.contextPosition ? r.cy + r.r - o / 2 - i / 2 : e.cy - e.r + o / 2 + i / 2,
		};
	}
	function vt(t, e, r) {
		const i = { cx: 30, cy: 50, r: 30 },
			o = { cx: 70, cy: 50, r: 30 };
		return (
			t ? (e ? ((i.cx = 36), (i.r = 29), (o.cx = 63), (o.r = 29)) : ((i.cx = 32), (i.r = 25), (o.cx = 68), (o.r = 25))) : e && ((i.cx = 35), (i.r = 35), (o.cx = 65), (o.r = 35)),
			(i.r = i.r - r / 2),
			(o.r = o.r - r / 2),
			[i, o]
		);
	}
	const St = document.createElement("template");
	St.innerHTML =
		'\n<svg\n\txmlns="http://www.w3.org/2000/svg"\n\txmlnsXlink="http://www.w3.org/1999/xlink"\n\tversion="1.1"\n\tviewBox="0 0 100 100">\n\t<defs>\n\t\t<clipPath id="token0-path">\n\t\t\t<rect x="0" y="0"></rect>\n\t\t</clipPath>\n\t\t<clipPath id="token1-path">\n\t\t\t<rect x="50" y="0"></rect>\n\t\t</clipPath>\n\t\t<clipPath id="context-path">\n\t\t\t<circle></circle>\n\t\t</clipPath>\n\n\t\t<filter id="blur0">\n\t\t\t<feGaussianBlur in="SourceGraphic" stdDeviation="7" />\n\t\t</filter>\n\t\t<filter id="blur1">\n\t\t\t<feGaussianBlur in="SourceGraphic" stdDeviation="7" />\n\t\t</filter>\n\n\t\t<pattern id="token0-pattern" patternUnits="objectBoundingBox" width="1" height="1">\n\t\t\t<image href="" x="0" y="0" width="0" height="0" />\n\t\t</pattern>\n\t\t<pattern id="token1-pattern" patternUnits="objectBoundingBox" width="1" height="1">\n\t\t\t<image href="" x="0" y="0" width="0" height="0" />\n\t\t</pattern>\n\t</defs>\n\n\t<circle id="token0-bg-circle"></circle>\n\t<circle fill="none" id="token0-image"><title></title></circle>\n\n\t<circle id="token1-bg-circle"></circle>\n\t<circle fill="none" id="token1-image"><title></title></circle>\n\n\t<circle id="context-bg-circle"></circle>\n\t<image preserveAspectRatio="xMidYMid slice" id="context-image"><title></title></image>\n\t<circle fill="none" id="context-circle"></circle>\n</svg>\n';
	const Et = St;
	function Bt(t, e = "", r = "", i = !1, o = !1, n, c, s) {
		const l = t.querySelector("#token0-path");
		if (l) {
			l.id = `bg-0-${n}`;
			const t = l.firstElementChild;
			t && (t.setAttribute("width", `${c.cx}`), t.setAttribute("height", "" + 2 * c.cy));
		}
		const a = t.querySelector("#token1-path");
		if (a) {
			a.id = `bg-1-${n}`;
			const t = a.firstElementChild;
			t && (t.setAttribute("width", `${c.cx}`), t.setAttribute("height", "" + 2 * c.cy));
		}
		const p = t.querySelector("#context-path");
		if (p) {
			p.id = `context-circle-${n}`;
			const t = p.firstElementChild;
			t && (t.setAttribute("cx", `${s.cx}`), t.setAttribute("cy", `${s.cy}`), t.setAttribute("r", `${s.r}`));
		}
		const u = t.querySelector("#token0-pattern");
		if (u) {
			u.id = `image0-${n}`;
			const t = u.firstElementChild;
			t && (t.setAttribute("href", `${e}`), t.setAttribute("width", "" + 2 * c.r), t.setAttribute("height", "" + 2 * c.r), i && t.setAttribute("filter", `url(#blur0-${n})`));
		}
		const d = t.querySelector("#token1-pattern");
		if (d) {
			d.id = `image1-${n}`;
			const t = d.firstElementChild;
			t && (t.setAttribute("href", `${r}`), t.setAttribute("width", "" + 2 * c.r), t.setAttribute("height", "" + 2 * c.r), o && t.setAttribute("filter", `url(#blur1-${n})`));
		}
	}
	function qt(t, e, r, i, o, n, c, s, l) {
		const a = t.querySelector("#token0-bg-circle");
		a && (a.setAttribute("cx", `${r.cx}`), a.setAttribute("cy", `${r.cy}`), a.setAttribute("r", `${r.r}`), a.setAttribute("clipPath", `url(#bg-0-${e})`), a.setAttribute("fill", n.token0.bgColor));
		const p = t.querySelector("#token0-image");
		if (p) {
			p.setAttribute("cx", `${r.cx}`),
				p.setAttribute("cy", `${r.cy}`),
				p.setAttribute("r", `${r.r}`),
				p.setAttribute("stroke-width", String(l ? s : 0)),
				p.setAttribute("stroke", c),
				p.setAttribute("fill", `url(#image0-${e})`),
				p.setAttribute("clip-path", `url(#bg-0-${e})`);
			const t = p?.firstElementChild;
			t && !i && (t.textContent = n.token0.title || n.token0.address);
		}
		const u = t.querySelector("#token1-bg-circle");
		u &&
			(u.setAttribute("cx", `${r.cx}`), u.setAttribute("cy", `${r.cy}`), u.setAttribute("r", `${r.r}`), u.setAttribute("clip-path", `url(#bg-1-${e})`), u.setAttribute("fill", n.token1.bgColor));
		const d = t.querySelector("#token1-image");
		if (d) {
			d.setAttribute("cx", `${r.cx}`),
				d.setAttribute("cy", `${r.cy}`),
				d.setAttribute("r", `${r.r}`),
				d.setAttribute("stroke-width", String(l ? s : 0)),
				d.setAttribute("stroke", c),
				d.setAttribute("fill", `url(#image1-${e})`),
				d.setAttribute("clip-path", `url(#bg-1-${e})`);
			const t = d?.firstElementChild;
			t && !o && (t.textContent = n.token1.title || n.token1.address);
		}
	}
	function Ut(t, e) {
		return { cx: 50, cy: 50, r: ("none" === t ? 50 : 40) - e / 2 };
	}
	const Mt = (t, e) => {
			const r = e.strokeWidth || 0,
				i = "" + ++Dt.counter,
				o = q(e, t),
				n = e?.lpTokensPosition || e?.poolPairPosition,
				c = document.importNode("merged" === n ? Et.content : ("zero" === e?.topToken ? wt : At).content, !0),
				s = c.querySelector("svg");
			if (s)
				if ((s.setAttribute("width", `${e.size}`), s.setAttribute("height", `${e.size}`), s.setAttribute("data-unique-id", i), s.setAttribute("data-template-type", "lp"), "merged" !== n)) {
					const s = Boolean(t.token0?.app || t.token1?.app),
						l = (t.token0?.pic && t.token0?.pic === t.token1?.pic) || (t.token0?.darkPic && t.token0?.darkPic === t.token1?.darkPic),
						a = Boolean(("true" === e.showPairApps && s) || ("when_identical" === e.showPairApps && l)),
						[p, u] = vt("none" !== o.type || "false" !== e.showPairApps, "intimate" === n, r),
						d = Tt(e, p, u, r),
						h = a
							? Tt(
									{
										...e,
										contextPosition:
											"app" === e.context ? (e?.contextPosition?.startsWith("top") ? "bottomLeft" : "topLeft") : e?.contextPosition?.startsWith("top") ? "topLeft" : "bottomLeft",
									},
									p,
									u,
									r
							  )
							: void 0,
						b = a
							? Tt(
									{
										...e,
										contextPosition:
											"app" === e.context
												? e?.contextPosition?.startsWith("top")
													? "bottomRight"
													: "topRight"
												: e?.contextPosition?.startsWith("top")
												? "topRight"
												: "bottomRight",
									},
									p,
									u,
									r
							  )
							: void 0;
					mt(c, i, p, h, u, b, d), Pt(c, i, p, h, u, b, !1, !1, t, e.strokeColor || "", r, !1), "none" !== o.type && $t(c, i, d, o, e.strokeColor || "", r, !1);
				} else {
					const n = Ut(o.type, r),
						s = bt(e, n, r);
					Bt(c, t.token0.pic, t.token1.pic, !1, !1, i, n, s),
						qt(c, i, n, !1, !1, t, e.strokeColor || "", r, !1),
						"none" !== o.type && ut(c, i, s, o.pic, o.title, o.bgColor, r, e.strokeColor || "", !1);
				}
			return s;
		},
		Rt = (t, e) => {
			if ("token" === e.type) {
				if (u(t)) return Mt(t, e);
				if (d(t)) {
					const r = q(e, t);
					return ft(t.title, t.pic, r.title, r.pic, t.bgColor, r.bgColor, e);
				}
				if (p(t)) return "network" === e.context ? ft(t.title, t.pic, t.network.title, t.network.pic, t.bgColor, t.network?.bgColor || "", e) : ct(t.title, t.pic, t.bgColor, e);
			}
			if ("contract" === e.type) {
				if (b(t)) return Mt(t, e);
				if (h(t))
					return "network" === e.context
						? ft(t.title, t.pic, t.network.title, t.network.pic, t.bgColor, t.network?.bgColor || "", e)
						: "app" === e.context && t?.app
						? ft(t.title, t.pic, t?.app?.title || "", t?.app?.pic || "", t.bgColor, t?.app?.bgColor || "", e)
						: ct(t.title, t.pic, t.bgColor, e);
			}
			if ("profile" === e.type && f(t)) return ct(t.title, t.pic, t.bgColor, e);
			if ("banner" === e.type && g(t)) return J(t);
			if ("node" === e.type && k(t)) return ct(t.title, t.pic, t.bgColor || "", e);
			if ("network" === e.type && y(t)) return ct(t.title, t.pic, t.bgColor || "", e);
			if ("app" === e.type && x(t)) return ct(t.title, t.pic, t.bgColor || "", e);
			throw new Error("svg couldn't be generated.");
		},
		Wt = (t, e, r) => {
			const i = S(r.censor, e?.sensitivity);
			if (t) {
				const r = t.getAttribute("data-unique-id"),
					o = t.querySelector("filter");
				o && i ? (o.id = `blur-${r}`) : o?.remove();
				const n = t.querySelector("#rect-bg");
				n && n.setAttribute("fill", e.bgColor || "none");
				const c = t.querySelector("image");
				c && (c.setAttribute("href", e.banner || ""), i && c.setAttribute("filter", `url(#blur-${r})`));
			}
		},
		zt = (t, e, r, i, o, n, c) => {
			const s = t.getAttribute("data-unique-id"),
				l = n.strokeWidth || 0,
				a = S(n.censor, o);
			if ("base" === t?.getAttribute("data-template-type")) {
				if (t) {
					nt(t, a, s);
					const o = t.querySelector("#bg-color");
					o && o.setAttribute("fill", i || "none");
					const n = t.querySelector("image");
					if (n) {
						if ((n.setAttribute("href", r), !a)) {
							const t = n.firstElementChild;
							t && (t.textContent = e);
						}
						a && n.setAttribute("filter", `url(#blur-${s})`);
					}
					const p = n?.nextElementSibling;
					p && "success" === c && p.setAttribute("stroke-width", String(l));
				}
			} else {
				const o = document.importNode(tt.content, !0).querySelector("svg");
				o && (t.replaceWith(o), et(o, s, l, n.shape), nt(o, a, s), rt(o, i, l, n.shape), it(o, r, s, l, e), ot(o, 0, l, n, !0));
			}
		},
		Ft = (t, e, r, i, o, n, c, s, l, a) => {
			const p = t.getAttribute("data-unique-id"),
				u = l.strokeWidth || 0,
				d = S(l.censor, n);
			if (t && "contextual" === t?.getAttribute("data-template-type")) {
				dt(t, p, d);
				const n = t.querySelector("#contextual-bg-circle");
				n?.setAttribute("fill", c || "none");
				const h = t.querySelector("#contextual-image");
				h && (h.setAttribute("href", r), d && h.setAttribute("filter", `url(#contextual-blur-${p})`));
				const b = t.querySelector("#contextual-circle");
				if (b && ("success" === a && b.setAttribute("stroke-width", `${u}`), !d)) {
					const t = b.firstElementChild;
					t && (t.textContent = e || "");
				}
				const f = t.querySelector("#context-image"),
					g = t.querySelector("#context-circle");
				if (f && g && "none" !== l.context) {
					const e = t.querySelector("#context-bg-circle");
					e?.setAttribute("fill", s || "none"), f.setAttribute("href", o || ""), o && "success" === a && g.setAttribute("stroke-width", `${u}`), g.setAttribute("fill", "none");
					const r = g.firstElementChild;
					r && (r.textContent = i || "");
				}
				return;
			}
			const h = ht(l.context, u),
				b = bt(l, h, u),
				f = document.importNode(lt.content, !0).querySelector("svg");
			t &&
				f &&
				(t.replaceWith(f),
				at(f, p, h, b),
				dt(f, p, d),
				pt(f, p, h, d, r, e, c, u, l.strokeColor || "", !0),
				l.context && "none" !== l.context && ut(f, p, b, o, i, s, u, l.strokeColor || "", !0));
		},
		Nt = (t, e, r, i) => {
			const o = t.getAttribute("data-unique-id"),
				n = ("success" === i && r.strokeWidth) || 0,
				c = S(r.censor, e.token0.sensitivity),
				s = S(r.censor, e.token1.sensitivity),
				l = q(r, e),
				a = r?.lpTokensPosition || r?.poolPairPosition,
				p = document.importNode("merged" === a ? Et.content : ("zero" === r?.topToken ? wt : At).content, !0).querySelector("svg");
			if (!t || !p) return;
			if (
				(t.replaceWith(p),
				(function (t, e, r, i) {
					const o = t.querySelector("#blur0");
					o && r ? (o.id = `blur0-${e}`) : o?.remove();
					const n = t.querySelector("#blur1");
					n && i ? (n.id = `blur1-${e}`) : n?.remove();
				})(p, o, c, s),
				"merged" !== a)
			) {
				const t = Boolean(e.token0?.app || e.token1?.app),
					i = (e.token0?.pic && e.token0?.pic === e.token1?.pic) || (e.token0?.darkPic && e.token0?.darkPic === e.token1?.darkPic),
					u = Boolean(("true" === r.showPairApps && t) || ("when_identical" === r.showPairApps && i)),
					[d, h] = vt("none" !== l.type || u, "intimate" === a, n),
					b = Tt(r, d, h, n),
					f = u
						? Tt(
								{
									...r,
									contextPosition:
										"app" === r.context ? (r?.contextPosition?.startsWith("top") ? "bottomLeft" : "topLeft") : r?.contextPosition?.startsWith("top") ? "topLeft" : "bottomLeft",
								},
								d,
								h,
								n
						  )
						: void 0,
					g = u
						? Tt(
								{
									...r,
									contextPosition:
										"app" === r.context ? (r?.contextPosition?.startsWith("top") ? "bottomRight" : "topRight") : r?.contextPosition?.startsWith("top") ? "topRight" : "bottomRight",
								},
								d,
								h,
								n
						  )
						: void 0;
				return mt(p, o, d, f, h, g, b), Pt(p, o, d, f, h, g, c, s, e, r.strokeColor || "", n, !0), void ("none" !== l.type && $t(p, o, b, l, r.strokeColor || "", n, !0));
			}
			const u = Ut(l.type, n),
				d = bt(r, u, n);
			Bt(p, e.token0.pic, e.token1.pic, c, s, o, u, d), qt(p, o, u, c, s, e, r.strokeColor || "", n, !0), "none" !== l.type && ut(p, o, d, l.pic, l.title, l.bgColor, n, r.strokeColor || "", !0);
		},
		Lt = (t, e, r, i) => {
			if (((t.style.display = "inline"), "token" === r.type)) {
				if (u(e)) return Nt(t, e, r, i);
				if (d(e)) {
					const o = q(r, e);
					return Ft(t, e.title, e.pic, o.title, o.pic, e.sensitivity, e.bgColor, o.bgColor, r, i);
				}
				if (p(e))
					return "network" === r.context
						? Ft(t, e.title, e.pic, e.network.title, e.network.pic, e.sensitivity, e.bgColor, e.network?.bgColor || "", r, i)
						: zt(t, e.title, e.pic, e.bgColor, e.sensitivity, r, i);
			}
			if ("contract" === r.type) {
				if (b(e)) return Nt(t, e, r, i);
				if (h(e))
					return "network" === r.context
						? Ft(t, e.title, e.pic, e.network.title, e.network.pic, e.sensitivity, e.bgColor, e.network?.bgColor || "", r, i)
						: "app" === r.context && e?.app
						? Ft(t, e.title, e.pic, e.app?.title || "", e.app?.pic || "", e.sensitivity, e.bgColor, e.app?.bgColor || "", r, i)
						: zt(t, e.title, e.pic, e.bgColor, e.sensitivity, r, i);
			}
			if ("profile" === r.type && f(e)) return zt(t, e.title, e.pic, e.bgColor, e.sensitivity, r, i);
			if ("banner" === r.type && g(e)) return Wt(t, e, r);
			if ("node" === r.type && k(e)) return zt(t, e.title, e.pic, e.bgColor || "", "safe", r, i);
			if ("network" === r.type && y(e)) return zt(t, e.title, e.pic, e.bgColor || "", "safe", r, i);
			if ("app" === r.type && x(e)) return zt(t, e.title, e.pic, e.bgColor || "", "safe", r, i);
			throw new Error("svg couldn't be generated.");
		};
	let Dt = {
		apiUrl: "https://s1.pics.davincigraph.io/api/v2",
		backupApiUrl: "https://s2.pics.davincigraph.io/api/v2",
		counter: 0,
		colorRegex: /#(?:[0-9A-Fa-f]{3}){1,2}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|transparent/,
	};
	class Gt extends HTMLElement {
		set type(t) {
			this.setAttribute("type", t);
		}
		get type() {
			const t = this.getAttribute("type");
			if (
				t &&
				(function (t) {
					return null !== t && r.includes(t);
				})(t)
			)
				return t;
			throw new Error("Type is mandatory.");
		}
		set network(t) {
			this.setAttribute("network", t);
		}
		get network() {
			const t = this.getAttribute("network");
			if ("app" !== this.type && !t) throw new Error("Network is not defined on the element.");
			return t || "";
		}
		set address(t) {
			this.setAttribute("address", t);
		}
		get address() {
			const t = this.getAttribute("address");
			if ("app" !== this.type && "network" !== this.type && !t) throw new Error("Network is not defined on the element.");
			return t || "";
		}
		set name(t) {
			this.setAttribute("name", t);
		}
		get name() {
			const t = this.getAttribute("name");
			if ("app" === this.type && t) return t;
			throw new Error("Name is necessary for an app.");
		}
		set offlineMode(t) {
			t ? this.setAttribute("offline-mode", "") : this.removeAttribute("offline-mode");
		}
		get offlineMode() {
			return this.hasAttribute("offline-mode");
		}
		set noCache(t) {
			t ? this.setAttribute("no-cache", "") : this.removeAttribute("no-cache");
		}
		get noCahce() {
			return this.hasAttribute("no-cache");
		}
		set theme(t) {
			this.setAttribute("theme", "dark" === t || "light" === t ? t : "light");
		}
		get theme() {
			const t = this.getAttribute("theme");
			return "dark" === t || "light" === t ? t : "light";
		}
		set complexTokenType(t) {
			if ("token" !== this.type && "contract" !== this.type) throw new Error("Complex token type is specifically for token and contract types.");
			if ("lp" !== t && "wrapped" !== t) throw new Error("The value given for complex token type is invalid.");
			this.setAttribute("complex-token-type", t);
		}
		get complexTokenType() {
			const t = this.getAttribute("complex-token-type");
			if ("lp" === t || "wrapped" === t) return t;
		}
		set lpTokensPosition(t) {
			if ("token" !== this.type) throw new Error("Lp Tokens Position is specifically for token type.");
			(t && n.includes(t)) || (t = "intersected"), this.setAttribute("lp-tokens-position", t);
		}
		get lpTokensPosition() {
			const t = this.getAttribute("lp-tokens-position");
			return t && n.includes(t) ? t : "intersected";
		}
		set poolPairPosition(t) {
			if ("contract" !== this.type) throw new Error("Pool Contract Position is specifically for contract type.");
			(t && n.includes(t)) || (t = "intersected"), this.setAttribute("pool-pair-position", t);
		}
		get poolPairPosition() {
			const t = this.getAttribute("pool-pair-position");
			return t && n.includes(t) ? t : "intersected";
		}
		set showPairApps(t) {
			if ("contract" !== this.type && "token" !== this.type) throw new Error("show pair apps flag is specifically for contract and token types.");
			s.includes(t) || (t = "when_identical"), this.setAttribute("show-pair-apps", String(t));
		}
		get showPairApps() {
			const t = this.getAttribute("show-pair-apps");
			return t && s.includes(t) ? t : "when_identical";
		}
		set showAppForType(t) {
			if ("token" !== this.type) throw new Error("Pool Contract Position is specifically for token types.");
			l.includes(t) || (t = "all"), this.setAttribute("show-app-for-type", String(t));
		}
		get showAppForType() {
			const t = this.getAttribute("show-app-for-type");
			return t && l.includes(t) ? t : "all";
		}
		set topToken(t) {
			if ("contract" !== this.type && "token" !== this.type) throw new Error("Top Token is specifically for contract and token types.");
			a.includes(t) || (t = "one"), this.setAttribute("top-token", t);
		}
		get topToken() {
			const t = this.getAttribute("top-token");
			return t && a.includes(t) ? t : "one";
		}
		set isPool(t) {
			t ? this.setAttribute("is-pool", "") : this.removeAttribute("is-pool");
		}
		get isPool() {
			return this.hasAttribute("is-pool");
		}
		set size(t) {
			this.setAttribute("size", t.toString());
		}
		get size() {
			const t = this.getAttribute("size");
			return t ? parseFloat(t) : 100;
		}
		set shape(t) {
			this.setAttribute("shape", t);
		}
		get shape() {
			const t = this.getAttribute("shape");
			return (function (t) {
				return null !== t && c.includes(t);
			})(t)
				? t
				: "circle";
		}
		set context(t) {
			this.setAttribute("context", t);
		}
		get context() {
			const t = this.getAttribute("context");
			return (function (t) {
				return null !== t && i.includes(t);
			})(t)
				? t
				: "none";
		}
		set contextPosition(t) {
			this.setAttribute("context-position", t);
		}
		get contextPosition() {
			const t = this.getAttribute("context-position");
			return (function (t) {
				return null !== t && o.includes(t);
			})(t)
				? t
				: "bottomRight";
		}
		set strokeWidth(t) {
			this.setAttribute("stroke-width", t.toString());
		}
		get strokeWidth() {
			const t = this.getAttribute("stroke-width");
			return t && !isNaN(Number(t)) ? parseFloat(t) : 0;
		}
		set strokeColor(t) {
			this.setAttribute("stroke-color", t);
		}
		get strokeColor() {
			return this.getAttribute("stroke-color") || "gray";
		}
		set censor(t) {
			t || this.removeAttribute("censor"), this.setAttribute("censor", "string" == typeof t ? t : t?.length ? JSON.stringify(t) : "");
		}
		get censor() {
			const t = this.getAttribute("censor");
			if (!t) return ["copyright-violated"];
			try {
				return JSON.parse(t);
			} catch {
				return t;
			}
		}
		set dataTitle(t) {
			this.setAttribute("data-type", t);
		}
		get dataTitle() {
			return this.getAttribute("data-title") || "";
		}
		set dataPicUrl(t) {
			this.setAttribute("data-pic-url", t);
		}
		get dataPicUrl() {
			return this.getAttribute("data-pic-url") || "";
		}
		set dataBgColor(t) {
			this.setAttribute("data-bg-color", t);
		}
		get dataBgColor() {
			return this.getAttribute("data-bg-color") || "";
		}
		set dataContextTitle(t) {
			this.setAttribute("data-context-title", t);
		}
		get dataContextTitle() {
			return this.getAttribute("data-context-title") || "";
		}
		set dataContextPicUrl(t) {
			this.setAttribute("data-context-pic-url", t);
		}
		get dataContextPicUrl() {
			return this.getAttribute("data-context-pic-url") || "";
		}
		set dataContextBgColor(t) {
			this.setAttribute("data-context-bg-color", t);
		}
		get dataContextBgColor() {
			return this.getAttribute("data-context-bg-color") || "";
		}
		set placeholder(t) {
			this.setAttribute("placeholder", t);
		}
		get placeholder() {
			return this.getAttribute("placeholder") || "default";
		}
		set loadingEffect(t) {
			this.setAttribute("loading-effect", t);
		}
		get loadingEffect() {
			return this.getAttribute("loading-effect") || "transparent";
		}
		set FailureEffect(t) {
			this.setAttribute("failure-effect", t);
		}
		get FailureEffect() {
			return this.getAttribute("failure-effect") || "placeholder";
		}
		set delayResponseTime(t) {
			this.setAttribute("delay-response-time", t.toString());
		}
		get delayResponseTime() {
			const t = this.getAttribute("delay-response-time");
			return t && !isNaN(Number(t)) ? parseFloat(t) : 0;
		}
		observer;
		interval;
		constructor() {
			super(), (this.observer = new IntersectionObserver(this.handleIntersection.bind(this), { root: null, rootMargin: "200px 0px", threshold: 0 }));
		}
		connectedCallback() {
			(this.style.display = "inline-block"), (this.style.verticalAlign = "top"), (this.style.transition = "opacity 1s"), (this.style.opacity = "1"), this.observer.observe(this);
		}
		disconnectedCallback() {
			this.observer.unobserve(this), this.clearInterval();
		}
		async handleIntersection(t, r) {
			for (const o of t)
				if (o.isIntersecting) {
					r.unobserve(o.target);
					try {
						const t = I(this),
							r = X((!t.loadingEffect || t.loadingEffect.endsWith("placeholder") ? t.placeholder : t.loadingEffect) || "transparent", t.type),
							o = _(t, r);
						let n = Rt(o, t);
						n &&
							((n.style.display = "hide" === t.loadingEffect ? "none" : "inline"),
							this.appendChild(n),
							"banner" === t.type ? (this.style.width = "100%") : ((this.style.width = `${this.size}px`), (this.style.height = `${this.size}px`)),
							(t.loadingEffect?.startsWith("pulse") || t.loadingEffect?.startsWith("'pulse")) &&
								(this.interval = setInterval(() => {
									this.style.opacity = "1" === this.style.opacity ? "0.5" : "1";
								}, 1e3))),
							await this.delay();
						const c = !0 === t.offlineMode ? "" : await e(t),
							s = H(o, c, t, r);
						this.clearInterval();
						const l = ((i = c) && 0 !== Object.keys(i).length) || t.dataPicUrl ? "success" : "failed";
						"failed" === l && "hide" === t.FailureEffect ? this.remove() : Lt(n, s, t, l);
					} catch (t) {
						console.error(`DavinciPics: ${t.message}`);
					}
				}
			var i;
		}
		delay = () =>
			new Promise((t) => {
				setTimeout(() => {
					t(!0);
				}, this.delayResponseTime);
			});
		clearInterval = () => {
			clearInterval(this.interval), (this.style.opacity = "1");
		};
	}
	customElements.define("davinci-pic", Gt);
})();
