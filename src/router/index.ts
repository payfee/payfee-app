import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/modules/auth/views/Login.vue";
import Register from "@/modules/auth/views/Register.vue";

import AuthenticatedLayout from "@/layout/AuthenticatedLayout.vue";
import AnonymousLayout from "@/layout/AnonymousLayout.vue";
import i18n from "@/plugins/i18n";
import TransactionsRoutes from "@/modules/transactions/routes";
import { AuthStore } from "@/store/modules";

import Accounts from "@/modules/accounts/views/Accounts.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/auth",
		component: AnonymousLayout,
		children: [
			{
				alias: "/",
				path: "/auth/login",
				component: Login,
				meta: {
					unsplashId: "1626266061368-46a8f578ddd6",
				},
			},
			{
				path: "/auth/register",
				component: Register,
				meta: {
					unsplashId: "1579621970795-87facc2f976d",
				},
			},
		],
	},
	{
		path: "/",
		component: AuthenticatedLayout,
		children: [
			{
				alias: "/",
				path: "/accounts",
				name: "Contas",
				component: Accounts,
				meta: {
					authenticate: true,
					title: i18n.t("accounts.accounts_title"),
					breadcrumb: [
						{ icon: "house", to: { name: "home" } },
						{ name: i18n.t("accounts.accounts_title") },
					],
				},
			},
			...TransactionsRoutes,
		],
	},
];

type RouterMeta = {
	authenticate: boolean;
};

const router = new VueRouter({
	routes,
	linkExactActiveClass: "active",
});
router.beforeEach((to, from, next) => {
	const meta = to.meta as RouterMeta;

	if (meta.authenticate && !AuthStore.isAuthenticated) {
		return next("/auth/login");
	}

	return next();
});

export default router;
