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
    if (!userInDB || !bcrypt.compareSync(password, userInDB.password)) {
      res.status(400).json({
        data: null,
        message: 'Incorrect username or password.',
      });
      return;
    }

    const userInfo = {
      user: {
        id: userInDB._doc._id,
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
      message: 'User successfully logged in',
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'An error occurred during login',
    });
  }
};
