import jwt from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env;

export const isAuthenticated = (req, res, next) => {
  const { headers } = req;

  const authHeader = headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      data: null,
      message: 'Authentication required. Please log in.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY);

    req.user = payload.user;
    next();
  } catch (e) {
    res.status(401).json({
      data: null,
      message: 'Invalid or expired token',
    });
  }
};
