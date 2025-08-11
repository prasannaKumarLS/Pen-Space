import { Router } from "express";
import {
  validateUser,
  signIn,
  signUp,
  getSession,
  getUserData,
  writeAndUpdateUserData,
} from "../controllers/authController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = Router();

router.get("/validateUser", validateUser);
router.post("/signIn", signIn);
router.post("/signup", signUp);
router.get("/session", authenticateToken, getSession);
router.get("/getUser", authenticateToken, getUserData);
router.post("/writeUser", writeAndUpdateUserData);

export default router;
