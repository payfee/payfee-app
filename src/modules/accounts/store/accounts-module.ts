import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";
import { v4 as uuidv4 } from "uuid";
import { Account } from "../domain/account";
import apiClient, { StandardError } from "@/services/api-client";
import { Either } from "@/services/either";
import { CreateAccountRequest } from "./types";
import { AxiosError } from "axios";

@Module({ namespaced: true, name: "accounts" })
class AccountsModule extends VuexModule {
  public lastCreatedAccount?: Account;
  public accounts: Account[] = [];
  public isFetching = false;
  public isError = false;

  @Mutation
  private setAccounts(accounts: Account[]) {
    this.accounts = accounts;
  }

  @Mutation
  private addAccount(account: Account) {
    this.lastCreatedAccount = account;
    this.accounts.unshift(account);
  }

  @Mutation
  private setIsFetching(isLoading: boolean) {
    this.isFetching = isLoading;
  }

  @Mutation
  private setError(isError: boolean) {
    this.isError = isError;
  }

  @Action({ rawError: true })
  public async createNewAccount(
    request: CreateAccountRequest
  ): Promise<Either<Account, StandardError>> {
    const account: Account = {
      banking_institution_id: "12345",
      name: request.name,
      balance: request.balance
    };

    try {
      // TODO: add idempotency key
      const result = await apiClient.post<Account>("/v1/accounts", account);

      account.account_id = result.data.account_id;

      this.context.commit("addAccount", account);

      return { left: account };
    } catch (error) {
      return {
        right: {
          message:
            (error as AxiosError).response?.data?.message || "Unknown error"
        }
      };
    }
  }

  @Action({ rawError: true })
  public async fetchAccounts() {
    try {
      this.context.commit("setError", false);
      this.context.commit("setIsFetching", true);
      const result = await apiClient.get<Account[]>("/v1/accounts");

      this.context.commit("setAccounts", result.data);
    } catch (error) {
      this.context.commit("setError", true);
    } finally {
      this.context.commit("setIsFetching", false);
    }
  }
}

export default AccountsModule;
