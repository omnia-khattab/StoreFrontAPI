import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import CATEGORY_API from './handler/category_api';
import dashboard_API from './handler/dashboaed_api';
import ORDER_API from './handler/order_api';
import PRODUCT_API from './handler/product_api';
import USER_API from './handler/user_api';

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res.send('hello');
});

USER_API(app);

CATEGORY_API(app);

PRODUCT_API(app);

ORDER_API(app);

dashboard_API(app);

app.listen(port, () => {
  console.log(`app start at http://localhost:${port}/`);
});

export default app;
