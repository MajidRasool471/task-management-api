const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const authHeader =
        req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided"});
    }
     const token = authHeader.split(" ")[1];

     const decoded =
     jwt.verify(token, "secretkey");

      req.user = decoded;

        console.log("USER FROM TOKEN:", decoded);
      next();
    } catch (error) {
       return res.status(401).json({ message: "Invalid token"});
    }
};
 module.exports = verifyToken;