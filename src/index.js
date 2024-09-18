import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import productRouter from './routes/productRoutes.js';
import ordersRouter from './routes/ordersRoutes.js';

import './database/database.js';

// 1. inicio app
const app = express();

// 2. Configuraciones generales
const PORT = process.env.PORT || 5000;

// 3. Middlewares
app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

// 4. Rutas

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', ordersRouter);

// 5. Iniciar el loop del servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});
