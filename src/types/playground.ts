export enum TransDirection {
  BUY = -1,
  SELL = 1,
}

export interface Transaction {
  id?: number;
  date: string;
  price: number;
  amount: number;
  direction: TransDirection;
}
