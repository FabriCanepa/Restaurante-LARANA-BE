import express from 'express';

import {} from '../controllers/productController.js';
import { post_orderSchema } from '../helpers/validationSchemas/orderSchemas.js';
import { validateBody } from '../middlewares/validatebody.js';
import { getOrders, postOrder } from '../controllers/orderController.js';

const router = express.Router();

router.get('/', getOrders);

router.post(
  '/',
  (req, res, next) => validateBody(req, res, next, post_orderSchema),
  postOrder,
);

export default router;