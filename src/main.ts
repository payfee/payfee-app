import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueI18n from "vue-i18n";
import money from "v-money";

import { extend } from "vee-validate";
import {
  required,
  min_value as minValue,
  min,
  max_value as maxValue,
  max
} from "vee-validate/dist/rules";

import "@/assets/css/nucleo-icons.css";
import "@/assets/css/nucleo-svg.css";
import "@/assets/scss/soft-ui-dashboard.scss";

Vue.config.productionTip = false;

Vue.use(VueI18n);
Vue.use(money, { precision: 2 });

const i18n = new VueI18n({
  locale: "pt_BR",
  messages: {
    pt_BR: {
      drawerMenu: {
        accounts: "Contas"
      },
      common: {
        cancel: "Cancelar",
        validations: {
          required: "{_field_} é obrigatório",
          min: "{_field_} deve conter pelo menos {length} caracteres",
          min_value: "{_field_} precisa ser {min} ou maior",
          max: "{_field_} não deve ter mais que {length} caracteres",
          max_value: "{_field_} precisa ser {max} ou menor"
        }
      },
      accounts: {
        create_account_title: "Nova conta",
        create_account_subtitle:
          "Primeiro passo para organizar sua vida financeira!",
        account_name: "Nome da conta",
        account_name_example: "ex: Conta de investimentos",
        initial_balance: "Saldo inicial",
        create_account: "Criar conta"
      }
    }
  }
});

extend("required", {
  ...required,
  message: (_, values) =>
    i18n.t("common.validations.required", values).toString()
});
extend("min_value", {
  ...minValue,
  message: (_, values) =>
    i18n.t("common.validations.min_value", values).toString()
});
extend("min", {
  ...min,
  message: (_, values) => i18n.t("common.validations.min", values).toString()
});
extend("max", {
  ...max,
  message: (_, values) => i18n.t("common.validations.max", values).toString()
});
extend("max_value", {
  ...maxValue,
  message: (_, values) =>
    i18n.t("common.validations.max_value", values).toString()
});

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
