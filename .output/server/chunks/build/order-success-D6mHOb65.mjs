import { N as NuxtLink } from './nuxt-link-BZR9fs_n.mjs';
import { b as useRoute$1, u as useWisataApi } from '../virtual/entry.mjs';
import { _ as _virtual_public__2Fdana_logo_default } from './_virtual_public-DGG8jvQn.mjs';
import { u as useLanguage } from './useLanguage-CoSwGzMA.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-DjkACiAr.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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
import 'nostics';
import 'nostics/formatters/ansi';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue-router';
import 'unhead/utils';
import 'axios';

// app/pages/order-success.vue?vue&type=script&setup=true&lang.ts
var order_success_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "order-success",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute$1();
		const { t, locale } = useLanguage();
		useWisataApi();
		const companyInfo = ref(null);
		const loading = ref(true);
		const booking = ref(null);
		const timeLeftSeconds = ref(1800);
		computed(() => {
			return route.query.bookingCode || route.query.bizNo || route.query.merchantTransId || route.query.orderRef || "";
		});
		const isPaid = computed(() => {
			if (!booking.value) return false;
			const status = typeof booking.value.paymentStatus === "object" ? booking.value.paymentStatus?.code : booking.value.paymentStatus;
			const orderStatus = typeof booking.value.status === "object" ? booking.value.status?.code : booking.value.status;
			return status === "PAID" || orderStatus === "CONFIRMED" || orderStatus === "COMPLETED";
		});
		const isExpired = computed(() => {
			if (!booking.value) return false;
			if (isPaid.value) return false;
			const orderStatus = typeof booking.value.status === "object" ? booking.value.status?.code : booking.value.status;
			if (orderStatus === "CANCELLED" || orderStatus === "FAILED") return true;
			return timeLeftSeconds.value <= 0;
		});
		const checkoutUrl = computed(() => {
			if (!booking.value) return "#";
			return booking.value.checkoutUrl || booking.value.dana?.checkout_url || `https://m.dana.id/d/portal/cashier/checkout?bizNo=${booking.value.bookingCode}`;
		});
		const formattedCountdown = computed(() => {
			const m = Math.floor(timeLeftSeconds.value / 60);
			const s = timeLeftSeconds.value % 60;
			return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
		});
		const whatsappUrl = computed(() => {
			const code = booking.value?.bookingCode || "";
			const title = booking.value?.tourPackage?.title || "Tour Wisata";
			const brand = companyInfo.value?.brandName || companyInfo.value?.companyName || "Trip Nusa Penida Explore";
			return `https://wa.me/${(companyInfo.value?.whatsapp || companyInfo.value?.phone || "6281234567890").replace(/\D/g, "")}?text=${locale.value === "en" ? encodeURIComponent(`Hello ${brand} Team, I have completed payment for Booking Code: ${code} (${title}). Please confirm my schedule & meeting point. Thank you.`) : encodeURIComponent(`Halo Tim ${brand}, saya telah menyelesaikan pembayaran DANA Gapura untuk Kode Reservasi: ${code} (${title}). Mohon konfirmasi jadwal & titik kumpul. Terima kasih.`)}`;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 print:bg-white print:text-black" }, _attrs))} data-v-ac1516bd><header class="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between print:hidden" data-v-ac1516bd>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "flex items-center gap-2.5 font-bold text-sm text-slate-700 dark:text-slate-200 hover:text-teal-600 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span data-v-ac1516bd${_scopeId}>←</span><span data-v-ac1516bd${_scopeId}>${ssrInterpolate(unref(t)("orderSuccess.backHome"))}</span>`);
					else return [createVNode("span", null, "←"), createVNode("span", null, toDisplayString(unref(t)("orderSuccess.backHome")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<div class="flex items-center gap-3" data-v-ac1516bd><div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-xs font-bold text-[#108ee9] shadow-xs" data-v-ac1516bd><div class="h-4 px-1 rounded bg-white flex items-center justify-center shrink-0 shadow-xs" data-v-ac1516bd><img${ssrRenderAttr("src", _virtual_public__2Fdana_logo_default)} alt="DANA Logo" class="h-2.5 w-auto object-contain" data-v-ac1516bd></div><span class="hidden sm:inline" data-v-ac1516bd>Didukung oleh</span><span data-v-ac1516bd>DANA Gapura SaaS Gateway</span></div></div></header><main class="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-8 space-y-6" data-v-ac1516bd>`);
			if (loading.value) _push(`<div class="py-20 text-center space-y-3" data-v-ac1516bd><div class="w-12 h-12 border-4 border-blue-200 border-t-[#108ee9] rounded-full animate-spin mx-auto" data-v-ac1516bd></div><p class="text-sm font-bold text-slate-600 dark:text-slate-400" data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.verifying"))}</p></div>`);
			else if (booking.value) {
				_push(`<div class="space-y-6" data-v-ac1516bd>`);
				if (isPaid.value) {
					_push(`<div class="space-y-6 animate-in fade-in zoom-in-95 duration-200" data-v-ac1516bd><div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent border-2 border-emerald-500/50 text-center space-y-4 shadow-sm" data-v-ac1516bd><div class="w-16 h-16 rounded-3xl bg-emerald-500 text-white flex items-center justify-center text-3xl shadow-xl shadow-emerald-500/30 mx-auto" data-v-ac1516bd> ✓ </div><div class="space-y-1" data-v-ac1516bd><div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-black text-xs uppercase tracking-wider" data-v-ac1516bd><span data-v-ac1516bd>•</span> ${ssrInterpolate(unref(t)("orderSuccess.paidBadge"))}</div><h1 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white pt-1" data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.paidTitle"))}</h1></div><div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/40 text-left space-y-2 shadow-sm max-w-xl mx-auto" data-v-ac1516bd><div class="text-xs sm:text-sm font-extrabold text-emerald-700 dark:text-emerald-300 flex items-center gap-2" data-v-ac1516bd><span data-v-ac1516bd>📧</span><span data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.invoiceConfirm"))}</span></div><p class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 pl-6 leading-relaxed" data-v-ac1516bd>`);
					if (unref(locale) === "en") _push(`<span data-v-ac1516bd>Payment successful and the invoice has been sent to your email address: </span>`);
					else _push(`<span data-v-ac1516bd>Pembayaran sukses dan invoice sudah dikirim ke alamat email Anda: </span>`);
					_push(`<span class="font-mono text-emerald-600 dark:text-emerald-400 font-extrabold" data-v-ac1516bd>${ssrInterpolate(booking.value.customerEmail)}</span>. </p><p class="text-[11px] text-slate-500 dark:text-slate-400 pl-6 leading-relaxed" data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.invoiceDesc"))}</p></div><div class="flex flex-wrap items-center justify-center gap-3 pt-2 print:hidden" data-v-ac1516bd><button type="button" class="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-slate-900 hover:bg-black dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow-md transition-all flex items-center gap-2" data-v-ac1516bd><span data-v-ac1516bd>🖨️</span><span data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.printInvoice"))}</span></button><a${ssrRenderAttr("href", whatsappUrl.value)} target="_blank" class="px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 hover:bg-emerald-200 transition-colors flex items-center gap-2" data-v-ac1516bd><span data-v-ac1516bd>💬</span><span data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.whatsappCs"))}</span></a>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/",
						class: "px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(unref(t)("orderSuccess.backHome"))}`);
							else return [createTextVNode(toDisplayString(unref(t)("orderSuccess.backHome")), 1)];
						}),
						_: 1
					}, _parent));
					_push(`</div></div></div>`);
				} else if (!isExpired.value) _push(`<div class="space-y-6 animate-in fade-in zoom-in-95 duration-200" data-v-ac1516bd><div class="p-6 sm:p-8 rounded-3xl bg-amber-500/10 border-2 border-amber-500/40 text-center space-y-4" data-v-ac1516bd><div class="w-16 h-16 rounded-3xl bg-amber-500 text-white flex items-center justify-center text-3xl shadow-xl shadow-amber-500/30 mx-auto" data-v-ac1516bd> ⏳ </div><div class="space-y-1" data-v-ac1516bd><div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-black text-xs uppercase tracking-wider" data-v-ac1516bd><span data-v-ac1516bd>•</span> ${ssrInterpolate(unref(t)("orderSuccess.waitingBadge"))}</div><h1 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white pt-1" data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.waitingTitle"))}</h1></div><div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-500/30 max-w-md mx-auto flex items-center justify-between shadow-sm" data-v-ac1516bd><div class="text-left" data-v-ac1516bd><span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider" data-v-ac1516bd> ⏱️ ${ssrInterpolate(unref(t)("orderSuccess.timeRemaining"))}</span><div class="font-mono text-2xl font-black text-rose-600 dark:text-rose-400" data-v-ac1516bd>${ssrInterpolate(formattedCountdown.value)}</div></div><div class="text-right" data-v-ac1516bd><span class="text-[11px] text-slate-400 block" data-v-ac1516bd>Total Tagihan:</span><span class="text-xl font-black text-[#108ee9]" data-v-ac1516bd> Rp ${ssrInterpolate((booking.value.totalAmount || 0).toLocaleString("id-ID"))}</span></div></div><p class="text-xs text-amber-800 dark:text-amber-300 max-w-lg mx-auto leading-relaxed" data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.waitingDesc"))}</p><div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 print:hidden" data-v-ac1516bd><a${ssrRenderAttr("href", checkoutUrl.value)} class="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white text-sm bg-gradient-to-r from-blue-600 via-[#108ee9] to-blue-700 hover:from-blue-700 hover:to-cyan-600 shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2" data-v-ac1516bd><span data-v-ac1516bd>💳</span><span data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.resumePayment"))}</span></a><button type="button" class="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-colors flex items-center justify-center gap-2" data-v-ac1516bd><span data-v-ac1516bd>🔄</span><span data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.simulateCheck"))}</span></button></div></div></div>`);
				else {
					_push(`<div class="space-y-6 animate-in fade-in zoom-in-95 duration-200" data-v-ac1516bd><div class="p-6 sm:p-8 rounded-3xl bg-rose-500/10 border-2 border-rose-500/40 text-center space-y-4" data-v-ac1516bd><div class="w-16 h-16 rounded-3xl bg-rose-600 text-white flex items-center justify-center text-3xl shadow-xl shadow-rose-600/30 mx-auto" data-v-ac1516bd> ✕ </div><div class="space-y-1" data-v-ac1516bd><div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/20 text-rose-800 dark:text-rose-300 font-black text-xs uppercase tracking-wider" data-v-ac1516bd><span data-v-ac1516bd>•</span> ${ssrInterpolate(unref(t)("orderSuccess.expiredBadge"))}</div><h1 class="text-2xl sm:text-3xl font-black text-rose-700 dark:text-rose-400 pt-1" data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.expiredTitle"))}</h1></div><div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-500/30 text-left space-y-2 shadow-sm max-w-xl mx-auto" data-v-ac1516bd><div class="text-xs sm:text-sm font-extrabold text-rose-700 dark:text-rose-400 flex items-center gap-2" data-v-ac1516bd><span data-v-ac1516bd>⚠️</span><span data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.statusDetail"))}</span></div><p class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 pl-6 leading-relaxed" data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.expiredNotice"))}</p><p class="text-[11px] text-slate-500 dark:text-slate-400 pl-6 leading-relaxed" data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.expiredDesc"))}</p></div><div class="pt-2 flex justify-center print:hidden" data-v-ac1516bd>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/#tours",
						class: "px-8 py-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-xl shadow-teal-500/25 transition-all flex items-center gap-2"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<span data-v-ac1516bd${_scopeId}>🔄</span><span data-v-ac1516bd${_scopeId}>${ssrInterpolate(unref(t)("orderSuccess.rebookBtn"))}</span>`);
							else return [createVNode("span", null, "🔄"), createVNode("span", null, toDisplayString(unref(t)("orderSuccess.rebookBtn")), 1)];
						}),
						_: 1
					}, _parent));
					_push(`</div></div></div>`);
				}
				_push(`<div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6" data-v-ac1516bd><div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800" data-v-ac1516bd><div data-v-ac1516bd><span class="text-[10px] text-slate-400 uppercase tracking-widest font-black block" data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.bookingCode"))}</span><span class="font-mono font-black text-lg text-[#108ee9]" data-v-ac1516bd>${ssrInterpolate(booking.value.bookingCode)}</span></div><div class="text-right" data-v-ac1516bd><span class="text-[10px] text-slate-400 uppercase tracking-widest font-black block" data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.paymentMethod"))}</span><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 text-[#108ee9] shadow-sm mt-0.5" data-v-ac1516bd><img${ssrRenderAttr("src", _virtual_public__2Fdana_logo_default)} alt="DANA Official Logo" class="h-3.5 w-auto object-contain" data-v-ac1516bd><span data-v-ac1516bd>DANA Gapura SaaS</span></div></div></div><div class="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center" data-v-ac1516bd><div class="sm:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center" data-v-ac1516bd><div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2" data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.qrTitle"))}</div><div class="w-32 h-32 p-1.5 bg-white rounded-xl shadow-inner border border-slate-200 flex items-center justify-center" data-v-ac1516bd><img${ssrRenderAttr("src", `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(booking.value.bookingCode)}`)}${ssrRenderAttr("alt", `QR Tiket ${booking.value.bookingCode}`)} class="w-full h-full object-contain" data-v-ac1516bd></div><span class="text-[10px] text-slate-400 mt-2 font-mono" data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.scanNotice"))}</span></div><div class="sm:col-span-8 space-y-3 text-xs sm:text-sm" data-v-ac1516bd><div data-v-ac1516bd><span class="text-slate-400 text-[11px] block" data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.tourTitle"))}</span><div class="font-extrabold text-slate-900 dark:text-white text-base" data-v-ac1516bd>${ssrInterpolate(booking.value.tourPackage?.title || "Tour Wisata")}</div></div><div class="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800" data-v-ac1516bd><div data-v-ac1516bd><span class="text-slate-400 text-[11px] block" data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.guestName"))}</span><strong class="font-semibold text-slate-800 dark:text-slate-200" data-v-ac1516bd>${ssrInterpolate(booking.value.customerName)}</strong></div><div data-v-ac1516bd><span class="text-slate-400 text-[11px] block" data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.guestEmail"))}</span><strong class="font-semibold text-slate-800 dark:text-slate-200 break-all" data-v-ac1516bd>${ssrInterpolate(booking.value.customerEmail)}</strong></div><div data-v-ac1516bd><span class="text-slate-400 text-[11px] block" data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.tourDate"))}</span><strong class="font-semibold text-teal-600 dark:text-teal-400" data-v-ac1516bd>${ssrInterpolate(booking.value.tourDate)}</strong></div><div data-v-ac1516bd><span class="text-slate-400 text-[11px] block" data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.guestCount"))}</span><strong class="font-semibold text-slate-800 dark:text-slate-200" data-v-ac1516bd>${ssrInterpolate(booking.value.adultCount)} ${ssrInterpolate(unref(t)("orderSuccess.adults"))}`);
				if (booking.value.childCount) _push(`<span data-v-ac1516bd>, ${ssrInterpolate(booking.value.childCount)} ${ssrInterpolate(unref(t)("orderSuccess.children"))}</span>`);
				else _push(`<!---->`);
				_push(`</strong></div></div>`);
				if (booking.value.customerNotes) _push(`<div class="pt-2 text-slate-500 dark:text-slate-400 text-[11px] italic" data-v-ac1516bd> Catatan: &quot;${ssrInterpolate(booking.value.customerNotes)}&quot; </div>`);
				else _push(`<!---->`);
				_push(`</div></div><div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm" data-v-ac1516bd><div class="flex justify-between text-slate-600 dark:text-slate-400" data-v-ac1516bd><span data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.subtotal"))}</span><span class="font-bold text-slate-900 dark:text-white" data-v-ac1516bd> Rp ${ssrInterpolate((booking.value.subtotal || booking.value.totalAmount).toLocaleString("id-ID"))}</span></div>`);
				if (booking.value.discountAmount && booking.value.discountAmount > 0) _push(`<div class="flex justify-between text-teal-600 font-bold" data-v-ac1516bd><span data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.discount"))}</span><span data-v-ac1516bd>- Rp ${ssrInterpolate(booking.value.discountAmount.toLocaleString("id-ID"))}</span></div>`);
				else _push(`<!---->`);
				_push(`<div class="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700 text-base font-black text-slate-900 dark:text-white" data-v-ac1516bd><span data-v-ac1516bd>${ssrInterpolate(unref(t)("orderSuccess.totalPaid"))}</span><span class="text-[#108ee9]" data-v-ac1516bd> Rp ${ssrInterpolate((booking.value.totalAmount || 0).toLocaleString("id-ID"))}</span></div><div class="pt-3 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400" data-v-ac1516bd><div class="flex items-center gap-2" data-v-ac1516bd><span data-v-ac1516bd>Didukung oleh:</span><div class="h-5 px-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs" data-v-ac1516bd><img${ssrRenderAttr("src", _virtual_public__2Fdana_logo_default)} alt="DANA Official Logo" class="h-3 w-auto object-contain" data-v-ac1516bd></div><span class="font-bold text-[#108ee9]" data-v-ac1516bd>DANA Gapura SaaS Payment Gateway</span></div><span class="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold" data-v-ac1516bd>✓ Terverifikasi Otomatis</span></div></div></div></div>`);
			} else {
				_push(`<div class="py-16 text-center space-y-4" data-v-ac1516bd><div class="text-4xl" data-v-ac1516bd>🔍</div><h2 class="text-xl font-bold" data-v-ac1516bd>Data Reservasi Tidak Ditemukan</h2><p class="text-xs text-slate-500 max-w-sm mx-auto" data-v-ac1516bd> Kode reservasi tidak valid atau belum tercatat di server. </p>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/",
					class: "inline-block px-5 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-md"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(unref(t)("orderSuccess.backHome"))}`);
						else return [createTextVNode(toDisplayString(unref(t)("orderSuccess.backHome")), 1)];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			}
			_push(`</main></div>`);
		};
	}
});
// app/pages/order-success.vue
var _sfc_setup = order_success_vue_vue_type_script_setup_true_lang_default.setup;
order_success_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/order-success.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var order_success_default = /*#__PURE__*/ _plugin_vue_export_helper_default(order_success_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-ac1516bd"]]);

export { order_success_default as default };
//# sourceMappingURL=order-success-D6mHOb65.mjs.map
