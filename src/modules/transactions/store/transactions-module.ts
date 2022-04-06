import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";
import apiClient, { StandardError } from "@/services/api-client";
import { Either } from "@/services/either";
import { AxiosError } from "axios";
import {
  CreateTransactionModel,
  CreateTransactionRequest,
  CreateTransactionResponse,
  PaginatedTransactionsResponse
} from "./types";
import { Transaction } from "../domain/transaction";

@Module({ namespaced: true, name: "transactions" })
export default class TransactionsModule extends VuexModule {
  public transactions: Transaction[] = [];
  public isFetching = false;
  public isError = false;

  @Mutation
  public setTransactions(transactions: Transaction[]) {
    this.transactions = transactions;
  }

  @Mutation
  public addTransaction(transaction: Transaction) {
    this.transactions.unshift(transaction);
  }

  @Mutation
  public setIsFetching(isLoading: boolean) {
    this.isFetching = isLoading;
  }

  @Mutation
  public setError(isError: boolean) {
    this.isError = isError;
  }

  @Action({ rawError: true })
  public async createnewTransaction(
    model: CreateTransactionModel
  ): Promise<Either<Transaction, StandardError>> {
    const request: CreateTransactionRequest = {
      account_id: model.accountId,
      operations: [model.transaction]
    };

    try {
      // TODO: add idempotency key
      const result = await apiClient.post<CreateTransactionResponse>(
        "/v1/transactions",
        request
      );

      model.transaction.id = result.data.operations[0].id;
      model.transaction.date = new Date().toISOString();

      this.context.commit("addTransaction", model.transaction);

      return { left: model.transaction };
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
  public async fetchTransactions() {
    try {
      this.context.commit("setError", false);
      this.context.commit("setIsFetching", true);
      const result = await apiClient.get<PaginatedTransactionsResponse>(
        "/v1/transactions"
      );

      this.context.commit("setTransactions", result.data.items);
    } catch (error) {
      this.context.commit("setError", true);
    } finally {
      this.context.commit("setIsFetching", false);
    }
  }
}
