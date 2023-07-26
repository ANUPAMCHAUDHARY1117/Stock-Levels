import { getStockQuantity } from './index';

(async () => {
  const args = process.argv.slice(2);
  if (args[0]) {
    console.log(await getStockQuantity(args[0]));
  } else {
    console.log('Run npm run execute ${sku} - npm run execute CLQ274846/07/46 ');
  }
})();
