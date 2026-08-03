import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { clearOAuthIntent, consumeOAuthIntent, oauthDebug } from "@/lib/oauth-flow";

export const Route = createFileRoute("/auth_/callback")({
  head: () => ({
    meta: [
      { title: "Signing you in… | Saurashtra Honey" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    const url = new URL(window.location.href);
    const intentId = url.searchParams.get("oauth_intent");
    const intent = consumeOAuthIntent(intentId);
    oauthDebug("callback_loaded", {
      hasIntent: Boolean(intentId),
      intentValid: intent.ok,
      reason: intent.ok ? "ok" : intent.reason,
    });

    if (!intent.ok) {
      oauthDebug("callback_rejected", { reason: intent.reason });
      navigate({ to: "/auth" as never, replace: true });
      return () => { cancelled = true; };
    }

    const go = () => {
      if (cancelled) return;
      const target = intent.target;
      clearOAuthIntent(intentId);
      oauthDebug("callback_session_ready", { target });
      navigate({ to: target as never, replace: true });
    };

    supabase.auth.getSession().then(({ data }) => {
      oauthDebug("callback_get_session", { hasSession: Boolean(data.session) });
      if (data.session) go();
    }).catch((error) => {
      oauthDebug("callback_get_session_error", { message: error instanceof Error ? error.message : "unknown" });
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      oauthDebug("callback_auth_state", { event, hasSession: Boolean(s) });
      if (s) go();
    });

    const t = setTimeout(() => {
      if (cancelled) return;
      clearOAuthIntent(intentId);
      oauthDebug("callback_timeout", { target: intent.target });
      navigate({ to: "/auth" as never, replace: true });
    }, 5000);

    return () => {
      cancelled = true;
      clearTimeout(t);
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <p className="text-sm text-muted-foreground">Signing you in…</p>
    </div>
  );
}
