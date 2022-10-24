export type BankMetaData = {
  title: string;
  longDesc: string;
  desc: string;
  featured: boolean;
  categories: Array<string>;
};

export type BankAccount = {
  transactionDate: string;
  description: string;
  category: string;
  debit: number;
  credit: number | null;
  id: number;
};

export type BankResponse = {
  metaData: BankMetaData[];
  accounts: BankAccount[];
};

export interface BankState {
  accounts: BankAccount[];
  results: BankAccount[];
  searchedResults: BankAccount[];
  searched: string;
  rowsPerPage: number;
  currentPage: number;
  order: string;
}
