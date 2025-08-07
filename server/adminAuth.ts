import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "a123";

interface AuthRequest extends Request {
  user?: { id: string; username: string };
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (user: { id: string; username: string }): string => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "24h" });
};

export const verifyToken = (token: string): { id: string; username: string } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; username: string };
  } catch {
    return null;
  }
};

export const authenticateAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token gerekli" });
  }

  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ message: "Geçersiz token" });
  }

  req.user = user;
  next();
};

export const validateAdmin = async (username: string, password: string): Promise<boolean> => {
  if (username !== ADMIN_USERNAME) {
    return false;
  }
  
  // For simplicity, using env variable. In production, this should be hashed in database
  return password === ADMIN_PASSWORD;
};