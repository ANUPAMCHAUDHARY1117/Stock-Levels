export enum TransactionType {
  order = 'order',
  refund = 'refund',
}

export interface IStock {
  sku: string;
  stock: number;
}

export interface ITransaction {
  sku: string;
  type: TransactionType;
  qty: number;
}

export interface IStockQuantity {
  sku: string;
  qty: number;
}
