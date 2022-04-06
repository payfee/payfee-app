import { Transaction } from "../domain/transaction";

export type CreateTransactionModel = {
  accountId: string;
  transaction: Transaction;
};

export type CreateTransactionRequest = {
  account_id: string;
  operations: Transaction[];
};

export type CreateTransactionResponse = {
  operations: Transaction[];
};

export type PaginatedTransactionsResponse = {
  items: Transaction[];
};
