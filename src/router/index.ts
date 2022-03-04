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
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes, 
  linkExactActiveClass: "active"
});

export default router;
