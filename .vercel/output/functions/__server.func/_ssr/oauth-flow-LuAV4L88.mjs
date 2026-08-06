//#region node_modules/.nitro/vite/services/ssr/assets/oauth-flow-LuAV4L88.js
var INTENT_TTL_MS = 600 * 1e3;
var INTENT_PREFIX = "oauth_intent:";
var LATEST_INTENT_KEY = "oauth_intent_latest";
function storage() {
	if (typeof window === "undefined") return null;
	try {
		return window.sessionStorage;
	} catch {
		return null;
	}
}
function safeRedirectPath(path) {
	if (!path) return "/account";
	if (!path.startsWith("/") || path.startsWith("//")) return "/account";
	try {
		const parsed = new URL(path, "https://saurashtra-honey.local");
		if (parsed.origin !== "https://saurashtra-honey.local") return "/account";
		return `${parsed.pathname}${parsed.search}${parsed.hash}`;
	} catch {
		return "/account";
	}
}
function consumeOAuthIntent(intentId) {
	if (!intentId) return {
		ok: false,
		reason: "missing"
	};
	const s = storage();
	if (!s) return {
		ok: false,
		reason: "not_found"
	};
	if (s.getItem(LATEST_INTENT_KEY) !== intentId) return {
		ok: false,
		reason: "mismatch"
	};
	const raw = s.getItem(`${INTENT_PREFIX}${intentId}`);
	if (!raw) return {
		ok: false,
		reason: "not_found"
	};
	try {
		const intent = JSON.parse(raw);
		if (intent.id !== intentId || typeof intent.target !== "string" || typeof intent.createdAt !== "number") return {
			ok: false,
			reason: "invalid"
		};
		if (Date.now() - intent.createdAt > INTENT_TTL_MS) return {
			ok: false,
			reason: "expired"
		};
		return {
			ok: true,
			target: safeRedirectPath(intent.target)
		};
	} catch {
		return {
			ok: false,
			reason: "invalid"
		};
	}
}
function clearOAuthIntent(intentId) {
	const s = storage();
	if (!s || !intentId) return;
	s.removeItem(`${INTENT_PREFIX}${intentId}`);
	if (s.getItem(LATEST_INTENT_KEY) === intentId) s.removeItem(LATEST_INTENT_KEY);
}
function currentSafeUrlParts() {
	if (typeof window === "undefined") return {};
	const url = new URL(window.location.href);
	return {
		origin: url.origin,
		pathname: url.pathname,
		searchKeys: Array.from(url.searchParams.keys()).sort().join(",") || "none",
		hashKeys: url.hash ? Array.from(new URLSearchParams(url.hash.slice(1)).keys()).sort().join(",") || "present" : "none"
	};
}
function oauthDebug(event, details = {}) {
	if (typeof window === "undefined") return;
	const safeDetails = Object.fromEntries(Object.entries(details).map(([key, value]) => [key, typeof value === "string" && value.length > 160 ? `${value.slice(0, 160)}…` : value]));
	console.info("[oauth-flow]", event, {
		...currentSafeUrlParts(),
		...safeDetails
	});
}
//#endregion
export { safeRedirectPath as i, consumeOAuthIntent as n, oauthDebug as r, clearOAuthIntent as t };
