import bcrypt from 'bcryptjs';
import UserModel from '../models/userSchema.js';
import jwt from 'jsonwebtoken';

export const getUsers = async (_, res) => {
  try {
    const data = await UserModel.find({});

    const filteredData = data
      .filter((user) => user._doc.isActive === true)
      .map((user) => ({
        id: user._doc._id,
        _id: undefined,
        firstname: user._doc.firstname,
        lastname: user._doc.lastname,
        username: user._doc.username,
        email: user._doc.email,
        isAdmin: user._doc.isAdmin,
      }));

    res.json({ data: filteredData, message: 'Users found' });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'An error occurred while connecting to the database',
    });
  }
};

export const postUser = async (req, res) => {
  const { body } = req;

  const hashedPassword = bcrypt.hashSync(body.password, 10);

  const newUser = UserModel({
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email,
    password: hashedPassword,
    isActive: true,
    isAdmin: false,
  });

  try {
    const savedUser = await newUser.save();
    const token = jwt.sign(
      {
        firstname: body.firstname,
        lastname: body.lastname,
        id: savedUser._id,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' },
    );

    res.status(201).json({
      token,
      message: 'User created and logged in successfully.',
    });
  } catch (e) {
    if (e.message.includes('duplicate')) {
      res.status(400).json({
        data: null,
        message: 'The email is already in use.',
      });
    } else {
      res.status(500).json({
        data: null,
        message: 'An error occurred saving the user.',
      });
    }
  }
};

export const putUser = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  if (body.password) {
    const hashedPassword = bcrypt.hashSync(body.password, 10);
    body.password = hashedPassword;
  }

  try {
    const action = await UserModel.updateOne({ _id: id }, body);

    if (action.matchedCount === 0) {
      res.status(400).json({
        data: null,
        message: 'A user with that id was not found',
      });
      return;
    }

    res.json({
      data: null,
      message: 'The user has been successfully updated',
    });
  } catch (e) {
    if (e.message.includes('duplicate')) {
      res.status(400).json({
        data: null,
        message: 'Username is already in use',
      });
      return;
    }

    res.status(500).json({
      data: null,
      message: 'An error occurred updating the user',
    });
  }
};

export const deleteUser = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const action = await UserModel.updateOne(
      { _id: id, isActive: true },
      { isActive: false },
    );

    if (action.matchedCount === 0) {
      res.status(400).json({
        data: null,
        message: 'A user with that id was not found',
      });
      return;
    }

    res.json({
      data: null,
      message: 'The user has been successfully deleted',
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'An error occurred deleting the user',
    });
  }
};
