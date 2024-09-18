export const isAdmin = (req, res, next) => {
  const {
    user,
  } = req;
  if (!user.isAdmin) {
    res.status(403).json({
      data: null,
      message: 'You do not have access to this resource',
    });
    return;
  }
  next();
};
