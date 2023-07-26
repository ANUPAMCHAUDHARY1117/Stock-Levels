import * as stocks from './get-stock-and-transactions';
import * as index from './index';
import { IStock, ITransaction, TransactionType } from './index.interface';

const mockStockData: IStock[] = [
  {
    sku: 'LTV719449/39/39',
    stock: 8525,
  },
];

const mockTransactionData: ITransaction[] = [
  {
    sku: 'LTV719449/39/39',
    type: TransactionType.refund,
    qty: 10,
  },
  {
    sku: 'LTV719449/39/39',
    type: TransactionType.order,
    qty: 7,
  },
  {
    sku: 'LTV719449/39/39',
    type: TransactionType.order,
    qty: 5,
  },
  {
    sku: 'LTV719449/39/39',
    type: TransactionType.order,
    qty: 1,
  },
];

const stockLevels = 8525 - 7 - 5 - 1 + 10; //Stock Qty - Bought + Refunded

describe('Get Stock Levels For SKU Test Suite', () => {
  it('Get Stock Quantity', async () => {
    jest.spyOn(stocks, 'readFilePromise').mockResolvedValue(mockStockData);

    expect(await stocks.getStocks(mockStockData[0].sku)).toEqual(mockStockData[0]);
  });

  it('Get Transactions For Stock from Transaction JSON', async () => {
    jest.spyOn(stocks, 'readFilePromise').mockResolvedValue(mockTransactionData);

    expect(await stocks.getTransactionsForStock(mockStockData[0].sku)).toEqual(mockTransactionData);
  });

  it('If file is not found', async () => {
    jest.spyOn(stocks, 'readFilePromise').mockRejectedValue('Unable to parse stock file');

    try {
      await stocks.getTransactionsForStock(mockStockData[0].sku);
    } catch (e: any) {
      expect(e).toEqual('Unable to parse stock file');
    }
  });
});

describe('Get Stock Quantity', () => {
  it('Get Particulat Stock from Stock JSON', async () => {
    jest.spyOn(stocks, 'getStocks').mockResolvedValue(mockStockData[0]);
    jest.spyOn(stocks, 'getTransactionsForStock').mockResolvedValue(mockTransactionData);

    expect(await index.getStockQuantity(mockStockData[0].sku)).toEqual({
      sku: mockStockData[0].sku,
      qty: stockLevels,
    });
  });

  it('Stock not found erro', async () => {
    jest.spyOn(stocks, 'getStocks').mockResolvedValue(undefined);

    try {
      await index.getStockQuantity(mockStockData[0].sku);
    } catch (e: any) {
      expect(e.message).toEqual(index.stockNotFoundErrorMessage(mockStockData[0].sku));
    }
  });
});
