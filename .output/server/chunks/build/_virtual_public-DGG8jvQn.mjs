import { d as appDiagnostics } from '../virtual/entry.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';

// node_modules/nuxt/dist/app/compat/interval.js
var setInterval = (() => {
	appDiagnostics.NUXT_E1004();
});
// \0virtual:public?%2Fdana-logo.svg
var _virtual_public__2Fdana_logo_default = publicAssetsURL("/dana-logo.svg");

export { _virtual_public__2Fdana_logo_default as _, setInterval as s };
//# sourceMappingURL=_virtual_public-DGG8jvQn.mjs.map
