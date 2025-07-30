import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const JWT_SECRET = process.env.JWT_SECRET;

export default function createToken(user: object) {
  return jwt.sign({ user }, JWT_SECRET, { expiresIn: "1d" });
}
