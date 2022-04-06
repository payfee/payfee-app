export type Transaction = {
  id?: string;
  type: string;
  description: string;
  account_id?: string;
  amount: number;
  date?: string;
};
