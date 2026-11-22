import { t as tryUseNuxtApp, v as vforBound } from '../virtual/entry.mjs';
import { computed, ref, defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderList, ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';

// node_modules/nuxt/dist/app/components/render-list.js
function bound(source) {
	if (typeof source === "number" && source > 1e4 && tryUseNuxtApp()?.ssrContext?.islandContext) return vforBound(source);
	return source;
}
/**
* `ssrRenderList` from `vue/server-renderer`, with numeric sources clamped to
* `MAX_VFOR_LENGTH` while rendering a server component or island.
*
* @internal
*/
function ssrRenderList$2(source, renderItem) {
	ssrRenderList(bound(source), renderItem);
}
// app/components/SearchableSelect.vue?vue&type=script&setup=true&lang.ts
var SearchableSelect_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SearchableSelect",
	__ssrInlineRender: true,
	props: {
		modelValue: { default: "" },
		options: { default: () => [] },
		placeholder: { default: "-- Pilih --" },
		searchPlaceholder: { default: "Ketik untuk mencari..." },
		disabled: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: false
		},
		clearable: {
			type: Boolean,
			default: false
		}
	},
	emits: ["update:modelValue", "change"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const isOpen = ref(false);
		const searchQuery = ref("");
		const containerRef = ref(null);
		ref(null);
		const normalizedOptions = computed(() => {
			return props.options.map((opt) => {
				if (typeof opt === "string" || typeof opt === "number") return {
					value: opt,
					label: String(opt)
				};
				return opt;
			});
		});
		const selectedOption = computed(() => {
			return normalizedOptions.value.find((opt) => opt.value === props.modelValue) || null;
		});
		const filteredOptions = computed(() => {
			const q = searchQuery.value.trim().toLowerCase();
			if (!q) return normalizedOptions.value;
			return normalizedOptions.value.filter((opt) => {
				const lMatch = opt.label.toLowerCase().includes(q);
				const sMatch = opt.sublabel ? opt.sublabel.toLowerCase().includes(q) : false;
				const vMatch = String(opt.value).toLowerCase().includes(q);
				return lMatch || sMatch || vMatch;
			});
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "relative w-full text-left",
				ref_key: "containerRef",
				ref: containerRef
			}, _attrs))}><button type="button"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} class="${ssrRenderClass([[__props.disabled ? "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700" : "bg-slate-50 dark:bg-slate-950 hover:border-teal-500 cursor-pointer", isOpen.value ? "border-teal-500 ring-2 ring-teal-500/20" : "border-slate-300 dark:border-slate-700"], "w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition focus:ring-2 focus:ring-teal-500 focus:outline-none"])}"><div class="flex items-center gap-2 truncate flex-1">`);
			if (selectedOption.value?.icon) _push(`<span class="text-base shrink-0">${ssrInterpolate(selectedOption.value.icon)}</span>`);
			else _push(`<!---->`);
			if (selectedOption.value) {
				_push(`<span class="text-slate-900 dark:text-slate-100 truncate">${ssrInterpolate(selectedOption.value.label)} `);
				if (selectedOption.value.sublabel) _push(`<span class="text-slate-400 dark:text-slate-500 text-[11px] ml-1"> (${ssrInterpolate(selectedOption.value.sublabel)}) </span>`);
				else _push(`<!---->`);
				_push(`</span>`);
			} else _push(`<span class="text-slate-400 dark:text-slate-500 truncate">${ssrInterpolate(__props.placeholder || "-- Pilih Pilihan --")}</span>`);
			_push(`</div><div class="flex items-center gap-1.5 shrink-0 text-slate-400">`);
			if (__props.clearable && __props.modelValue && !__props.disabled) _push(`<button type="button" class="hover:text-red-500 p-0.5 rounded transition text-xs" title="Hapus pilihan"> ✕ </button>`);
			else _push(`<!---->`);
			_push(`<svg class="${ssrRenderClass([{ "rotate-180": isOpen.value }, "w-4 h-4 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div></button>`);
			if (__props.required) _push(`<input type="text"${ssrRenderAttr("value", __props.modelValue || "")} required class="sr-only" tabindex="-1">`);
			else _push(`<!---->`);
			if (isOpen.value) {
				_push(`<div class="absolute left-0 right-0 z-50 mt-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"><div class="p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70"><div class="relative flex items-center"><span class="absolute left-3 text-slate-400 text-xs">🔍</span><input${ssrRenderAttr("value", searchQuery.value)} type="text"${ssrRenderAttr("placeholder", __props.searchPlaceholder || "Cari pilihan...")} class="w-full pl-8 pr-7 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500">`);
				if (searchQuery.value) _push(`<button type="button" class="absolute right-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"> ✕ </button>`);
				else _push(`<!---->`);
				_push(`</div></div><div class="max-h-56 overflow-y-auto p-1.5 space-y-0.5">`);
				if (filteredOptions.value.length === 0) _push(`<div class="px-3 py-6 text-center text-xs text-slate-400"><span>Tidak ada hasil yang cocok dengan &quot;${ssrInterpolate(searchQuery.value)}&quot;</span></div>`);
				else _push(`<!---->`);
				_push(`<!--[-->`);
				ssrRenderList$2(filteredOptions.value, (opt) => {
					_push(`<button type="button" class="${ssrRenderClass([[opt.value === __props.modelValue ? "bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 font-semibold" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"], "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm transition text-left"])}"><div class="flex items-center gap-2 truncate">`);
					if (opt.icon) _push(`<span class="text-base shrink-0">${ssrInterpolate(opt.icon)}</span>`);
					else _push(`<!---->`);
					_push(`<div class="truncate"><div>${ssrInterpolate(opt.label)}</div>`);
					if (opt.sublabel) _push(`<div class="text-[10px] text-slate-400 dark:text-slate-500 font-normal">${ssrInterpolate(opt.sublabel)}</div>`);
					else _push(`<!---->`);
					_push(`</div></div>`);
					if (opt.badge) _push(`<span class="ml-2 px-2 py-0.5 text-[10px] rounded-full font-medium shrink-0 bg-slate-200/60 dark:bg-slate-700 text-slate-600 dark:text-slate-300">${ssrInterpolate(opt.badge)}</span>`);
					else if (opt.value === __props.modelValue) _push(`<span class="text-teal-600 dark:text-teal-400 font-bold ml-2">✓</span>`);
					else _push(`<!---->`);
					_push(`</button>`);
				});
				_push(`<!--]--></div></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// app/components/SearchableSelect.vue
var _sfc_setup = SearchableSelect_vue_vue_type_script_setup_true_lang_default.setup;
SearchableSelect_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SearchableSelect.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var SearchableSelect_default = Object.assign(SearchableSelect_vue_vue_type_script_setup_true_lang_default, { __name: "SearchableSelect" });
// app/composables/useTheme.ts
var currentTheme = ref("light");
function useTheme() {
	const applyTheme = (theme) => {
		currentTheme.value = theme;
	};
	const toggleTheme = () => {
		applyTheme(currentTheme.value === "dark" ? "light" : "dark");
	};
	return {
		theme: computed(() => currentTheme.value),
		isDark: computed(() => currentTheme.value === "dark"),
		setTheme: applyTheme,
		toggleTheme
	};
}

export { SearchableSelect_default as S, ssrRenderList$2 as s, useTheme as u };
//# sourceMappingURL=useTheme-jR-NkPQp.mjs.map
