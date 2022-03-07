import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import money from "v-money";

import "@/assets/css/nucleo-icons.css";
import "@/assets/css/nucleo-svg.css";
import "@/assets/scss/soft-ui-dashboard.scss";

import i18n from "./plugins/i18n";
import "./plugins/validations";

Vue.config.productionTip = false;
Vue.use(money, { precision: 2 });

new Vue({
	i18n,
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
