import jwt from "jsonwebtoken";
import User from "../Model/User.js";

export const varifyToken = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      let token = await req.headers.authorization.split(" ")[1];

      if (!token) {
        res.status(401).json({ message: "Access denied!" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
