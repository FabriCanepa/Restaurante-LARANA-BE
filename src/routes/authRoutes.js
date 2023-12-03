import express from 'express';

import { postLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', postLogin);

export default router;
