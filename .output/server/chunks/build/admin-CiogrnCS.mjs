import { N as NuxtLink } from './nuxt-link-BZR9fs_n.mjs';
import { u as useWisataApi, a as useRuntimeConfig } from '../virtual/entry.mjs';
import { _ as _virtual_public__2Fdana_logo_default } from './_virtual_public-DGG8jvQn.mjs';
import { u as useTheme, s as ssrRenderList$2, S as SearchableSelect_default } from './useTheme-jR-NkPQp.mjs';
import { defineComponent, ref, computed, watch, mergeProps, withCtx, unref, openBlock, createBlock, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass, ssrRenderStyle, ssrRenderDynamicModel } from 'vue/server-renderer';
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

// app/components/TurnstileWidget.vue?vue&type=script&setup=true&lang.ts
var TurnstileWidget_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TurnstileWidget",
	__ssrInlineRender: true,
	props: {
		modelValue: { default: "" },
		action: { default: "login" },
		theme: { default: "auto" },
		size: { default: "normal" }
	},
	emits: [
		"update:modelValue",
		"success",
		"error",
		"expired"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const emit = __emit;
		ref(null);
		const loading = ref(true);
		const widgetRendered = ref(false);
		const statusMsg = ref("");
		useRuntimeConfig().public?.turnstileSiteKey;
		const reset = () => {
			if ((void 0).turnstile && false);
			emit("update:modelValue", "");
		};
		const useTestToken = () => {
			const testToken = "1x00000000000000000000AA";
			emit("update:modelValue", testToken);
			emit("success", testToken);
			loading.value = false;
		};
		__expose({
			reset,
			useTestToken
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "turnstile-container my-3 flex flex-col items-center justify-center" }, _attrs))}><div class="min-h-[65px] flex items-center justify-center">`);
			if (loading.value && !widgetRendered.value) _push(`<div class="flex items-center space-x-2 text-xs text-slate-400 py-2"><svg class="animate-spin h-4 w-4 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg><span>Memuat verifikasi keamanan (Anti-Bot)...</span></div>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (statusMsg.value) _push(`<div class="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1"><span>${ssrInterpolate(statusMsg.value)}</span></div>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// app/components/TurnstileWidget.vue
