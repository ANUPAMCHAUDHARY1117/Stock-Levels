# Stock Levels

The app provided current levels of stocks quantity which is equal to sum of the initial quantity and the stocks refunded subtracting the total bought stocks from the sum.

Stock Levels = Stock[Quantity] + Stock[Total Refunded] - Stock[TotalBought]

## Getting started

To start, the system must have Node 16 LTS version

Step 1 : To install dependencies, run command in the terminal

```
npm install
```

Step 2: To build project in CJM and ESM Library

```
npm run build
```

Step 3 : To get Stock Quantity, run command in the terminal and hit http://localhost:8000/stockquantity?sku=PGL751486/42/83
```
npm run start
```

Step 4 : To get test coverage

```
npm run test:cov
```

Step 4 : To test in the localhost

```
http://localhost:8000/stockquantity?sku=PGL751486/42/83
```
