import { TransactionType, IStockQuantity } from './index.interface';
import * as stocks from './get-stock-and-transactions';

export const stockNotFoundErrorMessage = (sku: string) => {
  return `No Stock with sku ${sku} found`;
};

export const getStockQuantity = async (sku: string): Promise<IStockQuantity> => {
  try {
    const stock = await stocks.getStocks(sku);
    const transactions = await stocks.getTransactionsForStock(sku);

    if (stock === undefined) {
      throw new Error(stockNotFoundErrorMessage(sku));
    }

    let stocksBought = 0;
    let stocksRefunded = 0;

    for (const transaction of transactions) {
      if (transaction.sku === sku) {
        if (transaction.type === TransactionType.order) {
          stocksBought += transaction.qty;
        }
        if (transaction.type === TransactionType.refund) {
          stocksRefunded += transaction.qty;
        }
      }
    }

    // I was unsure what was stock level formula so I did stock intial quantity - stocks bought + stocks refunded
    return { sku: sku, qty: stock.stock - stocksBought + stocksRefunded };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
