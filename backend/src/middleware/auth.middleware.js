import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userID) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userID).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user; // attach user
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    res.status(401).json({ message: "Unauthorized" });
  }
};
  