import fs from 'fs';
import path from 'path';
import { IStock, ITransaction } from './index.interface';

export const readFilePromise = (fileName: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, 'data', fileName), { encoding: 'utf-8' }, function (err, data) {
      if (err) {
        reject('Unable to parse stock file');
      }
      resolve(JSON.parse(data));
    });
  });
};

export const getStocks = async (sku: string): Promise<IStock | undefined> => {
  const stocks = (await readFilePromise('stock.json')) as IStock[];

  return stocks.find((stock) => stock.sku === sku);
};

export const getTransactionsForStock = async (sku: string): Promise<ITransaction[]> => {
  const transactions = (await readFilePromise('transactions.json')) as ITransaction[];

  return transactions.filter((transaction) => transaction.sku === sku);
};
