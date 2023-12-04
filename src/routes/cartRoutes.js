import express from 'express';

import {
  getCart,
  postCart,
  deleteCart,
} from '../controllers/cartController.js';

import { validateBody } from '../middlewares/validatebody.js';

import {
  post_cartSchema,
} from '../helpers/validationSchemas/cartSchemas.js';

import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.get('/', getCart);

router.post(
  '/',
  isAuthenticated,
  (req, res, next) => validateBody(req, res, next, post_cartSchema),
  postCart,
);

router.delete('/:id', isAuthenticated, deleteCart);

export default router;
