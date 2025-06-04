import { Router } from "express";
import bcrypt from "bcrypt";
import getUsers from "./getUsers.js";
import writeAndUpdateUser from "./writeAndUpdateUser.js";

// Initialize Express application
const router = Router();
const BCRYPT_SALT_ROUNDS = 10;

router.get("/validateUser", async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }
  try {
    const users = await getUsers({ username: username });
    return users.length > 0
      ? res
          .status(409)
          .json({ available: false, message: `Username taken: ${username}` })
      : res
          .status(200)
          .json({ available: true, message: "Username is available" });
  } catch (error) {
    console.error("Error during /validateUser:", error.message);
    return res
      .status(500)
      .json({ error: `Error while fetching users: ${error.message}` });
  }
});

router.post("/signIn", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }
  try {
    const users = await getUsers({ username: username });
    if (!users.length) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const match = await bcrypt.compare(password, users[0].hashPassword);
    return match
      ? res.status(200).json({ message: `User authenticated successfully`, username })
      : res.status(401).json({ error: "Invalid username or password" });
  } catch (error) {
    console.error("Error during /signIn:", error.message);
    res
      .status(500)
      .json({ error: `Error while fetching users: ${error.message}` });
  }
});

router.post("/signup", async (req, res) => {
  const userData = req.body;
  if (!userData.username || !userData.password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }
  const hashedPassword = await bcrypt.hash(userData.password, BCRYPT_SALT_ROUNDS);
  const newUser = { ...userData, password: hashedPassword };
  try {
    const response = await writeAndUpdateUser(newUser);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in /signup:", error.message);
    res
      .status(500)
      .json({ error: `Error while signing up user: ${error.message}` });
  }
});

export default router;
