import AccountsModule from "@/modules/accounts/store/accounts-module";
import TransactionsModule from "@/modules/transactions/store/transactions-module";
import RegisterUserModule from "@/modules/auth/store/register-user-module";
import AuthModule from "@/modules/auth/store/auth-module";
import store from "@/store";
import { getModule } from "vuex-module-decorators";

export const AccountsStore = getModule(AccountsModule, store);
export const TransactionsStore = getModule(TransactionsModule, store);
export const AuthStore = getModule(AuthModule, store);
export const RegisterUserStore = getModule(RegisterUserModule, store);
