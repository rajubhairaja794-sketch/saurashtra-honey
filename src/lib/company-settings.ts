import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Public, unauthenticated reader for the `site_settings` row where key = "company".
 * This is the same row the Admin Settings "Company" panel writes to
 * (src/routes/admin.settings.tsx -> src/lib/admin-cms.functions.ts).
 *
 * The `site_settings` table grants SELECT to `anon` (see migration
 * 20260724042913_..._) so no authentication is required to read it.
 */
export type CompanySettings = {
  name?: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
};

let cache: CompanySettings | null = null;
let inflight: Promise<CompanySettings | null> | null = null;

async function fetchCompanySettings(): Promise<CompanySettings | null> {
  if (cache) return cache;
  if (!inflight) {
    inflight = Promise.resolve(
      supabase
        .from("site_settings")
        .select("value")
        .eq("key", "company")
        .maybeSingle(),
    )
      .then(({ data, error }) => {
        if (error || !data?.value) return null;
        cache = data.value as CompanySettings;
        return cache;
      })
      .catch(() => null)
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

/**
 * Returns the dynamic company settings once loaded (undefined until then).
 * Consumers should fall back to their own bundled defaults while this is
 * undefined/empty, so there is no layout shift while the fetch is in flight.
 */
export function useCompanySettings(): CompanySettings | undefined {
  const [settings, setSettings] = useState<CompanySettings | undefined>(cache ?? undefined);

  useEffect(() => {
    let cancelled = false;
    void fetchCompanySettings().then((c) => {
      if (!cancelled && c) setSettings(c);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return settings;
}

/** Convenience hook for just the logo URL (empty/missing -> undefined). */
export function useCompanyLogoUrl(): string | undefined {
  const settings = useCompanySettings();
  const url = settings?.logo_url?.trim();
  return url ? url : undefined;
}
