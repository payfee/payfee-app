import { VuexModule, Module } from "vuex-module-decorators";
import { Account } from "../domain/account";

@Module({ namespaced: true, name: "accounts" })
class AccountsModule extends VuexModule {
	public accounts: Account[] = Array(100).fill({
		account_id: "12345",
		user_id: "12345",
		banking_institution_id: "12345",
		name: "Nubank",
		balance: 1233.12,
	});
}

export default AccountsModule;
