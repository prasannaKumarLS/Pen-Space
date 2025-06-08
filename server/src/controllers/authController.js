import bcrypt from "bcrypt";
import getUsers from "../config/getUsers.js";
import writeAndUpdateUser from "../config/writeUser.js";
import generateToken from "../middleware/generateAuthToken.js";
import jwt from "jsonwebtoken";

// Initialize Express application
const BCRYPT_SALT_ROUNDS = 10;

//Validate Username for sign up
const validateUser = async (req, res) => {
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
};

//Sign In
const signIn = async (req, res) => {
  const { username, password } = req.body || {};
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
      const token = await generateToken({ username, name: users[0].name });
      return res.status(200).json({
        message: `User authenticated successfully`,
        token,
      });
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error while fetching users: ${error.message}` });
  }
};

//Sign Up
const signUp = async (req, res) => {
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
};

//Get Session
const getSession = async (req, res) => {
  return req.user
    ? res.status(200).json(req.user)
    : res
        .status(401)
        .json({ error: "Something went wrong while fetching session info" });
};

export { validateUser, signIn, signUp, getSession };
