import express from 'express';

import {
  deleteUser,
  getUsers,
  postUser,
  putUser,
} from '../controllers/userController.js';
import { validateBody } from '../middlewares/validatebody.js';
import { post_userSchema } from '../helpers/validationSchemas/userSchemas.js';

const router = express.Router();

router.get('/', getUsers);

router.post(
  '/',
  (req, res, next) => validateBody(req, res, next, post_userSchema),
  postUser,
);

router.put('/:id', putUser);

router.delete('/:id', deleteUser);

export default router;
