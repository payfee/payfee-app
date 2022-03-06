import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import AuthenticatedLayout from "@/layout/AuthenticatedLayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: AuthenticatedLayout,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home
      },
      {
        path: "/accounts",
        name: "Contas",
        component: () =>
          import(
            /* webpackChunkName: "accounts" */ "@/modules/accounts/views/Accounts.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  linkExactActiveClass: "active"
});

export default router;
