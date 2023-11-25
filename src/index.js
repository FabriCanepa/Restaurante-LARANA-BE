import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// RUTAS //




app.listen(() => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
