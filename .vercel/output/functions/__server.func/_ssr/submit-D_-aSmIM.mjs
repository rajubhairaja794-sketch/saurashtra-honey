import { t as supabase } from "./client-CWNNtKRC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/submit-D_-aSmIM.js
async function submitForm(p) {
	const row = {
		...p,
		meta: p.meta ?? {}
	};
	const { error } = await supabase.from("form_submissions").insert(row);
	if (error) throw error;
	fetch("/api/public/submissions", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(p),
		keepalive: true
	}).catch(() => {});
	return { ok: true };
}
//#endregion
export { submitForm as t };
