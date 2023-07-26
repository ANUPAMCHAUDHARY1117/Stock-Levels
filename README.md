# Stock Levels

The app provided current levels of stocks quantity which is equal to sum of the initial quantity and the stocks refunded subtracting the total bought stocks from the sum.

Stock Levels = Stock[Quantity] + Stock[Total Refunded] - Stock[TotalBought]

## Getting started

To start, the system must have Node 16 LTS version

Step 1 : To install dependencies, run command in the terminal

```
npm install
```

Step 3: To build project in CJM and ESM Library

```
npm run build
```

Step 3 : To get Stock Quantity, run command in the terminal ${sku} needs to be replaced with stock sku. For eg - npm run execute CLQ274846/07/46

```
npm run execute ${sku}
```

Step 4 : To get test coverage

```
npm run test:cov
```
