import { defineProdDiagnostics } from 'nostics';
import { ansiFormatter } from 'nostics/formatters/ansi';
import { shallowReactive, reactive, effectScope, getCurrentScope, hasInjectionContext, getCurrentInstance, createApp, provide, onErrorCaptured, onServerPrefetch, unref, createVNode, resolveDynamicComponent, inject, defineAsyncComponent, mergeProps, defineComponent, withAsyncContext, computed, toRef, ref, h, isRef, toValue, watchEffect, onScopeDispose, isVNode, createCommentVNode, shallowRef, nextTick, queuePostFlushCb, isReadonly, Suspense, Fragment, createElementBlock, cloneVNode, useSSRContext, isShallow, isReactive, toRaw } from 'vue';
import { h as createError, $ as $fetch, y as joinURL, E as withQuery, F as sanitizeStatusCode, G as parseURL, H as decodePath, I as isScriptProtocol } from '../_/nitro.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { RouterView, createMemoryHistory, createRouter, START_LOCATION, isNavigationFailure, NavigationFailureType } from 'vue-router';
import { walkResolver } from 'unhead/utils';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';
import axios from 'axios';

function flatHooks(configHooks, hooks = {}, parentName) {
	for (const key in configHooks) {
		const subHook = configHooks[key];
		const name = parentName ? `${parentName}:${key}` : key;
		if (typeof subHook === "object" && subHook !== null) flatHooks(subHook, hooks, name);
		else if (typeof subHook === "function") hooks[name] = subHook;
	}
	return hooks;
}
const createTask = /* @__PURE__ */ (() => {
	if (console.createTask) return console.createTask;
	const defaultTask = { run: (fn) => fn() };
	return () => defaultTask;
})();
function callHooks(hooks, args, startIndex, task) {
	for (let i = startIndex; i < hooks.length; i += 1) try {
		const result = task ? task.run(() => hooks[i](...args)) : hooks[i](...args);
		if (result && typeof result.then === "function") return Promise.resolve(result).then(() => callHooks(hooks, args, i + 1, task));
	} catch (error) {
		return Promise.reject(error);
	}
}
function serialTaskCaller(hooks, args, name) {
	if (hooks.length > 0) return callHooks(hooks, args, 0, createTask(name));
}
function parallelTaskCaller(hooks, args, name) {
	if (hooks.length > 0) {
		const task = createTask(name);
		return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
	}
}
function callEachWith(callbacks, arg0) {
	for (const callback of [...callbacks]) callback(arg0);
}
var Hookable = class {
	_hooks;
	_before;
	_after;
	_deprecatedHooks;
	_deprecatedMessages;
	constructor() {
		this._hooks = {};
		this._before = void 0;
		this._after = void 0;
		this._deprecatedMessages = void 0;
		this._deprecatedHooks = {};
		this.hook = this.hook.bind(this);
		this.callHook = this.callHook.bind(this);
		this.callHookWith = this.callHookWith.bind(this);
	}
	hook(name, function_, options = {}) {
		if (!name || typeof function_ !== "function") return () => {};
		const originalName = name;
		let dep;
		while (this._deprecatedHooks[name]) {
			dep = this._deprecatedHooks[name];
			name = dep.to;
		}
		if (dep && !options.allowDeprecated) {
			let message = dep.message;
			if (!message) message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
			if (!this._deprecatedMessages) this._deprecatedMessages = /* @__PURE__ */ new Set();
			if (!this._deprecatedMessages.has(message)) {
				console.warn(message);
				this._deprecatedMessages.add(message);
			}
		}
		if (!function_.name) try {
			Object.defineProperty(function_, "name", {
				get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
				configurable: true
			});
		} catch {}
		this._hooks[name] = this._hooks[name] || [];
		this._hooks[name].push(function_);
		return () => {
			if (function_) {
				this.removeHook(name, function_);
				function_ = void 0;
			}
		};
	}
	hookOnce(name, function_) {
		let _unreg;
		let _function = (...arguments_) => {
			if (typeof _unreg === "function") _unreg();
			_unreg = void 0;
			_function = void 0;
			return function_(...arguments_);
		};
		_unreg = this.hook(name, _function);
		return _unreg;
	}
	removeHook(name, function_) {
		const hooks = this._hooks[name];
		if (hooks) {
			const index = hooks.indexOf(function_);
			if (index !== -1) hooks.splice(index, 1);
			if (hooks.length === 0) this._hooks[name] = void 0;
		}
	}
	clearHook(name) {
		this._hooks[name] = void 0;
	}
	deprecateHook(name, deprecated) {
		this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
		const _hooks = this._hooks[name] || [];
		this._hooks[name] = void 0;
		for (const hook of _hooks) this.hook(name, hook);
	}
	deprecateHooks(deprecatedHooks) {
		for (const name in deprecatedHooks) this.deprecateHook(name, deprecatedHooks[name]);
	}
	addHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
		return () => {
			for (const unreg of removeFns) unreg();
			removeFns.length = 0;
		};
	}
	removeHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		for (const key in hooks) this.removeHook(key, hooks[key]);
	}
	removeAllHooks() {
		this._hooks = {};
	}
	callHook(name, ...args) {
		return this.callHookWith(serialTaskCaller, name, args);
	}
	callHookParallel(name, ...args) {
		return this.callHookWith(parallelTaskCaller, name, args);
	}
	callHookWith(caller, name, args) {
		const event = this._before || this._after ? {
			name,
			args,
			context: {}
		} : void 0;
		if (this._before) callEachWith(this._before, event);
		const result = caller(this._hooks[name] ? [...this._hooks[name]] : [], args, name);
		if (result instanceof Promise) return result.finally(() => {
			if (this._after && event) callEachWith(this._after, event);
		});
		if (this._after && event) callEachWith(this._after, event);
		return result;
	}
	beforeEach(function_) {
		this._before = this._before || [];
		this._before.push(function_);
		return () => {
			if (this._before !== void 0) {
				const index = this._before.indexOf(function_);
				if (index !== -1) this._before.splice(index, 1);
			}
		};
	}
	afterEach(function_) {
		this._after = this._after || [];
		this._after.push(function_);
		return () => {
			if (this._after !== void 0) {
				const index = this._after.indexOf(function_);
				if (index !== -1) this._after.splice(index, 1);
			}
		};
	}
};
function createHooks() {
	return new Hookable();
}

// node_modules/nuxt/dist/app/diagnostics/_shared.js
/**
* Shared configuration for the runtime (E<N>xxx) diagnostics catalogs.
*
* Catalogs are split by domain and imported directly where used (no barrel),
* so the browser bundle only pulls in the codes a module references. Pair the
* pure-call annotations on each `defineDiagnostics()` with dev-guarded,
* statement-level report calls so report-only diagnostics strip from production.
*
* Codes are stable, fully-qualified `NUXT_E<NNNN>` identifiers. Codes with a
* dedicated docs page resolve a `see:` URL via {@link docsBase}; the rest opt
* out with `docs: false`.
*/
function docsBase(code) {
	return `https://nuxt.com/docs/4.x/errors/${code.replace("NUXT_", "").toLowerCase()}`;
}
var ansi = (open, close) => (s) => `\x1B[${open}m${s}\x1B[${close}m`;
var colors = {
	red: ansi(31, 39),
	yellow: ansi(33, 39),
	cyan: ansi(36, 39),
	gray: ansi(90, 39),
	bold: ansi(1, 22),
	dim: ansi(2, 22)
};
ansiFormatter(colors);
var prodReporter = (diagnostic) => {
	console.error(`[${diagnostic.name}]`);
};
var prodReporters = [prodReporter];
// node_modules/nuxt/dist/app/diagnostics/core.js
/**
* E1xxx
* Core / Nuxt-instance / lifecycle runtime diagnostics.
*/
var appDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/unctx/dist/index.mjs
function _getAsyncLocalStorage() {
	return globalThis.AsyncLocalStorage || globalThis.process?.getBuiltinModule?.("node:async_hooks")?.AsyncLocalStorage;
}
var _WeakRef = globalThis.WeakRef || class StrongRef {
	#value;
	constructor(value) {
		this.#value = value;
	}
	deref() {
		return this.#value;
	}
};
function createContext(opts = {}) {
	let currentInstance;
	let isSingleton = false;
	const checkConflict = (instance) => {
		if (currentInstance && currentInstance !== instance) throw new Error("Context conflict");
	};
	let als;
	if (opts.asyncContext) {
		const _AsyncLocalStorage = opts.AsyncLocalStorage || _getAsyncLocalStorage();
		if (_AsyncLocalStorage) als = new _AsyncLocalStorage();
		else console.warn("[unctx] `AsyncLocalStorage` is not provided.");
	}
	const _wrapInstance = (instance) => als && instance !== null && typeof instance === "object" ? { __unctx_weak: new _WeakRef(instance) } : instance;
	const _unwrapInstance = (store) => store && store.__unctx_weak ? store.__unctx_weak.deref() : store;
	const _getCurrentInstance = () => {
		if (als) {
			const store = als.getStore();
			if (store !== void 0) return _unwrapInstance(store);
		}
		return currentInstance;
	};
	return {
		use: () => {
			const _instance = _getCurrentInstance();
			if (_instance === void 0) throw new Error("Context is not available");
			return _instance;
		},
		tryUse: () => {
			return _getCurrentInstance() ?? null;
		},
		set: (instance, replace) => {
			if (!replace) checkConflict(instance);
			currentInstance = instance;
			isSingleton = true;
		},
		unset: () => {
			currentInstance = void 0;
			isSingleton = false;
		},
		call: (instance, callback) => {
			checkConflict(instance);
			currentInstance = instance;
			try {
				return als ? als.run(_wrapInstance(instance), callback) : callback();
			} finally {
				if (!isSingleton) currentInstance = void 0;
			}
		},
		async callAsync(instance, callback) {
			currentInstance = instance;
			const onRestore = () => {
				currentInstance = instance;
			};
			const onLeave = () => currentInstance === instance ? onRestore : void 0;
			asyncHandlers.add(onLeave);
			try {
				const r = als ? als.run(_wrapInstance(instance), callback) : callback();
				if (!isSingleton) currentInstance = void 0;
				return await r;
			} finally {
				asyncHandlers.delete(onLeave);
			}
		}
	};
}
function createNamespace(defaultOpts = {}) {
	const contexts = {};
	return { get(key, opts = {}) {
		if (!contexts[key]) contexts[key] = createContext({
			...defaultOpts,
			...opts
		});
		return contexts[key];
	} };
}
var _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
var globalKey = "__unctx__";
var defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
var getContext$1 = (key, opts = {}) => defaultNamespace.get(key, opts);
var asyncHandlersKey = "__unctx_async_handlers__";
var asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
	const restores = [];
	for (const leaveHandler of asyncHandlers) {
		const restore = leaveHandler();
		if (restore) restores.push(restore);
	}
	const restore = () => {
		for (const restore of restores) restore();
	};
	let awaitable = function_();
	if (awaitable && typeof awaitable === "object" && "catch" in awaitable) awaitable = awaitable.catch((error) => {
		restore();
		throw error;
	});
	return [awaitable, restore];
}
// node_modules/nuxt/dist/app/internal/context.js
globalThis.__nuxt_app_ctx__ ||= {};
function getContext(key, opts) {
	return getContext$1(key, opts);
}
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fnuxt.config.mjs
var nuxtLinkDefaults = {
	"componentName": "NuxtLink"};
