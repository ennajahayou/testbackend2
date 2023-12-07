const jwt = require("jsonwebtoken");

const  verifyToken = (req, res, next) => {
    
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, 'RANDOM_SECRET_TOKEN_THANKSANDTIP');
            const userId = decodedToken.userId;
            
            req.auth = {
                userId: userId
            };
            next();

        } catch(error) {
            res.status(401).json({ error });
        }
     };
  

  module.exports = verifyToken;
