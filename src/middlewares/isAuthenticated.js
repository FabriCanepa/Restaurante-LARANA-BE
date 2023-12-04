import jwt from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env;

export const isAuthenticated = (req, res, next) => {
  const { headers } = req;

  const authHeader = headers.authorization; // "Bearer XXXXXX" || undefined

  if (!authHeader) {
    res.status(401).json({
      data: null,
      message: 'El header "Authorization" no está presente en la petición',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY);

    req.user = payload;
    console.log('req.user:', req.user);
    next();
  } catch (e) {
    res.status(401).json({
      data: null,
      message: 'Token inválido o expirado',
    });
  }
};
