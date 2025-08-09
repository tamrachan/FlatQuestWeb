import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [, token] = authHeader.split(" ");
  
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id || decoded.id;

    console.log("Decoded token:", decoded);
    console.log("User ID extracted:", req.userId);
    
    if (!req.userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }
    
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid/expired token" });
  }
}
