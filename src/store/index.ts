import AccountsModule from "@/modules/accounts/store/accounts-module";
import Vue from "vue";
import Vuex from "vuex";
import NotificationModule from "./modules/notification-module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    accounts: AccountsModule,
    notifications: NotificationModule
  }
});
