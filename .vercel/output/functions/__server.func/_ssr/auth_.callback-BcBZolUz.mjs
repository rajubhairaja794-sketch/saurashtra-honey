import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CWNNtKRC.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as consumeOAuthIntent, r as oauthDebug, t as clearOAuthIntent } from "./oauth-flow-LuAV4L88.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth_.callback-BcBZolUz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthCallback() {
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const intentId = new URL(window.location.href).searchParams.get("oauth_intent");
		const intent = consumeOAuthIntent(intentId);
		oauthDebug("callback_loaded", {
			hasIntent: Boolean(intentId),
			intentValid: intent.ok,
			reason: intent.ok ? "ok" : intent.reason
		});
		if (!intent.ok) {
			oauthDebug("callback_rejected", { reason: intent.reason });
			navigate({
				to: "/auth",
				replace: true
			});
			return () => {
				cancelled = true;
			};
		}
		const go = () => {
			if (cancelled) return;
			const target = intent.target;
			clearOAuthIntent(intentId);
			oauthDebug("callback_session_ready", { target });
			navigate({
				to: target,
				replace: true
			});
		};
		supabase.auth.getSession().then(({ data }) => {
			oauthDebug("callback_get_session", { hasSession: Boolean(data.session) });
			if (data.session) go();
		}).catch((error) => {
			oauthDebug("callback_get_session_error", { message: error instanceof Error ? error.message : "unknown" });
		});
		const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
			oauthDebug("callback_auth_state", {
				event,
				hasSession: Boolean(s)
			});
			if (s) go();
		});
		const t = setTimeout(() => {
			if (cancelled) return;
			clearOAuthIntent(intentId);
			oauthDebug("callback_timeout", { target: intent.target });
			navigate({
				to: "/auth",
				replace: true
			});
		}, 5e3);
		return () => {
			cancelled = true;
			clearTimeout(t);
			sub.subscription.unsubscribe();
		};
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-[60vh] flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Signing you in…"
		})
	});
}
//#endregion
export { AuthCallback as component };
