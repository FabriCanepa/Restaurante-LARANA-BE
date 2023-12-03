export const isAdmin = (req, res, next) => {
  const { user } = req;

  if (!user.isAdmin) {
    res.status(403).json({
      data: null,
      message: 'No tienes acceso a este recurso',
    });
    return;
  }

  next();
};
