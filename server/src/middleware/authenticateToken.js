import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({
      error: "Authentication Failed: Token Required",
    });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        error: "Authentication Failed: Token Invalid",
      });
    } else {
      req.user = user;
      return next();
    }
  });
};

export default isAuthenticated;
