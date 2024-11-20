import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
  let token;
  const authHeader =
    req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403);
        throw new Error('Invalid token');
      }
      req.user = user;
      next();
    });
  }
  if (!token) {
    res.status(401);
    throw new Error('You are not authorized');
  }
};

export default validateToken;
