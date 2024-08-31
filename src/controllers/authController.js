import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UserModel from '../models/userSchema.js';

const { JWT_SECRET_KEY } = process.env;

export const postLogin = async (req, res) => {
  const {
    body: { email, password },
  } = req;

  try {
    const userInDB = await UserModel.findOne({ email, isActive: true });
    
    if (!userInDB) {
      
      return res.status(400).json({
        data: null,
        message: 'Usuario no encontrado.',
      });
    }

    if (!bcrypt.compareSync(password, userInDB.password)) {
      
      return res.status(400).json({
        data: null,
        message: 'Contraseña incorrecta.',
      });
    }

    const userInfo = {
      user: {
        id: userInDB._doc.id,
        firstname: userInDB._doc.firstname,
        lastname: userInDB._doc.lastname,
        username: userInDB._doc.username,
        email: userInDB._doc.email,
        isAdmin: userInDB._doc.isAdmin,
      },
    };

    const token = jwt.sign(userInfo, JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({
      data: token,
      message: 'Usuario logueado exitosamente',
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error en el inicio de sesión',
    });
  }
};