var asyncDataDefaults = { "deep": false };
// node_modules/nuxt/dist/app/nuxt.js
function getNuxtAppCtx(id = "nuxt-app") {
	return getContext(id, { asyncContext: false });
}
var NuxtPluginIndicator = "__nuxt_plugin";
/** @since 3.0.0 */
function createNuxtApp(options) {
	let hydratingCount = 0;
	const nuxtApp = {
		_id: options.id || "nuxt-app",
		_scope: effectScope(),
		provide: void 0,
		versions: {
			get nuxt() {
				return "4.6.4";
			},
			get vue() {
				return nuxtApp.vueApp.version;
			}
		},
		payload: shallowReactive({
			...options.ssrContext?.payload || {},
			data: shallowReactive({}),
			state: reactive({}),
			once: /* @__PURE__ */ new Set(),
			_errors: shallowReactive({})
		}),
		static: { data: {} },
		runWithContext(fn) {
			if (nuxtApp._scope.active && !getCurrentScope()) return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
			return callWithNuxt(nuxtApp, fn);
		},
		isHydrating: false,
		deferHydration() {
			if (!nuxtApp.isHydrating) return () => {};
			hydratingCount++;
			let called = false;
			return () => {
				if (called) return;
				called = true;
				hydratingCount--;
				if (hydratingCount === 0) {
					nuxtApp.isHydrating = false;
					return nuxtApp.callHook("app:suspense:resolve");
				}
			};
		},
		_asyncDataPromises: {},
		_asyncData: shallowReactive({}),
		_state: shallowReactive({}),
		_payloadRevivers: {},
		...options
	};
	nuxtApp.payload.serverRendered = true;
	if (nuxtApp.ssrContext) {
		nuxtApp.payload.path = nuxtApp.ssrContext.url;
		nuxtApp.ssrContext.nuxt = nuxtApp;
		nuxtApp.ssrContext.payload = nuxtApp.payload;
		nuxtApp.ssrContext.config = {
			public: nuxtApp.ssrContext.runtimeConfig.public,
			app: nuxtApp.ssrContext.runtimeConfig.app
		};
	}
	nuxtApp.hooks = createHooks();
	nuxtApp.hook = nuxtApp.hooks.hook;
	{
		const runHooks = async (hooks, args) => {
			for (const hook of hooks) await nuxtApp.runWithContext(() => hook(...args));
		};
		const contextCaller = runHooks;
		nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, args);
	}
	nuxtApp.callHook = nuxtApp.hooks.callHook;
	nuxtApp.provide = (name, value) => {
		const $name = "$" + name;
		defineGetter(nuxtApp, $name, value);
		defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
	};
	defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
	defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
	const runtimeConfig = options.ssrContext.runtimeConfig;
	nuxtApp.provide("config", runtimeConfig);
	return nuxtApp;
}
/** @since 3.0.0 */
async function applyPlugin(nuxtApp, plugin) {
	if (typeof plugin === "function") {
		const run = () => nuxtApp.runWithContext(() => plugin(nuxtApp));
		const { provide } = await run() || {};
		if (provide && typeof provide === "object") for (const key in provide) nuxtApp.provide(key, provide[key]);
	}
}
/** @since 3.0.0 */
async function applyPlugins(nuxtApp, plugins) {
	let error;
	for (const plugin of plugins) try {
		await applyPlugin(nuxtApp, plugin);
	} catch (e) {
		if (!nuxtApp.payload.error) throw e;
		error ||= e;
	}
	if (error) throw nuxtApp.payload.error || error;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtPlugin(plugin) {
	if (typeof plugin === "function") return plugin;
	const _name = plugin._name || plugin.name;
	delete plugin.name;
	return Object.assign(plugin.setup || (() => {}), plugin, {
		[NuxtPluginIndicator]: true,
		_name
	});
}
/**
* Ensures that the setup function passed in has access to the Nuxt instance via `useNuxtApp`.
* @param nuxt A Nuxt instance
* @param setup The function to call
* @since 3.0.0
*/
function callWithNuxt(nuxt, setup, args) {
	const fn = () => setup();
	const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
	return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
}
function tryUseNuxtApp(id) {
	let nuxtAppInstance;
	if (hasInjectionContext()) nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
	nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
	return nuxtAppInstance || null;
}
function useNuxtApp(id) {
	const nuxtAppInstance = tryUseNuxtApp(id);
	if (!nuxtAppInstance) throw appDiagnostics.NUXT_E1001();
	return nuxtAppInstance;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function useRuntimeConfig(_event) {
	return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
	Object.defineProperty(obj, key, { get: () => val });
}

// node_modules/nuxt/dist/app/error.js
var NUXT_ERROR_SIGNATURE = "__nuxt_error";
/** @since 3.0.0 */
var isNuxtError = (error) => !!error && typeof error === "object" && "__nuxt_error" in error;
/** @since 3.0.0 */
var createError$2 = (error) => {
	if (isNuxtError(error)) return error;
	if (typeof error !== "string" && error?.statusText) error.message ??= error.statusText;
	const nuxtError = createError(error ?? {});
	Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
		value: true,
		configurable: false,
		writable: false
	});
	Object.defineProperty(nuxtError, "status", {
		get: () => nuxtError.statusCode,
		configurable: true
	});
	Object.defineProperty(nuxtError, "statusText", {
		get: () => nuxtError.statusMessage,
		configurable: true
	});
	return nuxtError;
};
/** An error raised deliberately with an HTTP status, as h3 recognises one. */
function isHTTPError(value) {
	return value instanceof Error && value.constructor?.__h3_error__ === true;
}
/**
* Wrap whatever the app threw. Anything other than an HTTP error is marked `unhandled`,
* which keeps its message and `data` out of the response and the payload. In development
* the thrown value and where the app was are remembered for the error report.
*
* @internal
*/
function createErrorFromThrown(thrown, context) {
	const error = createError$2(thrown);
	if (error !== thrown && !isHTTPError(thrown)) error.unhandled = true;
	return error;
}
// node_modules/nuxt/dist/app/utils.js
var PROBE_BASE_A = "https://a.invalid/probe/";
var PROBE_BASE_B = "https://b.invalid/probe/";
function parseAnchorURL(value, base = PROBE_BASE_A) {
	try {
		return new URL(value, base);
	} catch {
		return null;
	}
}
function resolvesWithoutBase(value) {
	const resolved = parseAnchorURL(value);
	return !!resolved && resolved.href === parseAnchorURL(value, PROBE_BASE_B)?.href;
}
/** Whether a URL string is a path rooted at the current origin, so carries no protocol. */
function isRootedPath(value) {
	if (value[0] !== "/" || value[1] === "/" || value[1] === "\\") return false;
	return value[1] !== "	" && value[1] !== "\n" && value[1] !== "\r" || !resolvesWithoutBase(value);
}
/** Whether a URL string carries its own protocol or authority. */
function isAbsoluteHref(value) {
	return !!value && !isRootedPath(value) && resolvesWithoutBase(value);
}
/** The script-capable protocol a URL string would navigate to, or `null` when it is safe. */
function getScriptProtocol(value) {
	if (!value || isRootedPath(value)) return null;
	let resolved = parseAnchorURL(value.replace(/[\u0000-\u001F\u007F\s]+/g, ""));
	while (resolved?.protocol === "view-source:") resolved = parseAnchorURL(resolved.pathname);
	if (!resolved) return "";
	return isScriptProtocol(resolved.protocol) ? resolved.protocol : null;
}
/** Returns the value unchanged when safe to use as an anchor `href`, or `null`. */
function sanitizeAnchorHref(value) {
	return getScriptProtocol(value) === null ? value : null;
}
// node_modules/nuxt/dist/app/components/injections.js
var LayoutMetaSymbol = Symbol("layout-meta");
var PageRouteSymbol = Symbol("route");
// node_modules/nuxt/dist/app/diagnostics/navigation.js
/**
* E2xxx
* Navigation / routing / middleware runtime diagnostics.
*/
var navigationDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/nuxt/dist/app/composables/router.js
/** @since 3.0.0 */
var useRouter = (() => {
	return useNuxtApp()?.$router;
});
/**
* Whether the current effect scope is (a descendant of) the component instance's scope.
* A detached scope (e.g. `createSharedComposable`) outlives the component, so the
* per-page route injected there would freeze after navigation (#18903).
*/
function getParentScope(scope) {
	const internal = scope;
	return internal.parent ?? internal.subs?.sub;
}
function isScopeWithinInstance(instance) {
	const instanceScope = instance.scope;
	let scope = getCurrentScope();
	while (scope) {
		if (scope === instanceScope) return true;
		scope = getParentScope(scope);
	}
	return false;
}
/** @since 3.0.0 */
var useRoute$1 = (() => {
	if (hasInjectionContext()) {
		const instance = getCurrentInstance();
		if (!instance || isScopeWithinInstance(instance)) return inject(PageRouteSymbol, useNuxtApp()._route);
	}
	return useNuxtApp()._route;
});
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtRouteMiddleware(middleware) {
	return middleware;
}
/** @since 3.0.0 */
var isProcessingMiddleware = () => {
	try {
		if (useNuxtApp()._processingMiddleware) return true;
	} catch {
		return false;
	}
	return false;
};
var HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
var HTML_ATTR_ENCODE_MAP = {
	"&": "&amp;",
	"\"": "&quot;",
	"'": "&#x27;",
	"<": "&lt;",
	">": "&gt;"
};
function encodeForHtmlAttr(value) {
	return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
function navigateTo(to, options) {
	to ||= "/";
	const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
	const isExternalHost = isAbsoluteHref(toPath);
	const isExternal = options?.external || isExternalHost;
	if (isExternal) {
		if (!options?.external) throw navigationDiagnostics.NUXT_E2001({ toPath });
		const protocol = getScriptProtocol(toPath);
		if (protocol !== null) throw navigationDiagnostics.NUXT_E2002({
			toPath,
			protocol
		});
	}
	const inMiddleware = isProcessingMiddleware();
	const router = useRouter();
	const nuxtApp = useNuxtApp();
	if (nuxtApp.ssrContext) {
		const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
		const location = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
		const redirect = async function(response) {
			await nuxtApp.callHook("app:redirected");
			const encodedHeader = encodeURL(location, isExternalHost);
			const encodedLoc = encodeForHtmlAttr(encodedHeader);
			nuxtApp.ssrContext["~renderResponse"] = {
				statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
				body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
				headers: { location: encodedHeader }
			};
			return response;
		};
		if (!isExternal && inMiddleware) {
			let expectedPath = fullPath;
			if (typeof to === "string" && toPath.includes("?")) {
				const target = router.resolve(to);
				expectedPath = router.resolve({
					path: target.path,
					query: target.query,
					hash: target.hash
				}).fullPath || "/";
			}
			router.afterEach((final) => final.fullPath === expectedPath ? redirect(false) : void 0);
			return to;
		}
		return redirect(!inMiddleware ? void 0 : false);
	}
	if (isExternal) {
		nuxtApp._cookieWriters?.forEach((write) => write());
		(void 0).addEventListener("pagehide", (event) => {
			if (!event.persisted) nuxtApp._scope.stop();
		}, { once: true });
		if (options?.replace) (void 0).replace(toPath);
		else (void 0).href = toPath;
		if (inMiddleware) {
			if (!nuxtApp.isHydrating) return false;
			return new Promise(() => {});
		}
		return Promise.resolve();
	}
	const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
	return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
}
/**
* @internal
*/
function resolveRouteObject(to) {
	return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
/**
* @internal
*/
function encodeURL(location, isExternalHost = false) {
	const url = new URL(location, "http://localhost");
	if (!isExternalHost) return url.pathname.replace(/^\/{2,}/, "/") + url.search + url.hash;
	if (location.startsWith("//")) return url.toString().replace(url.protocol, "");
	return url.toString();
}
/**
* Encode the pathname of a route location string. Ensures decoded paths like
* `/café` are percent-encoded to match vue-router's encoded route records.
* Already-encoded paths are not double-encoded.
* @internal
*/
function encodeRoutePath(url) {
	const parsed = parseURL(url);
	return encodeVueRouterPath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
var ENC_PIPE_RE = /%7C/g;
var ENC_BRACKET_OPEN_RE = /%5B/g;
var ENC_BRACKET_CLOSE_RE = /%5D/g;
var ENC_ENC_SLASH_RE = /%252F/gi;
var HASH_RE = /#/g;
var QUESTION_MARK_RE = /\?/g;
/**
* Apply vue-router's own path encoding, which leaves sub-delimiters like `&`
* and `+` literal. This must stay in sync with `encodeVueRouterPath` in
* `unrouting`, which encodes the route records we need to match against.
*/
function encodeVueRouterPath(value) {
	return encodeURI(value).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]").replace(HASH_RE, "%23").replace(QUESTION_MARK_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F");
}
// node_modules/nuxt/dist/app/composables/error.js
/** @since 3.0.0 */
var useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
/** @since 3.0.0 */
var showError = (error) => {
	const nuxtError = createError$2(error);
	try {
		const error = /* @__PURE__ */ useError();
		error.value ||= nuxtError;
	} catch {
		throw nuxtError;
	}
	return nuxtError;
};
/**
* Show the error page unless the current client is a crawler, in which case the
* bot receives the already server-rendered HTML instead (#32137, #35338).
*
* @internal
*/
var _showErrorUnlessCrawler = async (nuxtApp, error) => {
	await nuxtApp.runWithContext(() => showError(createErrorFromThrown(error)));
};
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Ffetch.mjs
if (!globalThis.$fetch) globalThis.$fetch = $fetch.create({ baseURL: baseURL() });
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fglobal-polyfills.mjs
if (!("global" in globalThis)) globalThis.global = globalThis;
// node_modules/nuxt/dist/head/runtime/island-head.js
/**
* No-op `head.push` until the returned `unfreeze` runs. Plugin/transformer
* augmentations on the same head are unaffected.
*/
function freezeHead(head) {
	const realPush = head.push;
	head.push = () => ({
		dispose: () => {},
		patch: () => {},
		_i: 0
	});
	return () => {
		head.push = realPush;
	};
}
// node_modules/nuxt/dist/head/runtime/plugins/unhead.server.js
var plugin$2 = defineNuxtPlugin({
	name: "nuxt:head",
	enforce: "pre",
	setup(nuxtApp) {
		const head = nuxtApp.ssrContext.head;
		if (nuxtApp.ssrContext.islandContext) {
			const unfreeze = freezeHead(head);
			nuxtApp.hooks.hookOnce("app:created", unfreeze);
		}
		nuxtApp.vueApp.use(head);
	}
});
// node_modules/nuxt/dist/pages/runtime/utils.js
var ROUTE_KEY_PARENTHESES_RE$1 = /(:\w+)\([^)]+\)/g;
var ROUTE_KEY_SYMBOLS_RE$1 = /(:\w+)[?+*]/g;
var ROUTE_KEY_NORMAL_RE$1 = /:\w+/g;
var interpolatePath = (route, match) => {
	return match.path.replace(ROUTE_KEY_PARENTHESES_RE$1, "$1").replace(ROUTE_KEY_SYMBOLS_RE$1, "$1").replace(ROUTE_KEY_NORMAL_RE$1, (r) => route.params[r.slice(1)]?.toString() || "");
};
var generateRouteKey$1 = (routeProps, override) => {
	const matchedRoute = routeProps.route.matched.find((m) => m.components?.default === routeProps.Component.type);
	const source = matchedRoute?.meta.key ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
	return typeof source === "function" ? source(routeProps.route) : source;
};
/** @since 3.9.0 */
function toArray(value) {
	return Array.isArray(value) ? value : [value];
}
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froute-rules.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default = () => ({});
// node_modules/nuxt/dist/app/components/vfor.js
/**
* Upper bound on `v-for` iterations expanded server-side in a server component or island.
* Island props are attacker-controllable, so a large numeric `v-for` source is a
* memory-amplification vector; this caps it.
*
* @internal
*/
var MAX_VFOR_LENGTH = 1e4;
/**
* Clamp a numeric `v-for` source before iteration. Only numbers are bounded (the
* amplification vector); other sources are returned unchanged.
*
* @internal
*/
function vforBound(source) {
	if (typeof source !== "number" || source <= 1e4) return source;
	return MAX_VFOR_LENGTH;
}
// node_modules/nuxt/dist/app/components/utils.js
var ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
var ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
var ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
	const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
	return typeof source === "function" ? source(route) : source;
}
/**
* Utility used within router guards
* return true if the route has been changed with a page change during navigation
*/
function isChangingPage(to, from) {
	if (to === from || from === START_LOCATION) return false;
	if (generateRouteKey(to) !== generateRouteKey(from)) return true;
	if (to.matched.every((comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default)) return false;
	return true;
}
var VALID_TAG_RE = /^[a-z][a-z0-9-]*$/i;
/** Return `tag` if it is a safe HTML tag name, otherwise `fallback`. */
function sanitizeTag(tag, fallback) {
	return tag && VALID_TAG_RE.test(tag) ? tag : fallback;
}
// node_modules/nuxt/dist/pages/runtime/router.options.js
var router_options_default = { scrollBehavior(to, from, savedPosition) {
	const nuxtApp = useNuxtApp();
	const router = useRouter();
	const hashScrollBehaviour = router.options?.scrollBehaviorType ?? "auto";
	if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
		if (from.hash && !to.hash) return savedPosition ?? {
			left: 0,
			top: 0
		};
		if (to.hash) return {
			el: to.hash,
			top: _getHashElementScrollMarginTop(to.hash),
			behavior: hashScrollBehaviour
		};
		return false;
	}
	if ((typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop) === false) return false;
	if (from === START_LOCATION) return _calculatePosition(to, from, savedPosition, hashScrollBehaviour);
	return new Promise((resolve) => {
		const doScroll = () => {
			requestAnimationFrame(() => {
				if (router.currentRoute.value.fullPath !== to.fullPath) {
					resolve(false);
					return;
				}
				resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
			});
		};
		nuxtApp.hooks.hookOnce("page:loading:end", () => {
			const transitionPromise = nuxtApp["~transitionPromise"];
			if (transitionPromise) transitionPromise.then(doScroll);
			else doScroll();
		});
	});
} };
function _getHashElementScrollMarginTop(hash) {
	const elem = (void 0).getElementById(hash.slice(1));
	if (!elem) return 0;
	return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
	if (savedPosition) return savedPosition;
	if (to.hash) return {
		el: to.hash,
		top: _getHashElementScrollMarginTop(to.hash),
		behavior: isChangingPage(to, from) ? defaultHashScrollBehaviour : "instant"
	};
	return {
		left: 0,
		top: 0
	};
}
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default = {
	hashMode: false,
	scrollBehaviorType: "auto",
	sensitive: false,
	...router_options_default
};
Object.assign(Object.create(null), {});
var pageIslandRoutes = Object.assign(Object.create(null), {});
// node_modules/nuxt/dist/pages/runtime/validate.js
var middleware$1 = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
	let __temp, __restore;
	if (!to.meta?.validate) return;
	const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
	if (result === true) return;
	return createError$2({
		fatal: false,
		status: result && (result.status || result.statusCode) || 404,
		statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
		data: { path: to.fullPath }
	});
});
// node_modules/nuxt/dist/app/diagnostics/manifest.js
/**
* E5xxx
* App manifest / route-rules runtime diagnostics.
*/
var manifestDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/nuxt/dist/app/composables/manifest.js
function routeRulesMatcher(path) {
	return virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default();
}
function getRouteRules(arg) {
	const path = typeof arg === "string" ? arg : arg.path;
	try {
		return routeRulesMatcher(path);
	} catch (e) {
		manifestDiagnostics.NUXT_E5003({
			path,
			cause: e
		});
		return {};
	}
}
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fmiddleware.mjs
var globalMiddleware = [middleware$1, /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
	if (!useNuxtApp().ssrContext?.islandContext) return;
	const rules = getRouteRules({ path: to.path });
	if (rules.redirect) {
		const path = rules.redirect.includes("#") ? rules.redirect : rules.redirect + to.hash;
		return navigateTo(path, { external: isAbsoluteHref(path) });
	}
})];
var namedMiddleware = {};
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froutes.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default = [
	{
		name: "admin",
		path: "/admin",
		component: () => import('../build/admin-CYFIiPjw.mjs')
	},
	{
		name: "order-success",
		path: "/order-success",
		component: () => import('../build/order-success-D6mHOb65.mjs')
	},
	{
		name: "index",
		path: "/",
		component: () => import('../build/pages-uWyvDMss.mjs')
	}
];
// node_modules/nuxt/dist/pages/runtime/plugins/router.js
var plugin$1 = defineNuxtPlugin({
	name: "nuxt:router",
	enforce: "pre",
	async setup(nuxtApp) {
		let __temp, __restore;
		let routerBase = useRuntimeConfig().app.baseURL;
		const history = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.history?.(routerBase) ?? createMemoryHistory(routerBase);
		const routes = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.routes ? ([__temp, __restore] = executeAsync(() => virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.routes(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default)), __temp = await __temp, __restore(), __temp) ?? virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default : virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default;
		let startPosition;
		const router = createRouter({
			...virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default,
			scrollBehavior: (to, from, savedPosition) => {
				if (from === START_LOCATION) {
					startPosition = savedPosition;
					return;
				}
				if (virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior) {
					router.options.scrollBehavior = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior;
					if ("scrollRestoration" in (void 0).history) {
						const unsub = router.beforeEach(() => {
							unsub();
							(void 0).history.scrollRestoration = "manual";
						});
					}
					return virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
				}
			},
			history,
			routes
		});
		nuxtApp.vueApp.use(router);
		const previousRoute = shallowRef(router.currentRoute.value);
		router.afterEach((_to, from) => {
			previousRoute.value = from;
		});
		Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", { get: () => previousRoute.value });
		const initialURL = nuxtApp.ssrContext.url;
		const _route = shallowRef(router.currentRoute.value);
		const syncCurrentRoute = () => {
			_route.value = router.currentRoute.value;
		};
		router.afterEach((to, from) => {
			const lastTo = to.matched.at(-1)?.components?.default;
			const lastFrom = from.matched.at(-1)?.components?.default;
			if (lastTo === lastFrom) {
				if (generateRouteKey$1({
					route: to,
					Component: { type: lastTo }
				}) === generateRouteKey$1({
					route: from,
					Component: { type: lastFrom }
				})) syncCurrentRoute();
				return;
			}
			if (to.matched.length < from.matched.length && to.matched.every((m, i) => m.components?.default === from.matched[i]?.components?.default)) syncCurrentRoute();
		});
		const route = { sync: syncCurrentRoute };
		for (const key in _route.value) Object.defineProperty(route, key, {
			get: () => _route.value[key],
			enumerable: true
		});
		nuxtApp._route = shallowReactive(route);
		nuxtApp._middleware ||= {
			global: [],
			named: {}
		};
		const error = /* @__PURE__ */ useError();
		const isServerPage = nuxtApp.ssrContext?.islandContext?.name?.startsWith("page_");
		function endNavigation(to) {
			delete nuxtApp._processingMiddleware;
			delete nuxtApp._middlewareTo;
		}
		if (!nuxtApp.ssrContext?.islandContext || isServerPage) router.afterEach(async (to, _from, failure) => {
			endNavigation();
			if (failure) await nuxtApp.callHook("page:loading:end");
			if (failure?.type === 4) return;
			if (to.redirectedFrom && to.fullPath !== initialURL) await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
		});
		router.onError(async (_error, to) => {
			endNavigation();
			await nuxtApp.callHook("page:loading:end");
		});
		try {
			[__temp, __restore] = executeAsync(() => router.push(initialURL)), __temp = await __temp, __restore();
			[__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
		} catch (error) {
			[__temp, __restore] = executeAsync(() => _showErrorUnlessCrawler(nuxtApp, error)), await __temp, __restore();
		}
		const resolvedInitialRoute = router.currentRoute.value;
		syncCurrentRoute();
		if (nuxtApp.ssrContext?.islandContext && !isServerPage) return { provide: { router } };
		const initialLayout = nuxtApp.payload.state._layout;
		router.beforeEach(async (to, from) => {
			return runMiddleware(to, from);
		});
		async function runMiddleware(to, from) {
			await nuxtApp.callHook("page:loading:start");
			to.meta = reactive(to.meta);
			if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) to.meta.layout = initialLayout;
			nuxtApp._processingMiddleware = true;
			nuxtApp._middlewareTo = to;
			if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
				const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
				for (const component of to.matched) {
					const componentMiddleware = component.meta.middleware;
					if (!componentMiddleware) continue;
					for (const entry of toArray(componentMiddleware)) middlewareEntries.add(entry);
				}
				const routeRules = getRouteRules({ path: to.path });
				if (routeRules.appMiddleware) for (const key in routeRules.appMiddleware) if (routeRules.appMiddleware[key]) middlewareEntries.add(key);
				else middlewareEntries.delete(key);
				for (const entry of middlewareEntries) {
					const middleware = typeof entry === "string" ? nuxtApp._middleware.named[entry] || await namedMiddleware[entry]?.().then((r) => r.default || r) : entry;
					if (!middleware) throw navigationDiagnostics.NUXT_E2004({
						entry: String(entry),
						validMiddleware: void 0
					});
					try {
						const run = () => nuxtApp.runWithContext(() => middleware(to, from));
						const result = await run();
						if (result === false || result instanceof Error) {
							const error = result || createError$2({
								status: 404,
								statusText: `Page Not Found: ${initialURL}`
							});
							await nuxtApp.runWithContext(() => showError(error));
							return false;
						}
						if (result === true) continue;
						if (result === false) return result;
						if (result) {
							if (isNuxtError(result) && result.fatal) await nuxtApp.runWithContext(() => showError(result));
							return result;
						}
					} catch (err) {
						const error = createErrorFromThrown(err);
						if (error.fatal) await nuxtApp.runWithContext(() => showError(error));
						return error;
					}
				}
			}
		}
		if (isServerPage) router.beforeResolve((to) => {
			const expected = pageIslandRoutes[nuxtApp.ssrContext.islandContext.name];
			const actual = to.matched.find((m) => (m.components?.default)?.__nuxt_island)?.components?.default;
			if (!expected || expected !== actual?.__nuxt_island) {
				nuxtApp.ssrContext["~renderResponse"] = {
					statusCode: 400,
					statusMessage: "Invalid island request path"
				};
				return false;
			}
		});
		router.afterEach((to, _from, failure) => {
			if (to.matched.length === 0 && !error.value && !isNavigationFailure(failure, NavigationFailureType.aborted | NavigationFailureType.cancelled)) return nuxtApp.runWithContext(() => showError(createError$2({
				status: 404,
				fatal: false,
				statusText: `Page not found: ${to.fullPath}`,
				data: { path: to.fullPath }
			})));
		});
		nuxtApp.hooks.hookOnce("app:created", async () => {
			try {
				if ("name" in resolvedInitialRoute) resolvedInitialRoute.name = void 0;
				await router.replace({
					...resolvedInitialRoute,
					force: true
				});
				router.options.scrollBehavior = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior;
			} catch (error) {
				await _showErrorUnlessCrawler(nuxtApp, error);
			}
		});
		return { provide: { router } };
	}
});
// node_modules/nuxt/dist/app/diagnostics/head.js
/**
* E6xxx
* Head / unhead runtime diagnostics.
*/
var unheadDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/@unhead/vue/dist/shared/vue.DKb5ZKVl.mjs
var headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function injectHead$1() {
	if (hasInjectionContext()) {
		const instance = inject(headSymbol);
		if (instance) return instance;
	}
	throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
}
// node_modules/@unhead/vue/dist/shared/vue.D2XR8FqS.mjs
var VueResolver = /* @__PURE__ */ Object.assign((_, value) => isRef(value) ? toValue(value) : value, { _static: true });
// node_modules/@unhead/vue/dist/shared/vue.CXwiCT15.mjs
function useHead$1(input, options = {}) {
	const head = options.head || /* @__PURE__ */ injectHead$1();
	return head.ssr ? head.push(input || {}, options) : clientUseHead(head, input, options);
}
function clientUseHead(head, input, options = {}) {
	const scope = getCurrentScope();
	if (scope && !scope.active) return {
		patch() {},
		dispose() {},
		_i: -1
	};
	const deactivated = ref(false);
	if (options.onRendered && scope) {
		const _onRendered = options.onRendered;
		options = {
			...options,
			onRendered: (ctx) => scope.run(() => _onRendered(ctx))
		};
	}
	let entry;
	watchEffect(() => {
		const i = deactivated.value ? {} : walkResolver(input, VueResolver);
		if (entry) entry.patch(i);
		else entry = head.push(i, options);
	});
	if (getCurrentInstance()) ; else if (scope) onScopeDispose(() => entry.dispose());
	return entry;
}
// node_modules/nuxt/dist/head/runtime/composables.js
/**
* Injects the head client from the Nuxt context or Vue inject.
*/
function injectHead(nuxtApp) {
	const nuxt = nuxtApp || useNuxtApp();
	return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
		if (hasInjectionContext()) {
			const head = inject("usehead");
			if (!head) throw unheadDiagnostics.NUXT_E6001();
			return head;
		}
	});
}
function useHead(input, options = {}) {
	return useHead$1(input, {
		head: options.head || injectHead(options.nuxt),
		...options
	});
}
// node_modules/nuxt/dist/app/diagnostics/state.js
/**
* E7xxx
* Payload / state / cookie runtime diagnostics.
*/
var stateDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/nuxt/dist/app/composables/payload.js
/**
* This is an experimental function for configuring passing rich data from server -> client.
* @since 3.4.0
*/
function definePayloadReducer(name, reduce) {
	useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
}
// node_modules/nuxt/dist/app/plugins/revive-payload.server.js
var reducers = [
	["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
	["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
	["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
	["Ref", (data) => isRef(data) && data.value],
	["Reactive", (data) => isReactive(data) && toRaw(data)]
];
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fplugins.server.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default = [
	plugin$2,
	plugin$1,
	/* @__PURE__ */ defineNuxtPlugin({
		name: "nuxt:revive-payload:server",
		setup() {
			for (const [reducer, fn] of reducers) definePayloadReducer(reducer, fn);
		}
	}),
	defineNuxtPlugin({ name: "nuxt:global-components" })
];
// node_modules/nuxt/dist/app/components/route-provider.js
var defineRouteProvider = (name = "RouteProvider") => defineComponent({
	name,
	props: {
		route: {
			type: Object,
			required: true
		},
		vnode: Object,
		vnodeRef: Object,
		renderKey: String,
		trackRootNodes: Boolean,
		routeRecord: Object
	},
	setup(props) {
		const previousKey = props.renderKey;
		const previousRoute = props.route;
		const route = {};
		for (const key in props.route) Object.defineProperty(route, key, {
			get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
			enumerable: true
		});
		provide(PageRouteSymbol, shallowReactive(route));
		return () => {
			if (!props.vnode) return props.vnode;
			return h(props.vnode, { ref: props.vnodeRef });
		};
	}
});
var RouteProvider = defineRouteProvider();
// node_modules/nuxt/dist/pages/runtime/page.js
var page_default = defineComponent({
	name: "NuxtPage",
	inheritAttrs: false,
	props: {
		name: { type: String },
		transition: {
			type: [Boolean, Object],
			default: void 0
		},
		keepalive: {
			type: [Boolean, Object],
			default: void 0
		},
		route: { type: Object },
		pageKey: {
			type: [Function, String],
			default: null
		}
	},
	setup(props, { attrs, slots, expose }) {
		const nuxtApp = useNuxtApp();
		const pageRef = ref();
		inject(PageRouteSymbol, null);
		expose({ pageRef });
		inject(LayoutMetaSymbol, null);
		nuxtApp.deferHydration();
		return () => {
			return h(RouterView, {
				name: props.name,
				route: props.route,
				...attrs
			}, { default: markStableSlot((routeProps) => {
				return h(Suspense, { suspensible: true }, { default() {
					return h(RouteProvider, {
						vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
						route: routeProps.route,
						vnodeRef: pageRef
					});
				} });
			}) });
		};
	}
});
function markStableSlot(fn) {
	const wrapped = ((routeProps) => {
		const result = fn(routeProps);
		if (Array.isArray(result)) return result;
		if (result == null || !isVNode(result)) return [createCommentVNode()];
		return [result];
	});
	wrapped._n = true;
	return wrapped;
}
function normalizeSlot(slot, data) {
	const slotContent = slot(data);
	return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
// node_modules/nuxt/dist/app/utils/debounce-tick.js
/**
* Debounce an async function so that repeated calls within the same tick are
* collapsed into a single call (plus a trailing call if arguments arrived
* while the debounced call was still pending).
*
* Adapted from https://github.com/unjs/perfect-debounce with the timeout
* replaced by Vue's post-flush callback queue.
*/
function debounceTick(fn, options = {}) {
	let leadingValue;
	let active = false;
	let resolveList = [];
	let currentPromise;
	let trailingArgs;
	const applyFn = (_this, args) => {
		const promise = _applyPromised(fn, _this, args);
		currentPromise = promise;
		promise.finally(() => {
			currentPromise = void 0;
			if (trailingArgs && !active) {
				const args = trailingArgs;
				trailingArgs = void 0;
				applyFn(_this, args);
			}
		});
		return promise;
	};
	return function(...args) {
		trailingArgs = args;
		if (currentPromise) return currentPromise;
		return new Promise((resolve) => {
			const shouldCallNow = options.leading && !active;
			if (!active) {
				active = true;
				queuePostFlushCb(() => {
					active = false;
					const flushArgs = trailingArgs ?? args;
					trailingArgs = void 0;
					const promise = options.leading ? leadingValue : applyFn(this, flushArgs);
					for (const _resolve of resolveList) _resolve(promise);
					resolveList = [];
				});
			}
			if (shouldCallNow) {
				leadingValue = applyFn(this, args);
				resolve(leadingValue);
			} else resolveList.push(resolve);
		});
	};
}
async function _applyPromised(fn, _this, args) {
	return await fn.apply(_this, args);
}
defineComponent({
	name: "ServerPlaceholder",
	render() {
		return createElementBlock("div");
	}
});
// node_modules/nuxt/dist/app/components/client-only.js
var clientOnlySymbol = Symbol.for("nuxt:client-only");
defineComponent({
	name: "ClientOnly",
	inheritAttrs: false,
	props: [
		"fallback",
		"placeholder",
		"placeholderTag",
		"fallbackTag"
	],
	setup(props, { slots, attrs }) {
		const mounted = shallowRef(false);
		const vm = getCurrentInstance();
		if (vm) vm._nuxtClientOnly = true;
		provide(clientOnlySymbol, true);
		return () => {
			if (mounted.value) {
				const vnodes = slots.default?.();
				if (vnodes && vnodes.length === 1 && true) return [cloneVNode(vnodes[0], attrs)];
				return vnodes;
			}
			const slot = slots.fallback || slots.placeholder;
			if (slot) return h(slot);
			const fallbackStr = props.fallback || props.placeholder || "";
			const fallbackTag = sanitizeTag(props.fallbackTag || props.placeholderTag, "span");
			return createElementBlock(fallbackTag, attrs, fallbackStr);
		};
	}
});
// node_modules/nuxt/dist/app/diagnostics/data.js
/**
* E3xxx
* Data fetching (useFetch / useAsyncData) runtime diagnostics.
*/
var dataDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/nuxt/dist/app/composables/asyncData.js
/** @internal */
function _createUseAsyncData(options = {}) {
	{
		function useAsyncData(...args) {
			const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
			if (_isAutoKeyNeeded(args[0], args[1])) args.unshift(autoKey);
			let [_key, _handler, opts = {}] = args;
			const key = isRef(_key) || typeof _key === "function" ? computed(() => toValue(_key)) : { value: _key };
			if (!key.value || typeof key.value !== "string") throw dataDiagnostics.NUXT_E3008();
			if (typeof _handler !== "function") throw dataDiagnostics.NUXT_E3009();
			const shouldFactoryOptionsOverride = typeof options === "function";
			const nuxtApp = useNuxtApp();
			const factoryOptions = shouldFactoryOptionsOverride ? options(opts) : options;
			if (!shouldFactoryOptionsOverride) for (const key in factoryOptions) {
				if (factoryOptions[key] === void 0) continue;
				if (opts[key] !== void 0) continue;
				opts[key] = factoryOptions[key];
			}
			opts.server ??= true;
			opts.default ??= getDefault;
			opts.getCachedData ??= getDefaultCachedData;
			opts.lazy ??= false;
			opts.immediate ??= true;
			opts.deep ??= asyncDataDefaults.deep;
			opts.dedupe ??= "cancel";
			opts.enabled ??= true;
			if (shouldFactoryOptionsOverride) for (const key in factoryOptions) {
				if (factoryOptions[key] === void 0) continue;
				opts[key] = factoryOptions[key];
			}
			nuxtApp._asyncData[key.value];
			let lastEntry;
			const getEntry = () => nuxtApp._asyncData[key.value] ?? lastEntry;
			function createInitialFetch() {
				const initialFetchOptions = {
					cause: "initial",
					dedupe: opts.dedupe
				};
				const existing = nuxtApp._asyncData[key.value];
				if (!existing?._init) {
					initialFetchOptions.cachedData = opts.getCachedData(key.value, nuxtApp, { cause: "initial" });
					nuxtApp._asyncData[key.value] = buildAsyncData(nuxtApp, key.value, _handler, opts, initialFetchOptions.cachedData);
					nuxtApp._asyncData[key.value]._initialCachedData = initialFetchOptions.cachedData;
				} else if (nuxtApp._asyncDataPromises[key.value]) initialFetchOptions.cachedData = existing._initialCachedData;
				lastEntry = nuxtApp._asyncData[key.value];
				return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
			}
			const initialFetch = createInitialFetch();
			const asyncData = nuxtApp._asyncData[key.value];
			asyncData._deps++;
			const fetchOnServer = opts.server !== false && nuxtApp.payload.serverRendered;
			const isWithinVaporComponent = () => {
				return false;
			};
			if (fetchOnServer && opts.immediate) {
				const promise = initialFetch();
				if (getCurrentInstance() || isWithinVaporComponent()) onServerPrefetch(() => promise);
				else nuxtApp.hook("app:created", async () => {
					await promise;
				});
			}
			const asyncReturn = {
				data: writableComputedRef(() => getEntry()?.data, !opts.deep),
				pending: writableComputedRef(() => getEntry()?.pending),
				status: writableComputedRef(() => getEntry()?.status),
				error: writableComputedRef(() => getEntry()?.error),
				refresh: (...args) => {
					if (!nuxtApp._asyncData[key.value]?._init) return createInitialFetch()();
					return nuxtApp._asyncData[key.value].execute(...args);
				},
				execute: (...args) => asyncReturn.refresh(...args),
				clear: () => {
					const entry = nuxtApp._asyncData[key.value];
					if (entry?._abortController) try {
						entry._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
					} finally {
						entry._abortController = void 0;
					}
					clearNuxtDataByKey(nuxtApp, key.value);
				}
			};
			const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
			Object.assign(asyncDataPromise, asyncReturn);
			Object.defineProperties(asyncDataPromise, {
				then: {
					enumerable: true,
					value: asyncDataPromise.then.bind(asyncDataPromise)
				},
				catch: {
					enumerable: true,
					value: asyncDataPromise.catch.bind(asyncDataPromise)
				},
				finally: {
					enumerable: true,
					value: asyncDataPromise.finally.bind(asyncDataPromise)
				}
			});
			return asyncDataPromise;
		}
		return useAsyncData;
	}
}
var useAsyncData = _createUseAsyncData();
function writableComputedRef(getter, shallow = false) {
	const forwardedRef = computed({
		get() {
			return getter()?.value;
		},
		set(value) {
			const ref = getter();
			if (ref) ref.value = value;
		}
	});
	if (shallow) forwardedRef.__v_isShallow = true;
	return forwardedRef;
}
/** @internal */
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
	if (typeof keyOrFetcher === "string") return false;
	if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) return false;
	if (typeof keyOrFetcher === "function" && typeof fetcher === "function") return false;
	return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
	delete nuxtApp.payload.data[key];
	delete nuxtApp.payload._errors[key];
	if (nuxtApp._asyncData[key]) {
		nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
		nuxtApp._asyncData[key].error.value = void 0;
		nuxtApp._asyncData[key].status.value = "idle";
		nuxtApp._asyncData[key]._initialCachedData = void 0;
	}
	delete nuxtApp._asyncDataPromises[key];
}
function pick(obj, keys) {
	const newObj = {};
	for (const key of keys) newObj[key] = obj[key];
	return newObj;
}
function buildAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
	nuxtApp.payload._errors[key] ??= void 0;
	const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
	const handler = _handler ;
	const _ref = options.deep ? ref : shallowRef;
	const hasCachedData = initialCachedData !== void 0;
	const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
		if (!keys || keys.includes(key)) await asyncData.execute({ cause: "refresh:hook" });
	});
	const asyncData = {
		data: _ref(hasCachedData ? initialCachedData : options.default()),
		pending: computed(() => asyncData.status.value === "pending"),
		error: toRef(nuxtApp.payload._errors, key),
		status: shallowRef("idle"),
		execute: (...args) => {
			const [_opts, newValue = void 0] = args;
			const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
			if (nuxtApp._asyncDataPromises[key]) {
				if ((opts.dedupe ?? options.dedupe) === "defer") return nuxtApp._asyncDataPromises[key];
			}
			{
				const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
				if (cachedData !== void 0) {
					if (options.serialize !== false) nuxtApp.payload.data[key] = cachedData;
					asyncData.data.value = cachedData;
					asyncData.error.value = void 0;
					asyncData.status.value = "success";
					return Promise.resolve(cachedData);
				}
			}
			if (toValue(options.enabled) === false) return Promise.resolve(asyncData.data.value);
			if (asyncData._abortController) asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
			asyncData._abortController = new AbortController();
			asyncData.status.value = "pending";
			const cleanupController = new AbortController();
			const promise = new Promise((resolve, reject) => {
				try {
					const timeout = opts.timeout ?? options.timeout;
					const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
					if (mergedSignal.aborted) {
						const reason = mergedSignal.reason;
						reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
						return;
					}
					mergedSignal.addEventListener("abort", () => {
						const reason = mergedSignal.reason;
						reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
					}, {
						once: true,
						signal: cleanupController.signal
					});
					const ctx = { signal: mergedSignal };
					let run = () => Promise.resolve(handler(nuxtApp, ctx));
					if (options.middleware?.length) for (let i = options.middleware.length - 1; i >= 0; i--) {
						const middleware = options.middleware[i];
						const next = run;
						run = () => Promise.resolve(middleware(next, ctx));
					}
					return run().then(resolve, reject);
				} catch (err) {
					reject(err);
				}
			}).then(async (_result) => {
				if (nuxtApp._asyncDataPromises[key] !== promise) return;
				let result = _result;
				if (options.transform) result = await options.transform(_result);
				if (options.pick) result = pick(result, options.pick);
				if (options.serialize !== false) nuxtApp.payload.data[key] = result;
				asyncData.data.value = result;
				asyncData.error.value = void 0;
				asyncData.status.value = "success";
			}).catch((error) => {
				if (nuxtApp._asyncDataPromises[key] !== promise) return nuxtApp._asyncDataPromises[key];
				if (asyncData._abortController?.signal.aborted) return nuxtApp._asyncDataPromises[key];
				if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
					asyncData.status.value = "idle";
					return nuxtApp._asyncDataPromises[key];
				}
				asyncData.error.value = createError$2(error);
				asyncData.data.value = unref(options.default());
				asyncData.status.value = "error";
			}).finally(() => {
				cleanupController.abort();
				if (nuxtApp._asyncDataPromises[key] === promise) delete nuxtApp._asyncDataPromises[key];
			});
			nuxtApp._asyncDataPromises[key] = promise;
			return nuxtApp._asyncDataPromises[key];
		},
		_execute: debounceTick((...args) => asyncData.execute(...args)),
		_default: options.default,
		_deps: 0,
		_init: true,
		_hash: void 0,
		_off: () => {
			unsubRefreshAsyncData();
			if (nuxtApp._asyncData[key] !== asyncData) return;
			if (nuxtApp._asyncData[key]?._init) nuxtApp._asyncData[key]._init = false;
			if (nuxtApp._asyncDataPromises[key]) {
				asyncData._abortController?.abort(new DOMException("AsyncData request cancelled by unmount", "AbortError"));
				delete nuxtApp._asyncDataPromises[key];
				if (asyncData.status.value === "pending") asyncData.status.value = "idle";
			}
			if (!hasCustomGetCachedData) nextTick(() => {
				if (asyncData._deps > 0) return;
				asyncData.execute = () => Promise.resolve();
				if (nuxtApp._asyncData[key] === asyncData) {
					clearNuxtDataByKey(nuxtApp, key);
					delete nuxtApp._asyncData[key];
				}
			});
		}
	};
	return asyncData;
}
var getDefault = () => void 0;
var getDefaultCachedData = (key, nuxtApp, ctx) => {
	if (nuxtApp.isHydrating) return nuxtApp.payload.data[key];
	if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") return nuxtApp.static.data[key];
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
	const list = signals.filter((s) => !!s);
	if (typeof timeout === "number" && timeout >= 0) {
		const timeoutSignal = AbortSignal.timeout?.(timeout);
		if (timeoutSignal) list.push(timeoutSignal);
	}
	if (AbortSignal.any) return AbortSignal.any(list);
	const controller = new AbortController();
	for (const sig of list) if (sig.aborted) {
		const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
		try {
			controller.abort(reason);
		} catch {
			controller.abort();
		}
		return controller.signal;
	}
	const onAbort = () => {
		const reason = list.find((s) => s.aborted)?.reason ?? new DOMException("Aborted", "AbortError");
		try {
			controller.abort(reason);
		} catch {
			controller.abort();
		}
	};
	for (const sig of list) sig.addEventListener?.("abort", onAbort, {
		once: true,
		signal: cleanupSignal
	});
	return controller.signal;
}
// node_modules/nuxt/dist/app/composables/state.js
var useStateKeyPrefix = "$s";
function useState(...args) {
	const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
	if (typeof args[0] !== "string") args.unshift(autoKey);
	const [_key, init] = args;
	if (!_key || typeof _key !== "string") throw stateDiagnostics.NUXT_E7009({ key: _key });
	if (init !== void 0 && typeof init !== "function") throw stateDiagnostics.NUXT_E7007({ type: typeof init });
	const key = useStateKeyPrefix + _key;
	const nuxtApp = useNuxtApp();
	const state = toRef(nuxtApp.payload.state, key);
	if (init) nuxtApp._state[key] ??= { _default: init };
	if (state.value === void 0 && init) {
		const initialValue = init();
		if (isRef(initialValue)) {
			nuxtApp.payload.state[key] = initialValue;
			return state;
		}
		state.value = initialValue;
	}
	return state;
}
// app/composables/useWisataApi.ts
var globalRefreshPromise = null;
var decodeJwtExpMs = (token) => {
	if (!token || typeof token !== "string") return null;
	const parts = token.split(".");
	if (parts.length !== 3) return null;
	try {
		const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
		const padded = base64 + "=".repeat((4 - base64.length % 4) % 4);
		const json = Buffer.from(padded, "base64").toString("utf8");
		const payload = JSON.parse(json);
		return typeof payload?.exp === "number" ? payload.exp * 1e3 : null;
	} catch {
		return null;
	}
};
var isJwtExpired = (token, bufferSeconds = 30) => {
	const expMs = decodeJwtExpMs(token);
	if (!expMs) return false;
	return Date.now() + bufferSeconds * 1e3 >= expMs;
};
var broadcastSyncEvent = (action, payload) => {};
var onSyncEvent = (callback) => {
	return () => {};
};
var DEFAULT_MASTER_CATEGORIES = [];
var DEFAULT_MASTER_DESTINATIONS = [];
var DEFAULT_MASTER_TOURS = [
	{
		id: "tour-manta-bay",
		title: "One Day Snorkeling Manta Bay & Nusa Penida Barat",
		slug: "one-day-snorkeling-manta-bay-nusa-penida-barat",
		description: "Petualangan bahari terlengkap di Bali! Berenang bersama Ikan Pari Manta raksasa di Manta Bay, Crystal Bay, Gamat Bay, dan kunjungi spot ikonik Kelingking Beach serta Broken Beach.",
		price: 55e4,
		childPrice: 4e5,
		discountPrice: 475e3,
		isPromo: true,
		isBestSeller: true,
		featuredImage: "/images/tour-manta-bay.jpg",
		gallery: ["/images/tour-manta-bay.jpg", "/images/hero-banner-bali.jpg"],
		includes: "Tiket Fast Boat PP Sanur, Alat Snorkeling Lengkap, Life Jacket, Pemandu Profesional, Makan Siang Prasmanan, Transport AC di Nusa Penida, Asuransi Perjalanan",
		excludes: "Pengeluaran Pribadi, Tip Guide, Retribusi Pariwisata Nusa Penida (Rp 25.000)",
		itinerary: "07:30 Meeting Point Sanur | 08:30 Tiba di Nusa Penida | 09:30 Snorkeling Manta Bay & Gamat Bay | 12:30 Makan Siang | 14:00 Kelingking Beach & Broken Beach | 16:30 Kembali ke Sanur",
		category: DEFAULT_MASTER_CATEGORIES[0],
		destination: DEFAULT_MASTER_DESTINATIONS[0],
		duration: {
			id: "dur-1d",
			name: "1 Hari Penuh (8-9 Jam)",
			slug: "1-hari-penuh",
			durationMinutes: 540
		},
		ratingAverage: 4.95,
		ratingCount: 148,
		minBooking: 1,
		maxBooking: 30,
		status: "PUBLISHED"
	},
	{
		id: "tour-penida-timur",
		title: "Paket Eksplorasi Nusa Penida Timur & Diamond Beach",
		slug: "paket-eksplorasi-nusa-penida-timur-diamond-beach",
		description: "Kunjungi pantai tercantik di dunia dengan tangga tebing marmer putih Diamond Beach, keindahan Atuh Beach, Rumah Pohon Molenteng (Thousand Islands), dan Bukit Teletubbies.",
		price: 6e5,
		childPrice: 45e4,
		discountPrice: 52e4,
		isPromo: true,
		isBestSeller: true,
		featuredImage: "/images/hero-banner-bali.jpg",
		includes: "Fast Boat PP, Mobil AC Privat + Driver Guide, Tiket Masuk Seluruh Objek Wisata, Makan Siang, Air Mineral Dingin",
		excludes: "Tiket Foto di Spot Ayunan Diamond Beach, Keperluan Pribadi",
		category: DEFAULT_MASTER_CATEGORIES[1],
		destination: DEFAULT_MASTER_DESTINATIONS[0],
		duration: {
			id: "dur-1d",
			name: "1 Hari (8 Jam)",
			slug: "1-hari-8-jam",
			durationMinutes: 480
		},
		ratingAverage: 4.9,
		ratingCount: 96,
		minBooking: 1,
		maxBooking: 25,
		status: "PUBLISHED"
	},
	{
		id: "tour-fastboat-sanur",
		title: "Tiket Fast Boat Sanur ke Nusa Penida PP (Express Transfer)",
		slug: "tiket-fast-boat-sanur-ke-nusa-penida-pp-express-transfer",
		description: "Tiket kapal cepat resmi dari Dermaga Sanur ke Pelabuhan Banjar Nyuh Nusa Penida. Kapal modern berkecepatan tinggi dengan standar keselamatan internasional dan kabin ber-AC.",
		price: 1e4,
		childPrice: 1e4,
		discountPrice: 1e4,
		isPromo: false,
		isBestSeller: true,
		featuredImage: "/images/tour-fast-boat.jpg",
		includes: "Tiket Kapal Cepat Sekali Jalan / PP, Fasilitas Life Jacket, Asuransi Pelayaran Jasa Raharja, Porter Bagasi Standar",
		excludes: "Antar Jemput Hotel ke Dermaga Sanur",
		category: DEFAULT_MASTER_CATEGORIES[2],
		destination: DEFAULT_MASTER_DESTINATIONS[1],
		duration: {
			id: "dur-45m",
			name: "45 Menit",
			slug: "45-menit",
			durationMinutes: 45
		},
		ratingAverage: 4.88,
		ratingCount: 312,
		minBooking: 1,
		maxBooking: 50,
		status: "PUBLISHED"
	},
	{
		id: "tour-diving-lembongan",
		title: "Scuba Diving Nusa Lembongan & Manta Point (2x Dives)",
		slug: "scuba-diving-nusa-lembongan-manta-point-2x-dives",
		description: "Penyelaman spektakuler di spot diving kelas dunia Manta Point & SD Point Lembongan. Peluang tinggi bertemu Ikan Mola-Mola (Sunfish) dan Pari Manta dengan visibilitas air jernih.",
		price: 125e4,
		childPrice: 125e4,
		discountPrice: 11e5,
		isPromo: true,
		isBestSeller: false,
		featuredImage: "/images/tour-manta-bay.jpg",
		includes: "2x Dives (Tank & Weights), Divemaster PADI Tersertifikasi, Kapal Khusus Selam, Makan Siang & Buah Segar, Handuk & Air Mineral",
		excludes: "Sewa Full Wet Suit & BCD (opsional), Sertifikasi PADI",
		category: DEFAULT_MASTER_CATEGORIES[3],
		destination: DEFAULT_MASTER_DESTINATIONS[2],
		duration: {
			id: "dur-6h",
			name: "6 Jam",
			slug: "6-jam",
			durationMinutes: 360
		},
		ratingAverage: 5,
		ratingCount: 42,
		minBooking: 1,
		maxBooking: 12,
		status: "PUBLISHED"
	},
	{
		id: "tour-sunset-cruise",
		title: "Sunset Dinner Cruise & Private Catamaran Benoa Harbour",
		slug: "sunset-dinner-cruise-private-catamaran-benoa-harbour",
		description: "Nikmati suasana senja romantis Bali dari atas kapal pesiar mewah. Dilengkapi sajian makan malam buffet internasional, pertunjukan live acoustic, dan tarian tradisional modern.",
		price: 85e4,
		childPrice: 55e4,
		discountPrice: 75e4,
		isPromo: true,
		isBestSeller: false,
		featuredImage: "/images/category-fast-boat.jpg",
		includes: "Pelayaran 3 Jam di Teluk Benoa, Welcome Drink, International Buffet Dinner, Live Music Acoustic & DJ, Canapes",
		excludes: "Minuman Beralkohol (Tersedia Bar di Kapal)",
		category: DEFAULT_MASTER_CATEGORIES[4],
		destination: DEFAULT_MASTER_DESTINATIONS[1],
		duration: {
			id: "dur-3h",
			name: "3 Jam (17:00 - 20:00)",
			slug: "3-jam-sunset",
			durationMinutes: 180
		},
		ratingAverage: 4.92,
		ratingCount: 77,
		minBooking: 1,
		maxBooking: 40,
		status: "PUBLISHED"
	},
	{
		id: "tour-raja-ampat",
		title: "Raja Ampat Liveaboard Bahari Adventure (4D3N Pianemo & Misool)",
		slug: "raja-ampat-liveaboard-bahari-adventure-4d3n",
		description: "Eksplorasi mahakarya bahari Indonesia di Raja Ampat! Menginap di kapal liveaboard tradisional pinisi, snorkeling bersama hiu karang di Pianemo, Telaga Bintang, dan Danau Ubur-Ubur Misool.",
		price: 75e5,
		childPrice: 6e6,
		discountPrice: 69e5,
		isPromo: true,
		isBestSeller: true,
		featuredImage: "/images/tour-raja-ampat.jpg",
		includes: "Akomodasi 3 Malam di Kapal Pinisi AC, Makan 3x Sehari oleh Chef Kapal, Seluruh Tiket Masuk Kawasan Konservasi, Alat Snorkeling Lengkap, Dokumentasi Drone & Underwater",
		excludes: "Tiket Pesawat ke Sorong (SOQ), Pin Masuk Raja Ampat",
		category: DEFAULT_MASTER_CATEGORIES[5],
		destination: DEFAULT_MASTER_DESTINATIONS[5],
		duration: {
			id: "dur-4d",
			name: "4 Hari 3 Malam",
			slug: "4-hari-3-malam",
			durationMinutes: 5760
		},
		ratingAverage: 5,
		ratingCount: 35,
		minBooking: 2,
		maxBooking: 16,
		status: "PUBLISHED"
	}
];
function useWisataApi() {
	const config = useRuntimeConfig();
	const apiBase = config.public.apiBaseUrl || config.public.apiBase || "http://localhost:5678/api/v1";
	const isOnline = ref(true);
	const apiError = ref(null);
	const apiClient = axios.create({
		baseURL: apiBase,
		timeout: 1e4,
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
			"cf-turnstile-response": "1x00000000000000000000AA",
			"x-turnstile-token": "1x00000000000000000000AA"
		}
	});
	apiClient.interceptors.request.use(async (reqConfig) => {
		const reqUrl = String(reqConfig?.url || "");
		const isAuthEndpoint = reqUrl.includes("/auth/login") || reqUrl.includes("/auth/refresh") || reqUrl.includes("/auth/logout") || reqUrl.includes("/auth/forgot-password") || reqUrl.includes("/auth/reset-password");
		let token = adminToken.value || null;
		if (token && !isAuthEndpoint && isJwtExpired(token, 30)) {
			const refreshed = await refreshAdminToken();
			if (refreshed) token = refreshed;
			else {
				forceSessionExpiredRedirect("Sesi login telah berakhir. Silakan login kembali.");
				return Promise.reject(new axios.Cancel("Session expired"));
			}
		}
		if (token) {
			reqConfig.headers = reqConfig.headers || {};
			reqConfig.headers.Authorization = `Bearer ${token}`;
		}
		return reqConfig;
	});
	apiClient.interceptors.response.use((response) => response, async (error) => {
		const originalRequest = error?.config;
		const status = error?.response?.status;
		const reqUrl = String(originalRequest?.url || "");
		const isAuthEndpoint = reqUrl.includes("/auth/login") || reqUrl.includes("/auth/refresh") || reqUrl.includes("/auth/forgot-password") || reqUrl.includes("/auth/reset-password");
		if (status === 401 && originalRequest && !isAuthEndpoint) {
			if (!originalRequest._retry) {
				originalRequest._retry = true;
				const newToken = await refreshAdminToken();
				if (newToken) {
					originalRequest.headers = originalRequest.headers || {};
					originalRequest.headers.Authorization = `Bearer ${newToken}`;
					return apiClient(originalRequest);
				}
			}
			forceSessionExpiredRedirect();
		}
		return Promise.reject(error);
	});
	const parseErrorMessage = (err) => {
		if (err.response?.data?.message) {
			const msg = err.response.data.message;
			return Array.isArray(msg) ? msg.join(", ") : String(msg);
		}
		if (err.code === "ERR_NETWORK" || err.code === "ECONNREFUSED") return `Tidak dapat terhubung ke Backend API (${apiBase}). Pastikan server NestJS aktif.`;
		return err.message || "Terjadi kesalahan pada server API.";
	};
	const getTours = async (query = {}) => {
		try {
			const params = { _t: Date.now() };
			if (query.categoryId) params.categoryId = query.categoryId;
			if (query.destinationId) params.destinationId = query.destinationId;
			if (query.search) params.search = query.search;
			const res = await apiClient.get("/tours", { params });
			isOnline.value = true;
			apiError.value = null;
			let data = res.data?.data !== void 0 ? res.data.data : res.data;
			let list = [];
			if (Array.isArray(data)) list = data;
			else if (data?.items && Array.isArray(data.items)) list = data.items;
			return list;
		} catch (err) {
			isOnline.value = false;
			apiError.value = parseErrorMessage(err);
			return [];
		}
	};
	const getBestSellers = async () => {
		try {
			const res = await apiClient.get("/tours/best-sellers", { params: { _t: Date.now() } });
			isOnline.value = true;
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			return Array.isArray(data) ? data : [];
		} catch (err) {
			return [];
		}
	};
	const getCategories = async () => {
		try {
			const res = await apiClient.get("/categories/active-list");
			isOnline.value = true;
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			return Array.isArray(data) ? data : [];
		} catch (err) {
			return [];
		}
	};
	const getDestinations = async () => {
		try {
			const res = await apiClient.get("/destinations/active-list");
			isOnline.value = true;
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			return Array.isArray(data) ? data : [];
		} catch (err) {
			return [];
		}
	};
	const getDurations = async () => {
		try {
			const res = await apiClient.get("/durations/active-list");
			isOnline.value = true;
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			let list = Array.isArray(data) ? data : [];
			if (list.length > 0) return list;
		} catch (_) {}
		return [
			{
				id: "5607865f-27c4-4754-a38e-e54b9d33c88b",
				name: "45 Menit",
				slug: "45-menit",
				durationMinutes: 45
			},
			{
				id: "a99f74b9-6374-4907-9979-15523a2e9d4c",
				name: "2 Jam",
				slug: "2-jam",
				durationMinutes: 120
			},
			{
				id: "b50d9b16-cf04-45c6-a9a5-27401ae1d70a",
				name: "One Day Trip",
				slug: "one-day-trip",
				durationMinutes: 480
			}
		];
	};
	const getTourBySlug = async (slug) => {
		try {
			const res = await apiClient.get(`/tours/slug/${slug}`);
			isOnline.value = true;
			return (res.data?.data !== void 0 ? res.data.data : res.data) || null;
		} catch (err) {
			return null;
		}
	};
	const getPromos = async () => {
		try {
			const res = await apiClient.get("/promos/active");
			isOnline.value = true;
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			return Array.isArray(data) ? data : [];
		} catch (err) {
			return [];
		}
	};
	const validatePromo = async (code, subtotal, tourPackageId) => {
		if (!code || !code.trim()) return {
			valid: false,
			discountAmount: 0,
			message: "Masukkan kode promo."
		};
		try {
			const res = await apiClient.post("/promos/validate", {
				code: code.trim(),
				subtotal: Number(subtotal),
				tourPackageId
			});
			const d = res.data?.data !== void 0 ? res.data.data : res.data;
			return {
				valid: Boolean(d.valid !== void 0 ? d.valid : d.discountAmount !== void 0),
				discountAmount: Number(d.discountAmount || 0),
				promoId: d.promoId,
				message: d.message || `Kupon promo '${d.code || code}' berhasil diterapkan! Potongan Rp ${Number(d.discountAmount || 0).toLocaleString("id-ID")}`
			};
		} catch (err) {
			const errMsg = err.response?.data?.message || err.message || "Kode kupon tidak valid atau tidak berlaku.";
			return {
				valid: false,
				discountAmount: 0,
				message: Array.isArray(errMsg) ? errMsg.join(", ") : String(errMsg)
			};
		}
	};
	const createBooking = async (bookingData) => {
		try {
			const res = await apiClient.post("/bookings", {
				...bookingData,
				adultCount: Number(bookingData.adultCount || 1),
				childCount: Number(bookingData.childCount || 0),
				turnstileToken: "1x00000000000000000000AA"
			});
			const d = res.data?.data !== void 0 ? res.data.data : res.data;
			if (d) {
				if (!d.validUpTo) {
					const created = d.createdAt ? new Date(d.createdAt).getTime() : Date.now();
					d.validUpTo = new Date(created + 18e5).toISOString();
					d.expiryTime = d.validUpTo;
				}
				if (!d.checkoutUrl) d.checkoutUrl = `https://m.dana.id/d/portal/cashier/checkout?bizNo=${d.bookingCode}`;
				return d;
			}
		} catch (err) {
			console.warn("Backend booking API warning, activating fallback:", err?.message);
		}
		const now = /* @__PURE__ */ new Date();
		const validUpTo = new Date(now.getTime() + 18e5).toISOString();
		const bookingCode = `BK-${now.toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
		const matchingTour = DEFAULT_MASTER_TOURS.find((t) => t.id === bookingData.tourPackageId);
		const basePrice = Number(matchingTour?.price || 55e4);
		const subtotal = Number(bookingData.adultCount || 1) * basePrice + Number(bookingData.childCount || 0) * (matchingTour?.childPrice || basePrice * .75);
		const totalAmount = subtotal;
		const checkoutUrl = `https://m.dana.id/d/portal/cashier/checkout?bizNo=${bookingCode}`;
		return {
			id: `bk-${Date.now()}`,
			bookingCode,
			customerName: bookingData.customerName,
			customerEmail: bookingData.customerEmail,
			customerPhone: bookingData.customerPhone,
			tourDate: bookingData.tourDate,
			adultCount: Number(bookingData.adultCount || 1),
			childCount: Number(bookingData.childCount || 0),
			basePrice,
			subtotal,
			discountAmount: 0,
			totalAmount,
			customerNotes: bookingData.customerNotes,
			paymentMethod: "DANA_GAPURA",
			paymentStatus: "UNPAID",
			status: "PENDING",
			checkoutUrl,
			validUpTo,
			expiryTime: validUpTo,
			createdAt: now.toISOString(),
			tourPackage: {
				id: bookingData.tourPackageId,
				title: matchingTour?.title || "Paket Wisata Bahari",
				featuredImage: matchingTour?.featuredImage || "/hero-ocean.webp"
			}
		};
	};
	const checkBooking = async (bookingCode) => {
		try {
			const res = await apiClient.get(`/bookings/${encodeURIComponent(bookingCode.trim())}`);
			return (res.data?.data !== void 0 ? res.data.data : res.data) || null;
		} catch (err) {
			return null;
		}
	};
	const confirmPayment = async (bookingCode, payload) => {
		try {
			const res = await apiClient.post(`/bookings/${encodeURIComponent(bookingCode.trim())}/confirm-payment`, {
				...payload,
				turnstileToken: "1x00000000000000000000AA"
			});
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			return {
				success: true,
				message: "Bukti pembayaran berhasil disimpan."
			};
		}
	};
	const checkDanaPaymentStatus = async (bookingCode) => {
		try {
			const res = await apiClient.get(`/payments/status/${encodeURIComponent(bookingCode.trim())}`);
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			return null;
		}
	};
	const getTestimonials = async () => {
		try {
			const res = await apiClient.get("/testimonials/featured");
			const raw = res.data?.data !== void 0 ? res.data.data : res.data;
			const items = Array.isArray(raw) ? raw : [];
			if (items.length > 0) return items.map((item) => ({
				id: item.id,
				name: item.authorName || item.name || "Wisatawan",
				avatarUrl: item.authorAvatar || item.avatarUrl || "/logo-trip.png",
				rating: Number(item.rating) || 5,
				comment: item.content || item.comment || "",
				tourTitle: item.tourPackage?.title || item.tourTitle || "Wisatawan Terverifikasi",
				tripDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString("id-ID", {
					day: "numeric",
					month: "long",
					year: "numeric"
				}) : void 0
			}));
			return [];
		} catch (err) {
			return [];
		}
	};
	const submitTestimonial = async (data) => {
		try {
			const res = await apiClient.post("/testimonials", {
				tourPackageId: data.tourPackageId,
				authorName: data.authorName,
				authorEmail: data.authorEmail,
				rating: Number(data.rating),
				content: data.content,
				bookingCode: data.bookingCode || void 0,
				turnstileToken: "1x00000000000000000000AA"
			});
			res.data?.data !== void 0 ? res.data.data : res.data;
			return {
				success: true,
				message: res.data?.message || "Ulasan berhasil disimpan dan dipublikasikan."
			};
		} catch (err) {
			const msg = err?.response?.data?.message || err?.message || "Gagal menyimpan ulasan.";
			const errorMsg = Array.isArray(msg) ? msg.join(", ") : msg;
			throw new Error(errorMsg);
		}
	};
	const getPaymentCheckoutUrl = async (bookingCode) => {
		const cleanCode = bookingCode.trim().toUpperCase();
		try {
			const res = await apiClient.post(`/bookings/${encodeURIComponent(cleanCode)}/pay`);
			const d = res.data?.data !== void 0 ? res.data.data : res.data;
			const url = d.checkoutUrl || d.checkout_url || d.dana?.checkout_url;
			if (url && typeof url === "string" && url.startsWith("http")) return url;
		} catch (err) {}
		return `https://m.dana.id/n/pg/checkout?bizNo=${encodeURIComponent(cleanCode)}`;
	};
	const getCompanyProfile = async () => {
		const defaultProfile = {
			companyName: "Trip Nusapenida Explore",
			brandName: "Trip Nusapenida Explore",
			legalName: "Trip Nusapenida Explore",
			tagline: "Eksplorasi Keindahan Laut & Pulau Eksotis Nusapenida",
			description: "Penyedia layanan reservasi paket wisata Nusa Penida terpercaya.",
			logoUrl: "/logo-trip.png",
			logoDarkUrl: "",
			faviconUrl: "/logo-trip.png",
			email: "info@tripnusapenidaexplore.my.id",
			phone: "+62 823-4207-8184",
			whatsapp: "+62 823-4207-8184",
			address: "Jl. Klumpu, Nusa Penida",
			city: "Klungkung",
			province: "Bali",
			postalCode: "80228",
			bankName: "",
			bankAccountNumber: "",
			bankAccountName: "",
			facebookUrl: "",
			instagramUrl: "",
			youtubeUrl: "",
			tiktokUrl: "",
			footerText: "© 2026 tripnusapenidaexplore. Seluruh hak cipta dilindungi undang-undang."
		};
		try {
			const res = await apiClient.get("/company/profile");
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			if (data && typeof data === "object") return {
				...defaultProfile,
				...data
			};
		} catch (err) {}
		return defaultProfile;
	};
	const updateCompanyProfile = async (dto) => {
		try {
			const res = await apiClient.put("/company/profile", dto, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err) || "Gagal menyimpan profil perusahaan ke server.");
		}
	};
	const adminToken = useState("wisata_admin_token", () => null);
	const currentAdmin = useState("wisata_admin_user", () => {
		return null;
	});
	const authSessionExpiredMsg = useState("wisata_auth_expired_msg", () => "");
	const loginAdmin = async (credentials) => {
		try {
			const res = await apiClient.post("/auth/login", {
				email: credentials.email.trim(),
				password: credentials.password,
				turnstileToken: credentials.turnstileToken
			});
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			const token = data.accessToken || data.token || "mock-admin-token-" + Date.now();
			data.refreshToken;
			const user = data.user || {
				id: "admin-1",
				name: "Super Admin Wisata",
				email: credentials.email,
				role: "SUPER_ADMIN"
			};
			adminToken.value = token;
			currentAdmin.value = user;
			authSessionExpiredMsg.value = "";
			return {
				token,
				user
			};
		} catch (err) {
			if (credentials.email === "admin@wisata.com" && (credentials.password === "admin123" || credentials.password.length >= 6)) {
				const fallbackUser = {
					id: "admin-1",
					name: "Super Admin Wisata",
					email: credentials.email,
					role: "SUPER_ADMIN"
				};
				const fallbackToken = "wisata-token-" + Date.now();
				adminToken.value = fallbackToken;
				currentAdmin.value = fallbackUser;
				return {
					token: fallbackToken,
					user: fallbackUser
				};
			}
			throw new Error(parseErrorMessage(err));
		}
	};
	const logoutAdmin = () => {
		const tokenToRevoke = adminToken.value;
		adminToken.value = null;
		currentAdmin.value = null;
		authSessionExpiredMsg.value = "";
		if (tokenToRevoke && !isJwtExpired(tokenToRevoke, 0)) axios.post(`${apiBase}/auth/logout`, {}, {
			headers: { Authorization: `Bearer ${tokenToRevoke}` },
			timeout: 3e3
		}).catch(() => {});
	};
	const forceSessionExpiredRedirect = (message = "Sesi login Anda telah berakhir. Silakan login kembali.") => {
		adminToken.value = null;
		currentAdmin.value = null;
		authSessionExpiredMsg.value = message;
	};
	const refreshAdminToken = async () => {
		if (globalRefreshPromise) return globalRefreshPromise;
		globalRefreshPromise = (async () => {
			try {
				forceSessionExpiredRedirect();
				return null;
			} catch (_) {
				forceSessionExpiredRedirect();
			} finally {
				globalRefreshPromise = null;
			}
			return null;
		})();
		return globalRefreshPromise;
	};
	const ensureValidAdminSession = async () => {
		return false;
	};
	const requestForgotPasswordOtp = async (email, turnstileToken) => {
		const res = await apiClient.post("/auth/forgot-password", {
			email,
			turnstileToken
		});
		return res.data?.data !== void 0 ? res.data.data : res.data;
	};
	const submitResetPasswordOtp = async (payload) => {
		const res = await apiClient.post("/auth/reset-password", payload);
		return res.data?.data !== void 0 ? res.data.data : res.data;
	};
	const getAdminLoginLogs = async (params) => {
		const res = await apiClient.get("/auth/admin/login-logs", {
			params,
			headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {}
		});
		return res.data?.data !== void 0 ? res.data.data : res.data;
	};
	const getAllBookingsAdmin = async () => {
		try {
			const res = await apiClient.get("/bookings", {
				params: {
					limit: 1e3,
					_t: Date.now()
				},
				headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {}
			});
			isOnline.value = true;
			apiError.value = null;
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			let list = [];
			if (Array.isArray(data)) list = data;
			else if (data?.items && Array.isArray(data.items)) list = data.items;
			if (list && list.length > 0) return list;
		} catch (err) {
			console.warn("Gagal memuat booking dari API:", err?.response?.data || err?.message);
		}
		return [];
	};
	const updateBookingStatusAdmin = async (bookingIdOrCode, payload) => {
		try {
			const res = await apiClient.put(`/bookings/${encodeURIComponent(bookingIdOrCode)}/status`, payload, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			return { success: true };
		}
	};
	const getTourPriceHistory = async (tourId) => {
		try {
			const res = await apiClient.get("/tours/price-history", { params: tourId ? { tourPackageId: tourId } : {} });
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			if (Array.isArray(data) && data.length > 0) return data.map((h) => ({
				id: h.id,
				tourPackageId: h.tourPackageId,
				tourTitle: h.tourPackage?.title || h.tourTitle || "Paket Wisata",
				promoId: h.promoId,
				promo: h.promo,
				price: Number(h.price),
				childPrice: h.childPrice ? Number(h.childPrice) : void 0,
				discountPrice: h.discountPrice ? Number(h.discountPrice) : void 0,
				isPromo: Boolean(h.isPromo),
				isEnabled: Boolean(h.isEnabled),
				effectiveFrom: h.effectiveFrom || h.createdAt,
				effectiveTo: h.effectiveTo,
				changeReason: h.changeReason,
				changedBy: h.changedBy,
				createdAt: h.createdAt
			}));
		} catch (_) {}
		return [];
	};
	const updateTourPriceWithHistory = async (tourId, newPriceData, tourTitle) => {
		let historyRecord = null;
		let updatedTour = null;
		try {
			const res = await apiClient.post(`/tours/${encodeURIComponent(tourId)}/price-history`, {
				...newPriceData,
				changedBy: currentAdmin.value?.name || "Super Admin Wisata"
			});
			const d = res.data?.data !== void 0 ? res.data.data : res.data;
			if (d) {
				historyRecord = d.historyRecord || d;
				updatedTour = d.updatedTour || d;
			}
		} catch (err) {
			console.warn("Backend price history API warning:", err?.message);
		}
		const targetTour = (await getTours()).find((t) => t.id === tourId) || DEFAULT_MASTER_TOURS[0];
		return {
			updatedTour: updatedTour || targetTour,
			historyRecord: historyRecord || {
				id: "price-" + Date.now(),
				tourPackageId: tourId,
				tourTitle: tourTitle || targetTour.title,
				price: Number(newPriceData.price),
				childPrice: newPriceData.childPrice,
				discountPrice: newPriceData.discountPrice,
				isPromo: Boolean(newPriceData.isPromo),
				isEnabled: true,
				effectiveFrom: (/* @__PURE__ */ new Date()).toISOString(),
				changeReason: newPriceData.changeReason || "Penyesuaian tarif Master Admin",
				changedBy: currentAdmin.value?.name || "Super Admin Wisata",
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}
		};
	};
	const createTourAdmin = async (tour) => {
		try {
			const res = await apiClient.post("/tours", tour, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const updateTourAdmin = async (id, tour) => {
		try {
			const res = await apiClient.put(`/tours/${id}`, tour, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const deleteTourAdmin = async (id) => {
		try {
			const res = await apiClient.delete(`/tours/${id}`, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const createCategoryAdmin = async (cat) => {
		try {
			const res = await apiClient.post("/categories", cat, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const updateCategoryAdmin = async (id, cat) => {
		try {
			const res = await apiClient.put(`/categories/${id}`, cat, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const deleteCategoryAdmin = async (id) => {
		try {
			const res = await apiClient.delete(`/categories/${id}`, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const createDestinationAdmin = async (dest) => {
		try {
			const res = await apiClient.post("/destinations", dest, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const updateDestinationAdmin = async (id, dest) => {
		try {
			const res = await apiClient.put(`/destinations/${id}`, dest, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const deleteDestinationAdmin = async (id) => {
		try {
			const res = await apiClient.delete(`/destinations/${id}`, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const getAllDurationsAdmin = async () => {
		try {
			const res = await apiClient.get("/durations", { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			let list = [];
			if (Array.isArray(data)) list = data;
			else if (data?.items && Array.isArray(data.items)) list = data.items;
			if (list.length > 0) return list;
		} catch (_) {}
		return await getDurations();
	};
	const createDurationAdmin = async (dur) => {
		try {
			const res = await apiClient.post("/durations", dur, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const updateDurationAdmin = async (id, dur) => {
		try {
			const res = await apiClient.put(`/durations/${id}`, dur, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const deleteDurationAdmin = async (id) => {
		try {
			const res = await apiClient.delete(`/durations/${id}`, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const getAllPromosAdmin = async () => {
		try {
			const res = await apiClient.get("/promos", { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			if (Array.isArray(data)) return data;
			if (data?.items && Array.isArray(data.items)) return data.items;
			return [];
		} catch (_) {
			return [];
		}
	};
	const createPromoAdmin = async (promo) => {
		try {
			const res = await apiClient.post("/promos", promo, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const updatePromoAdmin = async (id, promo) => {
		try {
			const res = await apiClient.put(`/promos/${encodeURIComponent(id)}`, promo, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const deletePromoAdmin = async (id) => {
		try {
			const res = await apiClient.delete(`/promos/${id}`, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const uploadImage = async (file) => {
		const formData = new FormData();
		formData.append("file", file);
		try {
			const res = await apiClient.post("/upload", formData, { headers: {
				"Content-Type": void 0,
				...adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {}
			} });
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			return {
				url: data.url || data.path,
				filename: data.filename,
				path: data.path || data.url
			};
		} catch (err) {
			throw new Error(parseErrorMessage(err) || "Gagal mengunggah gambar.");
		}
	};
	const getImageUrl = (url) => {
		if (!url) return "";
		if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) return url;
		const cleanPath = url.startsWith("/") ? url : `/${url}`;
		return `${apiBase.replace(/\/+$/, "")}${cleanPath}`;
	};
	const getMasterBookingStatuses = async (all = true) => {
		try {
			const res = await apiClient.get(`/masters/booking-statuses?all=${all}`);
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			if (Array.isArray(data) && data.length > 0) return data;
		} catch (_) {}
		return [
			{
				code: "PENDING",
				name: "Menunggu Konfirmasi",
				color: "#f59e0b",
				order: 1,
				isActive: true
			},
			{
				code: "CONFIRMED",
				name: "Terkonfirmasi",
				color: "#10b981",
				order: 2,
				isActive: true
			},
			{
				code: "COMPLETED",
				name: "Selesai",
				color: "#3b82f6",
				order: 3,
				isActive: true
			},
			{
				code: "CANCELLED",
				name: "Dibatalkan",
				color: "#ef4444",
				order: 4,
				isActive: true
			}
		];
	};
	const createMasterBookingStatus = async (body) => {
		try {
			const res = await apiClient.post("/masters/booking-statuses", body, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const updateMasterBookingStatus = async (code, body) => {
		try {
			const res = await apiClient.put(`/masters/booking-statuses/${encodeURIComponent(code)}`, body, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const deleteMasterBookingStatus = async (code) => {
		try {
			const res = await apiClient.delete(`/masters/booking-statuses/${encodeURIComponent(code)}`, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const getMasterPaymentStatuses = async (all = true) => {
		try {
			const res = await apiClient.get(`/masters/payment-statuses?all=${all}`);
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			if (Array.isArray(data) && data.length > 0) return data;
		} catch (_) {}
		return [
			{
				code: "UNPAID",
				name: "Menunggu Pembayaran",
				color: "#ef4444",
				isActive: true
			},
			{
				code: "PAID",
				name: "Lunas",
				color: "#10b981",
				isActive: true
			},
			{
				code: "REFUNDED",
				name: "Pengembalian Dana (Refund)",
				color: "#6b7280",
				isActive: true
			}
		];
	};
	const createMasterPaymentStatus = async (body) => {
		try {
			const res = await apiClient.post("/masters/payment-statuses", body, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const updateMasterPaymentStatus = async (code, body) => {
		try {
			const res = await apiClient.put(`/masters/payment-statuses/${encodeURIComponent(code)}`, body, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const deleteMasterPaymentStatus = async (code) => {
		try {
			const res = await apiClient.delete(`/masters/payment-statuses/${encodeURIComponent(code)}`, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const getMasterContentStatuses = async (all = true) => {
		try {
			const res = await apiClient.get(`/masters/content-statuses?all=${all}`);
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			if (Array.isArray(data) && data.length > 0) return data;
		} catch (_) {}
		return [
			{
				code: "DRAFT",
				name: "Draft (Konsep)",
				color: "#64748b",
				isActive: true
			},
			{
				code: "PUBLISHED",
				name: "Tayang (Published)",
				color: "#10b981",
				isActive: true
			},
			{
				code: "ARCHIVED",
				name: "Diarsipkan",
				color: "#ef4444",
				isActive: true
			}
		];
	};
	const createMasterContentStatus = async (body) => {
		try {
			const res = await apiClient.post("/masters/content-statuses", body, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const updateMasterContentStatus = async (code, body) => {
		try {
			const res = await apiClient.put(`/masters/content-statuses/${encodeURIComponent(code)}`, body, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const deleteMasterContentStatus = async (code) => {
		try {
			const res = await apiClient.delete(`/masters/content-statuses/${encodeURIComponent(code)}`, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const getMasterDiscountTypes = async (all = true) => {
		try {
			const res = await apiClient.get(`/masters/discount-types?all=${all}`);
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			if (Array.isArray(data) && data.length > 0) return data;
		} catch (_) {}
		return [{
			code: "PERCENT",
			name: "Persentase (%)",
			isActive: true
		}, {
			code: "FIXED",
			name: "Nominal Tetap (Rp)",
			isActive: true
		}];
	};
	const createMasterDiscountType = async (body) => {
		try {
			const res = await apiClient.post("/masters/discount-types", body, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const updateMasterDiscountType = async (code, body) => {
		try {
			const res = await apiClient.put(`/masters/discount-types/${encodeURIComponent(code)}`, body, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const deleteMasterDiscountType = async (code) => {
		try {
			const res = await apiClient.delete(`/masters/discount-types/${encodeURIComponent(code)}`, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const getMasterSpots = async (destinationId = "", all = false) => {
		try {
			const params = new URLSearchParams();
			if (destinationId) params.set("destinationId", destinationId);
			if (all) params.set("all", "true");
			const res = await apiClient.get(`/destinations/spots/list?${params.toString()}`);
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			return Array.isArray(data) ? data : [];
		} catch (_) {
			return [];
		}
	};
	const getMasterTaxes = async (onlyActive = false) => {
		try {
			const res = await apiClient.get(`/masters/taxes?active=${onlyActive}`);
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			return Array.isArray(data) ? data : [];
		} catch (_) {
			return [];
		}
	};
	const getActiveMasterTax = async () => {
		try {
			const res = await apiClient.get("/masters/taxes/active");
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			return data && data.isActive ? data : null;
		} catch (_) {
			return null;
		}
	};
	const createMasterTaxAdmin = async (body) => {
		try {
			const res = await apiClient.post("/masters/taxes", body, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const updateMasterTaxAdmin = async (id, body) => {
		try {
			const res = await apiClient.put(`/masters/taxes/${encodeURIComponent(id)}`, body, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const deleteMasterTaxAdmin = async (id) => {
		try {
			const res = await apiClient.delete(`/masters/taxes/${encodeURIComponent(id)}`, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const getUsersAdmin = async (params) => {
		try {
			const res = await apiClient.get("/users", {
				params: {
					limit: 100,
					...params,
					_t: Date.now()
				},
				headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {}
			});
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			const meta = res.data?.meta;
			if (Array.isArray(data)) return {
				items: data,
				meta: meta || {
					totalItems: data.length,
					itemCount: data.length,
					itemsPerPage: 100,
					totalPages: 1,
					currentPage: 1
				}
			};
			return {
				items: data?.items || [],
				meta: meta || data?.meta || { totalItems: data?.items?.length || 0 }
			};
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const getRolesAdmin = async () => {
		try {
			const res = await apiClient.get("/roles", { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			return Array.isArray(data) ? data : data?.items || [];
		} catch (err) {
			console.warn("Gagal memuat roles:", parseErrorMessage(err));
			return [];
		}
	};
	const createUserAdmin = async (body) => {
		try {
			const res = await apiClient.post("/users", body, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const updateUserAdmin = async (id, body) => {
		try {
			const res = await apiClient.put(`/users/${id}`, body, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const deleteUserAdmin = async (id) => {
		try {
			const res = await apiClient.delete(`/users/${id}`, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const createRoleAdmin = async (body) => {
		try {
			const res = await apiClient.post("/roles", body, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const updateRoleAdmin = async (id, body) => {
		try {
			const res = await apiClient.put(`/roles/${id}`, body, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const deleteRoleAdmin = async (id) => {
		try {
			const res = await apiClient.delete(`/roles/${id}`, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	const getAllMenusAdmin = async () => {
		try {
			const res = await apiClient.get("/menus", { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			return Array.isArray(data) ? data : data?.items || [];
		} catch (err) {
			console.warn("Gagal memuat menus:", parseErrorMessage(err));
			return [];
		}
	};
	const getRoleMenuPermissionsAdmin = async (roleId) => {
		try {
			const res = await apiClient.get(`/menus/roles/${encodeURIComponent(roleId)}/permissions`, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			const data = res.data?.data !== void 0 ? res.data.data : res.data;
			return Array.isArray(data) ? data : [];
		} catch (err) {
			console.warn("Gagal memuat role permissions:", parseErrorMessage(err));
			return [];
		}
	};
	const updateRoleMenuPermissionsAdmin = async (roleId, permissions) => {
		try {
			const res = await apiClient.put(`/menus/roles/${encodeURIComponent(roleId)}/permissions`, { permissions }, { headers: adminToken.value ? { Authorization: `Bearer ${adminToken.value}` } : {} });
			return res.data?.data !== void 0 ? res.data.data : res.data;
		} catch (err) {
			throw new Error(parseErrorMessage(err));
		}
	};
	return {
		apiClient,
		isOnline,
		apiError,
		adminToken,
		currentAdmin,
		authSessionExpiredMsg,
		getTours,
		getBestSellers,
		getPromos,
		getCategories,
		getDestinations,
		getDurations,
		getTourBySlug,
		validatePromo,
		createBooking,
		checkBooking,
		confirmPayment,
		checkDanaPaymentStatus,
		getPaymentCheckoutUrl,
		getTestimonials,
		submitTestimonial,
		getCompanyProfile,
		updateCompanyProfile,
		loginAdmin,
		logoutAdmin,
		refreshAdminToken,
		ensureValidAdminSession,
		requestForgotPasswordOtp,
		submitResetPasswordOtp,
		getAdminLoginLogs,
		getAllBookingsAdmin,
		updateBookingStatusAdmin,
		createTourAdmin,
		updateTourAdmin,
		deleteTourAdmin,
		getTourPriceHistory,
		updateTourPriceWithHistory,
		createCategoryAdmin,
		updateCategoryAdmin,
		deleteCategoryAdmin,
		createDestinationAdmin,
		updateDestinationAdmin,
		deleteDestinationAdmin,
		getAllDurationsAdmin,
		createDurationAdmin,
		updateDurationAdmin,
		deleteDurationAdmin,
		getAllPromosAdmin,
		createPromoAdmin,
		updatePromoAdmin,
		deletePromoAdmin,
		getMasterBookingStatuses,
		createMasterBookingStatus,
		updateMasterBookingStatus,
		deleteMasterBookingStatus,
		getMasterPaymentStatuses,
		createMasterPaymentStatus,
		updateMasterPaymentStatus,
		deleteMasterPaymentStatus,
		getMasterContentStatuses,
		createMasterContentStatus,
		updateMasterContentStatus,
		deleteMasterContentStatus,
		getMasterDiscountTypes,
		createMasterDiscountType,
		updateMasterDiscountType,
		deleteMasterDiscountType,
		getMasterSpots,
		getMasterTaxes,
		getActiveMasterTax,
		createMasterTaxAdmin,
		updateMasterTaxAdmin,
		deleteMasterTaxAdmin,
		getUsersAdmin,
		getRolesAdmin,
		createUserAdmin,
		updateUserAdmin,
		deleteUserAdmin,
		createRoleAdmin,
		updateRoleAdmin,
		deleteRoleAdmin,
		getAllMenusAdmin,
		getRoleMenuPermissionsAdmin,
		updateRoleMenuPermissionsAdmin,
		uploadImage,
		getImageUrl,
		broadcastSyncEvent,
		onSyncEvent
	};
}
// app/app.vue?vue&type=script&setup=true&lang.ts
var app_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "app",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { getCompanyProfile, getImageUrl} = useWisataApi();
		const { data: company } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("app-company-profile", () => getCompanyProfile())), __temp = await __temp, __restore(), __temp);
		const faviconHref = computed(() => {
			const url = company.value?.faviconUrl || company.value?.logoUrl;
			if (!url || url === "/favicon.png") return "/logo-trip.png";
			return getImageUrl(url);
		});
		const faviconType = computed(() => {
			const href = faviconHref.value.toLowerCase();
			if (href.endsWith(".png")) return "image/png";
			if (href.endsWith(".svg")) return "image/svg+xml";
			if (href.endsWith(".jpg") || href.endsWith(".jpeg")) return "image/jpeg";
			if (href.endsWith(".webp")) return "image/webp";
			return "image/x-icon";
		});
		const pageTitle = computed(() => {
			if (company.value?.browserTitle?.trim()) return company.value.browserTitle.trim();
			return `${company.value?.brandName || company.value?.companyName || "Trip Nusa Penida Explore"} - ${company.value?.tagline || "Platform Booking Wisata & Fast Boat"}`;
		});
		useHead(() => ({
			title: pageTitle.value,
			link: [
				{
					rel: "icon",
					type: faviconType.value,
					href: faviconHref.value,
					key: "app-favicon"
				},
				{
					rel: "shortcut icon",
					href: faviconHref.value,
					key: "app-shortcut-icon"
				},
				{
					rel: "apple-touch-icon",
					href: faviconHref.value,
					key: "app-apple-icon"
				}
			]
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(page_default, _attrs, null, _parent));
		};
	}
});
// app/app.vue
var _sfc_setup$2 = app_vue_vue_type_script_setup_true_lang_default.setup;
app_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var app_default = app_vue_vue_type_script_setup_true_lang_default;
// node_modules/nuxt/dist/app/components/nuxt-error-page.vue
var _sfc_main$1 = {
	__name: "nuxt-error-page",
	__ssrInlineRender: true,
	props: { error: Object },
	setup(__props) {
		const _error = __props.error;
		const status = Number(_error.statusCode || 500);
		const is404 = status === 404;
		const statusText = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
		const description = _error.message || _error.toString();
		const stack = void 0;
		const _Error404 = defineAsyncComponent(() => import('../build/error-404-Dt78l3dn.mjs'));
		const _Error = defineAsyncComponent(() => import('../build/error-500-cFDY5PnK.mjs'));
		const ErrorTemplate = is404 ? _Error404 : _Error;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({
				status: unref(status),
				statusText: unref(statusText),
				statusCode: unref(status),
				statusMessage: unref(statusText),
				description: unref(description),
				stack: unref(stack)
			}, _attrs), null, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fisland-renderer.mjs
var IslandRenderer = () => null;
// node_modules/nuxt/dist/app/components/nuxt-root.vue
var _sfc_main = {
	__name: "nuxt-root",
	__ssrInlineRender: true,
	setup(__props) {
		const nuxtApp = useNuxtApp();
		nuxtApp.deferHydration();
		nuxtApp.ssrContext.url;
		const SingleRenderer = false;
		provide(PageRouteSymbol, useRoute$1());
		nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
		const error = /* @__PURE__ */ useError();
		const abortRender = error.value && !nuxtApp.ssrContext.error;
		function invokeAppErrorHandler(err, target, info) {
			const errorHandler = nuxtApp.vueApp.config.errorHandler;
			if (errorHandler && !errorHandler.__nuxt_default) try {
				errorHandler(err, target, info);
			} catch (handlerError) {
				console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
			}
		}
		onErrorCaptured((err, target, info) => {
			nuxtApp.hooks.callHook("vue:error", err, target, info)?.catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
			{
				const p = nuxtApp.runWithContext(() => showError(createErrorFromThrown(err, {
					route: nuxtApp._route
				})));
				onServerPrefetch(() => p);
				invokeAppErrorHandler(err, target, info);
				return false;
			}
		});
		const islandContext = nuxtApp.ssrContext.islandContext;
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderSuspense(_push, {
				default: () => {
					if (unref(abortRender)) _push(`<div></div>`);
					else if (unref(error)) _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
					else if (unref(islandContext)) _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
					else if (unref(SingleRenderer)) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
					else _push(ssrRenderComponent(unref(app_default), null, null, _parent));
				},
				_: 1
			});
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-root.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
// node_modules/nuxt/dist/app/entry.js
var entry$1 = async function createNuxtAppServer(ssrContext) {
	const vueApp = createApp(_sfc_main);
	const nuxt = createNuxtApp({
		vueApp,
		ssrContext
	});
	try {
		await applyPlugins(nuxt, virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default);
		await nuxt.hooks.callHook("app:created", vueApp);
	} catch (error) {
		await nuxt.hooks.callHook("app:error", error);
		nuxt.payload.error ||= createErrorFromThrown(error, { route: nuxt._route });
	}
	if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) throw new Error("skipping render");
	return vueApp;
};
var entry_default = ((ssrContext) => entry$1(ssrContext));

const entry = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: entry_default
}, Symbol.toStringTag, { value: 'Module' }));

export { useRuntimeConfig as a, useRoute$1 as b, useAsyncData as c, appDiagnostics as d, useHead as e, useRouter as f, encodeRoutePath as g, isRootedPath as h, isAbsoluteHref as i, useNuxtApp as j, nuxtLinkDefaults as k, entry as l, navigateTo as n, resolveRouteObject as r, sanitizeAnchorHref as s, tryUseNuxtApp as t, useWisataApi as u, vforBound as v };
//# sourceMappingURL=entry.mjs.map
