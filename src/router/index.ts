import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "@/modules/auth/views/Login.vue";
import Register from "@/modules/auth/views/Register.vue";

import AuthenticatedLayout from "@/layout/AuthenticatedLayout.vue";
import i18n from "@/plugins/i18n";
import TransactionsRoutes from "@/modules/transactions/routes";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/",
    component: AuthenticatedLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: "/accounts",
        name: "Contas",
        component: () =>
          import(
            /* webpackChunkName: "accounts" */ "@/modules/accounts/views/Accounts.vue"
          ),
        meta: {
          authenticate: true,
          title: i18n.t("accounts.accounts_title"),
          breadcrumb: [
            { icon: "house", to: { name: "home" } },
            { name: i18n.t("accounts.accounts_title") }
          ]
        }
      },
      ...TransactionsRoutes
    ]
  }
];

const router = new VueRouter({
  routes,
  linkExactActiveClass: "active"
});
router.beforeEach((to, from, next) => {
  console.log(to.meta);
  return next();
});

export default router;
