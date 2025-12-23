const { verify } = require("jsonwebtoken");

const authorization = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }
    token = token.split(" ")[1];

    verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: err?.message || "Invalid token" });
      }
      if (decoded) {
        req.decoded = decoded;
        next();
      }
    });

  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ message: error?.message ?? 'something went wrong' });
  }
};

module.exports = authorization;
