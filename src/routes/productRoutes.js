import express from 'express';

import {
  getProducts,
  postProduct,
  putProduct,
  deleteProduct,
} from '../controllers/productController.js';

import { validateBody } from '../middlewares/validatebody.js';

import {
  post_productSchema,
  put_productSchema,
} from '../helpers/validationSchemas/productSchemas.js';

import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

router.get('/', getProducts);

router.post(
  '/',
  isAuthenticated,
  isAdmin,
  (req, res, next) => validateBody(req, res, next, post_productSchema),
  postProduct,
);

router.put(
  '/:id',
  isAuthenticated,
  isAdmin,
  (req, res, next) => validateBody(req, res, next, put_productSchema),
  putProduct,
);

router.delete('/:id', isAuthenticated, isAdmin, deleteProduct);

export default router;
