import AccountsModule from "@/modules/accounts/store/accounts-module";
import store from "@/store";
import { getModule } from "vuex-module-decorators";

export const AccountsStore = getModule(AccountsModule, store)
