import { u as useWisataApi, c as useAsyncData } from '../virtual/entry.mjs';
import { _ as _virtual_public__2Fdana_logo_default, s as setInterval } from './_virtual_public-DGG8jvQn.mjs';
import { u as useLanguage } from './useLanguage-CoSwGzMA.mjs';
import { u as useTheme, s as ssrRenderList$2, S as SearchableSelect_default } from './useTheme-jR-NkPQp.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-DjkACiAr.mjs';
import { defineComponent, ref, withAsyncContext, mergeProps, unref, computed, watch, useSSRContext } from 'vue';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from 'vue/server-renderer';
import 'nostics';
import 'nostics/formatters/ansi';
import '../_/nitro.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-router';
import 'unhead/utils';
import 'axios';
import 'vue-bundle-renderer/runtime';
import 'devalue';

// \0virtual:public?%2Flogo-trip.png
var _virtual_public__2Flogo_trip_default = publicAssetsURL("/logo-trip.png");
// app/components/Navbar.vue?vue&type=script&setup=true&lang.ts
var Navbar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Navbar",
	__ssrInlineRender: true,
	props: {
		companyName: {},
		logoUrl: {},
		company: {}
	},
	emits: ["open-check-booking"],
	setup(__props) {
		const props = __props;
		const { locale, t } = useLanguage();
		const { isDark} = useTheme();
		const { getImageUrl} = useWisataApi();
		const company = ref(null);
		const isScrolled = ref(false);
		const mobileOpen = ref(false);
		const activeCompany = computed(() => {
			return props.company || company.value || {};
		});
		const displayBrandName = computed(() => {
			return activeCompany.value?.brandName || props.companyName || t("nav.brand");
		});
		const displayTagline = computed(() => {
			return activeCompany.value?.tagline || t("nav.subtitle");
		});
		const logoError = ref(false);
		const darkLogoFailed = ref(false);
		watch(() => [
			props.logoUrl,
			activeCompany.value?.logoUrl,
			activeCompany.value?.logoDarkUrl
		], () => {
			logoError.value = false;
			darkLogoFailed.value = false;
		});
		const logoSrc = computed(() => {
			const c = activeCompany.value;
			const fallbackProp = props.logoUrl;
			if (isDark.value && c?.logoDarkUrl && c.logoDarkUrl !== "/logo-wisata-white.svg" && !darkLogoFailed.value) return getImageUrl(c.logoDarkUrl);
			const main = c?.logoUrl || fallbackProp;
			if (main && !logoError.value) return getImageUrl(main);
			return "";
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<header${ssrRenderAttrs(mergeProps({ class: ["sticky top-0 z-40 transition-all duration-200 border-b", [isScrolled.value ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-slate-200 dark:border-slate-800" : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-transparent"]] }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-20"><a href="#hero" class="flex items-center gap-3 group">`);
			if (logoSrc.value) _push(`<div class="h-11 max-w-[160px] flex items-center justify-center shrink-0"><img${ssrRenderAttr("src", logoSrc.value)}${ssrRenderAttr("alt", displayBrandName.value)} class="max-h-11 max-w-full object-contain rounded-xl shadow-sm"></div>`);
			else _push(`<div class="h-11 max-w-[160px] flex items-center justify-center shrink-0"><img${ssrRenderAttr("src", _virtual_public__2Flogo_trip_default)}${ssrRenderAttr("alt", displayBrandName.value)} class="max-h-11 max-w-full object-contain rounded-xl shadow-sm"></div>`);
			_push(`<div><span class="text-xl font-extrabold tracking-tight bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 dark:from-teal-400 dark:via-cyan-300 dark:to-blue-400 bg-clip-text text-transparent">${ssrInterpolate(displayBrandName.value)}</span><span class="block text-xs font-semibold text-slate-500 dark:text-slate-400 -mt-1 tracking-wider uppercase">${ssrInterpolate(displayTagline.value)}</span></div></a><nav class="hidden md:flex items-center gap-1 lg:gap-2"><a href="#hero" class="px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">${ssrInterpolate(unref(t)("nav.home"))}</a><a href="#tours" class="px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">${ssrInterpolate(unref(t)("nav.tours"))}</a><a href="#categories" class="px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">${ssrInterpolate(unref(t)("nav.categories"))}</a><a href="#promos" class="px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">${ssrInterpolate(unref(t)("nav.promo"))}</a><a href="#testimonials" class="px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">${ssrInterpolate(unref(t)("nav.testimonials"))}</a></nav><div class="hidden md:flex items-center gap-3"><div class="relative"><button type="button" class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-teal-500 transition-all shadow-sm"${ssrRenderAttr("title", unref(locale) === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia")}><span class="text-base">${ssrInterpolate(unref(locale) === "id" ? "🇮🇩" : "🇬🇧")}</span><span class="tracking-wide">${ssrInterpolate(unref(locale) === "id" ? "ID" : "EN")}</span><svg class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg></button></div><button type="button" class="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all"${ssrRenderAttr("title", unref(isDark) ? unref(t)("nav.light") : unref(t)("nav.dark"))}>`);
			if (unref(isDark)) _push(`<svg class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`);
			else _push(`<svg class="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`);
			_push(`</button><button type="button" class="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900 transition-all shadow-sm"><span>📋</span><span>${ssrInterpolate(unref(locale) === "id" ? "Riwayat Transaksi" : "My Bookings")}</span></button><a href="#tours" class="px-5 py-2 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 shadow-md shadow-teal-500/25 hover:shadow-lg hover:shadow-teal-500/35 transition-all">${ssrInterpolate(unref(t)("nav.bookNow"))}</a></div><div class="flex items-center gap-2 md:hidden"><button type="button" class="p-2 rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800">`);
			if (unref(isDark)) _push(`<svg class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`);
			else _push(`<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`);
			_push(`</button><button type="button" class="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">`);
			if (!mobileOpen.value) _push(`<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`);
			else _push(`<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`);
			_push(`</button></div></div></div><div class="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 space-y-3" style="${ssrRenderStyle(mobileOpen.value ? null : { display: "none" })}"><div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800"><span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">${ssrInterpolate(unref(t)("nav.language"))}</span><button type="button" class="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"><span>${ssrInterpolate(unref(locale) === "id" ? "🇮🇩 Bahasa Indonesia" : "🇬🇧 English")}</span></button></div><nav class="flex flex-col space-y-2"><a href="#hero" class="px-3 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">${ssrInterpolate(unref(t)("nav.home"))}</a><a href="#tours" class="px-3 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">${ssrInterpolate(unref(t)("nav.tours"))}</a><a href="#categories" class="px-3 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">${ssrInterpolate(unref(t)("nav.categories"))}</a><a href="#promos" class="px-3 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">${ssrInterpolate(unref(t)("nav.promo"))}</a><a href="#testimonials" class="px-3 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">${ssrInterpolate(unref(t)("nav.testimonials"))}</a></nav><div class="pt-2 flex flex-col gap-2"><button type="button" class="w-full py-2.5 px-4 text-center font-bold text-xs sm:text-sm rounded-xl text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 flex items-center justify-center gap-2"><span>📋</span><span>${ssrInterpolate(unref(locale) === "id" ? "Riwayat Transaksi & Cek Tiket" : "My Bookings & Tickets")}</span></button><a href="#tours" class="w-full py-2.5 px-4 text-center font-bold text-white rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500">${ssrInterpolate(unref(t)("nav.bookNow"))}</a></div></div></header>`);
		};
	}
});
// app/components/Navbar.vue
var _sfc_setup$10 = Navbar_vue_vue_type_script_setup_true_lang_default.setup;
Navbar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navbar.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var Navbar_default = Object.assign(Navbar_vue_vue_type_script_setup_true_lang_default, { __name: "Navbar" });
// app/components/HeroSection.vue?vue&type=script&setup=true&lang.ts
var HeroSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HeroSection",
	__ssrInlineRender: true,
	props: { company: {} },
	emits: ["search"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const { t } = useLanguage();
		const { getImageUrl } = useWisataApi();
		const searchQuery = ref("");
		const selectedCategory = ref("");
		const selectedDestination = ref("");
		const categories = ref([]);
		const destinations = ref([]);
		const toursPool = ref([]);
		const promosPool = ref([]);
		const featuredTour = computed(() => {
			const list = toursPool.value;
			if (!list.length) return null;
			const pickedId = props.company?.heroFeaturedTourId;
			if (pickedId) {
				const found = list.find((t) => t.id === pickedId);
				if (found) return found;
			}
			return list.find((t) => t.isBestSeller) || list[0];
		});
		const featuredPromo = computed(() => {
			const pickedId = props.company?.heroFeaturedPromoId;
			if (!pickedId) return null;
			return promosPool.value.find((p) => p.id === pickedId) || null;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "hero",
				class: "relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24"
			}, _attrs))}><div class="absolute inset-0 -z-10 pointer-events-none"><div class="absolute -top-40 right-0 w-[500px] h-[500px] bg-teal-400/20 dark:bg-teal-500/10 rounded-full blur-3xl"></div><div class="absolute top-60 -left-20 w-[450px] h-[450px] bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl"></div><div class="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-blue-400/15 dark:bg-blue-500/10 rounded-full blur-2xl"></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"><div class="lg:col-span-7 space-y-6 text-center lg:text-left"><div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm animate-pulse"><span>${ssrInterpolate(__props.company?.heroBadge || unref(t)("hero.badge"))}</span></div><h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">`);
			if (__props.company?.heroTitle) _push(`<span class="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 dark:from-teal-400 dark:via-cyan-300 dark:to-blue-400 bg-clip-text text-transparent">${ssrInterpolate(__props.company.heroTitle)}</span>`);
			else _push(`<!--[-->${ssrInterpolate(unref(t)("hero.title1"))} <br class="hidden sm:inline"><span class="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 dark:from-teal-400 dark:via-cyan-300 dark:to-blue-400 bg-clip-text text-transparent">${ssrInterpolate(unref(t)("hero.titleHighlight"))}</span> <br><span class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-700 dark:text-slate-300">${ssrInterpolate(unref(t)("hero.title2"))}</span><!--]-->`);
			_push(`</h1><p class="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">${ssrInterpolate(__props.company?.heroSubtitle || unref(t)("hero.subtitle"))}</p><div class="bg-white dark:bg-slate-900 rounded-3xl p-3 sm:p-3.5 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-800"><div class="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center"><div class="md:col-span-4 relative"><div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div><input${ssrRenderAttr("value", searchQuery.value)} type="text"${ssrRenderAttr("placeholder", unref(t)("hero.searchPlaceholder"))} class="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"></div><div class="md:col-span-3"><select class="w-full px-3 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all cursor-pointer font-medium"><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "") : ssrLooseEqual(selectedCategory.value, "")) ? " selected" : ""}>🏷️ ${ssrInterpolate(unref(t)("hero.allCategories"))}</option><!--[-->`);
			ssrRenderList$2(categories.value, (cat) => {
				_push(`<option${ssrRenderAttr("value", cat.id)}${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, cat.id) : ssrLooseEqual(selectedCategory.value, cat.id)) ? " selected" : ""}>${ssrInterpolate(cat.name)}</option>`);
			});
			_push(`<!--]--></select></div><div class="md:col-span-3"><select class="w-full px-3 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all cursor-pointer font-medium"><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedDestination.value) ? ssrLooseContain(selectedDestination.value, "") : ssrLooseEqual(selectedDestination.value, "")) ? " selected" : ""}>📍 ${ssrInterpolate(unref(t)("hero.allDestinations"))}</option><!--[-->`);
			ssrRenderList$2(destinations.value, (dest) => {
				_push(`<option${ssrRenderAttr("value", dest.id)}${ssrIncludeBooleanAttr(Array.isArray(selectedDestination.value) ? ssrLooseContain(selectedDestination.value, dest.id) : ssrLooseEqual(selectedDestination.value, dest.id)) ? " selected" : ""}>${ssrInterpolate(dest.name)}</option>`);
			});
			_push(`<!--]--></select></div><div class="md:col-span-2"><button type="button" class="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-500/25 hover:shadow-teal-500/40 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"><svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg><span>${ssrInterpolate(unref(t)("hero.searchButton") || "Cari Wisata")}</span></button></div></div></div><div class="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"><div class="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800"><div class="text-2xl font-black text-teal-600 dark:text-teal-400">${ssrInterpolate(__props.company?.heroStatsCount1 || "15k+")}</div><div class="text-xs font-medium text-slate-500 dark:text-slate-400">${ssrInterpolate(__props.company?.heroStatsLabel1 || unref(t)("hero.statGuests"))}</div></div><div class="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800"><div class="text-2xl font-black text-amber-500">${ssrInterpolate(__props.company?.heroStatsCount3 ? __props.company.heroStatsCount3 + " ★" : "4.9 ★")}</div><div class="text-xs font-medium text-slate-500 dark:text-slate-400">${ssrInterpolate(__props.company?.heroStatsLabel3 || unref(t)("hero.statRating"))}</div></div><div class="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800"><div class="text-2xl font-black text-blue-600 dark:text-blue-400">${ssrInterpolate(__props.company?.heroStatsCount2 || "99%")}</div><div class="text-xs font-medium text-slate-500 dark:text-slate-400">${ssrInterpolate(__props.company?.heroStatsLabel2 || unref(t)("hero.statGuides"))}</div></div><div class="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800"><div class="text-2xl font-black text-emerald-600 dark:text-emerald-400">${ssrInterpolate(__props.company?.heroStatsCount4 || "24/7")}</div><div class="text-xs font-medium text-slate-500 dark:text-slate-400">${ssrInterpolate(__props.company?.heroStatsLabel4 || unref(t)("hero.statInstant"))}</div></div></div></div><div class="lg:col-span-5 relative"><div class="relative mx-auto max-w-md lg:max-w-none"><div class="relative rounded-3xl overflow-hidden shadow-2xl shadow-teal-500/10 border-4 border-white dark:border-slate-800 aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] bg-slate-900">`);
			if (featuredTour.value?.featuredImage) _push(`<img${ssrRenderAttr("src", unref(getImageUrl)(featuredTour.value.featuredImage))}${ssrRenderAttr("alt", featuredTour.value.title || "Paket Wisata Nusa Penida")} class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700">`);
			else _push(`<div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 animate-pulse"><img${ssrRenderAttr("src", _virtual_public__2Flogo_trip_default)} alt="Loading" class="w-16 h-16 rounded-2xl object-contain opacity-60 mb-3"><span class="text-xs font-semibold text-slate-400">Memuat paket unggulan...</span></div>`);
			_push(`<div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>`);
			if (featuredTour.value) {
				_push(`<div class="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 dark:border-slate-700/50 shadow-lg"><div class="flex items-center justify-between gap-3"><div class="min-w-0"><div class="flex items-center gap-1.5 mb-1"><span class="inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-teal-500 text-white">${ssrInterpolate(__props.company?.heroCardBadge || "Destinasi Terfavorit")}</span></div><h4 class="text-sm font-bold text-slate-900 dark:text-white truncate">${ssrInterpolate(featuredTour.value.title)}</h4><p class="text-xs text-slate-500 dark:text-slate-400 truncate">${ssrInterpolate(featuredTour.value.subtitle || featuredTour.value.destination?.name || "Nusa Penida, Bali")}</p></div><div class="text-right shrink-0">`);
				if (featuredTour.value.isPromo && featuredTour.value.discountPrice && Number(featuredTour.value.discountPrice) < Number(featuredTour.value.price)) _push(`<span class="text-xs line-through text-slate-400 block"> Rp ${ssrInterpolate(Number(featuredTour.value.price).toLocaleString("id-ID"))}</span>`);
				else _push(`<!---->`);
				_push(`<div class="text-base font-black text-teal-600 dark:text-teal-400"> Rp ${ssrInterpolate(Number(featuredTour.value.isPromo && featuredTour.value.discountPrice && Number(featuredTour.value.discountPrice) < Number(featuredTour.value.price) ? featuredTour.value.discountPrice : featuredTour.value.price).toLocaleString("id-ID"))}</div></div></div></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
			if (featuredPromo.value) _push(`<div class="absolute -top-4 -right-4 bg-gradient-to-tr from-amber-500 to-yellow-400 text-white px-4 py-2 rounded-2xl shadow-lg shadow-amber-500/30 flex items-center gap-2 transform rotate-2 hover:rotate-0 transition-transform"><span class="text-lg">🔥</span><span class="text-xs font-black tracking-wide uppercase">${ssrInterpolate(featuredPromo.value.code)} • ${ssrInterpolate(featuredPromo.value.discountType === "PERCENT" ? `${Number(featuredPromo.value.discountValue)}% OFF` : `HEMAT Rp ${Number(featuredPromo.value.discountValue).toLocaleString("id-ID")}`)}</span></div>`);
			else _push(`<!---->`);
			_push(`</div></div></div></div></section>`);
		};
	}
});
// app/components/HeroSection.vue
var _sfc_setup$9 = HeroSection_vue_vue_type_script_setup_true_lang_default.setup;
HeroSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var HeroSection_default = Object.assign(HeroSection_vue_vue_type_script_setup_true_lang_default, { __name: "HeroSection" });
// app/components/CategorySection.vue?vue&type=script&setup=true&lang.ts
var CategorySection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CategorySection",
	__ssrInlineRender: true,
	props: { company: {} },
	emits: ["select-category"],
	setup(__props, { emit: __emit }) {
		const { t } = useLanguage();
		const { getImageUrl } = useWisataApi();
		const categories = ref([]);
		const getCategoryEmoji = (slug) => {
			if (slug.includes("snorkling")) return "🤿";
			if (slug.includes("boat")) return "🚤";
			if (slug.includes("tour")) return "🏝️";
			return "✨";
		};
		return (_ctx, _push, _parent, _attrs) => {
			if (categories.value.length > 0) {
				_push(`<section${ssrRenderAttrs(mergeProps({
					id: "categories",
					class: "py-12 sm:py-16 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/80"
				}, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center max-w-3xl mx-auto mb-10"><h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">${ssrInterpolate(__props.company?.categoriesTitle || unref(t)("categories.title"))}</h2><p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">${ssrInterpolate(__props.company?.categoriesSubtitle || unref(t)("categories.subtitle"))}</p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
				ssrRenderList$2(categories.value, (cat) => {
					_push(`<div class="group relative overflow-hidden rounded-3xl cursor-pointer bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-teal-500/80 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5"><div class="h-48 overflow-hidden relative"><img${ssrRenderAttr("src", unref(getImageUrl)(cat.imageUrl || "/images/category-snorkeling.jpg"))}${ssrRenderAttr("alt", cat.name)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"><div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div><div class="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1.5 shadow"><span>${ssrInterpolate(cat.icon || getCategoryEmoji(cat.slug))}</span><span>${ssrInterpolate(cat.name)}</span></div></div><div class="p-6"><h3 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">${ssrInterpolate(cat.name)}</h3><p class="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">${ssrInterpolate(cat.description)}</p><div class="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/60"><span class="text-xs font-semibold text-teal-600 dark:text-teal-400 group-hover:underline flex items-center gap-1">${ssrInterpolate(unref(t)("categories.allTours"))} <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></span><span class="text-[11px] text-slate-400 font-medium">Wisata Terpopuler</span></div></div></div>`);
				});
				_push(`<!--]--></div></div></section>`);
			} else _push(`<!---->`);
		};
	}
});
// app/components/CategorySection.vue
var _sfc_setup$8 = CategorySection_vue_vue_type_script_setup_true_lang_default.setup;
CategorySection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CategorySection.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var CategorySection_default = Object.assign(CategorySection_vue_vue_type_script_setup_true_lang_default, { __name: "CategorySection" });
// app/components/TourCatalog.vue?vue&type=script&setup=true&lang.ts
var TourCatalog_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TourCatalog",
	__ssrInlineRender: true,
	props: {
		externalSearch: {},
		externalCategory: {},
		externalDestination: {},
		company: {}
	},
	emits: [
		"view-detail",
		"book-tour",
		"reset-filters"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const { t } = useLanguage();
		const { getImageUrl } = useWisataApi();
		const tours = ref([]);
		const categories = ref([]);
		const destinations = ref([]);
		const activeCategory = ref(props.externalCategory || "");
		const sortBy = ref("popular");
		const loading = ref(true);
		const activeDestinationName = computed(() => {
			if (!props.externalDestination) return "";
			const d = destinations.value.find((x) => x.id === props.externalDestination || x.slug === props.externalDestination);
			return d ? d.name : props.externalDestination;
		});
		const activeCategoryName = computed(() => {
			if (!activeCategory.value) return "";
			const c = categories.value.find((x) => x.id === activeCategory.value || x.slug === activeCategory.value);
			return c ? c.name : activeCategory.value;
		});
		watch(() => props.externalCategory, (newVal) => {
			if (newVal !== void 0) activeCategory.value = newVal;
		});
		const filteredTours = computed(() => {
			let list = [...tours.value];
			if (activeCategory.value) list = list.filter((t) => t.category?.id === activeCategory.value || t.category?.slug === activeCategory.value);
			if (props.externalDestination) {
				const dTarget = String(props.externalDestination).toLowerCase().trim();
				list = list.filter((t) => {
					const matchId = t.destinationId && String(t.destinationId).toLowerCase() === dTarget;
					const matchObjId = t.destination?.id && String(t.destination?.id).toLowerCase() === dTarget;
					const matchSlug = t.destination?.slug && String(t.destination?.slug).toLowerCase() === dTarget;
					const matchName = t.destination?.name && String(t.destination?.name).toLowerCase() === dTarget;
					return matchId || matchObjId || matchSlug || matchName;
				});
			}
			if (props.externalSearch) {
				const q = props.externalSearch.toLowerCase();
				list = list.filter((t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
			}
			if (sortBy.value === "price-low") list.sort((a, b) => {
				return Number(a.isPromo && a.discountPrice && Number(a.discountPrice) < Number(a.price) ? a.discountPrice : a.price) - Number(b.isPromo && b.discountPrice && Number(b.discountPrice) < Number(b.price) ? b.discountPrice : b.price);
			});
			else if (sortBy.value === "price-high") list.sort((a, b) => {
				const pA = Number(a.isPromo && a.discountPrice && Number(a.discountPrice) < Number(a.price) ? a.discountPrice : a.price);
				return Number(b.isPromo && b.discountPrice && Number(b.discountPrice) < Number(b.price) ? b.discountPrice : b.price) - pA;
			});
			else if (sortBy.value === "rating") list.sort((a, b) => Number(b.ratingAverage || 0) - Number(a.ratingAverage || 0));
			return list;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "tours",
				class: "py-16 sm:py-24"
			}, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"><div><div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-2"><span>✨ Paket Wisata Pilihan</span></div><h2 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">${ssrInterpolate(__props.company?.toursTitle || unref(t)("tours.title"))}</h2><p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">${ssrInterpolate(__props.company?.toursSubtitle || unref(t)("tours.subtitle"))}</p></div><div class="flex items-center gap-2 self-start md:self-end"><label class="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">${ssrInterpolate(unref(t)("tours.sortBy"))}</label><select class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"><option value="popular"${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "popular") : ssrLooseEqual(sortBy.value, "popular")) ? " selected" : ""}>${ssrInterpolate(unref(t)("tours.popular"))}</option><option value="price-low"${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "price-low") : ssrLooseEqual(sortBy.value, "price-low")) ? " selected" : ""}>${ssrInterpolate(unref(t)("tours.priceLow"))}</option><option value="price-high"${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "price-high") : ssrLooseEqual(sortBy.value, "price-high")) ? " selected" : ""}>${ssrInterpolate(unref(t)("tours.priceHigh"))}</option><option value="rating"${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "rating") : ssrLooseEqual(sortBy.value, "rating")) ? " selected" : ""}>${ssrInterpolate(unref(t)("tours.ratingHigh"))}</option></select></div></div>`);
			if (props.externalSearch || props.externalDestination || activeCategory.value) {
				_push(`<div class="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 sm:p-4 rounded-2xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60 text-xs animate-in fade-in"><div class="flex flex-wrap items-center gap-2"><span class="font-bold text-teal-800 dark:text-teal-300 flex items-center gap-1"><span>🔍</span> Filter Aktif: </span>`);
				if (activeDestinationName.value) _push(`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 text-slate-800 dark:text-slate-200 font-semibold shadow-xs"><span>📍 Destinasi:</span><span class="text-teal-600 dark:text-teal-400 font-bold">${ssrInterpolate(activeDestinationName.value)}</span></span>`);
				else _push(`<!---->`);
				if (activeCategoryName.value) _push(`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 text-slate-800 dark:text-slate-200 font-semibold shadow-xs"><span>🏷️ Kategori:</span><span class="text-teal-600 dark:text-teal-400 font-bold">${ssrInterpolate(activeCategoryName.value)}</span></span>`);
				else _push(`<!---->`);
				if (props.externalSearch) _push(`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 text-slate-800 dark:text-slate-200 font-semibold shadow-xs"><span>🔎 Pencarian:</span><span class="text-teal-600 dark:text-teal-400 font-bold">&quot;${ssrInterpolate(props.externalSearch)}&quot;</span></span>`);
				else _push(`<!---->`);
				_push(`</div><button type="button" class="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold text-xs border border-rose-200 dark:border-rose-900/60 shadow-xs transition-colors flex items-center gap-1 cursor-pointer shrink-0"><span>✕</span><span>Reset Filter</span></button></div>`);
			} else _push(`<!---->`);
			if (categories.value.length > 0) {
				_push(`<div class="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar"><button type="button" class="${ssrRenderClass([[activeCategory.value === "" ? "bg-teal-600 text-white shadow-teal-500/25" : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-teal-500"], "px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-sm"])}">${ssrInterpolate(unref(t)("categories.allTours"))}</button><!--[-->`);
				ssrRenderList$2(categories.value, (cat) => {
					_push(`<button type="button" class="${ssrRenderClass([[activeCategory.value === cat.id ? "bg-teal-600 text-white shadow-teal-500/25" : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-teal-500"], "px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5"])}"><span>${ssrInterpolate(cat.name)}</span></button>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			if (loading.value) _push(`<div class="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800"><div class="inline-block animate-spin text-4xl mb-3">⏳</div><p class="text-sm font-semibold text-slate-600 dark:text-slate-400"> Memuat daftar paket wisata... </p></div>`);
			else if (filteredTours.value.length > 0) {
				_push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
				ssrRenderList$2(filteredTours.value, (tour) => {
					_push(`<div class="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"><div class="relative h-60 overflow-hidden cursor-pointer"><img${ssrRenderAttr("src", unref(getImageUrl)(tour.featuredImage || "/images/tour-manta-bay.jpg"))}${ssrRenderAttr("alt", tour.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"><div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div><div class="absolute top-3 left-3 flex flex-wrap gap-2">`);
					if (tour.isBestSeller) _push(`<span class="px-2.5 py-1 rounded-xl bg-amber-500 text-white text-[11px] font-extrabold uppercase tracking-wider shadow"> ⭐ ${ssrInterpolate(unref(t)("tours.bestSellerBadge"))}</span>`);
					else _push(`<!---->`);
					if (tour.isPromo) _push(`<span class="px-2.5 py-1 rounded-xl bg-teal-500 text-white text-[11px] font-extrabold uppercase tracking-wider shadow"> 🏷️ ${ssrInterpolate(unref(t)("tours.promoBadge"))}</span>`);
					else _push(`<!---->`);
					_push(`</div>`);
					if (tour.destination) _push(`<div class="absolute top-3 right-3 px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold"> 📍 ${ssrInterpolate(tour.destination.name)}</div>`);
					else _push(`<!---->`);
					_push(`<div class="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-xs font-bold text-slate-800 dark:text-slate-100 shadow"><span class="text-amber-400">★</span><span>${ssrInterpolate(tour.ratingAverage || 5)}</span><span class="text-slate-400 font-normal">(${ssrInterpolate(tour.ratingCount || 0)})</span></div>`);
					if (tour.duration) _push(`<div class="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-xs font-semibold text-slate-800 dark:text-slate-100 shadow"> ⏱️ ${ssrInterpolate(tour.duration.name)}</div>`);
					else _push(`<!---->`);
					_push(`</div><div class="p-6 flex-1 flex flex-col justify-between"><div>`);
					if (tour.category) _push(`<span class="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">${ssrInterpolate(tour.category.name)}</span>`);
					else _push(`<!---->`);
					_push(`<h3 class="mt-1 text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 cursor-pointer transition-colors line-clamp-2">${ssrInterpolate(tour.title)}</h3><p class="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">${ssrInterpolate(tour.description)}</p>`);
					if (tour.includes) _push(`<div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-start gap-2"><span class="text-teal-500 text-sm">✓</span><p class="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1">${ssrInterpolate(tour.includes)}</p></div>`);
					else _push(`<!---->`);
					_push(`</div><div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800"><div class="flex items-baseline justify-between mb-4"><div><span class="text-[11px] text-slate-400 block font-medium">Mulai dari</span><div class="flex items-baseline gap-2"><span class="text-xl font-black text-slate-900 dark:text-white"> Rp ${ssrInterpolate(Number(tour.isPromo && tour.discountPrice && Number(tour.discountPrice) < Number(tour.price) ? tour.discountPrice : tour.price).toLocaleString("id-ID"))}</span>`);
					if (tour.isPromo && tour.discountPrice && Number(tour.discountPrice) < Number(tour.price)) _push(`<span class="text-xs line-through text-slate-400"> Rp ${ssrInterpolate(Number(tour.price).toLocaleString("id-ID"))}</span>`);
					else _push(`<!---->`);
					_push(`</div></div><span class="text-xs text-slate-400 font-medium">${ssrInterpolate(unref(t)("tours.perPerson"))}</span></div><div class="grid grid-cols-2 gap-2"><button type="button" class="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">${ssrInterpolate(unref(t)("tours.viewDetail"))}</button><button type="button" class="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 shadow-md shadow-teal-500/25 transition-all text-center">${ssrInterpolate(unref(t)("tours.bookNow"))}</button></div></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<div class="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3"><div class="text-4xl">🏝️</div><h4 class="text-lg font-bold text-slate-900 dark:text-white"> Belum ada paket wisata yang tersedia </h4><p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto"> Silakan cek kembali beberapa saat lagi atau hubungi layanan pelanggan kami. </p><button type="button" class="mt-2 px-5 py-2 text-xs font-bold rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors shadow"> 🔄 Muat Ulang </button></div>`);
			_push(`</div></section>`);
		};
	}
});
// app/components/TourCatalog.vue
var _sfc_setup$7 = TourCatalog_vue_vue_type_script_setup_true_lang_default.setup;
TourCatalog_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TourCatalog.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var TourCatalog_default = Object.assign(TourCatalog_vue_vue_type_script_setup_true_lang_default, { __name: "TourCatalog" });
// app/components/PromoSection.vue?vue&type=script&setup=true&lang.ts
var PromoSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "PromoSection",
	__ssrInlineRender: true,
	props: { company: {} },
	setup(__props) {
		const { t } = useLanguage();
		useWisataApi();
		const promos = ref([]);
		const copiedCode = ref(null);
		return (_ctx, _push, _parent, _attrs) => {
			if (promos.value.length > 0) {
				_push(`<section${ssrRenderAttrs(mergeProps({
					id: "promos",
					class: "py-14 sm:py-20 bg-gradient-to-b from-teal-900 via-teal-950 to-slate-950 text-white relative overflow-hidden"
				}, _attrs))}><div class="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div><div class="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"><div class="text-center max-w-3xl mx-auto mb-12"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/80 border border-teal-700 text-teal-300 text-xs font-bold uppercase tracking-wider mb-3"><span>🎁 Kupon Diskon Aktif</span></div><h2 class="text-3xl sm:text-4xl font-black tracking-tight text-white">${ssrInterpolate(__props.company?.promosTitle || unref(t)("promos.title"))}</h2><p class="mt-2 text-sm sm:text-base text-teal-200/80">${ssrInterpolate(__props.company?.promosSubtitle || unref(t)("promos.subtitle"))}</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"><!--[-->`);
				ssrRenderList$2(promos.value, (promo) => {
					_push(`<div class="relative rounded-3xl p-6 sm:p-7 bg-slate-900/80 backdrop-blur-md border border-teal-500/30 hover:border-teal-400 shadow-xl flex flex-col justify-between group transition-all"><div><div class="flex items-center justify-between mb-4"><span class="px-3 py-1 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-bold uppercase tracking-wider">${ssrInterpolate(promo.discountType === "PERCENT" ? `${promo.discountValue}% OFF` : `POTONGAN Rp ${Number(promo.discountValue).toLocaleString("id-ID")}`)}</span><span class="text-xs text-teal-300/70">${ssrInterpolate(unref(t)("promos.validUntil"))} ${ssrInterpolate(promo.endDate ? new Date(promo.endDate).toLocaleDateString("id-ID") : "31 Des 2027")}</span></div><h3 class="text-lg font-black text-white group-hover:text-teal-300 transition-colors">${ssrInterpolate(promo.title)}</h3><p class="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">${ssrInterpolate(promo.description)}</p>`);
					if (promo.minSpend) _push(`<div class="mt-3 text-[11px] text-teal-400"> *${ssrInterpolate(unref(t)("promos.minSpend"))}: Rp ${ssrInterpolate(Number(promo.minSpend).toLocaleString("id-ID"))}</div>`);
					else _push(`<!---->`);
					_push(`<div class="mt-3 pt-2 border-t border-slate-800/80">`);
					if (promo.applicableTours && promo.applicableTours.length > 0) {
						_push(`<div class="flex flex-wrap gap-1 items-center"><span class="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Khusus Paket:</span><!--[-->`);
						ssrRenderList$2(promo.applicableTours, (at) => {
							_push(`<span class="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/30 font-medium">${ssrInterpolate(at.tourPackage?.title || at.tourPackageId)}</span>`);
						});
						_push(`<!--]--></div>`);
					} else _push(`<div class="text-[11px] text-emerald-300/90 font-medium flex items-center gap-1"><span>✓</span><span>Berlaku untuk semua paket wisata</span></div>`);
					_push(`</div></div><div class="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3"><div class="px-4 py-2 rounded-xl bg-slate-950 border border-dashed border-teal-500/50 font-mono text-base font-black tracking-widest text-teal-300">${ssrInterpolate(promo.code)}</div><button type="button" class="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow"><span>${ssrInterpolate(copiedCode.value === promo.code ? "✓ Tersalin" : unref(t)("promos.copyCoupon"))}</span></button></div></div>`);
				});
				_push(`<!--]--></div></div></section>`);
			} else _push(`<!---->`);
		};
	}
});
// app/components/PromoSection.vue
var _sfc_setup$6 = PromoSection_vue_vue_type_script_setup_true_lang_default.setup;
PromoSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PromoSection.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var PromoSection_default = Object.assign(PromoSection_vue_vue_type_script_setup_true_lang_default, { __name: "PromoSection" });
// app/components/TestimonialsSection.vue?vue&type=script&setup=true&lang.ts
var TestimonialsSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TestimonialsSection",
	__ssrInlineRender: true,
	props: { company: {} },
	setup(__props) {
		const { t } = useLanguage();
		const { getImageUrl } = useWisataApi();
		const testimonials = ref([]);
		const tourOptions = ref([]);
		const tourSelectOptions = computed(() => {
			return tourOptions.value.map((pkg) => ({
				value: pkg.id,
				label: pkg.title,
				icon: "🌴"
			}));
		});
		const showForm = ref(false);
		const submitting = ref(false);
		const successMsg = ref(false);
		const successMsgText = ref("");
		const errorMsg = ref("");
		const newReview = ref({
			name: "",
			email: "",
			tourPackageId: "",
			bookingCode: "",
			rating: 5,
			comment: ""
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "testimonials",
				class: "py-16 sm:py-24 bg-slate-50 dark:bg-slate-950"
			}, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"><div><div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-2"><span>⭐ Testimoni Wisatawan</span></div><h2 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">${ssrInterpolate(__props.company?.testimonialsTitle || unref(t)("testimonials.title"))}</h2><p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">${ssrInterpolate(__props.company?.testimonialsSubtitle || unref(t)("testimonials.subtitle"))}</p></div><button type="button" class="self-start md:self-end px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-950/50 transition-colors shadow-sm flex items-center gap-2"><span>✍️</span><span>${ssrInterpolate(showForm.value ? "Tutup Formulir" : unref(t)("testimonials.writeReview"))}</span></button></div>`);
			if (showForm.value) {
				_push(`<div class="mb-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-teal-500/40 shadow-xl max-w-2xl mx-auto"><div class="flex items-center justify-between gap-4 mb-3"><h4 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>✍️</span><span>${ssrInterpolate(unref(t)("testimonials.formTitle"))}</span></h4><span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800"> 🛡️ Ulasan Terverifikasi </span></div><p class="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed"> Demi menjaga keaslian ulasan, sistem memverifikasi bahwa email yang Anda masukkan terdaftar dalam pemesanan tiket paket wisata yang Anda pilih. </p><form class="space-y-4"><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">${ssrInterpolate(unref(t)("testimonials.name"))} <span class="text-rose-500">*</span></label><input${ssrRenderAttr("value", newReview.value.name)} type="text" required placeholder="Nama Lengkap Anda" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"></div><div><label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">${ssrInterpolate(unref(t)("testimonials.email"))} <span class="text-rose-500">*</span></label><input${ssrRenderAttr("value", newReview.value.email)} type="email" required placeholder="email@contoh.com" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"><p class="mt-1 text-[11px] text-slate-500 dark:text-slate-400">Email saat Anda memesan tiket</p></div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">${ssrInterpolate(unref(t)("testimonials.tourName"))} <span class="text-rose-500">*</span></label>`);
				_push(ssrRenderComponent(SearchableSelect_default, {
					modelValue: newReview.value.tourPackageId,
					"onUpdate:modelValue": ($event) => newReview.value.tourPackageId = $event,
					options: tourSelectOptions.value,
					placeholder: unref(t)("testimonials.selectTourPlaceholder") || "-- Pilih Paket Wisata --",
					searchPlaceholder: "Cari paket wisata...",
					required: ""
				}, null, _parent));
				_push(`</div><div><label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">${ssrInterpolate(unref(t)("testimonials.rating"))} <span class="text-rose-500">*</span></label><select class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"><option${ssrRenderAttr("value", 5)}${ssrIncludeBooleanAttr(Array.isArray(newReview.value.rating) ? ssrLooseContain(newReview.value.rating, 5) : ssrLooseEqual(newReview.value.rating, 5)) ? " selected" : ""}>⭐⭐⭐⭐⭐ 5 Bintang (Sempurna)</option><option${ssrRenderAttr("value", 4)}${ssrIncludeBooleanAttr(Array.isArray(newReview.value.rating) ? ssrLooseContain(newReview.value.rating, 4) : ssrLooseEqual(newReview.value.rating, 4)) ? " selected" : ""}>⭐⭐⭐⭐ 4 Bintang (Sangat Baik)</option><option${ssrRenderAttr("value", 3)}${ssrIncludeBooleanAttr(Array.isArray(newReview.value.rating) ? ssrLooseContain(newReview.value.rating, 3) : ssrLooseEqual(newReview.value.rating, 3)) ? " selected" : ""}>⭐⭐⭐ 3 Bintang (Cukup)</option><option${ssrRenderAttr("value", 2)}${ssrIncludeBooleanAttr(Array.isArray(newReview.value.rating) ? ssrLooseContain(newReview.value.rating, 2) : ssrLooseEqual(newReview.value.rating, 2)) ? " selected" : ""}>⭐⭐ 2 Bintang (Kurang)</option><option${ssrRenderAttr("value", 1)}${ssrIncludeBooleanAttr(Array.isArray(newReview.value.rating) ? ssrLooseContain(newReview.value.rating, 1) : ssrLooseEqual(newReview.value.rating, 1)) ? " selected" : ""}>⭐ 1 Bintang (Kecewa)</option></select></div></div><div><label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"> Kode Booking <span class="text-[11px] font-normal text-slate-500 dark:text-slate-400">(Opsional jika Anda mengingat kode booking)</span></label><input${ssrRenderAttr("value", newReview.value.bookingCode)} type="text" placeholder="Contoh: BK-2026xxxx" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"></div><div><label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">${ssrInterpolate(unref(t)("testimonials.comment"))} <span class="text-rose-500">*</span></label><textarea rows="3" required placeholder="Ceritakan pengalaman seru dan kepuasan perjalanan wisata Anda bersama kami..." class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed">${ssrInterpolate(newReview.value.comment)}</textarea></div>`);
				if (successMsg.value) _push(`<div class="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-medium flex items-center gap-2"><span class="text-base">✓</span><span>${ssrInterpolate(successMsgText.value || unref(t)("testimonials.reviewSuccess"))}</span></div>`);
				else _push(`<!---->`);
				if (errorMsg.value) _push(`<div class="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-300 font-medium flex items-start gap-2"><span class="text-base leading-none">⚠️</span><span class="leading-relaxed">${ssrInterpolate(errorMsg.value)}</span></div>`);
				else _push(`<!---->`);
				_push(`<div class="pt-2 flex items-center justify-end gap-3"><button type="button" class="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"> Batal </button><button type="submit"${ssrIncludeBooleanAttr(submitting.value || !newReview.value.tourPackageId || !newReview.value.email || !newReview.value.name || !newReview.value.comment) ? " disabled" : ""} class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">`);
				if (submitting.value) _push(`<span class="animate-spin text-sm">⏳</span>`);
				else _push(`<!---->`);
				_push(`<span>${ssrInterpolate(submitting.value ? "Memverifikasi..." : unref(t)("testimonials.submitReview"))}</span></button></div></form></div>`);
			} else _push(`<!---->`);
			if (testimonials.value.length > 0) {
				_push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-6"><!--[-->`);
				ssrRenderList$2(testimonials.value, (item) => {
					_push(`<div class="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"><div><div class="flex items-center gap-1 text-amber-400 text-sm mb-4"><!--[-->`);
					ssrRenderList$2(item.rating, (s) => {
						_push(`<span>★</span>`);
					});
					_push(`<!--]--></div><p class="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed"> &quot;${ssrInterpolate(item.comment)}&quot; </p></div><div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3"><img${ssrRenderAttr("src", unref(getImageUrl)(item.avatarUrl || "/images/avatar-budi.jpg"))}${ssrRenderAttr("alt", item.name)} class="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"><div><h5 class="text-xs font-bold text-slate-900 dark:text-white">${ssrInterpolate(item.name)}</h5><p class="text-[11px] text-teal-600 dark:text-teal-400 font-medium">${ssrInterpolate(item.tourTitle || unref(t)("testimonials.verifiedTrip"))}</p>`);
					if (item.tripDate) _push(`<p class="text-[10px] text-slate-400">${ssrInterpolate(item.tripDate)}</p>`);
					else _push(`<!---->`);
					_push(`</div></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<div class="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-2"><p class="text-sm text-slate-500">Belum ada ulasan yang dipublikasikan.</p><button type="button" class="text-xs font-bold text-teal-600 dark:text-teal-400 underline"> Jadilah yang pertama menulis ulasan </button></div>`);
			_push(`</div></section>`);
		};
	}
});
// app/components/TestimonialsSection.vue
var _sfc_setup$5 = TestimonialsSection_vue_vue_type_script_setup_true_lang_default.setup;
TestimonialsSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TestimonialsSection.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var TestimonialsSection_default = Object.assign(TestimonialsSection_vue_vue_type_script_setup_true_lang_default, { __name: "TestimonialsSection" });
// app/components/FooterSection.vue?vue&type=script&setup=true&lang.ts
var FooterSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "FooterSection",
	__ssrInlineRender: true,
	props: { company: {} },
	setup(__props) {
		const props = __props;
		const { t } = useLanguage();
		const { getImageUrl} = useWisataApi();
		const masterDestinationNames = ref([]);
		const destinationsLoaded = ref(false);
		const popularDestinationsList = computed(() => {
			const custom = props.company?.popularDestinations;
			if (typeof custom === "string" && custom.trim()) {
				const items = custom.split(/\r?\n|,/).map((s) => s.trim()).filter(Boolean);
				if (items.length > 0) return items;
			}
			if (masterDestinationNames.value.length > 0) return masterDestinationNames.value;
			return [];
		});
		const footerLogoError = ref(false);
		const footerDarkFailed = ref(false);
		watch(() => [props.company?.logoUrl, props.company?.logoDarkUrl], () => {
			footerLogoError.value = false;
			footerDarkFailed.value = false;
		});
		const footerLogo = computed(() => {
			const c = props.company;
			if (!c || footerLogoError.value) return "";
			if (c.logoDarkUrl && c.logoDarkUrl !== "/logo-wisata-white.svg" && !footerDarkFailed.value) return getImageUrl(c.logoDarkUrl);
			if (c.logoUrl) return getImageUrl(c.logoUrl);
			return "";
		});
		const cleanPhone = (val) => {
			if (!val) return "6281234567890";
			return val.replace(/\D/g, "");
		};
		const hasSocialMedia = computed(() => {
			const c = props.company;
			return !!(c?.facebookUrl || c?.instagramUrl || c?.youtubeUrl || c?.tiktokUrl);
		});
		const fullAddress = computed(() => {
			const c = props.company;
			if (!c?.address) return t("footer.address");
			const parts = [c.address];
			if (c.city && !c.address.toLowerCase().includes(c.city.toLowerCase())) parts.push(c.city);
			if (c.province && !c.address.toLowerCase().includes(c.province.toLowerCase())) parts.push(c.province);
			return parts.join(", ");
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-12" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800"><div class="lg:col-span-2 space-y-4"><div class="flex items-center gap-3">`);
			if (footerLogo.value) _push(`<div class="h-10 max-w-[140px] flex items-center justify-center shrink-0"><img${ssrRenderAttr("src", footerLogo.value)}${ssrRenderAttr("alt", __props.company?.brandName || unref(t)("nav.brand"))} class="max-h-10 max-w-full object-contain rounded-xl"></div>`);
			else _push(`<div class="h-10 max-w-[140px] flex items-center justify-center shrink-0"><img${ssrRenderAttr("src", _virtual_public__2Flogo_trip_default)}${ssrRenderAttr("alt", __props.company?.brandName || unref(t)("nav.brand"))} class="max-h-10 max-w-full object-contain rounded-xl"></div>`);
			_push(`<div><span class="text-xl font-extrabold tracking-tight text-white">${ssrInterpolate(__props.company?.brandName || unref(t)("nav.brand"))}</span><span class="block text-xs font-semibold text-teal-400 uppercase tracking-wider -mt-1">${ssrInterpolate(__props.company?.tagline || unref(t)("nav.subtitle"))}</span></div></div><p class="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">${ssrInterpolate(__props.company?.description || unref(t)("footer.desc"))}</p><div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-teal-300"><span>🛡️</span><span>Reservasi Resmi &amp; Bergaransi</span></div>`);
			if (hasSocialMedia.value) {
				_push(`<div class="flex items-center gap-2.5 pt-2">`);
				if (__props.company?.facebookUrl) _push(`<a${ssrRenderAttr("href", __props.company.facebookUrl)} target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-200 shadow-sm hover:scale-105" title="Facebook Resmi"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg></a>`);
				else _push(`<!---->`);
				if (__props.company?.instagramUrl) _push(`<a${ssrRenderAttr("href", __props.company.instagramUrl)} target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent transition-all duration-200 shadow-sm hover:scale-105" title="Instagram Resmi"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg></a>`);
				else _push(`<!---->`);
				if (__props.company?.youtubeUrl) _push(`<a${ssrRenderAttr("href", __props.company.youtubeUrl)} target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-200 shadow-sm hover:scale-105" title="YouTube Resmi"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg></a>`);
				else _push(`<!---->`);
				if (__props.company?.tiktokUrl) _push(`<a${ssrRenderAttr("href", __props.company.tiktokUrl)} target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white hover:bg-black hover:border-black transition-all duration-200 shadow-sm hover:scale-105" title="TikTok Resmi"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path></svg></a>`);
				else _push(`<!---->`);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div><div><h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">${ssrInterpolate(unref(t)("footer.quickLinks"))}</h4><ul class="space-y-2.5 text-xs sm:text-sm"><li><a href="#hero" class="hover:text-teal-400 transition-colors">${ssrInterpolate(unref(t)("nav.home"))}</a></li><li><a href="#tours" class="hover:text-teal-400 transition-colors">${ssrInterpolate(unref(t)("nav.tours"))}</a></li><li><a href="#categories" class="hover:text-teal-400 transition-colors">${ssrInterpolate(unref(t)("nav.categories"))}</a></li><li><a href="#promos" class="hover:text-teal-400 transition-colors">${ssrInterpolate(unref(t)("nav.promo"))}</a></li><li><a href="#testimonials" class="hover:text-teal-400 transition-colors">${ssrInterpolate(unref(t)("nav.testimonials"))}</a></li></ul></div><div><h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">${ssrInterpolate(unref(t)("footer.destinations"))}</h4><ul class="space-y-2.5 text-xs sm:text-sm">`);
			if (popularDestinationsList.value.length > 0) {
				_push(`<!--[-->`);
				ssrRenderList$2(popularDestinationsList.value, (destName, idx) => {
					_push(`<li><a href="#tours" class="hover:text-teal-400 transition-colors">${ssrInterpolate(destName)}</a></li>`);
				});
				_push(`<!--]-->`);
			} else if (!destinationsLoaded.value) {
				_push(`<!--[-->`);
				ssrRenderList$2(4, (i) => {
					_push(`<li class="h-3.5 w-36 bg-slate-800 rounded animate-pulse"></li>`);
				});
				_push(`<!--]-->`);
			} else _push(`<!---->`);
			_push(`</ul></div><div><h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">${ssrInterpolate(unref(t)("footer.contactTitle"))}</h4><ul class="space-y-2.5 text-xs sm:text-sm"><li class="leading-relaxed"> 📍 ${ssrInterpolate(fullAddress.value)}</li><li><a${ssrRenderAttr("href", `https://wa.me/${cleanPhone(__props.company?.whatsapp || __props.company?.phone)}`)} target="_blank" rel="noopener noreferrer" class="hover:text-teal-400 transition-colors inline-flex items-center gap-1.5"><span>📞</span><span>${ssrInterpolate(__props.company?.whatsapp || __props.company?.phone || unref(t)("footer.phone"))}</span></a></li><li><a${ssrRenderAttr("href", `mailto:${__props.company?.email || "info@tripnusapenidaexplore.my.id"}`)} class="hover:text-teal-400 transition-colors inline-flex items-center gap-1.5"><span>✉️</span><span>${ssrInterpolate(__props.company?.email || unref(t)("footer.email"))}</span></a></li><li class="text-teal-400 font-semibold"> 🕒 ${ssrInterpolate(__props.company?.operatingHours || "Buka Setiap Hari (06:00 - 21:00 WITA)")}</li></ul></div></div><div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500"><div class="flex items-center gap-2"><span>${ssrInterpolate(__props.company?.footerText || `© ${(/* @__PURE__ */ new Date()).getFullYear()} ${__props.company?.companyName || __props.company?.brandName || "Trip Nusa Penida Explore"}. All rights reserved.`)}</span></div><div class="flex flex-wrap items-center gap-3"><div class="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-sm hover:border-[#108ee9]/50 transition-colors"><span class="text-[11px] font-medium text-slate-400">Didukung oleh</span><div class="h-5 px-1.5 rounded bg-white flex items-center justify-center shrink-0 shadow-xs"><img${ssrRenderAttr("src", _virtual_public__2Fdana_logo_default)} alt="DANA Official Logo" class="h-3.5 w-auto object-contain"></div><span class="text-xs font-bold text-slate-200"> DANA Gapura SaaS Payment Gateway </span></div><span class="px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] font-bold text-rose-400 border border-slate-700">QRIS</span></div></div></div></footer>`);
		};
	}
});
// app/components/FooterSection.vue
var _sfc_setup$4 = FooterSection_vue_vue_type_script_setup_true_lang_default.setup;
FooterSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FooterSection.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var FooterSection_default = Object.assign(FooterSection_vue_vue_type_script_setup_true_lang_default, { __name: "FooterSection" });
// app/components/TourDetailModal.vue?vue&type=script&setup=true&lang.ts
var TourDetailModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TourDetailModal",
	__ssrInlineRender: true,
	props: { tour: {} },
	emits: ["close", "book"],
	setup(__props) {
		const props = __props;
		const { t } = useLanguage();
		const { getImageUrl } = useWisataApi();
		const currentImage = ref(null);
		const parsedItinerary = computed(() => {
			if (!props.tour || !props.tour.itinerary) return [];
			if (Array.isArray(props.tour.itinerary)) return props.tour.itinerary;
			try {
				const parsed = JSON.parse(props.tour.itinerary);
				if (Array.isArray(parsed)) return parsed;
			} catch (e) {
				return [{
					time: "08:00 - Selesai",
					activity: props.tour.itinerary
				}];
			}
			return [];
		});
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.tour) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6" }, _attrs))}><div class="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200"><div class="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900"><img${ssrRenderAttr("src", unref(getImageUrl)(currentImage.value || __props.tour.featuredImage))}${ssrRenderAttr("alt", __props.tour.title)} class="w-full h-full object-cover"><div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30"></div><button type="button" class="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-colors"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button><div class="absolute bottom-4 left-6 right-6"><div class="flex items-center gap-2 mb-2">`);
				if (__props.tour.category) _push(`<span class="px-2.5 py-0.5 rounded-lg bg-teal-500 text-white text-xs font-bold uppercase tracking-wider">${ssrInterpolate(__props.tour.category.name)}</span>`);
				else _push(`<!---->`);
				if (__props.tour.destination) _push(`<span class="px-2.5 py-0.5 rounded-lg bg-slate-800/80 backdrop-blur-md text-white text-xs font-medium"> 📍 ${ssrInterpolate(__props.tour.destination.name)}</span>`);
				else _push(`<!---->`);
				if (__props.tour.duration) _push(`<span class="px-2.5 py-0.5 rounded-lg bg-slate-800/80 backdrop-blur-md text-white text-xs font-medium"> ⏱️ ${ssrInterpolate(__props.tour.duration.name)}</span>`);
				else _push(`<!---->`);
				_push(`</div><h2 class="text-xl sm:text-2xl font-black text-white leading-snug">${ssrInterpolate(__props.tour.title)}</h2>`);
				if (__props.tour.subtitle) _push(`<p class="text-xs sm:text-sm text-teal-100 mt-1 font-medium">${ssrInterpolate(__props.tour.subtitle)}</p>`);
				else _push(`<!---->`);
				_push(`</div></div>`);
				if (__props.tour.gallery && __props.tour.gallery.length > 1) {
					_push(`<div class="flex gap-2 p-3 bg-slate-100 dark:bg-slate-800/60 overflow-x-auto"><!--[-->`);
					ssrRenderList$2(__props.tour.gallery, (img, idx) => {
						_push(`<button type="button" class="${ssrRenderClass([currentImage.value === img ? "border-teal-500 scale-105" : "border-transparent opacity-70 hover:opacity-100", "shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all"])}"><img${ssrRenderAttr("src", unref(getImageUrl)(img))} class="w-full h-full object-cover"></button>`);
					});
					_push(`<!--]--></div>`);
				} else _push(`<!---->`);
				_push(`<div class="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6"><div><h4 class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2"> Tentang Paket Wisata </h4><p class="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">${ssrInterpolate(__props.tour.description)}</p></div>`);
				if (parsedItinerary.value.length > 0) {
					_push(`<div><h4 class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">${ssrInterpolate(unref(t)("tourDetail.itinerary"))}</h4><div class="space-y-3 relative pl-4 border-l-2 border-teal-500/30 ml-2"><!--[-->`);
					ssrRenderList$2(parsedItinerary.value, (item, idx) => {
						_push(`<div class="relative"><div class="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-teal-500 ring-4 ring-teal-100 dark:ring-teal-950"></div><div class="text-xs font-bold text-teal-600 dark:text-teal-400">${ssrInterpolate(item.time)}</div><div class="text-sm font-medium text-slate-800 dark:text-slate-200">${ssrInterpolate(item.activity)}</div></div>`);
					});
					_push(`<!--]--></div></div>`);
				} else _push(`<!---->`);
				_push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-900/40"><h5 class="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider mb-2 flex items-center gap-1.5"><span>✓</span> ${ssrInterpolate(unref(t)("tourDetail.includes"))}</h5><p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">${ssrInterpolate(__props.tour.includes || "Fasilitas standar, asuransi, dan pemandu berpengalaman")}</p></div><div class="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40"><h5 class="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider mb-2 flex items-center gap-1.5"><span>✕</span> ${ssrInterpolate(unref(t)("tourDetail.excludes"))}</h5><p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">${ssrInterpolate(__props.tour.excludes || "Pengeluaran pribadi wisatawan")}</p></div></div><div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700"><h4 class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">${ssrInterpolate(unref(t)("tourDetail.pricingInfo"))}</h4>`);
				if (__props.tour.priceTiers && __props.tour.priceTiers.length > 0) {
					_push(`<div class="space-y-1.5"><!--[-->`);
					ssrRenderList$2([...__props.tour.priceTiers].sort((a, b) => Number(a.paxCount) - Number(b.paxCount)), (tier) => {
						_push(`<div class="flex items-center justify-between py-1 text-sm border-b border-slate-200/70 dark:border-slate-700/70 last:border-b-0"><span class="text-slate-700 dark:text-slate-300 font-medium">${ssrInterpolate(tier.paxCount)} orang</span><span class="font-bold text-teal-600 dark:text-teal-400"> Rp ${ssrInterpolate(Number(tier.pricePerPerson).toLocaleString("id-ID"))} `);
						if (tier.paxCount > 1) _push(`<span class="text-xs font-normal text-slate-500">/ orang</span>`);
						else _push(`<!---->`);
						_push(`</span></div>`);
					});
					_push(`<!--]--></div>`);
				} else _push(`<div class="flex items-center justify-between py-1 text-sm"><span class="text-slate-600 dark:text-slate-400">Harga Paket / Peserta</span><span class="font-bold text-slate-900 dark:text-white"> Rp ${ssrInterpolate(Number(__props.tour.isPromo && __props.tour.discountPrice && Number(__props.tour.discountPrice) < Number(__props.tour.price) ? __props.tour.discountPrice : __props.tour.price).toLocaleString("id-ID"))}</span></div>`);
				_push(`</div></div><div class="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between"><div><span class="text-xs text-slate-500 dark:text-slate-400 block font-medium">Harga Bersih</span><div class="text-2xl font-black text-teal-600 dark:text-teal-400"> Rp ${ssrInterpolate(Number(__props.tour.isPromo && __props.tour.discountPrice && Number(__props.tour.discountPrice) < Number(__props.tour.price) ? __props.tour.discountPrice : __props.tour.price).toLocaleString("id-ID"))}</div></div><div class="flex items-center gap-3"><button type="button" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">${ssrInterpolate(unref(t)("tourDetail.back"))}</button><button type="button" class="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 shadow-md shadow-teal-500/25 transition-all">${ssrInterpolate(unref(t)("tours.bookNow"))}</button></div></div></div></div>`);
			} else _push(`<!---->`);
		};
	}
});
// app/components/TourDetailModal.vue
var _sfc_setup$3 = TourDetailModal_vue_vue_type_script_setup_true_lang_default.setup;
TourDetailModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TourDetailModal.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var TourDetailModal_default = Object.assign(TourDetailModal_vue_vue_type_script_setup_true_lang_default, { __name: "TourDetailModal" });
// app/components/BookingModal.vue?vue&type=script&setup=true&lang.ts
var BookingModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BookingModal",
	__ssrInlineRender: true,
	props: {
		isOpen: { type: Boolean },
		selectedTour: {},
		prefill: {}
	},
	emits: [
		"close",
		"open-tracking",
		"booking-created"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const { t } = useLanguage();
		const { getActiveMasterTax } = useWisataApi();
		const activeTax = ref(null);
		const form = ref({
			customerName: "",
			customerEmail: "",
			customerPhone: "",
			tourDate: "",
			adultCount: 1,
			customerNotes: ""
		});
		const promoCodeInput = ref("");
		const discountAmount = ref(0);
		const promoValid = ref(false);
		const promoMessage = ref("");
		const submitting = ref(false);
		const errorMessage = ref("");
		const minDate = computed(() => {
			const tomorrow = /* @__PURE__ */ new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			return tomorrow.toISOString().slice(0, 10);
		});
		watch(() => props.isOpen, async (open) => {
			if (open) {
				promoCodeInput.value = "";
				discountAmount.value = 0;
				promoValid.value = false;
				promoMessage.value = "";
				errorMessage.value = "";
				submitting.value = false;
				if (props.prefill) {
					form.value.customerName = props.prefill.customerName || "";
					form.value.customerEmail = props.prefill.customerEmail || "";
					form.value.customerPhone = props.prefill.customerPhone || "";
					form.value.tourDate = props.prefill.tourDate || minDate.value;
					form.value.adultCount = props.prefill.adultCount || 1;
					form.value.customerNotes = props.prefill.customerNotes || "";
				} else form.value.tourDate = minDate.value;
				activeTax.value = await getActiveMasterTax();
			}
		});
		const activeTierPrice = computed(() => {
			const tour = props.selectedTour;
			if (!tour) return 0;
			let adultPrice = Number(tour.isPromo && tour.discountPrice && Number(tour.discountPrice) < Number(tour.price) ? tour.discountPrice : tour.price);
			const totalPax = form.value.adultCount || 0;
			if (Array.isArray(tour.priceTiers) && tour.priceTiers.length > 0 && totalPax > 0) {
				const sorted = [...tour.priceTiers].sort((a, b) => Number(a.paxCount) - Number(b.paxCount));
				const exact = sorted.find((t) => Number(t.paxCount) === totalPax);
				const floor = [...sorted].reverse().find((t) => Number(t.paxCount) <= totalPax);
				const matched = exact || floor || sorted[0];
				if (matched && Number(matched.pricePerPerson) > 0) adultPrice = Number(matched.pricePerPerson);
			}
			return adultPrice;
		});
		const subtotal = computed(() => {
			if (!props.selectedTour) return 0;
			return form.value.adultCount * activeTierPrice.value;
		});
		const taxAmount = computed(() => {
			if (!activeTax.value || !activeTax.value.isActive) return 0;
			const taxable = Math.max(0, subtotal.value - discountAmount.value);
			return Math.round(taxable * (Number(activeTax.value.rate || 0) / 100));
		});
		const totalAmount = computed(() => {
			return Math.max(0, subtotal.value - discountAmount.value) + taxAmount.value;
		});
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.isOpen) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6" }, _attrs))}><div class="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200"><div class="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between"><div><h3 class="text-xl font-bold text-slate-900 dark:text-white">${ssrInterpolate(unref(t)("bookingModal.title"))}</h3><p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${ssrInterpolate(__props.selectedTour ? __props.selectedTour.title : unref(t)("bookingModal.subtitle"))}</p></div><button type="button" class="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-colors"> ✕ </button></div>`);
				if (errorMessage.value) _push(`<div class="mx-6 sm:mx-8 mt-4 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 font-bold flex items-center gap-2"><span>⚠️</span><span>${ssrInterpolate(errorMessage.value)}</span></div>`);
				else _push(`<!---->`);
				_push(`<form class="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto"><div class="space-y-4"><h4 class="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1.5"><span>👤</span> ${ssrInterpolate(unref(t)("bookingModal.step1"))}</h4><div><label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">${ssrInterpolate(unref(t)("bookingModal.fullName"))} <span class="text-rose-500">*</span></label><input${ssrRenderAttr("value", form.value.customerName)} type="text" required${ssrRenderAttr("placeholder", unref(t)("bookingModal.fullNamePlaceholder"))} class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">${ssrInterpolate(unref(t)("bookingModal.email"))} <span class="text-rose-500">*</span></label><input${ssrRenderAttr("value", form.value.customerEmail)} type="email" required${ssrRenderAttr("placeholder", unref(t)("bookingModal.emailPlaceholder"))} class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"></div><div><label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">${ssrInterpolate(unref(t)("bookingModal.phone"))} <span class="text-rose-500">*</span></label><input${ssrRenderAttr("value", form.value.customerPhone)} type="tel" inputmode="numeric" pattern="[0-9]*" required${ssrRenderAttr("placeholder", unref(t)("bookingModal.phonePlaceholder"))} class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"></div></div></div><div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800"><h4 class="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1.5"><span>📅</span> ${ssrInterpolate(unref(t)("bookingModal.step2"))}</h4><div><label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">${ssrInterpolate(unref(t)("bookingModal.tripDate"))} <span class="text-rose-500">*</span></label><input${ssrRenderAttr("value", form.value.tourDate)} type="date" required${ssrRenderAttr("min", minDate.value)} class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"></div><div><label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"> Jumlah Peserta </label><div class="flex items-center gap-2"><button type="button" class="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold">-</button><span class="w-10 text-center font-bold text-sm text-slate-900 dark:text-white">${ssrInterpolate(form.value.adultCount)}</span><button type="button" class="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold">+</button><span class="text-xs text-slate-500 dark:text-slate-400 ml-1">orang</span></div></div><div><label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">${ssrInterpolate(unref(t)("bookingModal.specialRequests"))}</label><textarea rows="2"${ssrRenderAttr("placeholder", unref(t)("bookingModal.specialRequestsPlaceholder"))} class="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500">${ssrInterpolate(form.value.customerNotes)}</textarea></div></div><div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800"><h4 class="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1.5"><span>💳</span> ${ssrInterpolate(unref(t)("bookingModal.step3"))}</h4><div><div class="flex items-center justify-between mb-1.5"><label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">${ssrInterpolate(unref(t)("bookingModal.paymentMethod"))}</label><span class="inline-flex items-center gap-1 text-[11px] font-medium text-[#108ee9] bg-[#108ee9]/10 px-2 py-0.5 rounded-full"> 🔒 Pembayaran Resmi Terverifikasi </span></div><div class="p-3.5 sm:p-4 rounded-2xl border-2 border-[#108ee9] bg-gradient-to-r from-[#108ee9]/10 via-[#108ee9]/5 to-transparent dark:from-[#108ee9]/20 dark:via-[#108ee9]/10 dark:to-transparent flex items-center justify-between shadow-sm hover:shadow-md transition-all"><div class="flex items-center gap-3"><div class="h-11 px-3 rounded-xl bg-white dark:bg-slate-900 border border-[#108ee9]/30 shadow-sm flex items-center justify-center shrink-0"><img${ssrRenderAttr("src", _virtual_public__2Fdana_logo_default)} alt="DANA Official Logo" class="h-6 w-auto object-contain"></div><div><div class="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2"><span>DANA Gateway</span><span class="px-2 py-0.5 rounded text-[10px] font-black bg-[#108ee9] text-white tracking-wide shadow-xs">OFFICIAL</span></div><div class="text-[11px] font-semibold text-[#108ee9] mt-0.5"> Didukung oleh DANA Gapura SaaS Payment Gateway </div><div class="text-[10px] text-slate-500 dark:text-slate-400"> Kasir Resmi DANA (Saldo, QRIS, &amp; Kartu Debit) </div></div></div><div class="flex items-center gap-1.5 text-xs font-bold text-[#108ee9]"><span class="hidden sm:inline text-[11px]">Terpilih</span><span class="w-6 h-6 rounded-full bg-[#108ee9] text-white flex items-center justify-center text-xs font-bold shadow-sm">✓</span></div></div></div><div class="space-y-1.5"><label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">${ssrInterpolate(unref(t)("bookingModal.promoCode"))}</label><div class="flex gap-2"><input${ssrRenderAttr("value", promoCodeInput.value)} type="text" placeholder="Contoh: WISATAHEMAT20" class="flex-1 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm uppercase tracking-wider font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"><button type="button" class="px-4 py-2 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-xs font-bold transition-colors">${ssrInterpolate(unref(t)("bookingModal.applyPromo"))}</button></div>`);
				if (promoMessage.value) _push(`<div class="${ssrRenderClass([promoValid.value ? "text-teal-600 dark:text-teal-400" : "text-rose-500", "text-xs font-medium"])}">${ssrInterpolate(promoMessage.value)}</div>`);
				else _push(`<!---->`);
				_push(`</div><div class="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm"><div class="flex justify-between text-slate-600 dark:text-slate-400"><span>${ssrInterpolate(unref(t)("bookingModal.subtotal"))} (${ssrInterpolate(form.value.adultCount)} Peserta)</span><span class="font-semibold text-slate-900 dark:text-white">Rp ${ssrInterpolate(subtotal.value.toLocaleString("id-ID"))}</span></div>`);
				if (discountAmount.value > 0) _push(`<div class="flex justify-between text-teal-600 dark:text-teal-400 font-semibold"><span>${ssrInterpolate(unref(t)("bookingModal.discount"))}</span><span>- Rp ${ssrInterpolate(discountAmount.value.toLocaleString("id-ID"))}</span></div>`);
				else _push(`<!---->`);
				if (activeTax.value && taxAmount.value > 0) _push(`<div class="flex justify-between text-slate-600 dark:text-slate-300"><span>${ssrInterpolate(activeTax.value.name)} (${ssrInterpolate(Number(activeTax.value.rate))}%)</span><span class="font-semibold text-slate-900 dark:text-white">Rp ${ssrInterpolate(taxAmount.value.toLocaleString("id-ID"))}</span></div>`);
				else _push(`<!---->`);
				_push(`<div class="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700 text-base font-black text-slate-900 dark:text-white"><span>${ssrInterpolate(unref(t)("bookingModal.totalAmount"))}</span><span class="text-[#108ee9] font-black">Rp ${ssrInterpolate(totalAmount.value.toLocaleString("id-ID"))}</span></div></div><p class="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1"><span>🔒</span> ${ssrInterpolate(unref(t)("bookingModal.secureNote"))}</p></div><div class="pt-2 space-y-2.5"><button type="submit"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} class="w-full py-4 px-6 rounded-2xl font-bold text-white text-sm bg-gradient-to-r from-[#108ee9] via-blue-600 to-[#108ee9] hover:from-[#0c7ac9] hover:to-blue-700 shadow-xl shadow-[#108ee9]/25 hover:shadow-[#108ee9]/35 transition-all disabled:opacity-75 flex items-center justify-center gap-2 cursor-pointer">`);
				if (submitting.value) _push(`<span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>`);
				else _push(`<span class="text-base">💳</span>`);
				_push(`<span>${ssrInterpolate(submitting.value ? "Mengalihkan ke DANA Gateway..." : unref(t)("bookingModal.payNow") || "Bayar Sekarang")}</span></button><div class="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1"><span>Didukung oleh</span><div class="h-4 px-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs"><img${ssrRenderAttr("src", _virtual_public__2Fdana_logo_default)} alt="DANA Official Logo" class="h-2.5 w-auto object-contain"></div><span class="font-bold text-slate-700 dark:text-slate-300">DANA Gapura SaaS Payment Gateway</span></div></div></form></div></div>`);
			} else _push(`<!---->`);
		};
	}
});
// app/components/BookingModal.vue
var _sfc_setup$2 = BookingModal_vue_vue_type_script_setup_true_lang_default.setup;
BookingModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BookingModal.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var BookingModal_default = Object.assign(BookingModal_vue_vue_type_script_setup_true_lang_default, { __name: "BookingModal" });
// app/components/CheckBookingModal.vue?vue&type=script&setup=true&lang.ts
var CheckBookingModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CheckBookingModal",
	__ssrInlineRender: true,
	props: {
		isOpen: { type: Boolean },
		initialCode: {}
	},
	emits: ["close", "rebook"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const { t, locale } = useLanguage();
		const { checkBooking} = useWisataApi();
		const companyInfo = ref(null);
		const activeTab = ref("history");
		const bookingCodeInput = ref(props.initialCode || "");
		const selectedBooking = ref(null);
		const savedBookings = ref([]);
		const loading = ref(false);
		const refreshing = ref(false);
		const confirming = ref(false);
		const errorMessage = ref("");
		const isCopied = ref(false);
		const timeLeftSeconds = ref(1800);
		let timerInterval = null;
		const calculateTimeRemaining = (booking) => {
			if (isPaid(booking)) return 0;
			const now = Date.now();
			let targetTime = 0;
			if (booking.validUpTo || booking.expiryTime) targetTime = new Date(booking.validUpTo || booking.expiryTime).getTime();
			else if (booking.createdAt) targetTime = new Date(booking.createdAt).getTime() + 18e5;
			else targetTime = now + 18e5;
			const diffMs = targetTime - now;
			return diffMs > 0 ? Math.floor(diffMs / 1e3) : 0;
		};
		const startTimer = (booking) => {
			if (timerInterval) clearInterval(timerInterval);
			timeLeftSeconds.value = calculateTimeRemaining(booking);
			if (timeLeftSeconds.value > 0 && !isPaid(booking)) timerInterval = setInterval();
		};
		const formattedCountdown = computed(() => {
			const m = Math.floor(timeLeftSeconds.value / 60);
			const s = timeLeftSeconds.value % 60;
			return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
		});
		const getRemainingTimeFormatted = (booking) => {
			const diff = calculateTimeRemaining(booking);
			if (diff <= 0) return "00:00";
			const m = Math.floor(diff / 60);
			const s = diff % 60;
			return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
		};
		const isPaid = (b) => {
			if (!b) return false;
			const status = typeof b.paymentStatus === "object" ? b.paymentStatus?.code : b.paymentStatus;
			const orderStatus = typeof b.status === "object" ? b.status?.code : b.status;
			return status === "PAID" || orderStatus === "CONFIRMED" || orderStatus === "COMPLETED";
		};
		const isExpired = (b) => {
			if (!b) return false;
			if (isPaid(b)) return false;
			const orderStatus = typeof b.status === "object" ? b.status?.code : b.status;
			if (orderStatus === "CANCELLED" || orderStatus === "FAILED") return true;
			if (b === selectedBooking.value) return timeLeftSeconds.value <= 0;
			return calculateTimeRemaining(b) <= 0;
		};
		const handleSearchCode = async () => {
			if (!bookingCodeInput.value.trim()) return;
			loading.value = true;
			errorMessage.value = "";
			try {
				const res = await checkBooking(bookingCodeInput.value.trim().toUpperCase());
				if (res) {
					selectedBooking.value = res;
					startTimer(res);
					if (!savedBookings.value.some((b) => b.bookingCode === res.bookingCode)) savedBookings.value.unshift(res);
				} else errorMessage.value = t("checkBooking.notFound");
			} catch (err) {
				errorMessage.value = err?.message || t("checkBooking.notFound");
			} finally {
				loading.value = false;
			}
		};
		const getWhatsAppContactUrl = (booking) => {
			const phone = (companyInfo.value?.whatsapp || companyInfo.value?.phone || "6281234567890").replace(/\D/g, "");
			const brand = companyInfo.value?.brandName || companyInfo.value?.companyName || "Trip Nusa Penida Explore";
			return `https://wa.me/${phone}?text=${locale.value === "en" ? encodeURIComponent(`Hello ${brand} Team, I have completed payment for Booking Code: ${booking.bookingCode} (${booking.tourPackage?.title || "Tour Package"}). Please confirm my schedule & meeting point. Thank you.`) : encodeURIComponent(`Halo Tim ${brand}, saya sudah menyelesaikan pembayaran DANA Gapura untuk Kode Reservasi: ${booking.bookingCode} (${booking.tourPackage?.title || "Tour Wisata"}). Mohon konfirmasi jadwal & titik kumpul. Terima kasih.`)}`;
		};
		watch(() => props.isOpen, (newVal) => {
			if (newVal) {
				if (props.initialCode) {
					bookingCodeInput.value = props.initialCode;
					activeTab.value = "search";
					handleSearchCode();
				} else {
					activeTab.value = "history";
					selectedBooking.value = null;
				}
			} else if (timerInterval) clearInterval(timerInterval);
		});
		watch(() => props.initialCode, (newCode) => {
			if (newCode) {
				bookingCodeInput.value = newCode;
				activeTab.value = "search";
				handleSearchCode();
			}
		});
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.isOpen) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white" }, _attrs))} data-v-94cf4dbd><div class="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 print:shadow-none print:border-none print:max-w-full" data-v-94cf4dbd><div class="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between print:hidden" data-v-94cf4dbd><div class="flex items-center gap-3" data-v-94cf4dbd><div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-[#108ee9] text-white flex items-center justify-center text-lg shadow-md" data-v-94cf4dbd> 📋 </div><div data-v-94cf4dbd><h3 class="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-tight" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.modalTitle"))}</h3><p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.modalSubtitle"))}</p></div></div><button type="button" class="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-colors"${ssrRenderAttr("title", unref(t)("checkBooking.closeModal"))} data-v-94cf4dbd> ✕ </button></div><div class="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 px-4 sm:px-6 pt-2 print:hidden" data-v-94cf4dbd><button type="button" class="${ssrRenderClass([activeTab.value === "history" ? "border-[#108ee9] text-[#108ee9]" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300", "px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2"])}" data-v-94cf4dbd><span data-v-94cf4dbd>📜 ${ssrInterpolate(unref(t)("checkBooking.tabHistory"))}</span>`);
				if (savedBookings.value.length > 0) _push(`<span class="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-[#108ee9]/10 text-[#108ee9]" data-v-94cf4dbd>${ssrInterpolate(savedBookings.value.length)}</span>`);
				else _push(`<!---->`);
				_push(`</button><button type="button" class="${ssrRenderClass([activeTab.value === "search" ? "border-[#108ee9] text-[#108ee9]" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300", "px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2"])}" data-v-94cf4dbd><span data-v-94cf4dbd>🔍 ${ssrInterpolate(unref(t)("checkBooking.tabSearch"))}</span></button></div><div class="p-4 sm:p-6 max-h-[82vh] overflow-y-auto space-y-6" data-v-94cf4dbd>`);
				if (activeTab.value === "history" && !selectedBooking.value) {
					_push(`<div class="space-y-4 print:hidden" data-v-94cf4dbd><div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400" data-v-94cf4dbd><span class="font-semibold" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.deviceNotice"))}</span><button type="button" class="text-[#108ee9] hover:underline font-bold flex items-center gap-1" data-v-94cf4dbd><span data-v-94cf4dbd>🔄</span> ${ssrInterpolate(unref(t)("checkBooking.refreshStatus"))}</button></div>`);
					if (savedBookings.value.length > 0) {
						_push(`<div class="space-y-3" data-v-94cf4dbd><!--[-->`);
						ssrRenderList$2(savedBookings.value, (item) => {
							_push(`<div class="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-[#108ee9]/50 transition-all shadow-sm space-y-3" data-v-94cf4dbd><div class="flex flex-wrap items-center justify-between gap-2" data-v-94cf4dbd><div class="flex items-center gap-2" data-v-94cf4dbd><span class="font-mono font-black text-sm text-slate-900 dark:text-white" data-v-94cf4dbd>${ssrInterpolate(item.bookingCode)}</span><button type="button" class="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"${ssrRenderAttr("title", unref(t)("checkBooking.copy"))} data-v-94cf4dbd> 📋 </button></div><div data-v-94cf4dbd>`);
							if (isPaid(item)) _push(`<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center gap-1" data-v-94cf4dbd><span data-v-94cf4dbd>✓</span> ${ssrInterpolate(unref(t)("checkBooking.statusPaid"))}</span>`);
							else if (isExpired(item)) _push(`<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 flex items-center gap-1" data-v-94cf4dbd><span data-v-94cf4dbd>✕</span> ${ssrInterpolate(unref(t)("checkBooking.statusFailed"))}</span>`);
							else _push(`<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 flex items-center gap-1 animate-pulse" data-v-94cf4dbd><span data-v-94cf4dbd>⏱️</span> ${ssrInterpolate(unref(t)("checkBooking.statusWaiting"))}</span>`);
							_push(`</div></div><div class="text-xs space-y-1" data-v-94cf4dbd><div class="font-bold text-slate-800 dark:text-slate-100 text-sm" data-v-94cf4dbd>${ssrInterpolate(item.tourPackage?.title || "Tour Package")}</div><div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 dark:text-slate-400" data-v-94cf4dbd><span data-v-94cf4dbd>📅 Trip: ${ssrInterpolate(item.tourDate)}</span><span data-v-94cf4dbd>👥 ${ssrInterpolate(item.adultCount)} ${ssrInterpolate(unref(t)("checkBooking.adults"))}`);
							if (item.childCount) _push(`<span data-v-94cf4dbd>, ${ssrInterpolate(item.childCount)} ${ssrInterpolate(unref(t)("checkBooking.children"))}</span>`);
							else _push(`<!---->`);
							_push(`</span><span class="font-extrabold text-[#108ee9] text-sm" data-v-94cf4dbd> Rp ${ssrInterpolate((item.totalAmount || 0).toLocaleString("id-ID"))}</span></div></div><div class="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2" data-v-94cf4dbd><div class="text-[11px] text-slate-400" data-v-94cf4dbd>`);
							if (!isPaid(item) && !isExpired(item)) _push(`<span class="text-amber-600 dark:text-amber-400 font-bold" data-v-94cf4dbd> ⏱️ ${ssrInterpolate(unref(t)("checkBooking.remainingTime"))} ${ssrInterpolate(getRemainingTimeFormatted(item))}</span>`);
							else if (isPaid(item)) _push(`<span class="text-emerald-600 dark:text-emerald-400 font-medium" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.invoiceSentEmail"))}</span>`);
							else _push(`<span class="text-rose-500 font-medium" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.sessionExpired"))}</span>`);
							_push(`</div><div class="flex items-center gap-2" data-v-94cf4dbd>`);
							if (!isPaid(item) && !isExpired(item)) _push(`<button type="button" class="px-3.5 py-1.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-blue-600 to-[#108ee9] hover:from-blue-700 hover:to-cyan-600 shadow-sm flex items-center gap-1.5" data-v-94cf4dbd><span data-v-94cf4dbd>💳</span><span data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.continuePayment"))}</span></button>`);
							else if (isPaid(item)) _push(`<button type="button" class="px-3.5 py-1.5 rounded-xl font-bold text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 flex items-center gap-1.5" data-v-94cf4dbd><span data-v-94cf4dbd>📄</span><span data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.viewETicket"))}</span></button>`);
							else if (isExpired(item)) _push(`<button type="button" class="px-3.5 py-1.5 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 flex items-center gap-1.5" data-v-94cf4dbd><span data-v-94cf4dbd>🔄</span><span data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.rebookShort"))}</span></button>`);
							else _push(`<!---->`);
							_push(`<button type="button" class="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.seeDetail"))}</button></div></div></div>`);
						});
						_push(`<!--]--></div>`);
					} else _push(`<div class="py-12 text-center space-y-3" data-v-94cf4dbd><div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center text-2xl" data-v-94cf4dbd> 🏖️ </div><div class="space-y-1" data-v-94cf4dbd><h4 class="font-extrabold text-sm text-slate-800 dark:text-slate-200" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.noHistoryTitle"))}</h4><p class="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.noHistoryDesc"))}</p></div><a href="#tours" class="inline-block mt-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.exploreTours"))}</a></div>`);
					_push(`</div>`);
				} else _push(`<!---->`);
				if (activeTab.value === "search" && !selectedBooking.value) {
					_push(`<div class="space-y-4 print:hidden" data-v-94cf4dbd><form class="space-y-3" data-v-94cf4dbd><label class="block text-xs font-semibold text-slate-700 dark:text-slate-300" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.searchLabel"))}</label><div class="flex gap-2" data-v-94cf4dbd><input${ssrRenderAttr("value", bookingCodeInput.value)} type="text" required${ssrRenderAttr("placeholder", unref(t)("checkBooking.placeholder"))} class="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm uppercase tracking-wider font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#108ee9]" data-v-94cf4dbd><button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="px-5 py-2.5 rounded-xl bg-[#108ee9] hover:bg-[#0b7bc9] text-white font-bold text-xs sm:text-sm shadow-md transition-colors disabled:opacity-50 flex items-center gap-1.5" data-v-94cf4dbd>`);
					if (loading.value) _push(`<span class="animate-spin text-xs" data-v-94cf4dbd>⏳</span>`);
					else _push(`<!---->`);
					_push(`<span data-v-94cf4dbd>${ssrInterpolate(loading.value ? unref(t)("checkBooking.searching") : unref(t)("checkBooking.searchBtn"))}</span></button></div></form>`);
					if (errorMessage.value) _push(`<div class="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 font-bold flex items-center gap-2" data-v-94cf4dbd><span data-v-94cf4dbd>⚠️</span><span data-v-94cf4dbd>${ssrInterpolate(errorMessage.value)}</span></div>`);
					else _push(`<!---->`);
					_push(`</div>`);
				} else _push(`<!---->`);
				if (selectedBooking.value) {
					_push(`<div class="space-y-6" data-v-94cf4dbd><div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 print:hidden" data-v-94cf4dbd><button type="button" class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#108ee9] transition-colors" data-v-94cf4dbd><span data-v-94cf4dbd>←</span><span data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.backToList"))}</span></button><button type="button"${ssrIncludeBooleanAttr(refreshing.value) ? " disabled" : ""} class="inline-flex items-center gap-1.5 text-xs font-bold text-[#108ee9] hover:underline" data-v-94cf4dbd><span class="${ssrRenderClass({ "animate-spin": refreshing.value })}" data-v-94cf4dbd>🔄</span><span data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.refreshRealtime"))}</span></button></div>`);
					if (!isPaid(selectedBooking.value) && !isExpired(selectedBooking.value)) _push(`<div class="space-y-5" data-v-94cf4dbd><div class="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 text-amber-900 dark:text-amber-200 space-y-3" data-v-94cf4dbd><div class="flex items-center justify-between" data-v-94cf4dbd><div class="flex items-center gap-2 font-black text-xs sm:text-sm uppercase tracking-wider text-amber-700 dark:text-amber-400" data-v-94cf4dbd><span class="w-3 h-3 rounded-full bg-amber-500 animate-ping" data-v-94cf4dbd></span><span data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.waitingPayment"))}</span></div><div class="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300" data-v-94cf4dbd> UNPAID </div></div><div class="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner" data-v-94cf4dbd><div data-v-94cf4dbd><span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider" data-v-94cf4dbd> ⏱️ ${ssrInterpolate(unref(t)("checkBooking.timeRemaining"))}</span><div class="font-mono text-2xl font-black text-rose-600 dark:text-rose-400" data-v-94cf4dbd>${ssrInterpolate(formattedCountdown.value)}</div></div><div class="text-right" data-v-94cf4dbd><span class="text-[11px] text-slate-400 block" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.totalBill"))}</span><span class="text-xl font-black text-[#108ee9]" data-v-94cf4dbd> Rp ${ssrInterpolate((selectedBooking.value.totalAmount || 0).toLocaleString("id-ID"))}</span></div></div><p class="text-xs text-amber-800 dark:text-amber-300/90 leading-relaxed" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.waitingDesc"))}</p></div><div class="space-y-3" data-v-94cf4dbd><button type="button" class="w-full py-4 px-6 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 via-[#108ee9] to-blue-700 hover:from-blue-700 hover:to-cyan-600 shadow-xl shadow-blue-500/30 transition-all flex items-center justify-center gap-2" data-v-94cf4dbd><span data-v-94cf4dbd>💳</span><span data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.continuePayment"))}</span></button><button type="button"${ssrIncludeBooleanAttr(confirming.value) ? " disabled" : ""} class="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5" data-v-94cf4dbd><span data-v-94cf4dbd>${ssrInterpolate(confirming.value ? unref(t)("checkBooking.checking") : unref(t)("checkBooking.simulateCheck"))}</span></button></div></div>`);
					else if (isPaid(selectedBooking.value)) _push(`<div class="space-y-5" data-v-94cf4dbd><div class="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent border-2 border-emerald-500/50 space-y-4 shadow-sm" data-v-94cf4dbd><div class="flex items-center gap-3" data-v-94cf4dbd><div class="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/30 flex-shrink-0" data-v-94cf4dbd> ✓ </div><div data-v-94cf4dbd><div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-black text-[11px] uppercase tracking-wider" data-v-94cf4dbd><span data-v-94cf4dbd>•</span> ${ssrInterpolate(unref(t)("checkBooking.paidVerified"))}</div><h4 class="text-lg font-black text-slate-900 dark:text-white mt-1" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.paidSuccessTitle"))}</h4></div></div><div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/30 space-y-1.5 shadow-sm" data-v-94cf4dbd><div class="text-xs sm:text-sm font-extrabold text-emerald-700 dark:text-emerald-300 flex items-center gap-2" data-v-94cf4dbd><span data-v-94cf4dbd>📧</span><span data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.invoiceSentNotice"))}</span></div><div class="text-sm sm:text-base font-black text-slate-900 dark:text-white font-mono break-all pl-6" data-v-94cf4dbd>${ssrInterpolate(selectedBooking.value.customerEmail)}</div><p class="text-[11px] text-slate-500 dark:text-slate-400 pl-6 leading-relaxed" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.invoiceExplain"))}</p></div><div class="flex flex-wrap items-center gap-2.5 pt-1 print:hidden" data-v-94cf4dbd><button type="button" class="flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-slate-900 hover:bg-black dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow transition-all flex items-center justify-center gap-2" data-v-94cf4dbd><span data-v-94cf4dbd>🖨️</span><span data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.printInvoice"))}</span></button><a${ssrRenderAttr("href", getWhatsAppContactUrl(selectedBooking.value))} target="_blank" class="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 hover:bg-emerald-200 transition-colors flex items-center justify-center gap-2" data-v-94cf4dbd><span data-v-94cf4dbd>💬</span><span data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.whatsappCs"))}</span></a></div></div></div>`);
					else if (isExpired(selectedBooking.value)) _push(`<div class="space-y-5" data-v-94cf4dbd><div class="p-6 rounded-3xl bg-rose-500/10 border-2 border-rose-500/40 text-rose-950 dark:text-rose-200 space-y-4 shadow-sm" data-v-94cf4dbd><div class="flex items-center gap-3" data-v-94cf4dbd><div class="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-rose-600/30 flex-shrink-0" data-v-94cf4dbd> ✕ </div><div data-v-94cf4dbd><div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-600/20 text-rose-800 dark:text-rose-300 font-black text-[11px] uppercase tracking-wider" data-v-94cf4dbd><span data-v-94cf4dbd>•</span> ${ssrInterpolate(unref(t)("checkBooking.cancelledTitle"))}</div><h4 class="text-lg font-black text-rose-700 dark:text-rose-400 mt-1" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.failedTitle"))}</h4></div></div><div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-500/30 space-y-1.5 shadow-sm" data-v-94cf4dbd><div class="text-xs sm:text-sm font-extrabold text-rose-700 dark:text-rose-400 flex items-center gap-2" data-v-94cf4dbd><span data-v-94cf4dbd>⚠️</span><span data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.statusNoticeLabel"))}</span></div><p class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 pl-6 leading-relaxed" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.expiredNotice"))}</p><p class="text-[11px] text-slate-500 dark:text-slate-400 pl-6 leading-relaxed" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.expiredExplain"))}</p></div><div class="pt-1 print:hidden" data-v-94cf4dbd><button type="button" class="w-full py-4 px-6 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-xl shadow-teal-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer" data-v-94cf4dbd><span data-v-94cf4dbd>🔄</span><span data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.rebookBtn"))}</span></button></div></div></div>`);
					else _push(`<!---->`);
					_push(`<div class="p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-5" data-v-94cf4dbd><div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-700" data-v-94cf4dbd><div data-v-94cf4dbd><span class="text-[10px] text-slate-400 uppercase tracking-widest font-black block" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.bookingCodeOfficial"))}</span><div class="flex items-center gap-2 mt-0.5" data-v-94cf4dbd><span class="font-mono font-black text-lg sm:text-xl text-[#108ee9]" data-v-94cf4dbd>${ssrInterpolate(selectedBooking.value.bookingCode)}</span><button type="button" class="px-2 py-1 rounded-md text-[11px] font-bold bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-sm flex items-center gap-1" data-v-94cf4dbd><span data-v-94cf4dbd>${ssrInterpolate(isCopied.value ? unref(t)("checkBooking.copied") : unref(t)("checkBooking.copy"))}</span></button></div></div><div class="text-right" data-v-94cf4dbd><span class="text-[10px] text-slate-400 uppercase tracking-widest font-black block" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.paymentMethodLabel"))}</span><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 text-[#108ee9] shadow-sm mt-0.5" data-v-94cf4dbd><img${ssrRenderAttr("src", _virtual_public__2Fdana_logo_default)} alt="DANA Official Logo" class="h-3.5 w-auto object-contain" data-v-94cf4dbd><span data-v-94cf4dbd>DANA Gapura SaaS</span></div></div></div><div class="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center" data-v-94cf4dbd><div class="sm:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm text-center" data-v-94cf4dbd><div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.qrBoardingPass"))}</div><div class="w-32 h-32 p-1.5 bg-white rounded-xl shadow-inner border border-slate-200 flex items-center justify-center" data-v-94cf4dbd><img${ssrRenderAttr("src", `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(selectedBooking.value.bookingCode)}`)}${ssrRenderAttr("alt", `QR ${selectedBooking.value.bookingCode}`)} class="w-full h-full object-contain" data-v-94cf4dbd></div><span class="text-[10px] text-slate-400 mt-2 font-mono" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.scanAtHarbor"))}</span></div><div class="sm:col-span-8 space-y-3 text-xs sm:text-sm" data-v-94cf4dbd><div data-v-94cf4dbd><span class="text-slate-400 text-[11px] block" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.tourPackage"))}</span><div class="font-extrabold text-slate-900 dark:text-white text-base" data-v-94cf4dbd>${ssrInterpolate(selectedBooking.value.tourPackage?.title || "Tour Package")}</div></div><div class="grid grid-cols-2 gap-3 pt-1 border-t border-slate-200 dark:border-slate-700" data-v-94cf4dbd><div data-v-94cf4dbd><span class="text-slate-400 text-[11px] block" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.customerName"))}</span><strong class="font-semibold text-slate-800 dark:text-slate-200" data-v-94cf4dbd>${ssrInterpolate(selectedBooking.value.customerName)}</strong></div><div data-v-94cf4dbd><span class="text-slate-400 text-[11px] block" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.customerEmail"))}</span><strong class="font-semibold text-slate-800 dark:text-slate-200 break-all" data-v-94cf4dbd>${ssrInterpolate(selectedBooking.value.customerEmail)}</strong></div><div data-v-94cf4dbd><span class="text-slate-400 text-[11px] block" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.tripDate"))}</span><strong class="font-semibold text-teal-600 dark:text-teal-400" data-v-94cf4dbd>${ssrInterpolate(selectedBooking.value.tourDate)}</strong></div><div data-v-94cf4dbd><span class="text-slate-400 text-[11px] block" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.paxCount"))}</span><strong class="font-semibold text-slate-800 dark:text-slate-200" data-v-94cf4dbd>${ssrInterpolate(selectedBooking.value.adultCount)} ${ssrInterpolate(unref(t)("checkBooking.adults"))}`);
					if (selectedBooking.value.childCount) _push(`<span data-v-94cf4dbd>, ${ssrInterpolate(selectedBooking.value.childCount)} ${ssrInterpolate(unref(t)("checkBooking.children"))}</span>`);
					else _push(`<!---->`);
					_push(`</strong></div></div>`);
					if (selectedBooking.value.customerNotes) _push(`<div class="pt-1 text-slate-500 dark:text-slate-400 text-[11px] italic" data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.notesLabel"))} &quot;${ssrInterpolate(selectedBooking.value.customerNotes)}&quot; </div>`);
					else _push(`<!---->`);
					_push(`</div></div><div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm" data-v-94cf4dbd><div class="flex justify-between text-slate-600 dark:text-slate-400" data-v-94cf4dbd><span data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.subtotalLabel"))}</span><span class="font-bold text-slate-900 dark:text-white" data-v-94cf4dbd> Rp ${ssrInterpolate((selectedBooking.value.subtotal || selectedBooking.value.totalAmount).toLocaleString("id-ID"))}</span></div>`);
					if (selectedBooking.value.discountAmount && selectedBooking.value.discountAmount > 0) _push(`<div class="flex justify-between text-teal-600 font-bold" data-v-94cf4dbd><span data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.discountLabel"))}</span><span data-v-94cf4dbd>- Rp ${ssrInterpolate(selectedBooking.value.discountAmount.toLocaleString("id-ID"))}</span></div>`);
					else _push(`<!---->`);
					_push(`<div class="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700 text-base font-black text-slate-900 dark:text-white" data-v-94cf4dbd><span data-v-94cf4dbd>${ssrInterpolate(unref(t)("checkBooking.totalPaidLabel"))}</span><span class="text-[#108ee9]" data-v-94cf4dbd> Rp ${ssrInterpolate((selectedBooking.value.totalAmount || 0).toLocaleString("id-ID"))}</span></div><div class="pt-3 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400" data-v-94cf4dbd><div class="flex items-center gap-2" data-v-94cf4dbd><span data-v-94cf4dbd>Didukung oleh:</span><div class="h-5 px-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs" data-v-94cf4dbd><img${ssrRenderAttr("src", _virtual_public__2Fdana_logo_default)} alt="DANA Official Logo" class="h-3 w-auto object-contain" data-v-94cf4dbd></div><span class="font-bold text-[#108ee9]" data-v-94cf4dbd>DANA Gapura SaaS Payment Gateway</span></div><span class="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold" data-v-94cf4dbd>✓ Terverifikasi Otomatis</span></div></div></div></div>`);
				} else _push(`<!---->`);
				_push(`</div></div></div>`);
			} else _push(`<!---->`);
		};
	}
});
// app/components/CheckBookingModal.vue
var _sfc_setup$1 = CheckBookingModal_vue_vue_type_script_setup_true_lang_default.setup;
CheckBookingModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CheckBookingModal.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var CheckBookingModal_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(CheckBookingModal_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-94cf4dbd"]]), { __name: "CheckBookingModal" });
// app/pages/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { locale } = useLanguage();
		const { getCompanyProfile} = useWisataApi();
		const companyInfo = ref({
			companyName: "Trip Nusapenida Explore",
			brandName: "Trip Nusapenida Explore",
			phone: "+62 823-4207-8184",
			whatsapp: "+62 823-4207-8184",
			email: "info@tripnusapenidaexplore.my.id",
			logoUrl: "/logo-trip.png",
			footerText: "© 2026 tripnusapenidaexplore. Seluruh hak cipta dilindungi undang-undang.",
			announcementText: "🌊 Promo Spesial Trip Nusa Penida — Pesan Sekarang!",
			announcementMobile: "🌊 Promo Trip Nusa Penida",
			announcementPromoCode: "",
			operatingHours: "Buka Setiap Hari (06:00 - 21:00 WITA)"
		});
		const cleanPhone = (val) => {
			if (!val) return "6281234567890";
			return val.replace(/\D/g, "");
		};
		try {
			const { data: initialProfile } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("company-profile", () => getCompanyProfile())), __temp = await __temp, __restore(), __temp);
			if (initialProfile?.value) companyInfo.value = {
				...companyInfo.value,
				...initialProfile.value
			};
		} catch (_) {}
		const selectedTourForDetail = ref(null);
		const selectedTourForBooking = ref(null);
		const isBookingModalOpen = ref(false);
		const rebookPrefill = ref(null);
		const isCheckBookingModalOpen = ref(false);
		const trackingBookingCode = ref("");
		const hasPendingBooking = ref(false);
		const pendingBookingCode = ref("");
		const searchFilter = ref({
			search: "",
			categoryId: "",
			destinationId: ""
		});
		const handleHeroSearch = (filters) => {
			searchFilter.value = { ...filters };
		};
		const handleCategorySelect = (catId) => {
			searchFilter.value.categoryId = catId;
		};
		const handleResetFilters = () => {
			searchFilter.value = {
				search: "",
				categoryId: "",
				destinationId: ""
			};
		};
		const openTourDetail = (tour) => {
			selectedTourForDetail.value = tour;
		};
		const openBooking = (tour) => {
			selectedTourForBooking.value = tour;
			rebookPrefill.value = null;
			isBookingModalOpen.value = true;
		};
		const handleDetailBook = (tour) => {
			selectedTourForDetail.value = null;
			openBooking(tour);
		};
		const openCheckBookingModal = (bookingCode) => {
			trackingBookingCode.value = bookingCode || "";
			isCheckBookingModalOpen.value = true;
		};
		const handleRebookFromTracker = (tour, previousData) => {
			isCheckBookingModalOpen.value = false;
			if (tour) selectedTourForBooking.value = tour;
			rebookPrefill.value = previousData || null;
			isBookingModalOpen.value = true;
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300" }, _attrs))}><div class="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white text-xs font-semibold py-2 px-4 text-center"><div class="max-w-7xl mx-auto flex items-center justify-between"><span class="hidden sm:inline">${ssrInterpolate(companyInfo.value.announcementText || "🌊 Promo Spesial Trip Nusa Penida — Pesan Sekarang!")} `);
			if (companyInfo.value.announcementPromoCode) _push(`<span class="font-mono bg-white/20 px-1.5 py-0.5 rounded ml-1">${ssrInterpolate(companyInfo.value.announcementPromoCode)}</span>`);
			else _push(`<!---->`);
			_push(`</span><span class="sm:hidden">${ssrInterpolate(companyInfo.value.announcementMobile || "🌊 Promo Trip Nusa Penida")}</span><div class="flex items-center gap-3 text-[11px]"><a${ssrRenderAttr("href", `https://wa.me/${cleanPhone(companyInfo.value.whatsapp || companyInfo.value.phone)}`)} target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 opacity-90 hover:opacity-100 hover:underline transition-all"><span>📞 CS: ${ssrInterpolate(companyInfo.value.whatsapp || companyInfo.value.phone || "+62 823-4207-8184")}</span></a></div></div></div>`);
			_push(ssrRenderComponent(Navbar_default, {
				onOpenCheckBooking: ($event) => openCheckBookingModal(""),
				"company-name": companyInfo.value.brandName,
				"logo-url": companyInfo.value.logoUrl,
				company: companyInfo.value
			}, null, _parent));
			if (hasPendingBooking.value) _push(`<div class="bg-amber-500/10 border-b border-amber-500/30 px-4 py-2 text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center justify-between gap-3 animate-in fade-in"><div class="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span><span>Anda memiliki transaksi menunggu pembayaran di <b>DANA Gapura Gateway</b> (${ssrInterpolate(pendingBookingCode.value)}).</span></div><div class="flex items-center gap-2.5"><div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] shadow-xs"><span class="text-slate-500 dark:text-slate-400 font-medium">Didukung oleh</span><img${ssrRenderAttr("src", _virtual_public__2Fdana_logo_default)} alt="DANA Official Logo" class="h-3 w-auto object-contain"></div><button type="button" class="px-3.5 py-1 rounded-lg bg-[#108ee9] text-white font-extrabold hover:bg-blue-600 shadow-sm transition-all"> Lihat Riwayat &amp; Bayar → </button></div></div></div>`);
			else _push(`<!---->`);
			_push(`<main class="flex-1">`);
			_push(ssrRenderComponent(HeroSection_default, {
				company: companyInfo.value,
				onSearch: handleHeroSearch
			}, null, _parent));
			_push(ssrRenderComponent(CategorySection_default, {
				company: companyInfo.value,
				onSelectCategory: handleCategorySelect
			}, null, _parent));
			_push(ssrRenderComponent(TourCatalog_default, {
				company: companyInfo.value,
				"external-search": searchFilter.value.search,
				"external-category": searchFilter.value.categoryId,
				"external-destination": searchFilter.value.destinationId,
				onViewDetail: openTourDetail,
				onBookTour: openBooking,
				onResetFilters: handleResetFilters
			}, null, _parent));
			_push(ssrRenderComponent(PromoSection_default, { company: companyInfo.value }, null, _parent));
			_push(ssrRenderComponent(TestimonialsSection_default, { company: companyInfo.value }, null, _parent));
			_push(`</main>`);
			_push(ssrRenderComponent(FooterSection_default, { company: companyInfo.value }, null, _parent));
			_push(ssrRenderComponent(TourDetailModal_default, {
				tour: selectedTourForDetail.value,
				onClose: ($event) => selectedTourForDetail.value = null,
				onBook: handleDetailBook
			}, null, _parent));
			_push(ssrRenderComponent(BookingModal_default, {
				"is-open": isBookingModalOpen.value,
				"selected-tour": selectedTourForBooking.value,
				prefill: rebookPrefill.value,
				onClose: ($event) => {
					isBookingModalOpen.value = false;
					rebookPrefill.value = null;
				},
				onOpenTracking: openCheckBookingModal
			}, null, _parent));
			_push(ssrRenderComponent(CheckBookingModal_default, {
				"is-open": isCheckBookingModalOpen.value,
				"initial-code": trackingBookingCode.value,
				onClose: ($event) => isCheckBookingModalOpen.value = false,
				onRebook: handleRebookFromTracker
			}, null, _parent));
			_push(`<div class="fixed bottom-6 right-6 z-30 flex flex-col gap-2.5 items-end"><button type="button" class="group flex items-center gap-2 px-4 sm:px-5 py-3 rounded-full bg-gradient-to-r from-teal-600 via-[#108ee9] to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-extrabold shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:scale-105 border-2 border-white dark:border-slate-800 transition-all"${ssrRenderAttr("title", unref(locale) === "en" ? "Open Transaction History & Ticket Tracking" : "Buka Riwayat Transaksi & Pelacakan Tiket")}><span class="text-base">📋</span><span class="text-xs sm:text-sm">${ssrInterpolate(unref(locale) === "en" ? "My Bookings" : "Riwayat Transaksi")}</span>`);
			if (hasPendingBooking.value) _push(`<span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping ml-0.5"${ssrRenderAttr("title", unref(locale) === "en" ? "Waiting for Payment" : "Menunggu Pembayaran")}></span>`);
			else _push(`<!---->`);
			_push(`</button></div></div>`);
		};
	}
});
// app/pages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = index_vue_vue_type_script_setup_true_lang_default;

export { pages_default as default };
//# sourceMappingURL=pages-CDx3nYsH.mjs.map
