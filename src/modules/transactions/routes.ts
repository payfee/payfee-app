import i18n from "@/plugins/i18n";
import { RouteConfig } from "vue-router/types/router";

export default [
  {
    path: "/transactions",
    name: "Transações",
    component: () =>
      import(
        /* webpackChunkName: "transactions" */ "@/modules/transactions/views/Transactions.vue"
      ),
    meta: {
      authenticate: true,
      title: "Transações",
      breadcrumb: [
        { icon: "house", to: { name: "home" } },
        { name: "Transações" }
      ]
    }
  }
] as RouteConfig[];
