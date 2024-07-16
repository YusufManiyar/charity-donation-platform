const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  const user = await User.findByPk(req.user.id);
  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};

module.exports = adminMiddleware;
