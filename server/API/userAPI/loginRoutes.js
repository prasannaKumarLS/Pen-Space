import { Router } from "express";
import bcrypt from "bcrypt";
import getUsers from "./getUsers.js";
import writeAndUpdateUser from "./writeAndUpdateUser.js";

// Initialize Express application
const router = Router();
const BCRYPT_SALT_ROUNDS = 10;

//Validate Username for sign up
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

//Sign In Route
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
    if (match) {
      req.session.user = {
        username,
        name: users[0].name,
      };
      return res.status(200).json({
        message: `User authenticated successfully`,
        username,
        name: users[0].name,
      });
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error while fetching users: ${error.message}` });
  }
});

//Sign Up Route
router.post("/signup", async (req, res) => {
  const userData = req.body;
  if (!userData.username || !userData.password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }
  const password = await bcrypt.hash(userData.password, BCRYPT_SALT_ROUNDS);
  const newUser = { ...userData, password };
  try {
    const response = await writeAndUpdateUser(newUser);
    return res.status(200).json({
      name: response.fullName,
      username: response.username,
      message: "User signed up successfully",
    });
  } catch (error) {
    console.error("Error in /signup:", error.message);
    res
      .status(500)
      .json({ error: `Error while signing up user: ${error.message}` });
  }
});

//Logout Route
router.post("/logout", (req, res) => {
  if (!req.session.user) {
    return res.status(400).json({ error: "No user is currently logged in" });
  }
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to log out", error: err.message });
    }
    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "User logged out successfully" });
  });
});

//Get Session Route
router.get("/session", (req, res) => {
  const sessionData = req.session.user;
  if (sessionData) {
    res.json({ name: sessionData.name });
  } else {
    res.status(401).json({ error: "Not logged in" });
  }
});

export default router;
