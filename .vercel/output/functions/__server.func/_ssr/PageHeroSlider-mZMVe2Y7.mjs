import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as HeroSlider } from "./HeroSlider-BxyT0XGM.mjs";
import { n as getDefaultHeroSlides, t as fetchHeroSlides } from "./hero-catalog-WFU6Elpd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PageHeroSlider-mZMVe2Y7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageHeroSlider({ page, interval = 6e3 }) {
	const [slides, setSlides] = (0, import_react.useState)(() => getDefaultHeroSlides(page));
	(0, import_react.useEffect)(() => {
		fetchHeroSlides(page).then((res) => {
			if (res && res.length > 0) setSlides(res);
		});
	}, [page]);
	const isHome = page.toLowerCase() === "home";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSlider, {
		slides,
		interval,
		size: isHome ? "home" : "inner",
		variant: isHome ? "home" : "inner"
	});
}
//#endregion
export { PageHeroSlider as t };
