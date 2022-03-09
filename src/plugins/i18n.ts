import VueI18n from "vue-i18n";
import Vue from "vue";

Vue.use(VueI18n);

export default new VueI18n({
  locale: "pt_BR",
  messages: {
    pt_BR: {
      sidebar_menu: {
        dashboard: "Dashboard",
        accounts: "Contas",
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
        total_balance: "Saldo total",
        create_account: "Criar conta",
        account_created_success: "Conta criada com sucesso"
      }
    }
  }
});
