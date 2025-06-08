import jwt from "jsonwebtoken";

export default async function generateToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
}
