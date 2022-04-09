import AccountsModule from "@/modules/accounts/store/accounts-module";
import TransactionsModule from "@/modules/transactions/store/transactions-module";
import RegisterUserModule from "@/modules/auth/store/register-user-module";
import Vue from "vue";
import Vuex from "vuex";
import NotificationModule from "./modules/notification-module";
import AuthModule from "@/modules/auth/store/auth-module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    accounts: AccountsModule,
    notifications: NotificationModule,
    transactions: TransactionsModule,
    registerUser: RegisterUserModule,
    auth: AuthModule
  }
});
