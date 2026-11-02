var jwt = require('jsonwebtoken');
const verifyUser = (req, res, next) => {
 const authtoken = req.get("Authorization") || "";
 const [scheme, token] = authtoken.split(" ");
  if (!token) {
    res.json({ message: "Need Token" });
    return;
  }
  try {
    const decoded = jwt.verify(token, "aaaa");
    req.user = decoded;
    return next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid token" });
  }


};
module.exports = verifyUser;
