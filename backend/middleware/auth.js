import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized please log in " });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = token_decode;
    console.log(req.user)
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(406).json({success: false, message: "Token expired" });
    }
    return res.status(401).json({
      message: "Invalid token, please ensure you are logged in ",
      error: error.message,
    });
  }
};

export default authMiddleware;