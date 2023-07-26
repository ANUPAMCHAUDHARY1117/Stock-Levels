import express, { Request, Response } from 'express';
import { getStockQuantity } from './index';
import { query, validationResult } from 'express-validator';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 8000;

app.get('/stockquantity', query('sku').notEmpty().isString().trim(), async (req: Request, res: Response) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const { sku } = req.query;
      const data = await getStockQuantity(decodeURIComponent(sku as unknown as string));
      return res.send(data);
    }
    return res.send({ errors: result.array() });
  } catch (err: any) {
    res.json(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
