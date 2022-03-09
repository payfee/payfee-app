import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import AuthenticatedLayout from "@/layout/AuthenticatedLayout.vue";

import i18n from "@/plugins/i18n";

Vue.use(VueRouter);

const routes = [
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
          title: i18n.t("accounts.accounts_title"),
          breadcrumb: [
            { icon: "house", to: { name: "home" } },
            { name: i18n.t("accounts.accounts_title") }
          ]
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  linkExactActiveClass: "active"
});

export default router;
