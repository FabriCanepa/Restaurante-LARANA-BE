import express from 'express';

import {
  deleteUser,
  getUsers,
  postUser,
  putUser,
} from '../controllers/userController.js';
import { validateBody } from '../middlewares/validatebody.js';
import {
  post_userSchema,
  put_userSchema,
} from '../helpers/validationSchemas/userSchemas.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.get('/', getUsers);

router.post(
  '/',
  (req, res, next) => validateBody(req, res, next, post_userSchema),
  postUser,
);

router.put(
  '/:id',
  isAuthenticated,
  (req, res, next) => validateBody(req, res, next, put_userSchema),
  putUser,
);

router.delete('/:id', isAuthenticated, deleteUser);

export default router;
