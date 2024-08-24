const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
       const token = req.header('Authorization'.replace('Bearer', ''));
       if (!token) {
              return res.status(401).json({ message: 'No token, authorization Denied' });
       }

       try {
              const decoded = jwt.verify(token, process.env.JWT_SECRET);
              req.user = decoded;
              next();
       } catch (error) {
              console.error('JWT verification failed:', error);
              res.status(401).json({ message: 'Token is not valid' });
       }
};
module.exports = authMiddleware;