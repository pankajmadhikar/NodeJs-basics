import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Token is required",
    });
  }
  const accessToken = token.split(" ")[1];
  if (!accessToken) {
    return res.status(404).json({
      success: false,
      message: "Access token is required",
    });
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET_TOKEN);
  } catch (error) {
    console.log("error", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized token",
    });
  }
  req.user = decodedToken;
  next();
};

export const requireRole = (roles) => {
  return (req, res, next) => {
    const { userId, role } = req.user;
    const isValidRole = roles?.find((r) => r === role);
    console.log("isValidRole", isValidRole);
    if (!isValidRole) {
      return res.status(404).json({
        success: false,
        message: "You are not authorised to access this role",
      });
    }
    next();
  };
};