var _sfc_setup$1 = TurnstileWidget_vue_vue_type_script_setup_true_lang_default.setup;
TurnstileWidget_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TurnstileWidget.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var TurnstileWidget_default = Object.assign(TurnstileWidget_vue_vue_type_script_setup_true_lang_default, { __name: "TurnstileWidget" });
// app/pages/admin/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { isDark} = useTheme();
		const { adminToken, currentAdmin, authSessionExpiredMsg, getAllBookingsAdmin, getUsersAdmin, getRolesAdmin, getAllMenusAdmin, getImageUrl} = useWisataApi();
		const tabs = [
			{
				id: "frontend",
				label: "Kelola Tampilan Frontend (CMS)",
				icon: "🎨"
			},
			{
				id: "company",
				label: "Master Profil PT & Logo",
				icon: "🏢"
			},
			{
				id: "tours",
				label: "Master Paket Wisata",
				icon: "🌴"
			},
			{
				id: "price-history",
				label: "Master Harga & Audit Riwayat",
				icon: "💰"
			},
			{
				id: "promos",
				label: "Master Promo & Kupon",
				icon: "🎁"
			},
			{
				id: "masters",
				label: "Master Kategori, Destinasi & Durasi",
				icon: "🏷️"
			},
			{
				id: "statuses",
				label: "Master Status",
				icon: "🚦"
			},
			{
				id: "bookings",
				label: "Master Reservasi & Transaksi",
				icon: "📋"
			},
			{
				id: "users",
				label: "Master Pengguna & Admin",
				icon: "👥"
			},
			{
				id: "roles",
				label: "Master Role & Akses Menu",
				icon: "🛡️"
			}
		];
		const activeTab = ref("frontend");
		const uploadingLogo = ref(false);
		const uploadingLogoDark = ref(false);
		const uploadingFavicon = ref(false);
		const uploadingTourImage = ref(false);
		const uploadingHeroImage = ref(false);
		const uploadingCatImage = ref(false);
		const uploadingDestImage = ref(false);
		const loginForm = ref({
			email: "",
			password: ""
		});
		const loginLoading = ref(false);
		const loginError = ref("");
		const loginTurnstileToken = ref("");
		const loginTurnstileRef = ref(null);
		const isForgotPasswordModalOpen = ref(false);
		const forgotStep = ref("email");
		const forgotEmail = ref("");
		const forgotOtp = ref("");
		const forgotNewPassword = ref("");
		const forgotError = ref("");
		const forgotSuccess = ref("");
		const sendOtpLoading = ref(false);
		const resetPasswordLoading = ref(false);
		const forgotTurnstileToken = ref("");
		const forgotTurnstileRef = ref(null);
		const resetTurnstileToken = ref("");
		const resetTurnstileRef = ref(null);
		const isLoginLogsModalOpen = ref(false);
		const loginLogsLoading = ref(false);
		const loginLogsList = ref([]);
		const loginLogsSearch = ref("");
		const company = ref({
			companyName: "PT Wisata Bahari Indonesia",
			brandName: "Booking Wisata Bahari",
			legalName: "PT Wisata Bahari Indonesia Tbk",
			tagline: "Eksplorasi Keindahan Laut & Pulau Eksotis Nusantara",
			description: "Penyedia layanan reservasi paket wisata bahari, snorkeling Nusa Penida Manta Bay, tiket fast boat Sanur, dan private tour eksotis Indonesia.",
			logoUrl: "",
			logoDarkUrl: "",
			faviconUrl: "",
			email: "info@wisatabahari.com",
			phone: "+62 812-3456-7890",
			whatsapp: "+62 812-3456-7890",
			address: "Jl. Hang Tuah No. 45, Sanur Kaja, Denpasar Selatan",
			city: "Denpasar",
			province: "Bali",
			postalCode: "80228",
			bankName: "Bank Central Asia (BCA)",
			bankAccountNumber: "8830192831",
			bankAccountName: "PT WISATA BAHARI INDONESIA",
			footerText: "© 2026 PT Wisata Bahari Indonesia. Seluruh hak cipta dilindungi undang-undang.",
			popularDestinations: "",
			browserTitle: "",
			heroBadge: "🌊 Platform Booking Wisata Bahari Terpercaya #1",
			heroTitle: "Jelajahi Surga Bawah Laut Indonesia",
			heroSubtitle: "Nikmati petualangan bahari tak terlupakan dengan paket snorkeling Manta Bay, diving terumbu karang eksotis, dan tiket fast boat resmi bergaransi.",
			heroCtaPrimary: "Pilih Paket Wisata",
			heroCtaSecondary: "Lihat Promo Spesial",
			heroImageUrl: "/images/hero-banner-bali.jpg",
			heroCardTitle: "One Day Snorkeling Manta Bay",
			heroCardSubtitle: "Nusa Penida, Bali",
			heroCardBadge: "Destinasi Terfavorit",
			heroCardPriceText: "",
			heroPromoBadge: "Promo s/d 20% OFF",
			heroBoatRoute: "Sanur ⇄ Nusa Penida",
			heroBoatInfo: "Fast Boat Resmi • Hanya 45 Menit",
			heroStatsCount1: "50K+",
			heroStatsLabel1: "Wisatawan Bahari Terlayani",
			heroStatsCount2: "100%",
			heroStatsLabel2: "Garansi Berangkat Tepat Waktu",
			heroStatsCount3: "4.9★",
			heroStatsLabel3: "Rating Kepuasan Pelanggan",
			heroStatsCount4: "24/7",
			heroStatsLabel4: "Dukungan CS",
			announcementText: "🌊 Promo Liburan Bahari: Dapatkan Diskon s/d 20% dengan kode",
			announcementMobile: "🌊 Promo Spesial Bahari s/d 20% OFF",
			announcementPromoCode: "WISATAHEMAT20",
			operatingHours: "Buka Setiap Hari (06:00 - 21:00 WITA)",
			facebookUrl: "https://facebook.com/wisatabahari",
			instagramUrl: "https://instagram.com/wisatabahari",
			youtubeUrl: "https://youtube.com/@wisatabahari",
			tiktokUrl: "https://tiktok.com/@wisatabahari",
			categoriesTitle: "Kategori Petualangan Laut",
			categoriesSubtitle: "Pilih jenis petualangan bahari sesuai gaya liburan impian Anda",
			toursTitle: "Katalog Paket Wisata Favorit",
			toursSubtitle: "Pilihan tur laut & kepulauan paling populer dengan fasilitas terlengkap",
			promosTitle: "Promo Eksklusif Wisata Bahari",
			promosSubtitle: "Gunakan kupon diskon spesial untuk liburan bahari lebih hemat bersama keluarga & sahabat",
			testimonialsTitle: "Apa Kata Wisatawan Kami?",
			testimonialsSubtitle: "Cerita nyata dan ulasan jujur dari ribuan petualang laut yang telah berlayar bersama kami"
		});
		const savingCompany = ref(false);
		const toastMessage = ref("");
		const toursList = ref([]);
		const categoriesList = ref([]);
		const destinationsList = ref([]);
		const durationsList = ref([]);
		const bookingsList = ref([]);
		const priceHistories = ref([]);
		const promosList = ref([]);
		const bookingStatuses = ref([]);
		const paymentStatuses = ref([]);
		const contentStatuses = ref([]);
		const discountTypes = ref([]);
		const taxesList = ref([]);
		const masterSpotsList = ref([]);
		const activeStatusCategory = ref("all");
		const usersList = ref([]);
		const rolesList = ref([]);
		const isUsersLoading = ref(false);
		const userSearchQuery = ref("");
		const userRoleFilter = ref("");
		const userStatusFilter = ref("");
		const isUserModalOpen = ref(false);
		const isEditingUser = ref(false);
		ref("");
		const savingUser = ref(false);
		const userModalError = ref("");
		const showPassword = ref(false);
		const uploadingUserAvatar = ref(false);
		const userForm = ref({
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			phone: "",
			avatar: "",
			roleId: "",
			isActive: true
		});
		const filteredUsersList = computed(() => {
			let list = usersList.value;
			if (userRoleFilter.value) list = list.filter((u) => u.roleId === userRoleFilter.value || u.role?.id === userRoleFilter.value || u.role?.name === userRoleFilter.value);
			if (userStatusFilter.value === "active") list = list.filter((u) => u.isActive !== false);
			else if (userStatusFilter.value === "inactive") list = list.filter((u) => u.isActive === false);
			if (userSearchQuery.value.trim()) {
				const q = userSearchQuery.value.toLowerCase().trim();
				list = list.filter((u) => u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q) || u.phone?.toLowerCase().includes(q) || u.role?.displayName?.toLowerCase().includes(q) || u.role?.name?.toLowerCase().includes(q));
			}
			return list;
		});
		const loadUsers = async () => {
			isUsersLoading.value = true;
			try {
				const res = await getUsersAdmin();
				usersList.value = res.items || [];
			} catch (err) {
				console.warn("Gagal memuat pengguna:", err?.message || err);
			} finally {
				isUsersLoading.value = false;
			}
		};
		const loadRoles = async () => {
			try {
				const res = await getRolesAdmin();
				rolesList.value = res || [];
			} catch (err) {
				console.warn("Gagal memuat roles:", err?.message || err);
			}
		};
		const loadUsersAndRoles = async () => {
			await Promise.all([loadUsers(), loadRoles()]);
		};
		watch(activeTab, (newTab) => {
			if (newTab === "users" && usersList.value.length === 0) loadUsersAndRoles();
			else if (newTab === "roles") loadRolesAndMenus();
		});
		const getRoleBadgeClass = (roleName) => {
			const norm = (roleName || "").toUpperCase();
			if (norm === "SUPER_ADMIN") return "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800";
			if (norm === "ADMIN") return "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800";
			if (norm === "STAFF") return "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800";
			if (norm === "AGENT") return "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800";
			return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700";
		};
		const getRoleIcon = (roleName) => {
			const norm = (roleName || "").toUpperCase();
			if (norm === "SUPER_ADMIN") return "👑";
			if (norm === "ADMIN") return "🛡️";
			if (norm === "STAFF") return "💼";
			if (norm === "AGENT") return "🤝";
			return "👤";
		};
		const formatDateIndo = (dateStr) => {
			if (!dateStr) return "-";
			try {
				const d = new Date(dateStr);
				if (isNaN(d.getTime())) return dateStr;
				return d.toLocaleDateString("id-ID", {
					day: "numeric",
					month: "short",
					year: "numeric"
				});
			} catch {
				return dateStr;
			}
		};
		const menusList = ref([]);
		const isRolesLoading = ref(false);
		const roleSearchQuery = ref("");
		const isRoleModalOpen = ref(false);
		const isEditingRole = ref(false);
		ref("");
		const savingRole = ref(false);
		const roleModalError = ref("");
		const roleForm = ref({
			name: "",
			displayName: "",
			description: ""
		});
		const filteredRolesList = computed(() => {
			let list = rolesList.value;
			if (roleSearchQuery.value.trim()) {
				const q = roleSearchQuery.value.toLowerCase().trim();
				list = list.filter((r) => r.name?.toLowerCase().includes(q) || r.displayName?.toLowerCase().includes(q) || r.description?.toLowerCase().includes(q));
			}
			return list;
		});
		const loadMenus = async () => {
			try {
				const res = await getAllMenusAdmin();
				menusList.value = res || [];
			} catch (err) {
				console.warn("Gagal memuat menus:", err?.message || err);
			}
		};
		const loadRolesAndMenus = async () => {
			isRolesLoading.value = true;
			try {
				await Promise.all([loadRoles(), loadMenus()]);
			} finally {
				isRolesLoading.value = false;
			}
		};
		const isRolePermissionsModalOpen = ref(false);
		const selectedRoleForPermissions = ref(null);
		const rolePermissionsList = ref([]);
		const isLoadingPermissions = ref(false);
		const savingRolePermissions = ref(false);
		const isBookingsLoading = ref(false);
		const loadBookings = async () => {
			isBookingsLoading.value = true;
			try {
				const b = await getAllBookingsAdmin();
				if (b && Array.isArray(b)) bookingsList.value = b;
			} catch (e) {
				console.error("Error loadBookings:", e);
			} finally {
				isBookingsLoading.value = false;
			}
		};
		watch(activeTab, (tab) => {
			if (tab === "bookings") loadBookings();
		});
		const bookingSearch = ref("");
		const filterPaymentStatus = ref("");
		const filterBookingStatus = ref("");
		const filterMinAmount = ref("");
		const filterMaxAmount = ref("");
		const filterPayStartDate = ref("");
		const filterPayEndDate = ref("");
		const filterStartDate = ref("");
		const filterEndDate = ref("");
		const bookingPage = ref(1);
		const bookingPageSize = ref(10);
		const getBookingPaymentDate = (b) => {
			const raw = b.confirmedAt || b.paidAt || (b.paymentStatus === "PAID" || b.paymentStatus?.code === "PAID" ? b.updatedAt || b.createdAt : null);
			if (!raw) return "-";
			return String(raw).slice(0, 10);
		};
		const filteredBookings = computed(() => {
			return bookingsList.value.filter((b) => {
				if (bookingSearch.value.trim()) {
					const q = bookingSearch.value.trim().toLowerCase();
					const matchCode = b.bookingCode?.toLowerCase().includes(q);
					const matchName = b.customerName?.toLowerCase().includes(q);
					const matchPhone = b.customerPhone?.toLowerCase().includes(q);
					const matchEmail = b.customerEmail?.toLowerCase().includes(q);
					const matchTour = b.tourPackage?.title?.toLowerCase().includes(q);
					if (!matchCode && !matchName && !matchPhone && !matchEmail && !matchTour) return false;
				}
				const payStatus = typeof b.paymentStatus === "object" ? b.paymentStatus?.code : b.paymentStatus || "UNPAID";
				if (filterPaymentStatus.value && payStatus !== filterPaymentStatus.value) return false;
				const bookStatus = typeof b.status === "object" ? b.status?.code : b.status || "PENDING";
				if (filterBookingStatus.value && bookStatus !== filterBookingStatus.value) return false;
				const total = Number(b.totalAmount || 0);
				if (filterMinAmount.value !== "" && total < Number(filterMinAmount.value)) return false;
				if (filterMaxAmount.value !== "" && total > Number(filterMaxAmount.value)) return false;
				if (filterPayStartDate.value || filterPayEndDate.value) {
					const payRaw = b.confirmedAt || b.paidAt || (b.paymentStatus === "PAID" || b.paymentStatus?.code === "PAID" ? b.updatedAt || b.createdAt : null);
					if (!payRaw) return false;
					const payDate = String(payRaw).slice(0, 10);
					if (filterPayStartDate.value && payDate < filterPayStartDate.value) return false;
					if (filterPayEndDate.value && payDate > filterPayEndDate.value) return false;
				}
				if (filterStartDate.value && b.tourDate) {
					if (b.tourDate.slice(0, 10) < filterStartDate.value) return false;
				}
				if (filterEndDate.value && b.tourDate) {
					if (b.tourDate.slice(0, 10) > filterEndDate.value) return false;
				}
				return true;
			});
		});
		const totalBookingPages = computed(() => {
			return Math.ceil(filteredBookings.value.length / bookingPageSize.value) || 1;
		});
		const paginatedBookings = computed(() => {
			const start = (bookingPage.value - 1) * bookingPageSize.value;
			return filteredBookings.value.slice(start, start + bookingPageSize.value);
		});
		const totalFilteredAmount = computed(() => {
			return filteredBookings.value.reduce((acc, b) => acc + Number(b.totalAmount || 0), 0);
		});
		const totalPaidAmount = computed(() => {
			return filteredBookings.value.filter((b) => {
				return (typeof b.paymentStatus === "object" ? b.paymentStatus?.code : b.paymentStatus || "UNPAID") === "PAID";
			}).reduce((acc, b) => acc + Number(b.totalAmount || 0), 0);
		});
		watch([
			bookingSearch,
			filterPaymentStatus,
			filterBookingStatus,
			filterMinAmount,
			filterMaxAmount,
			filterPayStartDate,
			filterPayEndDate,
			filterStartDate,
			filterEndDate,
			bookingPageSize
		], () => {
			bookingPage.value = 1;
		});
		const isPromoModalOpen = ref(false);
		const savingPromo = ref(false);
		const promoForm = ref({
			id: "",
			code: "",
			title: "",
			description: "",
			discountType: "PERCENT",
			discountValue: 10,
			maxDiscountAmount: void 0,
			minSpend: 0,
			quota: 100,
			startDate: "",
			endDate: "",
			isActive: true,
			isAllPackages: true,
			selectedTourPackageIds: []
		});
		const categoryEmojiList = [
			"🤿",
			"🚤",
			"🛥️",
			"🚢",
			"🏖️",
			"🏝️",
			"🌊",
			"🏄",
			"🏊",
			"🐠",
			"🐟",
			"🐬",
			"🐳",
			"🦈",
			"🐙",
			"🐢",
			"⛵",
			"⚓",
			"🌅",
			"🌴",
			"🧗",
			"🎒",
			"🏕️",
			"📸",
			"🎣",
			"🪂",
			"🎟️",
			"🗺️",
			"🧭",
			"🌄",
			"🚁",
			"✈️",
			"🚗",
			"🛵",
			"🚲",
			"🍹",
			"🥥",
			"✨",
			"⭐",
			"🏷️"
		];
		const isCategoryModalOpen = ref(false);
		const savingCategory = ref(false);
		const categoryForm = ref({
			id: "",
			name: "",
			icon: "🤿",
			description: "",
			imageUrl: ""
		});
		const isDestinationModalOpen = ref(false);
		const savingDestination = ref(false);
		const destinationForm = ref({
			id: "",
			name: "",
			province: "Bali",
			city: "Klungkung",
			description: "",
			imageUrl: ""
		});
		const isDurationModalOpen = ref(false);
		const savingDuration = ref(false);
		const durationForm = ref({
			id: "",
			name: "",
			durationMinutes: 60,
			description: "",
			isActive: true
		});
		const categoryOptions = computed(() => {
			return categoriesList.value.map((c) => ({
				value: c.id,
				label: c.name,
				sublabel: `/${c.slug}`,
				icon: c.icon || "🏷️"
			}));
		});
		const destinationOptions = computed(() => {
			return destinationsList.value.map((d) => ({
				value: d.id,
				label: d.name,
				sublabel: [d.city, d.province].filter(Boolean).join(", ") || "Bali",
				icon: "📍"
			}));
		});
		const durationOptions = computed(() => {
			return durationsList.value.map((du) => ({
				value: du.id,
				label: du.name,
				sublabel: du.durationMinutes ? `${du.durationMinutes} Menit` : du.description,
				badge: du.durationMinutes ? `${du.durationMinutes}m` : void 0,
				icon: "⏱️"
			}));
		});
		const promoOptions = computed(() => {
			const list = [{
				value: "",
				label: "Tanpa Promo Khusus"
			}];
			promosList.value.forEach((p) => {
				const badge = p.discountType === "PERCENT" ? `${p.discountValue}%` : `Rp ${Number(p.discountValue).toLocaleString("id-ID")}`;
				list.push({
					value: p.id,
					label: `${p.code} - ${p.title}`,
					sublabel: p.description || "",
					badge,
					icon: "🎁"
				});
			});
			return list;
		});
		computed(() => {
			return contentStatuses.value.map((s) => ({
				value: s.code,
				label: s.name,
				sublabel: s.code,
				badge: s.code,
				icon: s.code === "PUBLISHED" ? "🟢" : s.code === "DRAFT" ? "📝" : "📦"
			}));
		});
		computed(() => {
			return discountTypes.value.map((d) => ({
				value: d.code,
				label: d.name,
				sublabel: d.code,
				badge: d.code,
				icon: d.code === "PERCENT" ? "📊" : "💵"
			}));
		});
		computed(() => {
			return bookingStatuses.value.map((b) => ({
				value: b.code,
				label: b.name,
				sublabel: b.code,
				badge: b.code,
				icon: "📋"
			}));
		});
		computed(() => {
			return paymentStatuses.value.map((p) => ({
				value: p.code,
				label: p.name,
				sublabel: p.code,
				badge: p.code,
				icon: "💳"
			}));
		});
		const isStatusModalOpen = ref(false);
		const savingStatus = ref(false);
		const isEditingStatus = ref(false);
		const statusForm = ref({
			category: "booking",
			originalCode: "",
			code: "",
			name: "",
			color: "#10b981",
			description: "",
			order: 1,
			isActive: true
		});
		const colorPresets = [
			{
				label: "Hijau (Emerald)",
				hex: "#10b981"
			},
			{
				label: "Biru (Blue)",
				hex: "#3b82f6"
			},
			{
				label: "Kuning (Amber)",
				hex: "#f59e0b"
			},
			{
				label: "Merah (Rose)",
				hex: "#ef4444"
			},
			{
				label: "Ungu (Purple)",
				hex: "#8b5cf6"
			},
			{
				label: "Cyan (Teal)",
				hex: "#06b6d4"
			},
			{
				label: "Abu-abu (Slate)",
				hex: "#64748b"
			},
			{
				label: "Hitam (Dark)",
				hex: "#1e293b"
			}
		];
		const isTaxModalOpen = ref(false);
		const isEditingTax = ref(false);
		const savingTax = ref(false);
		const taxForm = ref({
			id: "",
			name: "",
			rate: 11,
			description: "",
			isActive: false
		});
		const getStatusBadgeStyle = (code, category) => {
			const color = (category === "booking" ? bookingStatuses.value : category === "payment" ? paymentStatuses.value : contentStatuses.value).find((s) => s.code === code)?.color || (code === "PAID" || code === "CONFIRMED" || code === "PUBLISHED" ? "#10b981" : code === "PENDING" ? "#f59e0b" : "#ef4444");
			return {
				backgroundColor: `${color}18`,
				color,
				borderColor: `${color}40`
			};
		};
		const getStatusLabel = (code, category) => {
			return (category === "booking" ? bookingStatuses.value : category === "payment" ? paymentStatuses.value : contentStatuses.value).find((s) => s.code === code)?.name || code;
		};
		const editForm = ref({
			id: "",
			title: "",
			subtitle: "",
			tourType: "PRIVATE",
			description: "",
			includes: "",
			excludes: "",
			itinerary: "",
			featuredImage: "",
			categoryId: "",
			destinationId: "",
			durationId: "",
			price: 0,
			discountPrice: 0,
			isPromo: false,
			isBestSeller: false,
			status: "PUBLISHED",
			promoId: "",
			changeReason: "",
			priceTiers: [],
			spots: []
		});
		const isEditTourModalOpen = ref(false);
		const savingTourPrice = ref(false);
		const authChecking = ref(true);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_TurnstileWidget = TurnstileWidget_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200" }, _attrs))}><header class="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"><div class="flex items-center gap-3">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "flex items-center gap-2.5 group"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (company.value.logoUrl) _push(`<img${ssrRenderAttr("src", unref(getImageUrl)(company.value.logoUrl))}${ssrRenderAttr("alt", company.value.brandName || "Logo")} class="h-10 max-w-[140px] object-contain rounded-xl shadow-sm group-hover:scale-105 transition-transform"${_scopeId}>`);
						else _push(`<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform"${_scopeId}> 🌊 </div>`);
						_push(`<div${_scopeId}><span class="font-extrabold text-lg tracking-tight bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent block leading-tight"${_scopeId}>${ssrInterpolate(company.value.brandName || "Admin Panel")}</span><span class="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest block font-semibold"${_scopeId}>${ssrInterpolate(company.value.companyName || "Master Data Management")}</span></div>`);
					} else return [company.value.logoUrl ? (openBlock(), createBlock("img", {
						key: 0,
						src: unref(getImageUrl)(company.value.logoUrl),
						alt: company.value.brandName || "Logo",
						class: "h-10 max-w-[140px] object-contain rounded-xl shadow-sm group-hover:scale-105 transition-transform"
					}, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
						key: 1,
						class: "w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform"
					}, " 🌊 ")), createVNode("div", null, [createVNode("span", { class: "font-extrabold text-lg tracking-tight bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent block leading-tight" }, toDisplayString(company.value.brandName || "Admin Panel"), 1), createVNode("span", { class: "text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest block font-semibold" }, toDisplayString(company.value.companyName || "Master Data Management"), 1)])];
				}),
				_: 1
			}, _parent));
			_push(`<span class="hidden md:inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60 ml-2"> Panel Master Enterprise </span></div><div class="flex items-center gap-3">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "px-3.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span${_scopeId}>🌐</span><span class="hidden sm:inline"${_scopeId}>Lihat Website</span>`);
					else return [createVNode("span", null, "🌐"), createVNode("span", { class: "hidden sm:inline" }, "Lihat Website")];
				}),
				_: 1
			}, _parent));
			_push(`<button type="button" class="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Ganti Tema">`);
			if (unref(isDark)) _push(`<span>☀️</span>`);
			else _push(`<span>🌙</span>`);
			_push(`</button>`);
			if (unref(adminToken)) _push(`<div class="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800"><div class="hidden sm:block text-right"><span class="text-xs font-bold text-slate-800 dark:text-slate-200 block leading-tight">${ssrInterpolate(unref(currentAdmin)?.name || "Super Admin")}</span><span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono block"> ● Online </span></div><button type="button" class="px-3 py-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-900/50 transition-colors"> Keluar </button></div>`);
			else _push(`<!---->`);
			_push(`</div></div></header><main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
			if (authChecking.value) _push(`<div class="max-w-md mx-auto py-24 text-center space-y-3"><div class="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div><p class="text-xs font-semibold text-slate-500 dark:text-slate-400">Memverifikasi sesi admin...</p></div>`);
			else if (!unref(adminToken)) {
				_push(`<div class="max-w-md mx-auto py-12"><div class="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 relative overflow-hidden"><div class="absolute -top-12 -right-12 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div><div class="text-center mb-8"><div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-600 flex items-center justify-center text-3xl mx-auto shadow-lg shadow-teal-500/20 mb-4"> 🔐 </div><h1 class="text-2xl font-black text-slate-900 dark:text-white"> Login Maintenance Master </h1><p class="text-xs text-slate-500 dark:text-slate-400 mt-1"> Kelola profil ${ssrInterpolate(company.value.companyName || "PT")}, logo, paket wisata &amp; transaksi </p></div>`);
				if (loginError.value || unref(authSessionExpiredMsg)) _push(`<div class="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2"><span>⚠️</span><span>${ssrInterpolate(loginError.value || unref(authSessionExpiredMsg))}</span></div>`);
				else _push(`<!---->`);
				_push(`<form class="space-y-4"><div><label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"> Email Administrator </label><input${ssrRenderAttr("value", loginForm.value.email)} type="email" required class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition" placeholder="admin@wisata.com"></div><div><div class="flex items-center justify-between mb-1.5"><label class="block text-xs font-bold text-slate-700 dark:text-slate-300"> Kata Sandi (Password) </label><button type="button" class="text-xs text-teal-600 dark:text-teal-400 hover:underline font-semibold"> Lupa Password? (OTP Email) </button></div><input${ssrRenderAttr("value", loginForm.value.password)} type="password" required class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition" placeholder="••••••••"></div>`);
				_push(ssrRenderComponent(_component_TurnstileWidget, {
					ref_key: "loginTurnstileRef",
					ref: loginTurnstileRef,
					modelValue: loginTurnstileToken.value,
					"onUpdate:modelValue": ($event) => loginTurnstileToken.value = $event,
					action: "admin_login"
				}, null, _parent));
				_push(`<button type="submit"${ssrIncludeBooleanAttr(loginLoading.value) ? " disabled" : ""} class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-sm shadow-lg shadow-teal-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2">`);
				if (loginLoading.value) _push(`<span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>`);
				else _push(`<!---->`);
				_push(`<span>${ssrInterpolate(loginLoading.value ? "Memverifikasi..." : "Masuk ke Master Panel")}</span></button></form></div></div>`);
			} else {
				_push(`<div class="space-y-6"><div class="bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden"><div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6"><div><div class="flex items-center gap-2 mb-2"><span class="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm"> 🏢 ${ssrInterpolate(company.value.legalName || company.value.companyName)}</span><span class="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-semibold backdrop-blur-sm border border-emerald-400/30"> Sistem Aktif </span></div><h1 class="text-2xl sm:text-3xl font-black"> Maintenance Master &amp; Konfigurasi PT </h1><p class="text-teal-100 text-sm mt-1 max-w-2xl"> Kelola identitas resmi PT, logo, rekening bank penampung, paket wisata bahari, destinasi, dan seluruh transaksi reservasi pelanggan. </p></div><div class="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15"><div class="text-center px-2"><div class="text-xl font-black">${ssrInterpolate(toursList.value.length)}</div><div class="text-[10px] text-teal-200 uppercase font-semibold">Paket Tour</div></div><div class="text-center px-2 border-l border-white/20"><div class="text-xl font-black">${ssrInterpolate(bookingsList.value.length)}</div><div class="text-[10px] text-teal-200 uppercase font-semibold">Booking</div></div><div class="text-center px-2 border-l border-white/20"><div class="text-xl font-black">${ssrInterpolate(categoriesList.value.length)}</div><div class="text-[10px] text-teal-200 uppercase font-semibold">Kategori</div></div><div class="text-center px-2 border-l border-white/20"><div class="text-xl font-black">${ssrInterpolate(usersList.value.length)}</div><div class="text-[10px] text-teal-200 uppercase font-semibold">User</div></div><div class="text-center px-2 border-l border-white/20"><div class="text-xl font-black">${ssrInterpolate(rolesList.value.length)}</div><div class="text-[10px] text-teal-200 uppercase font-semibold">Role</div></div></div></div></div><div class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-2 scrollbar-none"><!--[-->`);
				ssrRenderList$2(tabs, (tab) => {
					_push(`<button class="${ssrRenderClass([activeTab.value === tab.id ? "bg-teal-600 text-white font-bold shadow-md shadow-teal-500/25" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium", "px-4 py-2.5 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2"])}"><span>${ssrInterpolate(tab.icon)}</span><span>${ssrInterpolate(tab.label)}</span></button>`);
				});
				_push(`<!--]--></div>`);
				if (toastMessage.value) _push(`<div class="p-4 rounded-2xl bg-emerald-500 text-white font-medium text-xs sm:text-sm shadow-lg flex items-center justify-between animate-in fade-in"><div class="flex items-center gap-2"><span>✅</span><span>${ssrInterpolate(toastMessage.value)}</span></div><button class="opacity-80 hover:opacity-100 font-bold">✕</button></div>`);
				else _push(`<!---->`);
				if (activeTab.value === "company") {
					_push(`<div class="space-y-6"><div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm"><div class="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 mb-6"><div><h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>🏢</span><span>Identitas Perusahaan &amp; Logo Resmi (Nama PT)</span></h2><p class="text-xs text-slate-500 dark:text-slate-400 mt-1"> Pengaturan ini otomatis muncul pada Navbar, Footer, Invoice Pesanan, dan WhatsApp CS. </p></div><button${ssrIncludeBooleanAttr(savingCompany.value) ? " disabled" : ""} type="button" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-500/20 transition disabled:opacity-50 flex items-center gap-2 shrink-0">`);
					if (savingCompany.value) _push(`<span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>`);
					else _push(`<!---->`);
					_push(`<span>${ssrInterpolate(savingCompany.value ? "Menyimpan..." : "💾 Simpan Profil PT")}</span></button></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Nama Badan Usaha / PT Legal <span class="text-rose-500">*</span></label><input${ssrRenderAttr("value", company.value.companyName)} type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Contoh: PT Wisata Bahari Indonesia"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Nama Brand / Merek Komersial <span class="text-rose-500">*</span></label><input${ssrRenderAttr("value", company.value.brandName)} type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Contoh: Wisata Bahari"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Nama Akta Legal Lengkap </label><input${ssrRenderAttr("value", company.value.legalName)} type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Contoh: PT Wisata Bahari Indonesia Tbk"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Tagline / Slogan Perusahaan </label><input${ssrRenderAttr("value", company.value.tagline)} type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Eksplorasi Keindahan Laut &amp; Pulau Eksotis Nusantara"></div><div class="md:col-span-2"><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Judul Tab Browser &amp; Google (Teks di Sebelah Favicon) </label><input${ssrRenderAttr("value", company.value.browserTitle)} type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Contoh: Trip Nusa Penida Explore - Paket Tour &amp; Fast Boat Resmi (kosong = otomatis Brand - Tagline)"></div><div class="md:col-span-2 pt-2 border-t border-slate-200 dark:border-slate-800"><div class="mb-4"><h3 class="font-black text-slate-900 dark:text-white flex items-center gap-2"><span>🖼️</span><span>Upload Logo &amp; Gambar Perusahaan (Tersimpan di /images)</span></h3><p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5"> File gambar otomatis diupload dan disimpan ke folder <code class="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-teal-600 dark:text-teal-400 font-bold">/images</code>. Saat deploy ke <b>Jagoan Hosting</b>, gambar langsung tayang tanpa perlu ganti link URL! </p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-3"><div class="flex items-center justify-between"><span class="font-bold text-xs text-slate-700 dark:text-slate-300">Logo Utama (Light)</span>`);
					if (company.value.logoUrl) _push(`<span class="text-[10px] text-teal-600 dark:text-teal-400 font-mono font-bold">✓ Tersimpan</span>`);
					else _push(`<!---->`);
					_push(`</div><div class="h-28 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center p-3 relative overflow-hidden group">`);
					if (company.value.logoUrl) _push(`<img${ssrRenderAttr("src", unref(getImageUrl)(company.value.logoUrl))} class="max-h-full max-w-full object-contain" alt="Logo Light Preview">`);
					else _push(`<div class="text-center text-slate-400"><span class="text-2xl block mb-1">🌊</span><span class="text-[11px] block">Belum ada logo</span></div>`);
					if (uploadingLogo.value) _push(`<div class="absolute inset-0 bg-white/80 dark:bg-slate-900/80 flex items-center justify-center"><span class="animate-spin text-teal-600 text-xl">⏳</span></div>`);
					else _push(`<!---->`);
					_push(`</div><div class="space-y-2"><div class="flex items-center gap-2"><label class="flex-1 cursor-pointer"><input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif" class="hidden"${ssrIncludeBooleanAttr(uploadingLogo.value) ? " disabled" : ""}><span class="w-full px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition"><span>📤</span><span>${ssrInterpolate(company.value.logoUrl ? "Ganti Gambar" : "Pilih Gambar")}</span></span></label>`);
					if (company.value.logoUrl) _push(`<button type="button" class="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold" title="Hapus"> ✕ </button>`);
					else _push(`<!---->`);
					_push(`</div>`);
					if (company.value.logoUrl) _push(`<div class="text-[10px] text-slate-500 font-mono truncate"${ssrRenderAttr("title", company.value.logoUrl)}> 📁 ${ssrInterpolate(company.value.logoUrl)}</div>`);
					else _push(`<!---->`);
					_push(`</div></div><div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-3"><div class="flex items-center justify-between"><span class="font-bold text-xs text-slate-700 dark:text-slate-300">Logo Alternatif (Dark)</span>`);
					if (company.value.logoDarkUrl) _push(`<span class="text-[10px] text-teal-600 dark:text-teal-400 font-mono font-bold">✓ Tersimpan</span>`);
					else _push(`<!---->`);
					_push(`</div><div class="h-28 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-950 flex items-center justify-center p-3 relative overflow-hidden group">`);
					if (company.value.logoDarkUrl) _push(`<img${ssrRenderAttr("src", unref(getImageUrl)(company.value.logoDarkUrl))} class="max-h-full max-w-full object-contain" alt="Logo Dark Preview">`);
					else _push(`<div class="text-center text-slate-500"><span class="text-2xl block mb-1">🌙</span><span class="text-[11px] block">Belum ada logo dark</span></div>`);
					if (uploadingLogoDark.value) _push(`<div class="absolute inset-0 bg-slate-950/80 flex items-center justify-center"><span class="animate-spin text-teal-400 text-xl">⏳</span></div>`);
					else _push(`<!---->`);
					_push(`</div><div class="space-y-2"><div class="flex items-center gap-2"><label class="flex-1 cursor-pointer"><input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif" class="hidden"${ssrIncludeBooleanAttr(uploadingLogoDark.value) ? " disabled" : ""}><span class="w-full px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition"><span>📤</span><span>${ssrInterpolate(company.value.logoDarkUrl ? "Ganti Gambar" : "Pilih Gambar")}</span></span></label>`);
					if (company.value.logoDarkUrl) _push(`<button type="button" class="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold" title="Hapus"> ✕ </button>`);
					else _push(`<!---->`);
					_push(`</div>`);
					if (company.value.logoDarkUrl) _push(`<div class="text-[10px] text-slate-500 font-mono truncate"${ssrRenderAttr("title", company.value.logoDarkUrl)}> 📁 ${ssrInterpolate(company.value.logoDarkUrl)}</div>`);
					else _push(`<!---->`);
					_push(`</div></div><div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-3"><div class="flex items-center justify-between"><span class="font-bold text-xs text-slate-700 dark:text-slate-300">Favicon / Browser Icon</span>`);
					if (company.value.faviconUrl) _push(`<span class="text-[10px] text-teal-600 dark:text-teal-400 font-mono font-bold">✓ Tersimpan</span>`);
					else _push(`<!---->`);
					_push(`</div><div class="h-28 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center p-3 relative overflow-hidden group">`);
					if (company.value.faviconUrl) _push(`<img${ssrRenderAttr("src", unref(getImageUrl)(company.value.faviconUrl))} class="w-12 h-12 object-contain rounded-lg border border-slate-200 dark:border-slate-700 p-1" alt="Favicon Preview">`);
					else _push(`<div class="text-center text-slate-400"><span class="text-2xl block mb-1">🌐</span><span class="text-[11px] block">Belum ada favicon</span></div>`);
					if (uploadingFavicon.value) _push(`<div class="absolute inset-0 bg-white/80 dark:bg-slate-900/80 flex items-center justify-center"><span class="animate-spin text-teal-600 text-xl">⏳</span></div>`);
					else _push(`<!---->`);
					_push(`</div><div class="space-y-2"><div class="flex items-center gap-2"><label class="flex-1 cursor-pointer"><input type="file" accept="image/x-icon,image/png,image/jpeg,image/webp,image/svg+xml,image/gif,image/vnd.microsoft.icon" class="hidden"${ssrIncludeBooleanAttr(uploadingFavicon.value) ? " disabled" : ""}><span class="w-full px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition"><span>📤</span><span>${ssrInterpolate(company.value.faviconUrl ? "Ganti Favicon" : "Pilih Favicon")}</span></span></label>`);
					if (company.value.faviconUrl) _push(`<button type="button" class="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold" title="Hapus"> ✕ </button>`);
					else _push(`<!---->`);
					_push(`</div>`);
					if (company.value.faviconUrl) _push(`<div class="text-[10px] text-slate-500 font-mono truncate"${ssrRenderAttr("title", company.value.faviconUrl)}> 📁 ${ssrInterpolate(company.value.faviconUrl)}</div>`);
					else _push(`<!---->`);
					_push(`</div></div></div></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Nomor WhatsApp Reservasi / CS </label><input${ssrRenderAttr("value", company.value.whatsapp)} type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="+62 812-3456-7890"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Nomor Telepon Kantor </label><input${ssrRenderAttr("value", company.value.phone)} type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="+62 361-1234567"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Email Perusahaan / CS </label><input${ssrRenderAttr("value", company.value.email)} type="email" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="info@wisatabahari.com"></div><div class="grid grid-cols-2 gap-2"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Kota </label><input${ssrRenderAttr("value", company.value.city)} type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Denpasar"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Provinsi </label><input${ssrRenderAttr("value", company.value.province)} type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Bali"></div></div><div class="md:col-span-2"><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Alamat Lengkap Kantor &amp; Cabang Pelabuhan </label><textarea rows="2" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Jl. Hang Tuah No. 45, Sanur Kaja, Denpasar Selatan, Bali">${ssrInterpolate(company.value.address)}</textarea></div><div class="md:col-span-2"><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Jam Operasional Kantor &amp; Layanan CS </label><input${ssrRenderAttr("value", company.value.operatingHours)} type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Buka Setiap Hari (06:00 - 21:00 WITA)"></div><div class="md:col-span-2 pt-4 border-t border-slate-200 dark:border-slate-800"><h3 class="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2"><span>📱</span><span>Akun Media Sosial Resmi</span></h3><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"><div><label class="font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-[#1877F2] fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg><span>Facebook URL</span></label><input${ssrRenderAttr("value", company.value.facebookUrl)} type="url" placeholder="https://facebook.com/..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs outline-none"></div><div><label class="font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-pink-500 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg><span>Instagram URL</span></label><input${ssrRenderAttr("value", company.value.instagramUrl)} type="url" placeholder="https://instagram.com/..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs outline-none"></div><div><label class="font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-[#FF0000] fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg><span>YouTube URL</span></label><input${ssrRenderAttr("value", company.value.youtubeUrl)} type="url" placeholder="https://youtube.com/..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs outline-none"></div><div><label class="font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-slate-900 dark:text-white fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path></svg><span>TikTok URL</span></label><input${ssrRenderAttr("value", company.value.tiktokUrl)} type="url" placeholder="https://tiktok.com/..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs outline-none"></div></div></div><div class="md:col-span-2 pt-4 border-t border-slate-200 dark:border-slate-800"><h3 class="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2"><span>🏦</span><span>Rekening Bank Penampung Resmi PT</span></h3><div class="grid grid-cols-1 sm:grid-cols-3 gap-4"><div><label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1"> Nama Bank </label><input${ssrRenderAttr("value", company.value.bankName)} type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Bank Central Asia (BCA)"></div><div><label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1"> Nomor Rekening </label><input${ssrRenderAttr("value", company.value.bankAccountNumber)} type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="8830192831"></div><div><label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1"> Atas Nama Rekening PT </label><input${ssrRenderAttr("value", company.value.bankAccountName)} type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="PT WISATA BAHARI INDONESIA"></div></div></div><div class="md:col-span-2"><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Teks Copyright Footer </label><input${ssrRenderAttr("value", company.value.footerText)} type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="© 2026 PT Wisata Bahari Indonesia. All rights reserved."></div></div></div></div>`);
				} else _push(`<!---->`);
				if (activeTab.value === "frontend") {
					_push(`<div class="space-y-6"><div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm"><div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4 mb-6"><div><h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>🎨</span><span>Kelola Tampilan Frontend User (CMS Konten &amp; Banner)</span></h3><p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1"> Atur semua teks, judul section, banner utama, dan statistik website. </p></div><button${ssrIncludeBooleanAttr(savingCompany.value) ? " disabled" : ""} type="button" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-500/20 transition disabled:opacity-50 flex items-center gap-2 shrink-0">`);
					if (savingCompany.value) _push(`<span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>`);
					else _push(`<!---->`);
					_push(`<span>${ssrInterpolate(savingCompany.value ? "Menyimpan..." : "💾 Simpan Tampilan Frontend")}</span></button></div><form class="space-y-8"><div class="space-y-4"><h4 class="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800"><span>📢</span><span>0. Bar Pengumuman &amp; Promo Paling Atas (Top Announcement Bar)</span></h4><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="md:col-span-2"><label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1"> Teks Pengumuman Promo (Tampilan Desktop) </label><input${ssrRenderAttr("value", company.value.announcementText)} type="text" placeholder="🌊 Promo Liburan Bahari: Dapatkan Diskon s/d 20% dengan kode" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 outline-none"></div><div><label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1"> Kode Promo yang Disorot </label><input${ssrRenderAttr("value", company.value.announcementPromoCode)} type="text" placeholder="WISATAHEMAT20" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm font-mono font-bold focus:ring-2 focus:ring-teal-500 outline-none uppercase"></div><div class="md:col-span-3"><label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1"> Teks Pengumuman Singkat (Tampilan Layar HP / Mobile) </label><input${ssrRenderAttr("value", company.value.announcementMobile)} type="text" placeholder="🌊 Promo Spesial Bahari s/d 20% OFF" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 outline-none"></div></div></div><div class="space-y-4"><h4 class="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800"><span>🌊</span><span>1. Bagian Banner Utama (Hero Section)</span></h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1"> Badge Promosi Atas </label><input${ssrRenderAttr("value", company.value.heroBadge)} type="text" placeholder="🌊 Platform Booking Wisata Laut Terpercaya #1" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 outline-none"></div><div><label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1"> Judul Besar Utama (Hero Title) </label><input${ssrRenderAttr("value", company.value.heroTitle)} type="text" placeholder="Jelajahi Surga Bawah Laut Indonesia" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-teal-500 outline-none"></div><div class="md:col-span-2"><label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1"> Subjudul / Penjelasan Hero (Hero Subtitle) </label><textarea rows="2" placeholder="Nikmati petualangan laut tak terlupakan dengan paket snorkeling Manta Bay, diving terumbu karang eksotis, dan tiket fast boat resmi bergaransi." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 outline-none">${ssrInterpolate(company.value.heroSubtitle)}</textarea></div><div class="md:col-span-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3"><div class="flex items-center justify-between"><span class="font-bold text-xs text-slate-700 dark:text-slate-300">Gambar Banner Hero Kanan (Tersimpan di /images)</span>`);
					if (company.value.heroImageUrl) _push(`<span class="text-[10px] text-teal-600 dark:text-teal-400 font-mono font-bold">✓ Tersimpan di DB</span>`);
					else _push(`<!---->`);
					_push(`</div><div class="flex flex-col sm:flex-row items-center gap-4"><div class="w-44 h-28 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shrink-0 flex items-center justify-center relative">`);
					if (company.value.heroImageUrl) _push(`<img${ssrRenderAttr("src", unref(getImageUrl)(company.value.heroImageUrl))} class="w-full h-full object-cover" alt="Hero Banner Preview">`);
					else _push(`<span class="text-2xl">🖼️</span>`);
					if (uploadingHeroImage.value) _push(`<div class="absolute inset-0 bg-white/80 dark:bg-slate-900/80 flex items-center justify-center"><span class="animate-spin text-teal-600 text-xl">⏳</span></div>`);
					else _push(`<!---->`);
					_push(`</div><div class="flex-1 space-y-2 text-center sm:text-left"><div class="flex flex-wrap items-center gap-2"><label class="cursor-pointer inline-block"><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" class="hidden"${ssrIncludeBooleanAttr(uploadingHeroImage.value) ? " disabled" : ""}><span class="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow transition"><span>📤</span><span>${ssrInterpolate(company.value.heroImageUrl ? "Ganti Banner Hero" : "Upload Banner Hero")}</span></span></label>`);
					if (company.value.heroImageUrl) _push(`<button type="button" class="px-3 py-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold"> Hapus </button>`);
					else _push(`<!---->`);
					_push(`</div>`);
					if (company.value.heroImageUrl) _push(`<div class="text-[11px] text-slate-500 font-mono truncate max-w-md"${ssrRenderAttr("title", company.value.heroImageUrl)}> 📁 ${ssrInterpolate(company.value.heroImageUrl)}</div>`);
					else _push(`<!---->`);
					_push(`</div></div></div><div><label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1"> Judul Kartu Banner (Contoh: Broken Beach) </label><input${ssrRenderAttr("value", company.value.heroCardTitle)} type="text" placeholder="Manta Bay &amp; Nusa Penida" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 outline-none"></div><div><label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1"> Subjudul Kartu Banner (Contoh: Spot Snorkeling Terbaik) </label><input${ssrRenderAttr("value", company.value.heroCardSubtitle)} type="text" placeholder="Spot Snorkeling Terbaik" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 outline-none"></div><div><label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1"> Badge Kartu Bawah (Contoh: Destinasi Terfavorit) </label><input${ssrRenderAttr("value", company.value.heroCardBadge)} type="text" placeholder="Destinasi Terfavorit" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 outline-none"></div><div><label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1"> Harga / Label Kartu Banner (Opsional, kosong = otomatis dari paket unggulan) </label><input${ssrRenderAttr("value", company.value.heroCardPriceText)} type="text" placeholder="Contoh: Mulai Rp 275.000 (kosongkan untuk otomatis)" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 outline-none"></div><div><label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1"> Badge Promo Pojok Kanan Atas (Contoh: Promo s/d 20% OFF) </label><input${ssrRenderAttr("value", company.value.heroPromoBadge)} type="text" placeholder="Promo s/d 20% OFF" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 outline-none"></div><div class="md:col-span-2 pt-2"><span class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-2"> Angka Statistik Cepat (Quick Stats Bawah Banner) </span><div class="grid grid-cols-1 sm:grid-cols-4 gap-3"><div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1"><span class="text-[10px] font-bold text-teal-600 block uppercase">Statistik 1</span><input${ssrRenderAttr("value", company.value.heroStatsCount1)} placeholder="15k+" class="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"><input${ssrRenderAttr("value", company.value.heroStatsLabel1)} placeholder="Pelanggan Puas" class="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500"></div><div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1"><span class="text-[10px] font-bold text-teal-600 block uppercase">Statistik 2</span><input${ssrRenderAttr("value", company.value.heroStatsCount2)} placeholder="99%" class="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"><input${ssrRenderAttr("value", company.value.heroStatsLabel2)} placeholder="Tingkat Kepuasan" class="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500"></div><div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1"><span class="text-[10px] font-bold text-teal-600 block uppercase">Statistik 3</span><input${ssrRenderAttr("value", company.value.heroStatsCount3)} placeholder="4.9" class="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"><input${ssrRenderAttr("value", company.value.heroStatsLabel3)} placeholder="Rating Wisatawan" class="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500"></div><div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1"><span class="text-[10px] font-bold text-teal-600 block uppercase">Statistik 4</span><input${ssrRenderAttr("value", company.value.heroStatsCount4)} placeholder="24/7" class="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"><input${ssrRenderAttr("value", company.value.heroStatsLabel4)} placeholder="Dukungan CS" class="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500"></div></div></div></div></div><div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800"><h4 class="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800"><span>📑</span><span>2. Judul &amp; Subjudul Section Halaman Depan</span></h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2"><span class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1"><span>🏷️</span> Section Kategori Wisata </span><input${ssrRenderAttr("value", company.value.categoriesTitle)} placeholder="Kategori Wisata Pilihan" class="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"><textarea rows="2" placeholder="Subjudul kategori..." class="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">${ssrInterpolate(company.value.categoriesSubtitle)}</textarea></div><div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2"><span class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1"><span>🌴</span> Section Katalog Wisata </span><input${ssrRenderAttr("value", company.value.toursTitle)} placeholder="Katalog Paket Wisata Populer" class="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"><textarea rows="2" placeholder="Subjudul katalog paket..." class="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">${ssrInterpolate(company.value.toursSubtitle)}</textarea></div><div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2"><span class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1"><span>🎁</span> Section Promo &amp; Kupon Diskon </span><input${ssrRenderAttr("value", company.value.promosTitle)} placeholder="Promo &amp; Penawaran Spesial" class="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"><textarea rows="2" placeholder="Subjudul promo diskon..." class="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">${ssrInterpolate(company.value.promosSubtitle)}</textarea></div><div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2"><span class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1"><span>⭐</span> Section Testimoni Tamu </span><input${ssrRenderAttr("value", company.value.testimonialsTitle)} placeholder="Kata Mereka yang Telah Berlibur" class="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"><textarea rows="2" placeholder="Subjudul testimoni tamu..." class="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">${ssrInterpolate(company.value.testimonialsSubtitle)}</textarea></div></div></div><div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800"><h4 class="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800"><span>⚓</span><span>3. Footer &amp; Teks Hak Cipta</span></h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1"> Deskripsi Profil Singkat di Footer </label><textarea rows="3" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 outline-none">${ssrInterpolate(company.value.description)}</textarea></div><div><label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1"> Teks Copyright / Hak Cipta Footer </label><textarea rows="3" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 outline-none">${ssrInterpolate(company.value.footerText)}</textarea></div><div class="md:col-span-2"><label class="block font-bold text-xs text-slate-700 dark:text-slate-300 mb-1"> Destinasi Populer Footer (1 baris per item; kosongkan untuk otomatis dari Master Destinasi) </label><textarea rows="4" placeholder="Manta Bay Snorkeling
Nusa Penida Barat (Kelingking)
Nusa Penida Timur (Diamond Beach)
Sanur Fast Boat Harbour
Crystal Bay &amp; Gamat Bay" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 outline-none">${ssrInterpolate(company.value.popularDestinations)}</textarea></div></div></div></form></div></div>`);
				} else _push(`<!---->`);
				if (activeTab.value === "tours") {
					_push(`<div class="space-y-6"><div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800"><div><h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>🌴</span><span>Master Katalog Paket Wisata (${ssrInterpolate(toursList.value.length)})</span></h2><p class="text-xs text-slate-500 dark:text-slate-400 mt-1"> Kelola paket tour bahari, harga tiket, diskon, foto galeri &amp; itinerary. </p></div><button type="button" class="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 self-start sm:self-auto"><span>➕</span><span>Tambah Paket Baru</span></button></div><div class="mt-6 overflow-x-auto"><table class="w-full text-left text-xs sm:text-sm"><thead><tr class="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]"><th class="py-3 px-3">Paket Wisata</th><th class="py-3 px-3">Kategori</th><th class="py-3 px-3">Destinasi</th><th class="py-3 px-3">Harga Normal</th><th class="py-3 px-3">Harga Promo</th><th class="py-3 px-3">Status</th><th class="py-3 px-3 text-right">Aksi</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800/60"><!--[-->`);
					ssrRenderList$2(toursList.value, (t) => {
						_push(`<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"><td class="py-3.5 px-3 flex items-center gap-3"><img${ssrRenderAttr("src", unref(getImageUrl)(t.featuredImage) || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=150&q=80")} class="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0" alt="Tour thumbnail"><div><div class="font-bold text-slate-900 dark:text-white line-clamp-1">${ssrInterpolate(t.title)}</div><div class="text-[11px] text-slate-500 font-mono">/${ssrInterpolate(t.slug)}</div></div></td><td class="py-3.5 px-3 font-medium text-slate-600 dark:text-slate-300">${ssrInterpolate(t.category?.name || "Bahari")}</td><td class="py-3.5 px-3 font-medium text-slate-600 dark:text-slate-300">${ssrInterpolate(t.destination?.name || "Nusa Penida")}</td><td class="py-3.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400"> Rp ${ssrInterpolate(Number(t.price).toLocaleString("id-ID"))}</td><td class="py-3.5 px-3 font-mono text-xs text-amber-600 dark:text-amber-400">${ssrInterpolate(t.isPromo && t.discountPrice ? `Rp ${Number(t.discountPrice).toLocaleString("id-ID")}` : "-")}</td><td class="py-3.5 px-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"> PUBLISHED </span></td><td class="py-3.5 px-3 text-right whitespace-nowrap"><button class="px-2.5 py-1 text-xs font-semibold text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/40 rounded-lg mr-1 transition"> Edit </button><button class="px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"> Hapus </button></td></tr>`);
					});
					_push(`<!--]--></tbody></table></div></div></div>`);
				} else _push(`<!---->`);
				if (activeTab.value === "price-history") {
					_push(`<div class="space-y-6"><div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800"><div><h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>💰</span><span>Master Harga &amp; Riwayat Versioning Audit</span></h2><p class="text-xs text-slate-500 dark:text-slate-400 mt-1"> Saat harga diupdate, harga sebelumnya otomatis disetel ke <b>enabled: false</b> sehingga riwayat transaksi &amp; booking lama tetap terkunci aman. </p></div><button type="button" class="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto"><span>🔄</span><span>Refresh Audit Log</span></button></div><div class="mt-4 p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/60 text-xs text-teal-800 dark:text-teal-300 flex items-start gap-3"><span class="text-lg">🛡️</span><div class="leading-relaxed"><span class="font-bold block mb-0.5">Integritas Transaksi Finansial Terjamin</span> Setiap kali Anda mengubah harga paket di panel master, sistem mempertahankan rekam jejak harga historis. Pelanggan yang memesan sebelum perubahan harga akan tetap membayar sesuai nominal saat transaksi dibuat, sementara pemesanan baru otomatis menggunakan harga aktif (<b>enabled: true</b>). </div></div><div class="mt-6 overflow-x-auto"><table class="w-full text-left text-xs sm:text-sm"><thead><tr class="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]"><th class="py-3 px-3">Paket Wisata</th><th class="py-3 px-3">Harga Paket</th><th class="py-3 px-3">Harga Promo</th><th class="py-3 px-3">Promo Terhubung</th><th class="py-3 px-3">Status Harga</th><th class="py-3 px-3">Masa Berlaku</th><th class="py-3 px-3">Alasan Perubahan</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800/60"><!--[-->`);
					ssrRenderList$2(priceHistories.value, (h) => {
						_push(`<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"><td class="py-3.5 px-3 font-bold text-slate-900 dark:text-white">${ssrInterpolate(h.tourTitle || h.tourPackageId)}</td><td class="${ssrRenderClass([h.isEnabled ? "text-teal-600 dark:text-teal-400 font-extrabold" : "text-slate-400 line-through", "py-3.5 px-3 font-mono"])}"> Rp ${ssrInterpolate(Number(h.price).toLocaleString("id-ID"))}</td><td class="py-3.5 px-3 font-mono text-amber-600 dark:text-amber-400">${ssrInterpolate(h.discountPrice ? `Rp ${Number(h.discountPrice).toLocaleString("id-ID")}` : "-")}</td><td class="py-3.5 px-3">`);
						if (h.promo) _push(`<span class="px-2.5 py-1 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800 text-xs inline-flex items-center gap-1.5 shadow-sm"><span>🎁</span><span>${ssrInterpolate(h.promo.code)} (${ssrInterpolate(h.promo.title)})</span></span>`);
						else _push(`<span class="text-slate-400 font-mono text-xs">-</span>`);
						_push(`</td><td class="py-3.5 px-3"><span class="${ssrRenderClass([h.isEnabled ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-300 dark:border-slate-700", "px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1"])}">`);
						if (h.isEnabled) _push(`<span>🟢 AKTIF (Digunakan)</span>`);
						else _push(`<span>⚪ NONAKTIF (Arsip Lama)</span>`);
						_push(`</span></td><td class="py-3.5 px-3 text-[11px] text-slate-500 dark:text-slate-400 font-mono"><div>Mulai: ${ssrInterpolate(h.effectiveFrom?.slice(0, 10) || "-")}</div>`);
						if (h.effectiveTo) _push(`<div>Selesai: ${ssrInterpolate(h.effectiveTo?.slice(0, 10))}</div>`);
						else _push(`<div class="text-emerald-600 dark:text-emerald-400 font-semibold">Sekarang (Berjalan)</div>`);
						_push(`</td><td class="py-3.5 px-3 text-slate-600 dark:text-slate-400 text-xs">${ssrInterpolate(h.changeReason || "Penyesuaian tarif Master")}</td></tr>`);
					});
					_push(`<!--]--></tbody></table></div></div></div>`);
				} else _push(`<!---->`);
				if (activeTab.value === "promos") {
					_push(`<div class="space-y-6"><div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800"><div><h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>🎁</span><span>Master Kupon Promo &amp; Relasi Paket Wisata</span></h2><p class="text-xs text-slate-500 dark:text-slate-400 mt-1"> Atur diskon promosi dan tentukan paket wisata mana saja yang berhak menggunakan promo ini melalui tabel penghubung. Saat diedit, data langsung auto-update di tampilan pelanggan. </p></div><div class="flex items-center gap-2"><button type="button" class="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5"><span>🔄</span><span>Refresh</span></button><button type="button" class="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md shadow-teal-500/20 flex items-center gap-1.5"><span>➕</span><span>Tambah Promo Baru</span></button></div></div><div class="mt-6 overflow-x-auto"><table class="w-full text-left text-xs sm:text-sm"><thead><tr class="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]"><th class="py-3 px-3">Kode Promo</th><th class="py-3 px-3">Judul Promo</th><th class="py-3 px-3">Potongan</th><th class="py-3 px-3">Min. Belanja</th><th class="py-3 px-3">Kuota / Terpakai</th><th class="py-3 px-3">Tabel Penghubung Paket Wisata</th><th class="py-3 px-3">Masa Berlaku</th><th class="py-3 px-3">Status</th><th class="py-3 px-3 text-right">Aksi</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">`);
					if (promosList.value.length === 0) _push(`<tr><td colspan="9" class="py-8 text-center text-slate-400 text-xs"> Belum ada data kupon promo. Silakan klik Tambah Promo Baru. </td></tr>`);
					else _push(`<!---->`);
					_push(`<!--[-->`);
					ssrRenderList$2(promosList.value, (p) => {
						_push(`<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"><td class="py-3.5 px-3 font-mono font-black text-teal-600 dark:text-teal-400"><span class="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800">${ssrInterpolate(p.code)}</span></td><td class="py-3.5 px-3 font-bold text-slate-900 dark:text-white"><div>${ssrInterpolate(p.title)}</div><div class="text-[11px] text-slate-500 font-normal line-clamp-1">${ssrInterpolate(p.description)}</div></td><td class="py-3.5 px-3 font-bold text-amber-600 dark:text-amber-400">${ssrInterpolate(p.discountType === "PERCENT" ? `${p.discountValue}% (Maks Rp ${Number(p.maxDiscountAmount || 0).toLocaleString("id-ID")})` : `Rp ${Number(p.discountValue).toLocaleString("id-ID")}`)}</td><td class="py-3.5 px-3 font-mono text-slate-600 dark:text-slate-400">${ssrInterpolate(p.minSpend ? `Rp ${Number(p.minSpend).toLocaleString("id-ID")}` : "Rp 0 (Tanpa Min)")}</td><td class="py-3.5 px-3 font-mono text-slate-600 dark:text-slate-400">${ssrInterpolate(p.usedQuota || 0)} / ${ssrInterpolate(p.quota || "∞")}</td><td class="py-3.5 px-3">`);
						if (p.applicableTours && p.applicableTours.length > 0) {
							_push(`<div class="flex flex-wrap gap-1 max-w-xs"><!--[-->`);
							ssrRenderList$2(p.applicableTours, (at) => {
								_push(`<span class="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[10px] font-semibold">${ssrInterpolate(at.tourPackage?.title || at.tourPackageId)}</span>`);
							});
							_push(`<!--]--></div>`);
						} else _push(`<span class="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold"> 🌐 Berlaku Semua Paket </span>`);
						_push(`</td><td class="py-3.5 px-3 text-[11px] text-slate-500 font-mono"><div>Mulai: ${ssrInterpolate(p.startDate ? p.startDate.slice(0, 10) : "-")}</div><div>Selesai: ${ssrInterpolate(p.endDate ? p.endDate.slice(0, 10) : "Selamanya")}</div></td><td class="py-3.5 px-3"><span class="${ssrRenderClass([p.isActive ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800" : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-800", "px-2.5 py-0.5 rounded-full text-[10px] font-bold border"])}">${ssrInterpolate(p.isActive ? "🟢 Aktif" : "🔴 Nonaktif")}</span></td><td class="py-3.5 px-3 text-right"><div class="flex items-center justify-end gap-1.5"><button class="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 hover:bg-teal-100 text-xs font-semibold"> ✏️ Edit </button><button class="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 text-xs font-semibold"> 🗑️ </button></div></td></tr>`);
					});
					_push(`<!--]--></tbody></table></div></div></div>`);
				} else _push(`<!---->`);
				if (activeTab.value === "masters") {
					_push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm"><div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4"><h3 class="font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>🏷️</span><span>Master Kategori (${ssrInterpolate(categoriesList.value.length)})</span></h3><button type="button" class="px-3 py-1 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1 shadow transition"><span>➕</span><span>Tambah Kategori</span></button></div><div class="space-y-3"><!--[-->`);
					ssrRenderList$2(categoriesList.value, (c) => {
						_push(`<div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shrink-0 flex items-center justify-center">`);
						if (c.imageUrl) _push(`<img${ssrRenderAttr("src", unref(getImageUrl)(c.imageUrl))} class="w-full h-full object-cover"${ssrRenderAttr("alt", c.name)}>`);
						else _push(`<span class="text-xl">${ssrInterpolate(c.icon || "🌊")}</span>`);
						_push(`</div><div><div class="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5"><span>${ssrInterpolate(c.name)}</span><span class="text-sm">${ssrInterpolate(c.icon)}</span></div><div class="text-[10px] text-slate-500 font-mono">/${ssrInterpolate(c.slug)}</div>`);
						if (c.imageUrl) _push(`<div class="text-[9px] text-teal-600 dark:text-teal-400 font-mono truncate max-w-[120px]"${ssrRenderAttr("title", c.imageUrl)}> 📁 ${ssrInterpolate(c.imageUrl)}</div>`);
						else _push(`<!---->`);
						_push(`</div></div><div class="flex items-center gap-1.5"><button type="button" class="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:border-teal-500 text-teal-600 dark:text-teal-400 transition"> Edit </button><button type="button" class="px-2 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition" title="Hapus Kategori"> 🗑️ </button></div></div>`);
					});
					_push(`<!--]--></div></div><div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm"><div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4"><h3 class="font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>📍</span><span>Master Destinasi (${ssrInterpolate(destinationsList.value.length)})</span></h3><button type="button" class="px-3 py-1 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1 shadow transition"><span>➕</span><span>Tambah Destinasi</span></button></div><div class="space-y-3"><!--[-->`);
					ssrRenderList$2(destinationsList.value, (d) => {
						_push(`<div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shrink-0 flex items-center justify-center">`);
						if (d.imageUrl) _push(`<img${ssrRenderAttr("src", unref(getImageUrl)(d.imageUrl))} class="w-full h-full object-cover"${ssrRenderAttr("alt", d.name)}>`);
						else _push(`<span class="text-xl">🏝️</span>`);
						_push(`</div><div><div class="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">${ssrInterpolate(d.name)}</div><div class="text-[10px] text-slate-500">${ssrInterpolate(d.province || "Bali")}, ${ssrInterpolate(d.city || "Klungkung")}</div>`);
						if (d.imageUrl) _push(`<div class="text-[9px] text-teal-600 dark:text-teal-400 font-mono truncate max-w-[120px]"${ssrRenderAttr("title", d.imageUrl)}> 📁 ${ssrInterpolate(d.imageUrl)}</div>`);
						else _push(`<!---->`);
						_push(`</div></div><div class="flex items-center gap-1.5"><button type="button" class="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:border-teal-500 text-teal-600 dark:text-teal-400 transition"> Edit </button><button type="button" class="px-2 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition" title="Hapus Destinasi"> 🗑️ </button></div></div>`);
					});
					_push(`<!--]--></div></div><div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm"><div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4"><h3 class="font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>⏱️</span><span>Master Durasi (${ssrInterpolate(durationsList.value.length)})</span></h3><button type="button" class="px-3 py-1 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1 shadow transition"><span>➕</span><span>Tambah Durasi</span></button></div><div class="space-y-3"><!--[-->`);
					ssrRenderList$2(durationsList.value, (du) => {
						_push(`<div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shrink-0 flex items-center justify-center text-xl"> ⏱️ </div><div><div class="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5"><span>${ssrInterpolate(du.name)}</span>`);
						if (du.durationMinutes) _push(`<span class="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 font-bold">${ssrInterpolate(du.durationMinutes)}m </span>`);
						else _push(`<!---->`);
						_push(`</div><div class="text-[10px] text-slate-500 font-mono truncate max-w-[120px]">${ssrInterpolate(du.description || `/${du.slug || du.id}`)}</div></div></div><div class="flex items-center gap-1.5"><button type="button" class="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:border-teal-500 text-teal-600 dark:text-teal-400 transition"> Edit </button><button type="button" class="px-2 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition" title="Hapus Durasi"> 🗑️ </button></div></div>`);
					});
					_push(`<!--]--></div></div></div>`);
				} else _push(`<!---->`);
				if (activeTab.value === "bookings") {
					_push(`<div class="space-y-6"><div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm"><div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800"><div><h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>📋</span><span>Master Reservasi &amp; Transaksi Pembayaran</span><div class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[11px] font-bold text-[#108ee9]"><img${ssrRenderAttr("src", _virtual_public__2Fdana_logo_default)} alt="DANA" class="h-2.5 w-auto object-contain bg-white px-1 py-0.5 rounded shadow-2xs"><span>DANA Gapura SaaS</span></div></h2><p class="text-xs text-slate-500 dark:text-slate-400 mt-1"> Rekap transaksi dan verifikasi pembayaran otomatis terintegrasi Didukung oleh DANA Gapura SaaS Payment Gateway. </p></div><div class="flex flex-wrap items-center gap-2"><button type="button" class="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition" title="Ekspor data terfilter ke format Excel / CSV"><span>📊</span><span>Export Excel</span></button><button type="button" class="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition" title="Cetak laporan transaksi / simpan sebagai PDF"><span>📄</span><span>Export PDF</span></button><button type="button" class="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5"><span>🔄</span><span>Refresh</span></button></div></div><div class="mt-6 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4"><div class="flex items-center justify-between"><span class="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><span>🔍</span><span>Filter &amp; Pencarian Transaksi</span></span><button type="button" class="text-[11px] text-teal-600 dark:text-teal-400 font-semibold hover:underline"> Reset Filter </button></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-3"><div><label class="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Cari Transaksi</label><input${ssrRenderAttr("value", bookingSearch.value)} type="text" placeholder="Kode booking, nama, hp..." class="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 outline-none"></div><div><label class="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Status Pembayaran</label><select class="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 outline-none"><option value=""${ssrIncludeBooleanAttr(Array.isArray(filterPaymentStatus.value) ? ssrLooseContain(filterPaymentStatus.value, "") : ssrLooseEqual(filterPaymentStatus.value, "")) ? " selected" : ""}>Semua Status Bayar</option><!--[-->`);
					ssrRenderList$2(paymentStatuses.value, (ps) => {
						_push(`<option${ssrRenderAttr("value", ps.code)}${ssrIncludeBooleanAttr(Array.isArray(filterPaymentStatus.value) ? ssrLooseContain(filterPaymentStatus.value, ps.code) : ssrLooseEqual(filterPaymentStatus.value, ps.code)) ? " selected" : ""}>${ssrInterpolate(ps.name)} (${ssrInterpolate(ps.code)}) </option>`);
					});
					_push(`<!--]--></select></div><div><label class="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Status Reservasi</label><select class="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 outline-none"><option value=""${ssrIncludeBooleanAttr(Array.isArray(filterBookingStatus.value) ? ssrLooseContain(filterBookingStatus.value, "") : ssrLooseEqual(filterBookingStatus.value, "")) ? " selected" : ""}>Semua Status Reservasi</option><!--[-->`);
					ssrRenderList$2(bookingStatuses.value, (bs) => {
						_push(`<option${ssrRenderAttr("value", bs.code)}${ssrIncludeBooleanAttr(Array.isArray(filterBookingStatus.value) ? ssrLooseContain(filterBookingStatus.value, bs.code) : ssrLooseEqual(filterBookingStatus.value, bs.code)) ? " selected" : ""}>${ssrInterpolate(bs.name)} (${ssrInterpolate(bs.code)}) </option>`);
					});
					_push(`<!--]--></select></div></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-800"><div><label class="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Min. Nominal (Rp)</label><input${ssrRenderAttr("value", filterMinAmount.value)} type="number" min="0" step="10000" placeholder="Contoh: 100000" class="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono focus:ring-2 focus:ring-teal-500 outline-none"></div><div><label class="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Maks. Nominal (Rp)</label><input${ssrRenderAttr("value", filterMaxAmount.value)} type="number" min="0" step="10000" placeholder="Contoh: 2000000" class="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono focus:ring-2 focus:ring-teal-500 outline-none"></div><div><label class="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Tgl Bayar (Dari)</label><input${ssrRenderAttr("value", filterPayStartDate.value)} type="date" class="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 outline-none"></div><div><label class="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Tgl Bayar (Sampai)</label><input${ssrRenderAttr("value", filterPayEndDate.value)} type="date" class="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 outline-none"></div><div><label class="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Tgl Tour (Dari)</label><input${ssrRenderAttr("value", filterStartDate.value)} type="date" class="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 outline-none"></div><div><label class="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Tgl Tour (Sampai)</label><input${ssrRenderAttr("value", filterEndDate.value)} type="date" class="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 outline-none"></div></div><div class="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs"><div class="flex flex-wrap items-center gap-2"><span class="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold">${ssrInterpolate(filteredBookings.value.length)} Transaksi </span><span class="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold"> Lunas: Rp ${ssrInterpolate(totalPaidAmount.value.toLocaleString("id-ID"))}</span><span class="px-2.5 py-1 rounded-lg bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"> Total Nilai: Rp ${ssrInterpolate(totalFilteredAmount.value.toLocaleString("id-ID"))}</span></div><div class="flex items-center gap-1.5 text-[11px] text-slate-500"><span>Tampilkan:</span><select class="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300"><option${ssrRenderAttr("value", 10)}${ssrIncludeBooleanAttr(Array.isArray(bookingPageSize.value) ? ssrLooseContain(bookingPageSize.value, 10) : ssrLooseEqual(bookingPageSize.value, 10)) ? " selected" : ""}>10 / hal</option><option${ssrRenderAttr("value", 25)}${ssrIncludeBooleanAttr(Array.isArray(bookingPageSize.value) ? ssrLooseContain(bookingPageSize.value, 25) : ssrLooseEqual(bookingPageSize.value, 25)) ? " selected" : ""}>25 / hal</option><option${ssrRenderAttr("value", 50)}${ssrIncludeBooleanAttr(Array.isArray(bookingPageSize.value) ? ssrLooseContain(bookingPageSize.value, 50) : ssrLooseEqual(bookingPageSize.value, 50)) ? " selected" : ""}>50 / hal</option><option${ssrRenderAttr("value", 100)}${ssrIncludeBooleanAttr(Array.isArray(bookingPageSize.value) ? ssrLooseContain(bookingPageSize.value, 100) : ssrLooseEqual(bookingPageSize.value, 100)) ? " selected" : ""}>100 / hal</option></select></div></div></div>`);
					if (isBookingsLoading.value) _push(`<div class="py-12 text-center text-slate-400"><span class="text-4xl block mb-2 animate-spin">⏳</span><p class="text-xs">Memuat data transaksi dari server...</p></div>`);
					else if (filteredBookings.value.length === 0) {
						_push(`<div class="py-12 text-center text-slate-400"><span class="text-4xl block mb-2">🏖️</span><p class="text-xs">Tidak ada data transaksi yang cocok dengan kriteria filter.</p>`);
						if (bookingsList.value.length > 0) _push(`<button type="button" class="mt-2 text-xs font-bold text-teal-600 hover:underline"> Reset Filter </button>`);
						else _push(`<!---->`);
						_push(`</div>`);
					} else {
						_push(`<div class="mt-6 overflow-x-auto"><table class="w-full text-left text-xs sm:text-sm"><thead><tr class="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]"><th class="py-3 px-3 w-12 text-center">No</th><th class="py-3 px-3">Kode Booking</th><th class="py-3 px-3">Pelanggan</th><th class="py-3 px-3">Paket Wisata</th><th class="py-3 px-3">Tgl Tour</th><th class="py-3 px-3">Tgl Bayar</th><th class="py-3 px-3">Total Bayar</th><th class="py-3 px-3">Metode</th><th class="py-3 px-3">Bukti / VA / Ref</th><th class="py-3 px-3 text-center">Status Reservasi</th><th class="py-3 px-3 text-center">Status Bayar</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800/60"><!--[-->`);
						ssrRenderList$2(paginatedBookings.value, (b, idx) => {
							_push(`<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"><td class="py-3.5 px-3 text-center text-slate-400 font-mono text-xs">${ssrInterpolate((bookingPage.value - 1) * bookingPageSize.value + idx + 1)}</td><td class="py-3.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">${ssrInterpolate(b.bookingCode)}</td><td class="py-3.5 px-3"><div class="font-bold text-slate-900 dark:text-white">${ssrInterpolate(b.customerName)}</div><div class="text-[11px] text-slate-500">${ssrInterpolate(b.customerPhone)}</div></td><td class="py-3.5 px-3 max-w-[180px] truncate text-slate-700 dark:text-slate-300">${ssrInterpolate(b.tourPackage?.title || "Paket Wisata Bahari")}</td><td class="py-3.5 px-3 font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">${ssrInterpolate(b.tourDate?.slice(0, 10))}</td><td class="py-3.5 px-3 font-mono text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">${ssrInterpolate(getBookingPaymentDate(b))}</td><td class="py-3.5 px-3 font-mono font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap"> Rp ${ssrInterpolate(Number(b.totalAmount).toLocaleString("id-ID"))}</td><td class="py-3.5 px-3 whitespace-nowrap"><span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">${ssrInterpolate(b.paymentMethod || "DANA_GAPURA")}</span></td><td class="py-3.5 px-3 whitespace-nowrap font-mono text-xs">`);
							if (b.paymentProofUrl) {
								_push(`<div class="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold">`);
								if (b.paymentProofUrl.startsWith("http")) _push(`<a${ssrRenderAttr("href", b.paymentProofUrl)} target="_blank" class="hover:underline flex items-center gap-1"><span>🔗</span> Buka Bukti </a>`);
								else _push(`<span class="select-all"${ssrRenderAttr("title", b.paymentProofUrl)}>${ssrInterpolate(b.paymentProofUrl.length > 20 ? b.paymentProofUrl.slice(0, 18) + "..." : b.paymentProofUrl)}</span>`);
								_push(`</div>`);
							} else _push(`<span class="text-slate-400">-</span>`);
							_push(`</td><td class="py-3.5 px-3 text-center whitespace-nowrap"><span style="${ssrRenderStyle(getStatusBadgeStyle(b.status || "PENDING", "booking"))}" class="px-2.5 py-1 rounded-full text-[10px] font-bold border inline-block"> ● ${ssrInterpolate(getStatusLabel(b.status || "PENDING", "booking"))}</span></td><td class="py-3.5 px-3 text-center whitespace-nowrap"><span style="${ssrRenderStyle(getStatusBadgeStyle(b.paymentStatus || "UNPAID", "payment"))}" class="px-2.5 py-1 rounded-full text-[10px] font-bold border inline-block"> ● ${ssrInterpolate(getStatusLabel(b.paymentStatus || "UNPAID", "payment"))}</span></td></tr>`);
						});
						_push(`<!--]--></tbody></table></div>`);
					}
					if (filteredBookings.value.length > 0) {
						_push(`<div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"><div class="text-slate-500"> Menampilkan <span class="font-bold text-slate-800 dark:text-slate-200">${ssrInterpolate((bookingPage.value - 1) * bookingPageSize.value + 1)}</span> - <span class="font-bold text-slate-800 dark:text-slate-200">${ssrInterpolate(Math.min(bookingPage.value * bookingPageSize.value, filteredBookings.value.length))}</span> dari <span class="font-bold text-slate-800 dark:text-slate-200">${ssrInterpolate(filteredBookings.value.length)}</span> transaksi </div><div class="flex items-center gap-1.5"><button type="button"${ssrIncludeBooleanAttr(bookingPage.value <= 1) ? " disabled" : ""} class="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition"> ‹ Sebelumnya </button><div class="flex items-center gap-1"><!--[-->`);
						ssrRenderList$2(totalBookingPages.value, (p) => {
							_push(`<button type="button" class="${ssrRenderClass([bookingPage.value === p ? "bg-teal-600 text-white shadow-sm" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300", "w-7 h-7 rounded-lg text-xs font-bold transition flex items-center justify-center"])}">${ssrInterpolate(p)}</button>`);
						});
						_push(`<!--]--></div><button type="button"${ssrIncludeBooleanAttr(bookingPage.value >= totalBookingPages.value) ? " disabled" : ""} class="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition"> Selanjutnya › </button></div></div>`);
					} else _push(`<!---->`);
					_push(`</div></div>`);
				} else _push(`<!---->`);
				if (activeTab.value === "statuses") {
					_push(`<div class="space-y-6"><div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm"><div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800"><div><h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>🚦</span><span>Master Pengaturan Status (Sistem Anti-Enum)</span></h2><p class="text-xs text-slate-500 dark:text-slate-400 mt-1"> Atur semua status reservasi, pembayaran, tayang konten paket wisata, dan tipe diskon secara fleksibel dari database. </p></div><div class="flex items-center gap-2 self-start md:self-auto"><button type="button" class="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5"><span>🔄</span><span>Refresh Data</span></button><button type="button" class="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition"><span>➕</span><span>${ssrInterpolate(activeStatusCategory.value === "tax" ? "Tambah Master PPN" : "Tambah Status Baru")}</span></button></div></div><div class="flex flex-wrap gap-2 pt-4 pb-2 border-b border-slate-100 dark:border-slate-800"><!--[-->`);
					ssrRenderList$2([
						{
							id: "all",
							label: "Semua Status"
						},
						{
							id: "booking",
							label: `Status Reservasi (${bookingStatuses.value.length})`
						},
						{
							id: "payment",
							label: `Status Pembayaran (${paymentStatuses.value.length})`
						},
						{
							id: "content",
							label: `Status Konten Wisata (${contentStatuses.value.length})`
						},
						{
							id: "discount",
							label: `Tipe Diskon & Kupon (${discountTypes.value.length})`
						},
						{
							id: "tax",
							label: `Master PPN / Pajak (${taxesList.value.length})`
						}
					], (sub) => {
						_push(`<button type="button" class="${ssrRenderClass([[activeStatusCategory.value === sub.id ? "bg-teal-600 text-white shadow-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"], "px-3.5 py-1.5 rounded-xl text-xs font-bold transition"])}">${ssrInterpolate(sub.label)}</button>`);
					});
					_push(`<!--]--></div><div class="space-y-8 pt-4">`);
					if (activeStatusCategory.value === "all" || activeStatusCategory.value === "booking") {
						_push(`<div class="space-y-3"><div class="flex items-center justify-between"><h3 class="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2"><span>📋</span><span>Status Reservasi Booking</span><span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">${ssrInterpolate(bookingStatuses.value.length)} data</span></h3><button type="button" class="text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline"> + Tambah Status Booking </button></div><div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800"><table class="w-full text-left text-xs"><thead class="bg-slate-50 dark:bg-slate-950 text-slate-500 font-bold uppercase text-[10px]"><tr><th class="py-2.5 px-3">Kode (Key)</th><th class="py-2.5 px-3">Label Tampilan</th><th class="py-2.5 px-3">Pratinjau Badge</th><th class="py-2.5 px-3">Keterangan</th><th class="py-2.5 px-3 text-center">Urutan</th><th class="py-2.5 px-3 text-center">Status</th><th class="py-2.5 px-3 text-right">Aksi</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800"><!--[-->`);
						ssrRenderList$2(bookingStatuses.value, (s) => {
							_push(`<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="py-3 px-3 font-mono font-bold text-slate-800 dark:text-slate-200">${ssrInterpolate(s.code)}</td><td class="py-3 px-3 font-semibold text-slate-900 dark:text-white">${ssrInterpolate(s.name)}</td><td class="py-3 px-3"><span class="px-2.5 py-1 rounded-full text-[11px] font-bold border" style="${ssrRenderStyle({
								backgroundColor: `${s.color || "#64748b"}18`,
								color: s.color || "#64748b",
								borderColor: `${s.color || "#64748b"}40`
							})}"> ● ${ssrInterpolate(s.name)}</span></td><td class="py-3 px-3 text-slate-500 max-w-xs truncate">${ssrInterpolate(s.description || "-")}</td><td class="py-3 px-3 text-center font-mono">${ssrInterpolate(s.order ?? "-")}</td><td class="py-3 px-3 text-center"><span class="${ssrRenderClass([s.isActive !== false ? "text-teal-600 bg-teal-50 dark:bg-teal-950/40" : "text-slate-400 bg-slate-100 dark:bg-slate-800", "px-2 py-0.5 rounded-full text-[10px] font-bold"])}">${ssrInterpolate(s.isActive !== false ? "Aktif" : "Non-Aktif")}</span></td><td class="py-3 px-3 text-right whitespace-nowrap"><button class="px-2 py-1 text-xs text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/30 rounded font-bold mr-1">Edit</button><button class="px-2 py-1 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded font-bold">Hapus</button></td></tr>`);
						});
						_push(`<!--]--></tbody></table></div></div>`);
					} else _push(`<!---->`);
					if (activeStatusCategory.value === "all" || activeStatusCategory.value === "payment") {
						_push(`<div class="space-y-3"><div class="flex items-center justify-between"><h3 class="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2"><span>💳</span><span>Status Pembayaran (Payment)</span><span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">${ssrInterpolate(paymentStatuses.value.length)} data</span></h3><button type="button" class="text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline"> + Tambah Status Pembayaran </button></div><div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800"><table class="w-full text-left text-xs"><thead class="bg-slate-50 dark:bg-slate-950 text-slate-500 font-bold uppercase text-[10px]"><tr><th class="py-2.5 px-3">Kode (Key)</th><th class="py-2.5 px-3">Label Tampilan</th><th class="py-2.5 px-3">Pratinjau Badge</th><th class="py-2.5 px-3">Keterangan</th><th class="py-2.5 px-3 text-center">Status</th><th class="py-2.5 px-3 text-right">Aksi</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800"><!--[-->`);
						ssrRenderList$2(paymentStatuses.value, (s) => {
							_push(`<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="py-3 px-3 font-mono font-bold text-slate-800 dark:text-slate-200">${ssrInterpolate(s.code)}</td><td class="py-3 px-3 font-semibold text-slate-900 dark:text-white">${ssrInterpolate(s.name)}</td><td class="py-3 px-3"><span class="px-2.5 py-1 rounded-full text-[11px] font-bold border" style="${ssrRenderStyle({
								backgroundColor: `${s.color || "#64748b"}18`,
								color: s.color || "#64748b",
								borderColor: `${s.color || "#64748b"}40`
							})}"> ● ${ssrInterpolate(s.name)}</span></td><td class="py-3 px-3 text-slate-500 max-w-xs truncate">${ssrInterpolate(s.description || "-")}</td><td class="py-3 px-3 text-center"><span class="${ssrRenderClass([s.isActive !== false ? "text-teal-600 bg-teal-50 dark:bg-teal-950/40" : "text-slate-400 bg-slate-100 dark:bg-slate-800", "px-2 py-0.5 rounded-full text-[10px] font-bold"])}">${ssrInterpolate(s.isActive !== false ? "Aktif" : "Non-Aktif")}</span></td><td class="py-3 px-3 text-right whitespace-nowrap"><button class="px-2 py-1 text-xs text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/30 rounded font-bold mr-1">Edit</button><button class="px-2 py-1 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded font-bold">Hapus</button></td></tr>`);
						});
						_push(`<!--]--></tbody></table></div></div>`);
					} else _push(`<!---->`);
					if (activeStatusCategory.value === "all" || activeStatusCategory.value === "content") {
						_push(`<div class="space-y-3"><div class="flex items-center justify-between"><h3 class="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2"><span>🌴</span><span>Status Tayang Paket Wisata (Content)</span><span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">${ssrInterpolate(contentStatuses.value.length)} data</span></h3><button type="button" class="text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline"> + Tambah Status Konten </button></div><div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800"><table class="w-full text-left text-xs"><thead class="bg-slate-50 dark:bg-slate-950 text-slate-500 font-bold uppercase text-[10px]"><tr><th class="py-2.5 px-3">Kode (Key)</th><th class="py-2.5 px-3">Label Tampilan</th><th class="py-2.5 px-3">Keterangan</th><th class="py-2.5 px-3 text-center">Status</th><th class="py-2.5 px-3 text-right">Aksi</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800"><!--[-->`);
						ssrRenderList$2(contentStatuses.value, (s) => {
							_push(`<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="py-3 px-3 font-mono font-bold text-slate-800 dark:text-slate-200">${ssrInterpolate(s.code)}</td><td class="py-3 px-3 font-semibold text-slate-900 dark:text-white"><span class="px-2.5 py-1 rounded-full text-[11px] font-bold border" style="${ssrRenderStyle({
								backgroundColor: `${s.color || "#10b981"}18`,
								color: s.color || "#10b981",
								borderColor: `${s.color || "#10b981"}40`
							})}">${ssrInterpolate(s.name)}</span></td><td class="py-3 px-3 text-slate-500 max-w-xs truncate">${ssrInterpolate(s.description || "-")}</td><td class="py-3 px-3 text-center"><span class="${ssrRenderClass([s.isActive !== false ? "text-teal-600 bg-teal-50 dark:bg-teal-950/40" : "text-slate-400 bg-slate-100 dark:bg-slate-800", "px-2 py-0.5 rounded-full text-[10px] font-bold"])}">${ssrInterpolate(s.isActive !== false ? "Aktif" : "Non-Aktif")}</span></td><td class="py-3 px-3 text-right whitespace-nowrap"><button class="px-2 py-1 text-xs text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/30 rounded font-bold mr-1">Edit</button><button class="px-2 py-1 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded font-bold">Hapus</button></td></tr>`);
						});
						_push(`<!--]--></tbody></table></div></div>`);
					} else _push(`<!---->`);
					if (activeStatusCategory.value === "all" || activeStatusCategory.value === "discount") {
						_push(`<div class="space-y-3"><div class="flex items-center justify-between"><h3 class="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2"><span>🎁</span><span>Tipe Diskon &amp; Kupon Promo</span><span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">${ssrInterpolate(discountTypes.value.length)} data</span></h3><button type="button" class="text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline"> + Tambah Tipe Diskon </button></div><div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800"><table class="w-full text-left text-xs"><thead class="bg-slate-50 dark:bg-slate-950 text-slate-500 font-bold uppercase text-[10px]"><tr><th class="py-2.5 px-3">Kode (Key)</th><th class="py-2.5 px-3">Label Tampilan</th><th class="py-2.5 px-3">Keterangan</th><th class="py-2.5 px-3 text-center">Status</th><th class="py-2.5 px-3 text-right">Aksi</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800"><!--[-->`);
						ssrRenderList$2(discountTypes.value, (s) => {
							_push(`<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="py-3 px-3 font-mono font-bold text-slate-800 dark:text-slate-200">${ssrInterpolate(s.code)}</td><td class="py-3 px-3 font-semibold text-slate-900 dark:text-white">${ssrInterpolate(s.name)}</td><td class="py-3 px-3 text-slate-500 max-w-xs truncate">${ssrInterpolate(s.description || "-")}</td><td class="py-3 px-3 text-center"><span class="${ssrRenderClass([s.isActive !== false ? "text-teal-600 bg-teal-50 dark:bg-teal-950/40" : "text-slate-400 bg-slate-100 dark:bg-slate-800", "px-2 py-0.5 rounded-full text-[10px] font-bold"])}">${ssrInterpolate(s.isActive !== false ? "Aktif" : "Non-Aktif")}</span></td><td class="py-3 px-3 text-right whitespace-nowrap"><button class="px-2 py-1 text-xs text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/30 rounded font-bold mr-1">Edit</button><button class="px-2 py-1 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded font-bold">Hapus</button></td></tr>`);
						});
						_push(`<!--]--></tbody></table></div></div>`);
					} else _push(`<!---->`);
					if (activeStatusCategory.value === "all" || activeStatusCategory.value === "tax") {
						_push(`<div class="space-y-3"><div class="flex items-center justify-between"><div><h3 class="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2"><span>🧾</span><span>Master PPN / Pajak</span><span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">${ssrInterpolate(taxesList.value.length)} data</span></h3><p class="text-[11px] text-slate-500 mt-0.5"> Hanya 1 PPN yang aktif berlaku untuk booking baru. Transaksi lama tetap menyimpan tarif PPN saat transaksi dibuat (tidak ikut berubah). </p></div><button type="button" class="text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline"> + Tambah PPN </button></div><div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800"><table class="w-full text-left text-xs"><thead class="bg-slate-50 dark:bg-slate-950 text-slate-500 font-bold uppercase text-[10px]"><tr><th class="py-2.5 px-3">Nama Pajak</th><th class="py-2.5 px-3">Tarif (%)</th><th class="py-2.5 px-3">Keterangan</th><th class="py-2.5 px-3 text-center">Status</th><th class="py-2.5 px-3 text-right">Aksi</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800">`);
						if (taxesList.value.length === 0) _push(`<tr><td colspan="5" class="py-6 text-center text-slate-400">Belum ada data Master PPN. Klik &quot;+ Tambah PPN&quot; untuk menambahkan.</td></tr>`);
						else _push(`<!---->`);
						_push(`<!--[-->`);
						ssrRenderList$2(taxesList.value, (tax) => {
							_push(`<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="py-3 px-3 font-bold text-slate-900 dark:text-white">${ssrInterpolate(tax.name)}</td><td class="py-3 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">${ssrInterpolate(Number(tax.rate))}%</td><td class="py-3 px-3 text-slate-500 max-w-xs truncate">${ssrInterpolate(tax.description || "-")}</td><td class="py-3 px-3 text-center"><button type="button" class="${ssrRenderClass([tax.isActive ? "text-teal-700 bg-teal-100 dark:bg-teal-950/60 dark:text-teal-300 border-teal-300 dark:border-teal-700" : "text-slate-500 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700", "px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition cursor-pointer hover:opacity-80"])}" title="Klik untuk ubah status Active / Non-Active">${ssrInterpolate(tax.isActive ? "Active" : "Non-Active")}</button></td><td class="py-3 px-3 text-right whitespace-nowrap"><button class="px-2 py-1 text-xs text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/30 rounded font-bold mr-1">Edit</button><button class="px-2 py-1 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded font-bold">Hapus</button></td></tr>`);
						});
						_push(`<!--]--></tbody></table></div></div>`);
					} else _push(`<!---->`);
					_push(`</div></div></div>`);
				} else _push(`<!---->`);
				if (activeTab.value === "users") {
					_push(`<div class="space-y-6"><div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm"><div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4 mb-6"><div><div class="flex items-center gap-2"><span class="text-2xl">👥</span><h2 class="text-lg font-bold text-slate-900 dark:text-white"> Manajemen Pengguna &amp; Hak Akses </h2><span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800">${ssrInterpolate(usersList.value.length)} Akun </span></div><p class="text-xs text-slate-500 dark:text-slate-400 mt-1"> Kelola staf operasional, administrator, serta hak akses login ke sistem reservasi dan panel master. </p></div><div class="flex items-center gap-3"><button type="button" class="px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/40 hover:bg-blue-100 text-blue-700 dark:text-blue-300 font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-xs" title="Lihat Siapa Saja yang Login &amp; Aktivitas Keamanan"><span>📜</span><span class="hidden sm:inline">Audit Log Login</span></button><button${ssrIncludeBooleanAttr(isUsersLoading.value) ? " disabled" : ""} type="button" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer" title="Segarkan Data"><span class="${ssrRenderClass({ "animate-spin": isUsersLoading.value })}">🔄</span><span class="hidden sm:inline">Segarkan</span></button><button type="button" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-500/20 transition flex items-center gap-2 cursor-pointer"><span>➕</span><span>Tambah User Baru</span></button></div></div><div class="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-6"><div class="sm:col-span-6 relative"><span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm"> 🔍 </span><input${ssrRenderAttr("value", userSearchQuery.value)} type="text" placeholder="Cari nama, email, atau nomor HP pengguna..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition"></div><div class="sm:col-span-3"><select class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-xs sm:text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition cursor-pointer font-medium"><option value=""${ssrIncludeBooleanAttr(Array.isArray(userRoleFilter.value) ? ssrLooseContain(userRoleFilter.value, "") : ssrLooseEqual(userRoleFilter.value, "")) ? " selected" : ""}>🛡️ Semua Role</option><!--[-->`);
					ssrRenderList$2(rolesList.value, (r) => {
						_push(`<option${ssrRenderAttr("value", r.id)}${ssrIncludeBooleanAttr(Array.isArray(userRoleFilter.value) ? ssrLooseContain(userRoleFilter.value, r.id) : ssrLooseEqual(userRoleFilter.value, r.id)) ? " selected" : ""}>${ssrInterpolate(r.displayName || r.name)}</option>`);
					});
					_push(`<!--]--></select></div><div class="sm:col-span-3"><select class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-xs sm:text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition cursor-pointer font-medium"><option value=""${ssrIncludeBooleanAttr(Array.isArray(userStatusFilter.value) ? ssrLooseContain(userStatusFilter.value, "") : ssrLooseEqual(userStatusFilter.value, "")) ? " selected" : ""}>⚡ Semua Status</option><option value="active"${ssrIncludeBooleanAttr(Array.isArray(userStatusFilter.value) ? ssrLooseContain(userStatusFilter.value, "active") : ssrLooseEqual(userStatusFilter.value, "active")) ? " selected" : ""}>Aktif</option><option value="inactive"${ssrIncludeBooleanAttr(Array.isArray(userStatusFilter.value) ? ssrLooseContain(userStatusFilter.value, "inactive") : ssrLooseEqual(userStatusFilter.value, "inactive")) ? " selected" : ""}>Nonaktif</option></select></div></div>`);
					if (isUsersLoading.value) _push(`<div class="py-16 text-center text-slate-400"><div class="animate-spin inline-block w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mb-3"></div><p class="text-xs">Memuat daftar pengguna...</p></div>`);
					else if (filteredUsersList.value.length === 0) _push(`<div class="py-16 text-center text-slate-400"><span class="text-4xl block mb-2">👤</span><p class="text-sm font-semibold text-slate-700 dark:text-slate-300">Tidak ada pengguna ditemukan</p><p class="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau buat pengguna baru.</p></div>`);
					else {
						_push(`<div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800"><table class="w-full text-left text-xs sm:text-sm"><thead class="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider"><tr><th class="py-3.5 px-4">Pengguna</th><th class="py-3.5 px-4">Kontak</th><th class="py-3.5 px-4">Role &amp; Hak Akses</th><th class="py-3.5 px-4">Status</th><th class="py-3.5 px-4">Terdaftar</th><th class="py-3.5 px-4 text-right">Aksi</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900"><!--[-->`);
						ssrRenderList$2(filteredUsersList.value, (user) => {
							_push(`<tr class="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition"><td class="py-3.5 px-4"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold text-xs shadow-sm overflow-hidden shrink-0 border border-white/20">`);
							if (user.avatar) _push(`<img${ssrRenderAttr("src", unref(getImageUrl)(user.avatar))}${ssrRenderAttr("alt", user.name)} class="w-full h-full object-cover">`);
							else _push(`<span>${ssrInterpolate(user.name ? user.name.charAt(0).toUpperCase() : "U")}</span>`);
							_push(`</div><div><div class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5"><span>${ssrInterpolate(user.name)}</span>`);
							if (unref(currentAdmin) && unref(currentAdmin).id === user.id) _push(`<span class="text-[10px] px-1.5 py-0.2 rounded bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold"> Anda </span>`);
							else _push(`<!---->`);
							_push(`</div><div class="text-[11px] text-slate-400 font-mono">${ssrInterpolate(user.email)}</div></div></div></td><td class="py-3.5 px-4">`);
							if (user.phone) _push(`<div class="text-xs text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1"><span>📱</span><span>${ssrInterpolate(user.phone)}</span></div>`);
							else _push(`<span class="text-xs text-slate-400 italic">-</span>`);
							_push(`</td><td class="py-3.5 px-4"><span class="${ssrRenderClass(["px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1", getRoleBadgeClass(user.role?.name || "")])}"><span>${ssrInterpolate(getRoleIcon(user.role?.name || ""))}</span><span>${ssrInterpolate(user.role?.displayName || user.role?.name || "User")}</span></span>`);
							if (user.role?.description) _push(`<div class="text-[10px] text-slate-400 mt-0.5 max-w-[200px] truncate"${ssrRenderAttr("title", user.role.description)}>${ssrInterpolate(user.role.description)}</div>`);
							else _push(`<!---->`);
							_push(`</td><td class="py-3.5 px-4"><div class="space-y-1"><span class="${ssrRenderClass(["px-2 py-0.5 rounded-md text-[11px] font-bold inline-flex items-center gap-1", user.isBlockedIntruder ? "bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 animate-pulse" : user.isActive !== false ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800" : "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"])}"><span class="${ssrRenderClass([user.isBlockedIntruder ? "bg-rose-600" : user.isActive !== false ? "bg-emerald-500" : "bg-amber-500", "w-1.5 h-1.5 rounded-full"])}"></span><span>${ssrInterpolate(user.isBlockedIntruder ? "🚨 Penyusup Diblokir" : user.isActive !== false ? "Aktif" : "Nonaktif / Terkunci")}</span></span>`);
							if (user.failedLoginAttempts && user.failedLoginAttempts > 0) _push(`<div class="text-[10px] font-bold text-rose-500"> ⚠️ ${ssrInterpolate(user.failedLoginAttempts)}x salah PW </div>`);
							else _push(`<!---->`);
							_push(`</div></td><td class="py-3.5 px-4 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">${ssrInterpolate(formatDateIndo(user.createdAt))}</td><td class="py-3.5 px-4 text-right"><div class="flex items-center justify-end gap-1.5"><button class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition cursor-pointer" title="Edit Pengguna"> ✏️ </button><button${ssrIncludeBooleanAttr(unref(currentAdmin) && unref(currentAdmin).id === user.id) ? " disabled" : ""} class="p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 text-rose-600 dark:text-rose-400 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"${ssrRenderAttr("title", unref(currentAdmin) && unref(currentAdmin).id === user.id ? "Tidak dapat menghapus akun Anda sendiri" : "Hapus Pengguna")}> 🗑️ </button></div></td></tr>`);
						});
						_push(`<!--]--></tbody></table></div>`);
					}
					_push(`<div class="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2"><div> Menampilkan <span class="font-bold text-slate-900 dark:text-white">${ssrInterpolate(filteredUsersList.value.length)}</span> dari total <span class="font-bold text-slate-900 dark:text-white">${ssrInterpolate(usersList.value.length)}</span> pengguna </div></div></div></div>`);
				} else _push(`<!---->`);
				if (activeTab.value === "roles") {
					_push(`<div class="space-y-6"><div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm"><div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4 mb-6"><div><div class="flex items-center gap-2"><span class="text-2xl">🛡️</span><h2 class="text-lg font-bold text-slate-900 dark:text-white"> Master Role &amp; Hak Akses Menu </h2><span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800">${ssrInterpolate(rolesList.value.length)} Role </span></div><p class="text-xs text-slate-500 dark:text-slate-400 mt-1"> Atur hak akses menu dinamis (Lihat, Tambah, Ubah, Hapus) untuk setiap role pengguna tanpa enum kodingan. </p></div><div class="flex items-center gap-3"><button${ssrIncludeBooleanAttr(isRolesLoading.value) ? " disabled" : ""} type="button" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer" title="Segarkan Data"><span class="${ssrRenderClass({ "animate-spin": isRolesLoading.value })}">🔄</span><span class="hidden sm:inline">Segarkan</span></button><button type="button" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-500/20 transition flex items-center gap-2 cursor-pointer"><span>➕</span><span>Tambah Role Baru</span></button></div></div><div class="mb-6 p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-blue-500/10 border border-teal-500/20 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-3"><span class="text-lg shrink-0">⚡</span><div><span class="font-bold text-teal-700 dark:text-teal-300">Arsitektur RBAC Dinamis (Anti-Enum):</span><span class="ml-1 text-slate-600 dark:text-slate-400"> Seluruh role dan hak akses menu disimpan secara dinamis di database (<span class="font-mono text-[11px] text-teal-600">roles</span>, <span class="font-mono text-[11px] text-teal-600">menus</span>, <span class="font-mono text-[11px] text-teal-600">role_menu_permissions</span>). Anda bebas menambah role kustom tanpa batasan enum di kode sumber. </span></div></div><div class="mb-6 relative max-w-md"><span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm"> 🔍 </span><input${ssrRenderAttr("value", roleSearchQuery.value)} type="text" placeholder="Cari kode role, nama tampilan, atau deskripsi..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition"></div>`);
					if (isRolesLoading.value) _push(`<div class="py-16 text-center text-slate-400"><div class="animate-spin inline-block w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mb-3"></div><p class="text-xs">Memuat daftar role &amp; hak akses menu...</p></div>`);
					else if (filteredRolesList.value.length === 0) _push(`<div class="py-16 text-center text-slate-400"><span class="text-4xl block mb-2">🛡️</span><p class="text-sm font-semibold text-slate-700 dark:text-slate-300">Tidak ada role ditemukan</p><p class="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau tambahkan role baru.</p></div>`);
					else {
						_push(`<div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800"><table class="w-full text-left text-xs sm:text-sm"><thead class="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider"><tr><th class="py-3.5 px-4">Role &amp; Kode (Anti-Enum)</th><th class="py-3.5 px-4">Deskripsi Peran</th><th class="py-3.5 px-4">Tipe Role</th><th class="py-3.5 px-4">Pengguna</th><th class="py-3.5 px-4 text-right">Aksi &amp; Hak Akses</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900"><!--[-->`);
						ssrRenderList$2(filteredRolesList.value, (r) => {
							_push(`<tr class="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition"><td class="py-3.5 px-4"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-lg shrink-0 border border-slate-300/60 dark:border-slate-700 shadow-sm">${ssrInterpolate(getRoleIcon(r.name))}</div><div><div class="font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>${ssrInterpolate(r.displayName || r.name)}</span><span class="${ssrRenderClass(["px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wide", getRoleBadgeClass(r.name)])}">${ssrInterpolate(r.name)}</span></div><div class="text-[11px] text-slate-400 mt-0.5 font-mono"> ID: ${ssrInterpolate(r.id)}</div></div></div></td><td class="py-3.5 px-4 max-w-xs text-xs text-slate-600 dark:text-slate-300">${ssrInterpolate(r.description || "Tidak ada deskripsi")}</td><td class="py-3.5 px-4 whitespace-nowrap">`);
							if (r.isSystem) _push(`<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 inline-flex items-center gap-1"><span>🔒</span><span>Sistem Bawaan</span></span>`);
							else _push(`<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 inline-flex items-center gap-1"><span>✨</span><span>Kustom Dinamis</span></span>`);
							_push(`</td><td class="py-3.5 px-4 whitespace-nowrap"><span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"><span>👤</span><span>${ssrInterpolate(r._count?.users || 0)} User</span></span></td><td class="py-3.5 px-4 text-right whitespace-nowrap"><div class="flex items-center justify-end gap-2"><button type="button" class="px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 font-bold text-xs border border-teal-200 dark:border-teal-800 transition flex items-center gap-1.5 cursor-pointer shadow-sm" title="Atur Hak Akses Menu"><span>⚙️</span><span>Atur Akses Menu</span></button><button type="button" class="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition cursor-pointer" title="Edit Role"> ✏️ </button><button${ssrIncludeBooleanAttr(r.isSystem || r._count && r._count.users > 0) ? " disabled" : ""} type="button" class="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 text-rose-600 dark:text-rose-400 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"${ssrRenderAttr("title", r.isSystem ? "Role sistem bawaan tidak dapat dihapus" : r._count && r._count.users > 0 ? "Masih digunakan oleh pengguna" : "Hapus Role")}> 🗑️ </button></div></td></tr>`);
						});
						_push(`<!--]--></tbody></table></div>`);
					}
					_push(`<div class="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2"><div> Menampilkan <span class="font-bold text-slate-900 dark:text-white">${ssrInterpolate(filteredRolesList.value.length)}</span> dari total <span class="font-bold text-slate-900 dark:text-white">${ssrInterpolate(rolesList.value.length)}</span> role terdaftar </div></div></div></div>`);
				} else _push(`<!---->`);
				_push(`</div>`);
			}
			if (isEditTourModalOpen.value) {
				_push(`<div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"><div class="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800"><div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6"><h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>🏷️</span><span>${ssrInterpolate(editForm.value.id ? "Ubah Harga & Detail Paket Wisata" : "Tambah Paket Wisata Baru")}</span></h3><button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg">✕</button></div><form class="space-y-4 text-xs sm:text-sm"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Judul Paket Wisata <span class="text-rose-500">*</span></label><input${ssrRenderAttr("value", editForm.value.title)} type="text" required placeholder="Contoh: Promo Tour Nusa Penida 2 Hari 1 Malam" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none font-semibold"></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-3"><div class="sm:col-span-2"><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Subjudul / Tagline Paket </label><input${ssrRenderAttr("value", editForm.value.subtitle)} type="text" placeholder="Contoh: Private tour peserta tidak digabung dengan group lainnya" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Tipe Trip </label><select class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none"><option value="PRIVATE"${ssrIncludeBooleanAttr(Array.isArray(editForm.value.tourType) ? ssrLooseContain(editForm.value.tourType, "PRIVATE") : ssrLooseEqual(editForm.value.tourType, "PRIVATE")) ? " selected" : ""}>Private Tour</option><option value="OPEN_TRIP"${ssrIncludeBooleanAttr(Array.isArray(editForm.value.tourType) ? ssrLooseContain(editForm.value.tourType, "OPEN_TRIP") : ssrLooseEqual(editForm.value.tourType, "OPEN_TRIP")) ? " selected" : ""}>Open Trip</option><option value="GROUP"${ssrIncludeBooleanAttr(Array.isArray(editForm.value.tourType) ? ssrLooseContain(editForm.value.tourType, "GROUP") : ssrLooseEqual(editForm.value.tourType, "GROUP")) ? " selected" : ""}>Group Tour</option></select></div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1"><span>🏷️ Kategori Wisata</span><span class="text-rose-500">*</span></label>`);
				_push(ssrRenderComponent(SearchableSelect_default, {
					modelValue: editForm.value.categoryId,
					"onUpdate:modelValue": ($event) => editForm.value.categoryId = $event,
					options: categoryOptions.value,
					placeholder: "-- Pilih Kategori --",
					searchPlaceholder: "Cari kategori...",
					required: ""
				}, null, _parent));
				_push(`</div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1"><span>📍 Destinasi Lokasi</span><span class="text-rose-500">*</span></label>`);
				_push(ssrRenderComponent(SearchableSelect_default, {
					modelValue: editForm.value.destinationId,
					"onUpdate:modelValue": ($event) => editForm.value.destinationId = $event,
					options: destinationOptions.value,
					placeholder: "-- Pilih Destinasi --",
					searchPlaceholder: "Cari destinasi...",
					required: ""
				}, null, _parent));
				_push(`</div><div class="sm:col-span-2"><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1"><span>⏱️ Durasi Aktivitas / Trip</span><span class="text-rose-500">*</span></label>`);
				_push(ssrRenderComponent(SearchableSelect_default, {
					modelValue: editForm.value.durationId,
					"onUpdate:modelValue": ($event) => editForm.value.durationId = $event,
					options: durationOptions.value,
					placeholder: "-- Pilih Durasi --",
					searchPlaceholder: "Cari durasi...",
					required: ""
				}, null, _parent));
				_push(`</div></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Deskripsi Paket Wisata </label><textarea rows="2" placeholder="Rincian singkat paket, daya tarik utama, dan aktivitas yang dilakukan..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none text-xs sm:text-sm">${ssrInterpolate(editForm.value.description)}</textarea></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Gambar Utama Paket Wisata (Tersimpan di /images) </label><div class="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"><div class="w-16 h-16 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden shrink-0">`);
				if (editForm.value.featuredImage) _push(`<img${ssrRenderAttr("src", unref(getImageUrl)(editForm.value.featuredImage))} class="w-full h-full object-cover" alt="Tour Preview">`);
				else _push(`<span class="text-xl">🌴</span>`);
				_push(`</div><div class="flex-1 space-y-1"><div class="flex items-center gap-2"><label class="cursor-pointer inline-block"><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" class="hidden"${ssrIncludeBooleanAttr(uploadingTourImage.value) ? " disabled" : ""}><span class="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs inline-flex items-center gap-1 shadow transition"><span>📤</span><span>${ssrInterpolate(editForm.value.featuredImage ? "Ganti Gambar" : "Upload Gambar")}</span></span></label>`);
				if (editForm.value.featuredImage) _push(`<button type="button" class="px-2.5 py-1 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold"> Hapus </button>`);
				else _push(`<!---->`);
				_push(`</div>`);
				if (editForm.value.featuredImage) _push(`<div class="text-[10px] text-slate-500 font-mono truncate max-w-xs"${ssrRenderAttr("title", editForm.value.featuredImage)}> 📁 ${ssrInterpolate(editForm.value.featuredImage)}</div>`);
				else _push(`<!---->`);
				_push(`</div></div></div><div class="grid grid-cols-1 gap-4"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Harga Normal / Paket (Rp) <span class="text-rose-500">*</span></label><input${ssrRenderAttr("value", editForm.value.price)} type="number" min="0" step="5000" required class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-mono font-bold text-teal-600 focus:ring-2 focus:ring-teal-500 outline-none"></div></div><div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5"><div class="flex items-center justify-between"><div><div class="font-bold text-slate-800 dark:text-slate-200">💰 Harga Bertingkat per Jumlah Orang (Opsional)</div><div class="text-[11px] text-slate-500">Contoh: 1 orang = 1.600.000, 2 orang = 1.250.000 / orang, dst.</div></div><button type="button" class="px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold">+ Tambah Tier</button></div><!--[-->`);
				ssrRenderList$2(editForm.value.priceTiers, (tier, idx) => {
					_push(`<div class="flex items-center gap-2"><input${ssrRenderAttr("value", tier.paxCount)} type="number" min="1" placeholder="Pax" class="w-24 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"><span class="text-xs text-slate-500">orang = Rp</span><input${ssrRenderAttr("value", tier.pricePerPerson)} type="number" min="0" step="5000" placeholder="Harga / orang" class="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"><button type="button" class="px-2 py-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded text-xs font-bold">✕</button></div>`);
				});
				_push(`<!--]--></div><div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5"><div class="flex items-center justify-between"><div><div class="font-bold text-slate-800 dark:text-slate-200">🏝️ Destinasi / Spot Wisata per Hari</div><div class="text-[11px] text-slate-500">Pilih dari Master Spot atau ketik nama spot &amp; kelompok hari (contoh: Hari 1 - Barat Destination).</div></div><button type="button" class="px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold">+ Tambah Spot</button></div><!--[-->`);
				ssrRenderList$2(editForm.value.spots, (sp, idx) => {
					_push(`<div class="grid grid-cols-12 gap-2 items-center"><input${ssrRenderAttr("value", sp.dayNumber)} type="number" min="1" placeholder="Hari" title="Hari ke-" class="col-span-2 px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-center font-mono"><input${ssrRenderAttr("value", sp.groupTitle)} type="text" placeholder="Barat / Timur Destination" class="col-span-4 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"><select class="col-span-5 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"><option value=""${ssrIncludeBooleanAttr(Array.isArray(sp.masterSpotId) ? ssrLooseContain(sp.masterSpotId, "") : ssrLooseEqual(sp.masterSpotId, "")) ? " selected" : ""}>-- Pilih Master Spot --</option><!--[-->`);
					ssrRenderList$2(masterSpotsList.value, (ms) => {
						_push(`<option${ssrRenderAttr("value", ms.id)}${ssrIncludeBooleanAttr(Array.isArray(sp.masterSpotId) ? ssrLooseContain(sp.masterSpotId, ms.id) : ssrLooseEqual(sp.masterSpotId, ms.id)) ? " selected" : ""}>${ssrInterpolate(ms.name)}</option>`);
					});
					_push(`<!--]--></select><button type="button" class="col-span-1 px-2 py-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded text-xs font-bold">✕</button>`);
					if (!sp.masterSpotId) _push(`<input${ssrRenderAttr("value", sp.spotName)} type="text" placeholder="Atau ketik nama spot custom..." class="col-span-11 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs">`);
					else _push(`<!---->`);
					_push(`</div>`);
				});
				_push(`<!--]--></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-3"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Fasilitas Termasuk (Include)</label><textarea rows="3" placeholder="Tiket boat PP, Private mobil + BBM, Driver/Guide, Tiket masuk wisata, Makan siang..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs outline-none focus:ring-2 focus:ring-teal-500">${ssrInterpolate(editForm.value.includes)}</textarea></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tidak Termasuk (Exclude)</label><textarea rows="3" placeholder="Pengeluaran pribadi, Tiket pesawat, Tipping..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs outline-none focus:ring-2 focus:ring-teal-500">${ssrInterpolate(editForm.value.excludes)}</textarea></div></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Itinerary / Jadwal Perjalanan</label><textarea rows="2" placeholder="Hari 1: Penjemputan Pelabuhan Sanur - Kelingking Beach... | Hari 2: Diamond Beach - Atuh Beach..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs outline-none focus:ring-2 focus:ring-teal-500">${ssrInterpolate(editForm.value.itinerary)}</textarea></div><div class="grid grid-cols-2 gap-4"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Harga Promo Diskon (Rp) </label><input${ssrRenderAttr("value", editForm.value.discountPrice)} type="number" min="0" step="5000" placeholder="Isi 0 jika tanpa diskon" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-mono text-amber-600 focus:ring-2 focus:ring-teal-500 outline-none"><span class="text-[10px] text-slate-400">Isi 0 jika tanpa promo</span></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Status Tayang </label><select class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none"><option value="PUBLISHED"${ssrIncludeBooleanAttr(Array.isArray(editForm.value.status) ? ssrLooseContain(editForm.value.status, "PUBLISHED") : ssrLooseEqual(editForm.value.status, "PUBLISHED")) ? " selected" : ""}>PUBLISHED (Tayang)</option><option value="DRAFT"${ssrIncludeBooleanAttr(Array.isArray(editForm.value.status) ? ssrLooseContain(editForm.value.status, "DRAFT") : ssrLooseEqual(editForm.value.status, "DRAFT")) ? " selected" : ""}>DRAFT (Konsep)</option></select></div></div><div class="pt-2 flex items-center gap-6"><label class="flex items-center gap-2 cursor-pointer"><input${ssrIncludeBooleanAttr(Array.isArray(editForm.value.isPromo) ? ssrLooseContain(editForm.value.isPromo, null) : editForm.value.isPromo) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-teal-600 rounded"><span class="font-bold text-slate-700 dark:text-slate-300 text-xs">Aktifkan Badge Promo</span></label><label class="flex items-center gap-2 cursor-pointer"><input${ssrIncludeBooleanAttr(Array.isArray(editForm.value.isBestSeller) ? ssrLooseContain(editForm.value.isBestSeller, null) : editForm.value.isBestSeller) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-amber-600 rounded"><span class="font-bold text-slate-700 dark:text-slate-300 text-xs">Best Seller</span></label></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Kupon Promo Terhubung (Join Master Promo) </label>`);
				_push(ssrRenderComponent(SearchableSelect_default, {
					modelValue: editForm.value.promoId,
					"onUpdate:modelValue": ($event) => editForm.value.promoId = $event,
					options: promoOptions.value,
					placeholder: "-- Tanpa Promo Khusus --",
					searchPlaceholder: "Cari kupon promo...",
					clearable: ""
				}, null, _parent));
				_push(`</div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Alasan Perubahan Tarif (Audit Riwayat) </label><input${ssrRenderAttr("value", editForm.value.changeReason)} type="text" placeholder="Contoh: Penyesuaian tarif high season liburan" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none"><span class="text-[11px] text-teal-600 dark:text-teal-400 font-semibold block mt-1"> 🔒 Harga lama otomatis disetel <b>enabled: false</b> dan diarsipkan. Transaksi booking sebelumnya dijamin tidak akan berubah. </span></div><div class="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3"><button type="button" class="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold"> Batal </button><button type="submit"${ssrIncludeBooleanAttr(savingTourPrice.value) ? " disabled" : ""} class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-md transition disabled:opacity-50 flex items-center gap-2">`);
				if (savingTourPrice.value) _push(`<span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>`);
				else _push(`<!---->`);
				_push(`<span>${ssrInterpolate(savingTourPrice.value ? "Menyimpan..." : editForm.value.id ? "💾 Simpan Perubahan Harga" : "➕ Tambah Paket Wisata")}</span></button></div></form></div></div>`);
			} else _push(`<!---->`);
			if (isCategoryModalOpen.value) {
				_push(`<div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"><div class="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800"><div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4"><h3 class="font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>🏷️</span><span>${ssrInterpolate(categoryForm.value.id ? "Edit Kategori & Gambar" : "Tambah Kategori Baru")}</span></h3><button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg">✕</button></div><form class="space-y-4 text-xs sm:text-sm"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Kategori</label><input${ssrRenderAttr("value", categoryForm.value.name)} type="text" required class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Ikon Emoji</label><div class="flex items-center gap-2 mb-2"><div class="w-11 h-11 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border-2 border-teal-500/40 flex items-center justify-center text-2xl shadow-inner shrink-0">${ssrInterpolate(categoryForm.value.icon || "🏷️")}</div><input${ssrRenderAttr("value", categoryForm.value.icon)} type="text" placeholder="Ketik atau pilih emoji di bawah..." class="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-bold text-base focus:ring-2 focus:ring-teal-500 outline-none"></div><div class="p-2.5 rounded-2xl bg-slate-100/70 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2"><div class="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400"><span>Pilih ikon emoji:</span><span class="text-[10px] text-teal-600 dark:text-teal-400 font-bold">Koleksi Wisata &amp; Bahari</span></div><div class="grid grid-cols-8 sm:grid-cols-10 gap-1.5 max-h-36 overflow-y-auto p-1"><!--[-->`);
				ssrRenderList$2(categoryEmojiList, (em) => {
					_push(`<button type="button" class="${ssrRenderClass(["w-8 h-8 rounded-lg flex items-center justify-center text-lg transition hover:scale-125 hover:bg-white dark:hover:bg-slate-800 shadow-sm", categoryForm.value.icon === em ? "bg-teal-500 text-white ring-2 ring-teal-400 scale-110" : "bg-white/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"])}"${ssrRenderAttr("title", em)}>${ssrInterpolate(em)}</button>`);
				});
				_push(`<!--]--></div></div></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Deskripsi</label><textarea rows="2" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950">${ssrInterpolate(categoryForm.value.description)}</textarea></div><div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2"><label class="block font-bold text-xs text-slate-700 dark:text-slate-300">Gambar Kategori (Tersimpan di /images)</label><div class="flex items-center gap-3"><div class="w-16 h-16 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shrink-0 flex items-center justify-center relative">`);
				if (categoryForm.value.imageUrl) _push(`<img${ssrRenderAttr("src", unref(getImageUrl)(categoryForm.value.imageUrl))} class="w-full h-full object-cover">`);
				else _push(`<span class="text-xl">🌊</span>`);
				if (uploadingCatImage.value) _push(`<div class="absolute inset-0 bg-white/80 dark:bg-slate-900/80 flex items-center justify-center"><span class="animate-spin text-teal-600">⏳</span></div>`);
				else _push(`<!---->`);
				_push(`</div><div class="space-y-1"><label class="cursor-pointer inline-block"><input type="file" accept="image/png,image/jpeg,image/webp" class="hidden"${ssrIncludeBooleanAttr(uploadingCatImage.value) ? " disabled" : ""}><span class="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs inline-flex items-center gap-1 shadow"><span>📤</span><span>${ssrInterpolate(categoryForm.value.imageUrl ? "Ganti Foto" : "Upload Foto")}</span></span></label>`);
				if (categoryForm.value.imageUrl) _push(`<div class="text-[10px] text-slate-500 font-mono truncate max-w-[200px]"${ssrRenderAttr("title", categoryForm.value.imageUrl)}> 📁 ${ssrInterpolate(categoryForm.value.imageUrl)}</div>`);
				else _push(`<!---->`);
				_push(`</div></div></div><div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2"><button type="button" class="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800">Batal</button><button type="submit"${ssrIncludeBooleanAttr(savingCategory.value) ? " disabled" : ""} class="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold">${ssrInterpolate(savingCategory.value ? "Menyimpan..." : "Simpan Kategori")}</button></div></form></div></div>`);
			} else _push(`<!---->`);
			if (isDestinationModalOpen.value) {
				_push(`<div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"><div class="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800"><div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4"><h3 class="font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>📍</span><span>${ssrInterpolate(destinationForm.value.id ? "Edit Destinasi & Gambar" : "Tambah Destinasi Baru")}</span></h3><button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg">✕</button></div><form class="space-y-4 text-xs sm:text-sm"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Destinasi</label><input${ssrRenderAttr("value", destinationForm.value.name)} type="text" required class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950"></div><div class="grid grid-cols-2 gap-2"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Provinsi</label><input${ssrRenderAttr("value", destinationForm.value.province)} type="text" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Kab / Kota</label><input${ssrRenderAttr("value", destinationForm.value.city)} type="text" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950"></div></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Deskripsi</label><textarea rows="2" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950">${ssrInterpolate(destinationForm.value.description)}</textarea></div><div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2"><label class="block font-bold text-xs text-slate-700 dark:text-slate-300">Gambar Destinasi (Tersimpan di /images)</label><div class="flex items-center gap-3"><div class="w-16 h-16 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shrink-0 flex items-center justify-center relative">`);
				if (destinationForm.value.imageUrl) _push(`<img${ssrRenderAttr("src", unref(getImageUrl)(destinationForm.value.imageUrl))} class="w-full h-full object-cover">`);
				else _push(`<span class="text-xl">🏝️</span>`);
				if (uploadingDestImage.value) _push(`<div class="absolute inset-0 bg-white/80 dark:bg-slate-900/80 flex items-center justify-center"><span class="animate-spin text-teal-600">⏳</span></div>`);
				else _push(`<!---->`);
				_push(`</div><div class="space-y-1"><label class="cursor-pointer inline-block"><input type="file" accept="image/png,image/jpeg,image/webp" class="hidden"${ssrIncludeBooleanAttr(uploadingDestImage.value) ? " disabled" : ""}><span class="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs inline-flex items-center gap-1 shadow"><span>📤</span><span>${ssrInterpolate(destinationForm.value.imageUrl ? "Ganti Foto" : "Upload Foto")}</span></span></label>`);
				if (destinationForm.value.imageUrl) _push(`<div class="text-[10px] text-slate-500 font-mono truncate max-w-[200px]"${ssrRenderAttr("title", destinationForm.value.imageUrl)}> 📁 ${ssrInterpolate(destinationForm.value.imageUrl)}</div>`);
				else _push(`<!---->`);
				_push(`</div></div></div><div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2"><button type="button" class="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800">Batal</button><button type="submit"${ssrIncludeBooleanAttr(savingDestination.value) ? " disabled" : ""} class="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold">${ssrInterpolate(savingDestination.value ? "Menyimpan..." : "Simpan Destinasi")}</button></div></form></div></div>`);
			} else _push(`<!---->`);
			if (isDurationModalOpen.value) _push(`<div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"><div class="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800"><div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4"><h3 class="font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>⏱️</span><span>${ssrInterpolate(durationForm.value.id ? "Edit Master Durasi" : "Tambah Durasi Baru")}</span></h3><button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg">✕</button></div><form class="space-y-4 text-xs sm:text-sm"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Durasi (Label) *</label><input${ssrRenderAttr("value", durationForm.value.name)} type="text" required placeholder="Contoh: 45 Menit, 2 Jam, One Day Trip" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Estimasi Durasi (Menit)</label><input${ssrRenderAttr("value", durationForm.value.durationMinutes)} type="number" min="0" placeholder="Contoh: 45, 120, 480" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Deskripsi / Keterangan Singkat</label><textarea rows="2" placeholder="Catatan durasi aktivitas atau trip..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">${ssrInterpolate(durationForm.value.description)}</textarea></div><div class="flex items-center gap-2"><input${ssrIncludeBooleanAttr(Array.isArray(durationForm.value.isActive) ? ssrLooseContain(durationForm.value.isActive, null) : durationForm.value.isActive) ? " checked" : ""} type="checkbox" id="durIsActive" class="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"><label for="durIsActive" class="font-bold text-slate-700 dark:text-slate-300 cursor-pointer">Status Aktif</label></div><div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2"><button type="button" class="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Batal</button><button type="submit"${ssrIncludeBooleanAttr(savingDuration.value) ? " disabled" : ""} class="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold transition">${ssrInterpolate(savingDuration.value ? "Menyimpan..." : "Simpan Durasi")}</button></div></form></div></div>`);
			else _push(`<!---->`);
			if (isTaxModalOpen.value) _push(`<div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"><div class="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800"><div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4"><h3 class="font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>🧾</span><span>${ssrInterpolate(isEditingTax.value ? "Edit Master PPN" : "Tambah Master PPN Baru")}</span></h3><button type="button" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg">✕</button></div><form class="space-y-4 text-xs sm:text-sm"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nama PPN / Pajak *</label><input${ssrRenderAttr("value", taxForm.value.name)} type="text" required placeholder="Contoh: PPN 11%" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Persentase Tarif (%) *</label><input${ssrRenderAttr("value", taxForm.value.rate)} type="number" min="0" max="100" step="0.01" required placeholder="11" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-mono focus:ring-2 focus:ring-teal-500 outline-none"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Keterangan</label><input${ssrRenderAttr("value", taxForm.value.description)} type="text" placeholder="Contoh: Pajak Pertambahan Nilai sesuai PMK terbaru" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none"></div><label class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 cursor-pointer"><input${ssrIncludeBooleanAttr(Array.isArray(taxForm.value.isActive) ? ssrLooseContain(taxForm.value.isActive, null) : taxForm.value.isActive) ? " checked" : ""} type="checkbox" class="w-4 h-4 accent-teal-600 rounded"><div><div class="font-bold text-slate-800 dark:text-slate-200">Aktifkan PPN ini (Active)</div><div class="text-[11px] text-slate-500">Jika dicentang, PPN aktif sebelumnya otomatis menjadi Non-Active tanpa mengubah histori booking lama.</div></div></label><div class="flex justify-end gap-2 pt-2"><button type="button" class="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold">Batal</button><button type="submit"${ssrIncludeBooleanAttr(savingTax.value) ? " disabled" : ""} class="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow disabled:opacity-60">${ssrInterpolate(savingTax.value ? "Menyimpan..." : "Simpan PPN")}</button></div></form></div></div>`);
			else _push(`<!---->`);
			if (isStatusModalOpen.value) {
				_push(`<div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"><div class="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800"><div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4"><h3 class="font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>🚦</span><span>${ssrInterpolate(isEditingStatus.value ? "Edit Master Status" : "Tambah Master Status Baru")}</span></h3><button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg">✕</button></div><form class="space-y-4 text-xs sm:text-sm"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Kategori Master Status *</label><select${ssrIncludeBooleanAttr(isEditingStatus.value) ? " disabled" : ""} class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 disabled:opacity-60"><option value="booking"${ssrIncludeBooleanAttr(Array.isArray(statusForm.value.category) ? ssrLooseContain(statusForm.value.category, "booking") : ssrLooseEqual(statusForm.value.category, "booking")) ? " selected" : ""}>Status Reservasi Booking</option><option value="payment"${ssrIncludeBooleanAttr(Array.isArray(statusForm.value.category) ? ssrLooseContain(statusForm.value.category, "payment") : ssrLooseEqual(statusForm.value.category, "payment")) ? " selected" : ""}>Status Pembayaran (Payment)</option><option value="content"${ssrIncludeBooleanAttr(Array.isArray(statusForm.value.category) ? ssrLooseContain(statusForm.value.category, "content") : ssrLooseEqual(statusForm.value.category, "content")) ? " selected" : ""}>Status Tayang Paket Wisata (Content)</option><option value="discount"${ssrIncludeBooleanAttr(Array.isArray(statusForm.value.category) ? ssrLooseContain(statusForm.value.category, "discount") : ssrLooseEqual(statusForm.value.category, "discount")) ? " selected" : ""}>Tipe Diskon &amp; Kupon</option></select></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Kode Status (Key Unik) *</label><input${ssrRenderAttr("value", statusForm.value.code)} type="text" required placeholder="Contoh: RESCHEDULED, ON_HOLD, VIP_CONFIRMED" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 uppercase font-mono font-bold"><span class="text-[10px] text-slate-400">Kode unik huruf kapital &amp; underscore yang tersimpan di record data.</span></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Label / Nama Tampilan *</label><input${ssrRenderAttr("value", statusForm.value.name)} type="text" required placeholder="Contoh: Dijadwalkan Ulang, Ditahan" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"></div>`);
				if (statusForm.value.category !== "discount") {
					_push(`<div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Warna Badge Status</label><div class="flex items-center gap-2 mb-2"><input${ssrRenderAttr("value", statusForm.value.color)} type="color" class="w-9 h-9 rounded-xl border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5 bg-transparent"><input${ssrRenderAttr("value", statusForm.value.color)} type="text" placeholder="#10b981" class="w-28 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-mono text-xs"><div class="px-2.5 py-1 rounded-full text-xs font-bold border ml-auto" style="${ssrRenderStyle({
						backgroundColor: `${statusForm.value.color}18`,
						color: statusForm.value.color,
						borderColor: `${statusForm.value.color}40`
					})}"> ● ${ssrInterpolate(statusForm.value.name || "Pratinjau")}</div></div><div class="flex flex-wrap gap-1.5 pt-1"><!--[-->`);
					ssrRenderList$2(colorPresets, (cp) => {
						_push(`<button type="button" class="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700 transition transform hover:scale-110" style="${ssrRenderStyle({ backgroundColor: cp.hex })}"${ssrRenderAttr("title", cp.label)}></button>`);
					});
					_push(`<!--]--></div></div>`);
				} else _push(`<!---->`);
				if (statusForm.value.category === "booking") _push(`<div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Urutan (Order Sorting)</label><input${ssrRenderAttr("value", statusForm.value.order)} type="number" min="1" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"></div>`);
				else _push(`<!---->`);
				_push(`<div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Keterangan / Deskripsi</label><textarea rows="2" placeholder="Penjelasan kapan status ini digunakan..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">${ssrInterpolate(statusForm.value.description)}</textarea></div><div class="flex items-center gap-2"><input${ssrIncludeBooleanAttr(Array.isArray(statusForm.value.isActive) ? ssrLooseContain(statusForm.value.isActive, null) : statusForm.value.isActive) ? " checked" : ""} type="checkbox" id="statusIsActive" class="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"><label for="statusIsActive" class="font-bold text-slate-700 dark:text-slate-300 cursor-pointer">Status Aktif</label></div><div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2"><button type="button" class="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Batal</button><button type="submit"${ssrIncludeBooleanAttr(savingStatus.value) ? " disabled" : ""} class="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold transition">${ssrInterpolate(savingStatus.value ? "Menyimpan..." : "Simpan Status")}</button></div></form></div></div>`);
			} else _push(`<!---->`);
			if (isPromoModalOpen.value) {
				_push(`<div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"><div class="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 my-8"><div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6"><h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>🎁</span><span>${ssrInterpolate(promoForm.value.id ? "Edit Kupon Promo" : "Tambah Kupon Promo Baru")}</span></h3><button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg">✕</button></div><form class="space-y-4 text-xs sm:text-sm"><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Kode Promo * </label><input${ssrRenderAttr("value", promoForm.value.code)} type="text" required placeholder="Contoh: LIBURAN20" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none uppercase font-mono font-bold"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Judul Promo * </label><input${ssrRenderAttr("value", promoForm.value.title)} type="text" required placeholder="Contoh: Promo Spesial Liburan Bahari" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none"></div></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Keterangan Promo </label><textarea rows="2" placeholder="Deskripsi syarat &amp; ketentuan promo..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none">${ssrInterpolate(promoForm.value.description)}</textarea></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-4"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Tipe Potongan </label><select class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none font-bold"><option value="PERCENT"${ssrIncludeBooleanAttr(Array.isArray(promoForm.value.discountType) ? ssrLooseContain(promoForm.value.discountType, "PERCENT") : ssrLooseEqual(promoForm.value.discountType, "PERCENT")) ? " selected" : ""}>Persentase (%)</option><option value="FIXED"${ssrIncludeBooleanAttr(Array.isArray(promoForm.value.discountType) ? ssrLooseContain(promoForm.value.discountType, "FIXED") : ssrLooseEqual(promoForm.value.discountType, "FIXED")) ? " selected" : ""}>Nominal Tetap (Rp)</option></select></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Nilai Diskon * </label><input${ssrRenderAttr("value", promoForm.value.discountValue)} type="number" min="1" required${ssrRenderAttr("placeholder", promoForm.value.discountType === "PERCENT" ? "Contoh: 20" : "Contoh: 50000")} class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none font-mono"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Maks. Diskon (Rp) </label><input${ssrRenderAttr("value", promoForm.value.maxDiscountAmount)} type="number" min="0" placeholder="Opsional (misal: 200000)" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none font-mono"></div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Min. Belanja Subtotal (Rp) </label><input${ssrRenderAttr("value", promoForm.value.minSpend)} type="number" min="0" placeholder="0 jika tanpa minimum" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none font-mono"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Kuota Pemakaian </label><input${ssrRenderAttr("value", promoForm.value.quota)} type="number" min="1" placeholder="Contoh: 100" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none font-mono"></div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Tanggal Mulai </label><input${ssrRenderAttr("value", promoForm.value.startDate)} type="date" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1"> Tanggal Selesai </label><input${ssrRenderAttr("value", promoForm.value.endDate)} type="date" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 outline-none"></div></div><div class="pt-1"><label class="flex items-center gap-2 cursor-pointer"><input${ssrIncludeBooleanAttr(Array.isArray(promoForm.value.isActive) ? ssrLooseContain(promoForm.value.isActive, null) : promoForm.value.isActive) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-teal-600 rounded"><span class="font-bold text-slate-700 dark:text-slate-300 text-xs">Status Promo Aktif</span></label></div><div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3"><div class="flex items-center justify-between"><div><span class="font-extrabold text-slate-900 dark:text-white block text-xs sm:text-sm"> 🔗 Tabel Penghubung: Paket Wisata yang Berlaku </span><span class="text-[11px] text-slate-500 block"> Pilih apakah kupon ini berlaku bebas untuk semua paket atau hanya paket tertentu saja. </span></div></div><div class="flex items-center gap-6 pt-1"><label class="flex items-center gap-2 cursor-pointer"><input type="radio"${ssrRenderAttr("value", true)}${ssrIncludeBooleanAttr(ssrLooseEqual(promoForm.value.isAllPackages, true)) ? " checked" : ""} class="w-4 h-4 text-teal-600"><span class="font-bold text-xs text-slate-700 dark:text-slate-300">Semua Paket Wisata (Universal)</span></label><label class="flex items-center gap-2 cursor-pointer"><input type="radio"${ssrRenderAttr("value", false)}${ssrIncludeBooleanAttr(ssrLooseEqual(promoForm.value.isAllPackages, false)) ? " checked" : ""} class="w-4 h-4 text-teal-600"><span class="font-bold text-xs text-teal-700 dark:text-teal-400">Pilih Paket Tertentu (Restricted)</span></label></div>`);
				if (!promoForm.value.isAllPackages) {
					_push(`<div class="mt-2 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden max-h-56 overflow-y-auto"><table class="w-full text-left text-xs"><thead class="bg-slate-100 dark:bg-slate-800/80 sticky top-0"><tr><th class="py-2 px-3 w-10 text-center"><input type="checkbox"${ssrIncludeBooleanAttr(promoForm.value.selectedTourPackageIds.length === toursList.value.length && toursList.value.length > 0) ? " checked" : ""} class="w-3.5 h-3.5 text-teal-600 rounded"></th><th class="py-2 px-3">Nama Paket Wisata</th><th class="py-2 px-3">Tarif Normal</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900"><!--[-->`);
					ssrRenderList$2(toursList.value, (t) => {
						_push(`<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"><td class="py-2.5 px-3 text-center"><input type="checkbox"${ssrRenderAttr("value", t.id)}${ssrIncludeBooleanAttr(Array.isArray(promoForm.value.selectedTourPackageIds) ? ssrLooseContain(promoForm.value.selectedTourPackageIds, t.id) : promoForm.value.selectedTourPackageIds) ? " checked" : ""} class="w-3.5 h-3.5 text-teal-600 rounded"></td><td class="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">${ssrInterpolate(t.title)}</td><td class="py-2.5 px-3 font-mono text-teal-600 dark:text-teal-400"> Rp ${ssrInterpolate(Number(t.price).toLocaleString("id-ID"))}</td></tr>`);
					});
					_push(`<!--]--></tbody></table></div>`);
				} else _push(`<!---->`);
				if (!promoForm.value.isAllPackages) _push(`<div class="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">${ssrInterpolate(promoForm.value.selectedTourPackageIds.length)} paket wisata dipilih untuk kupon promo ini. </div>`);
				else _push(`<!---->`);
				_push(`</div><div class="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3"><button type="button" class="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold"> Batal </button><button type="submit"${ssrIncludeBooleanAttr(savingPromo.value) ? " disabled" : ""} class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-md transition disabled:opacity-50 flex items-center gap-2">`);
				if (savingPromo.value) _push(`<span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>`);
				else _push(`<!---->`);
				_push(`<span>${ssrInterpolate(savingPromo.value ? "Menyimpan..." : "💾 Simpan Promo")}</span></button></div></form></div></div>`);
			} else _push(`<!---->`);
			if (isUserModalOpen.value) {
				_push(`<div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"><div class="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 my-8"><div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6"><h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>${ssrInterpolate(isEditingUser.value ? "✏️ Edit Pengguna" : "➕ Tambah Pengguna Baru")}</span></h3><button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-lg cursor-pointer">✕</button></div><form class="space-y-4 text-xs sm:text-sm"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1.5"> Nama Lengkap <span class="text-rose-500">*</span></label><input${ssrRenderAttr("value", userForm.value.name)} type="text" required placeholder="Contoh: Budi Santoso" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1.5"> Email Login <span class="text-rose-500">*</span></label><input${ssrRenderAttr("value", userForm.value.email)} type="email" required placeholder="user@wisata.com" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none font-mono text-xs"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1.5"> Nomor HP / WhatsApp </label><input${ssrRenderAttr("value", userForm.value.phone)} type="tel" placeholder="081234567890" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"></div></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1.5"> Role / Hak Akses <span class="text-rose-500">*</span></label><select required class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none font-medium cursor-pointer"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(userForm.value.roleId) ? ssrLooseContain(userForm.value.roleId, "") : ssrLooseEqual(userForm.value.roleId, "")) ? " selected" : ""}>-- Pilih Hak Akses --</option><!--[-->`);
				ssrRenderList$2(rolesList.value, (r) => {
					_push(`<option${ssrRenderAttr("value", r.id)}${ssrIncludeBooleanAttr(Array.isArray(userForm.value.roleId) ? ssrLooseContain(userForm.value.roleId, r.id) : ssrLooseEqual(userForm.value.roleId, r.id)) ? " selected" : ""}>${ssrInterpolate(r.displayName || r.name)} ${ssrInterpolate(r.description ? `(${r.description})` : "")}</option>`);
				});
				_push(`<!--]--></select></div><div class="space-y-3 p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60"><div><div class="flex items-center justify-between mb-1.5"><label class="block font-bold text-slate-700 dark:text-slate-300"> Kata Sandi (Password) `);
				if (!isEditingUser.value) _push(`<span class="text-rose-500">*</span>`);
				else _push(`<!---->`);
				_push(`</label>`);
				if (isEditingUser.value) _push(`<span class="text-[11px] text-slate-400 italic"> Kosongkan jika tidak ingin mengganti </span>`);
				else _push(`<!---->`);
				_push(`</div><div class="relative"><input${ssrRenderDynamicModel(showPassword.value ? "text" : "password", userForm.value.password, null)}${ssrRenderAttr("type", showPassword.value ? "text" : "password")}${ssrIncludeBooleanAttr(!isEditingUser.value) ? " required" : ""}${ssrRenderAttr("minlength", !isEditingUser.value || userForm.value.password ? 6 : void 0)} placeholder="Minimal 6 karakter" class="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"><button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"><span>${ssrInterpolate(showPassword.value ? "🙈" : "👁️")}</span></button></div></div>`);
				if (!isEditingUser.value || userForm.value.password) {
					_push(`<div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1.5"> Konfirmasi Kata Sandi <span class="text-rose-500">*</span></label><input${ssrRenderDynamicModel(showPassword.value ? "text" : "password", userForm.value.confirmPassword, null)}${ssrRenderAttr("type", showPassword.value ? "text" : "password")} required placeholder="Ulangi kata sandi" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none">`);
					if (userForm.value.password && userForm.value.confirmPassword && userForm.value.password !== userForm.value.confirmPassword) _push(`<p class="text-[11px] text-rose-500 mt-1 font-semibold"> ⚠️ Konfirmasi kata sandi tidak cocok. </p>`);
					else _push(`<!---->`);
					_push(`</div>`);
				} else _push(`<!---->`);
				_push(`</div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1.5"> Foto Profil / Avatar (Opsional) </label><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden shrink-0">`);
				if (userForm.value.avatar) _push(`<img${ssrRenderAttr("src", unref(getImageUrl)(userForm.value.avatar))} alt="Avatar Preview" class="w-full h-full object-cover">`);
				else _push(`<span class="text-xl">👤</span>`);
				_push(`</div><div class="flex-1"><div class="flex items-center gap-2"><label class="cursor-pointer px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs border border-slate-300 dark:border-slate-600 transition flex items-center gap-1.5">`);
				if (uploadingUserAvatar.value) _push(`<span class="animate-spin inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full"></span>`);
				else _push(`<!---->`);
				_push(`<span>${ssrInterpolate(uploadingUserAvatar.value ? "Mengunggah..." : "📁 Upload Foto")}</span><input type="file" accept="image/jpeg,image/png,image/webp" class="hidden"${ssrIncludeBooleanAttr(uploadingUserAvatar.value) ? " disabled" : ""}></label>`);
				if (userForm.value.avatar) _push(`<button type="button" class="px-2 py-1 text-xs text-rose-500 hover:underline cursor-pointer"> Hapus </button>`);
				else _push(`<!---->`);
				_push(`</div><input${ssrRenderAttr("value", userForm.value.avatar)} type="text" placeholder="Atau masukkan path / URL avatar" class="w-full mt-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs outline-none"></div></div></div><div class="pt-2"><label class="flex items-center gap-2.5 cursor-pointer"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(userForm.value.isActive) ? ssrLooseContain(userForm.value.isActive, null) : userForm.value.isActive) ? " checked" : ""} class="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300 dark:border-slate-700"><span class="font-bold text-slate-800 dark:text-slate-200"> Akun Aktif (Dapat Login) </span></label><p class="text-[11px] text-slate-400 ml-6 mt-0.5"> Jika dinonaktifkan, pengguna tidak dapat masuk ke sistem. </p></div>`);
				if (userModalError.value) _push(`<div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2"><span>⚠️</span><span>${ssrInterpolate(userModalError.value)}</span></div>`);
				else _push(`<!---->`);
				_push(`<div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3"><button type="button" class="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold cursor-pointer"> Batal </button><button type="submit"${ssrIncludeBooleanAttr(savingUser.value || userForm.value.password && userForm.value.confirmPassword && userForm.value.password !== userForm.value.confirmPassword) ? " disabled" : ""} class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-md transition disabled:opacity-50 flex items-center gap-2 cursor-pointer">`);
				if (savingUser.value) _push(`<span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>`);
				else _push(`<!---->`);
				_push(`<span>${ssrInterpolate(savingUser.value ? "Menyimpan..." : isEditingUser.value ? "💾 Simpan Perubahan" : "➕ Buat Pengguna")}</span></button></div></form></div></div>`);
			} else _push(`<!---->`);
			if (isRoleModalOpen.value) {
				_push(`<div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"><div class="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 my-8"><div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6"><h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>${ssrInterpolate(isEditingRole.value ? "✏️ Edit Role" : "➕ Tambah Role Baru")}</span></h3><button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-lg cursor-pointer">✕</button></div><form class="space-y-4 text-xs sm:text-sm"><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1.5"> Kode Role (ID Unik Anti-Enum) `);
				if (!isEditingRole.value) _push(`<span class="text-rose-500">*</span>`);
				else _push(`<!---->`);
				_push(`</label><input${ssrRenderAttr("value", roleForm.value.name)} type="text"${ssrIncludeBooleanAttr(!isEditingRole.value) ? " required" : ""}${ssrIncludeBooleanAttr(isEditingRole.value) ? " disabled" : ""} placeholder="Contoh: OPERATOR_BOAT, FINANCE, MANAGER" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none font-mono uppercase text-xs disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-slate-800"><p class="text-[11px] text-slate-400 mt-1"> Gunakan huruf kapital dan garis bawah (misal: <code>STAFF_RESERVASI</code>). Bebas dibuat tanpa enum! </p></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1.5"> Nama Tampilan (Display Name) <span class="text-rose-500">*</span></label><input${ssrRenderAttr("value", roleForm.value.displayName)} type="text" required placeholder="Contoh: Operator Tiket Fast Boat" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"></div><div><label class="block font-bold text-slate-700 dark:text-slate-300 mb-1.5"> Deskripsi Peran (Opsional) </label><textarea rows="3" placeholder="Jelaskan ruang lingkup tugas dan tanggung jawab role ini..." class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none">${ssrInterpolate(roleForm.value.description)}</textarea></div>`);
				if (roleModalError.value) _push(`<div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2"><span>⚠️</span><span>${ssrInterpolate(roleModalError.value)}</span></div>`);
				else _push(`<!---->`);
				_push(`<div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3"><button type="button" class="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold cursor-pointer"> Batal </button><button type="submit"${ssrIncludeBooleanAttr(savingRole.value) ? " disabled" : ""} class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-md transition disabled:opacity-50 flex items-center gap-2 cursor-pointer">`);
				if (savingRole.value) _push(`<span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>`);
				else _push(`<!---->`);
				_push(`<span>${ssrInterpolate(savingRole.value ? "Menyimpan..." : isEditingRole.value ? "💾 Simpan Perubahan" : "➕ Buat Role")}</span></button></div></form></div></div>`);
			} else _push(`<!---->`);
			if (isRolePermissionsModalOpen.value) {
				_push(`<div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"><div class="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 my-8"><div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3 mb-6"><div><div class="flex items-center gap-2"><span class="text-xl">⚙️</span><h3 class="text-lg font-bold text-slate-900 dark:text-white"> Hak Akses Menu: ${ssrInterpolate(selectedRoleForPermissions.value?.displayName || selectedRoleForPermissions.value?.name)}</h3><span class="${ssrRenderClass(["px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wide", getRoleBadgeClass(selectedRoleForPermissions.value?.name || "")])}">${ssrInterpolate(selectedRoleForPermissions.value?.name)}</span></div><p class="text-xs text-slate-500 dark:text-slate-400 mt-1"> Tentukan menu apa saja yang dapat diakses oleh role ini, serta hak akses untuk Tambah, Ubah, dan Hapus data. </p></div><button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-lg self-start sm:self-center cursor-pointer">✕</button></div><div class="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 mb-4 text-xs"><span class="font-semibold text-slate-700 dark:text-slate-300"> ⚡ Tindakan Cepat: </span><div class="flex items-center gap-2"><button type="button" class="px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 font-medium transition cursor-pointer"> 👁️ Semua Lihat </button><button type="button" class="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-medium transition cursor-pointer"> 🔥 Akses Penuh (CRUD) </button><button type="button" class="px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-medium transition cursor-pointer"> 🚫 Cabut Semua </button></div></div>`);
				if (isLoadingPermissions.value) _push(`<div class="py-16 text-center text-slate-400"><div class="animate-spin inline-block w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mb-3"></div><p class="text-xs">Memuat matriks hak akses menu...</p></div>`);
				else {
					_push(`<div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 max-h-[50vh] overflow-y-auto"><table class="w-full text-left text-xs sm:text-sm"><thead class="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider sticky top-0 z-10 backdrop-blur-md"><tr><th class="py-3 px-4">Menu Sistem</th><th class="py-3 px-3 text-center w-24">Lihat</th><th class="py-3 px-3 text-center w-24">Tambah</th><th class="py-3 px-3 text-center w-24">Ubah</th><th class="py-3 px-3 text-center w-24">Hapus</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900"><!--[-->`);
					ssrRenderList$2(rolePermissionsList.value, (p) => {
						_push(`<tr class="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition"><td class="py-3 px-4"><div class="font-bold text-slate-900 dark:text-white flex items-center gap-2"><span class="text-base">${ssrInterpolate(p.menuIcon || "📄")}</span><span>${ssrInterpolate(p.menuTitle)}</span></div><div class="text-[11px] font-mono text-slate-400 ml-6">${ssrInterpolate(p.menuPath)}</div></td><td class="py-3 px-3 text-center"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(p.canView) ? ssrLooseContain(p.canView, null) : p.canView) ? " checked" : ""} class="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300 dark:border-slate-700 cursor-pointer"></td><td class="py-3 px-3 text-center"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(p.canCreate) ? ssrLooseContain(p.canCreate, null) : p.canCreate) ? " checked" : ""}${ssrIncludeBooleanAttr(!p.canView) ? " disabled" : ""} class="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"></td><td class="py-3 px-3 text-center"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(p.canUpdate) ? ssrLooseContain(p.canUpdate, null) : p.canUpdate) ? " checked" : ""}${ssrIncludeBooleanAttr(!p.canView) ? " disabled" : ""} class="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"></td><td class="py-3 px-3 text-center"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(p.canDelete) ? ssrLooseContain(p.canDelete, null) : p.canDelete) ? " checked" : ""}${ssrIncludeBooleanAttr(!p.canView) ? " disabled" : ""} class="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"></td></tr>`);
					});
					_push(`<!--]--></tbody></table></div>`);
				}
				_push(`<div class="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between mt-4"><span class="text-xs text-slate-400"> Total ${ssrInterpolate(rolePermissionsList.value.length)} menu sistem terdaftar </span><div class="flex items-center gap-3"><button type="button" class="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold cursor-pointer"> Batal </button><button type="button"${ssrIncludeBooleanAttr(savingRolePermissions.value) ? " disabled" : ""} class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-md transition disabled:opacity-50 flex items-center gap-2 cursor-pointer">`);
				if (savingRolePermissions.value) _push(`<span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>`);
				else _push(`<!---->`);
				_push(`<span>${ssrInterpolate(savingRolePermissions.value ? "Menyimpan..." : "💾 Simpan Hak Akses Menu")}</span></button></div></div></div></div>`);
			} else _push(`<!---->`);
			if (isForgotPasswordModalOpen.value) {
				_push(`<div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"><div class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8"><div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-5"><div class="flex items-center gap-2"><span class="text-2xl">🔐</span><h3 class="text-base font-bold text-slate-900 dark:text-white">${ssrInterpolate(forgotStep.value === "email" ? "Lupa Kata Sandi (OTP)" : "Verifikasi OTP & Reset")}</h3></div><button type="button" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 flex items-center justify-center cursor-pointer"> ✕ </button></div>`);
				if (forgotError.value) _push(`<div class="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2"><span>⚠️</span><span>${ssrInterpolate(forgotError.value)}</span></div>`);
				else _push(`<!---->`);
				if (forgotSuccess.value) _push(`<div class="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2"><span>✓</span><span>${ssrInterpolate(forgotSuccess.value)}</span></div>`);
				else _push(`<!---->`);
				if (forgotStep.value === "email") {
					_push(`<form class="space-y-4"><p class="text-xs text-slate-500 dark:text-slate-400"> Masukkan alamat email Anda. Kami akan mengirimkan kode 6 digit OTP ke email untuk verifikasi reset password. </p><div><label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"> Alamat Email Akun </label><input${ssrRenderAttr("value", forgotEmail.value)} type="email" required placeholder="admin@wisata.com" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm outline-none focus:ring-2 focus:ring-teal-500"></div><div class="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-xl text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed"><strong>🛡️ Keamanan Enterprise:</strong> Pengiriman OTP dibatasi maksimal 3 kali dalam satu hari. Jika meminta lebih dari 3 kali berturut-turut, sistem akan mendeteksi sebagai penyusup dan memblokir akun. </div>`);
					_push(ssrRenderComponent(_component_TurnstileWidget, {
						ref_key: "forgotTurnstileRef",
						ref: forgotTurnstileRef,
						modelValue: forgotTurnstileToken.value,
						"onUpdate:modelValue": ($event) => forgotTurnstileToken.value = $event,
						action: "forgot_password"
					}, null, _parent));
					_push(`<div class="pt-2 flex items-center justify-end gap-3"><button type="button" class="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold cursor-pointer"> Batal </button><button type="submit"${ssrIncludeBooleanAttr(sendOtpLoading.value) ? " disabled" : ""} class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center gap-2 cursor-pointer">`);
					if (sendOtpLoading.value) _push(`<span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>`);
					else _push(`<!---->`);
					_push(`<span>${ssrInterpolate(sendOtpLoading.value ? "Mengirim..." : "Kirim Kode OTP")}</span></button></div></form>`);
				} else {
					_push(`<form class="space-y-4"><p class="text-xs text-slate-500 dark:text-slate-400"> Kode OTP 6 digit telah dikirim ke <strong class="text-slate-900 dark:text-white">${ssrInterpolate(forgotEmail.value)}</strong>. Silakan cek inbox/spam email Anda. </p><div><label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"> Kode OTP (6 Digit Angka) </label><input${ssrRenderAttr("value", forgotOtp.value)} type="text" maxlength="6" required placeholder="123456" class="w-full px-4 py-2.5 text-center font-mono font-black text-lg tracking-widest rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 outline-none focus:ring-2 focus:ring-teal-500"></div><div><label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"> Kata Sandi (Password) Baru </label><input${ssrRenderAttr("value", forgotNewPassword.value)} type="password" minlength="6" required placeholder="Minimal 6 karakter" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm outline-none focus:ring-2 focus:ring-teal-500"></div>`);
					_push(ssrRenderComponent(_component_TurnstileWidget, {
						ref_key: "resetTurnstileRef",
						ref: resetTurnstileRef,
						modelValue: resetTurnstileToken.value,
						"onUpdate:modelValue": ($event) => resetTurnstileToken.value = $event,
						action: "reset_password"
					}, null, _parent));
					_push(`<div class="pt-2 flex items-center justify-between"><button type="button" class="text-xs text-teal-600 dark:text-teal-400 hover:underline font-semibold cursor-pointer"> ← Kirim Ulang OTP </button><button type="submit"${ssrIncludeBooleanAttr(resetPasswordLoading.value) ? " disabled" : ""} class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center gap-2 cursor-pointer">`);
					if (resetPasswordLoading.value) _push(`<span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>`);
					else _push(`<!---->`);
					_push(`<span>${ssrInterpolate(resetPasswordLoading.value ? "Menyimpan..." : "Perbarui Password")}</span></button></div></form>`);
				}
				_push(`</div></div>`);
			} else _push(`<!---->`);
			if (isLoginLogsModalOpen.value) {
				_push(`<div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"><div class="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-5"><div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800"><div><div class="flex items-center gap-2"><span class="text-2xl">📜</span><h3 class="text-lg font-bold text-slate-900 dark:text-white"> Audit Log Keamanan: Siapa Saja yang Login </h3></div><p class="text-xs text-slate-500 dark:text-slate-400 mt-1"> Catatan komprehensif riwayat akses, percobaan salah password, lockout akun, dan deteksi penyusup. </p></div><button type="button" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 flex items-center justify-center cursor-pointer"> ✕ </button></div><div class="flex flex-wrap items-center justify-between gap-3 text-xs"><div class="flex items-center gap-2"><input${ssrRenderAttr("value", loginLogsSearch.value)} type="text" placeholder="Cari email, IP, atau perangkat..." class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs w-60 outline-none focus:ring-2 focus:ring-teal-500"><button type="button" class="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"> 🔍 Cari </button></div><button type="button" class="text-teal-600 dark:text-teal-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"><span>🔄</span> Segarkan Log </button></div><div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 max-h-[50vh] overflow-y-auto"><table class="w-full text-left text-xs"><thead class="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 font-bold uppercase text-[10px] text-slate-500 sticky top-0 z-10 backdrop-blur-md"><tr><th class="py-3 px-3">Waktu</th><th class="py-3 px-3">Akun / Email</th><th class="py-3 px-3">Status</th><th class="py-3 px-3">IP Address</th><th class="py-3 px-3">Perangkat</th><th class="py-3 px-3">Keterangan</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">`);
				if (loginLogsLoading.value) _push(`<tr><td colspan="6" class="py-8 text-center text-slate-400">Memuat log aktivitas...</td></tr>`);
				else if (loginLogsList.value.length === 0) _push(`<tr><td colspan="6" class="py-8 text-center text-slate-400">Belum ada riwayat aktivitas login tercatat.</td></tr>`);
				else {
					_push(`<!--[-->`);
					ssrRenderList$2(loginLogsList.value, (log) => {
						_push(`<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] text-slate-500">${ssrInterpolate(new Date(log.createdAt).toLocaleString("id-ID"))}</td><td class="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white">${ssrInterpolate(log.email)}</td><td class="py-2.5 px-3 whitespace-nowrap"><span class="${ssrRenderClass(["px-2 py-0.5 rounded-full text-[10px] font-bold inline-block", log.status === "SUCCESS" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : log.status === "ACCOUNT_LOCKED" ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" : log.status === "INTRUDER_BLOCKED" ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 animate-pulse font-black" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"])}">${ssrInterpolate(log.status)}</span></td><td class="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-300">${ssrInterpolate(log.ipAddress || "-")}</td><td class="py-2.5 px-3 text-slate-600 dark:text-slate-300">${ssrInterpolate(log.deviceInfo || "Unknown")}</td><td class="py-2.5 px-3 text-slate-500 max-w-xs truncate"${ssrRenderAttr("title", log.message)}>${ssrInterpolate(log.message || "-")}</td></tr>`);
					});
					_push(`<!--]-->`);
				}
				_push(`</tbody></table></div><div class="pt-2 text-right"><button type="button" class="px-5 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold cursor-pointer"> Tutup </button></div></div></div>`);
			} else _push(`<!---->`);
			_push(`</main></div>`);
		};
	}
});
// app/pages/admin/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var admin_default = index_vue_vue_type_script_setup_true_lang_default;

export { admin_default as default };
//# sourceMappingURL=admin-CiogrnCS.mjs.map
