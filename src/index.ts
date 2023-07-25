import fs from 'fs';
import path from 'path';
import { IStock, ITransaction, TransactionType, IStockQuantity } from './index.interface';

const readFilePromise = (fileName: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, 'data', fileName), { encoding: 'utf-8' }, function (err, data) {
      if (err) {
        reject('Unable to parse stock file');
      }
      resolve(JSON.parse(data));
    });
  });
};

const getStocks = async (sku: string): Promise<IStock | undefined> => {
  const stocks = (await readFilePromise('stock.json')) as IStock[];

  return stocks.find((stock) => stock.sku === sku);
};

const getTransactionsForStock = async (sku: string): Promise<ITransaction[]> => {
  const transactions = (await readFilePromise('transactions.json')) as ITransaction[];

  return transactions.filter((transaction) => transaction.sku === sku);
};

const getStockQuantity = async (sku: string): Promise<IStockQuantity> => {
  const stock = await getStocks(sku);
  const transactions = await getTransactionsForStock(sku);

  if (stock === undefined) {
    throw new Error('No Stock Found');
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
};

(async () => {
  const args = process.argv.slice(2);
  if (args[0]) {
    console.log(await getStockQuantity(args[0]));
  } else {
    console.log('Run npm run execute ${sku} - npm run execute CLQ274846/07/46 ');
  }
})();
