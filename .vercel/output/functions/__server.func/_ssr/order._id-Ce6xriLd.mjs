import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order._id-Ce6xriLd.js
var $$splitComponentImporter = () => import("./order._id-BJ2vxE92.mjs");
var Route = createFileRoute("/order/$id")({
	head: () => ({ meta: [
		{ title: "Order Details | Saurashtra Honey" },
		{
			name: "description",
			content: "View and download the invoice for your Saurashtra Honey order."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
