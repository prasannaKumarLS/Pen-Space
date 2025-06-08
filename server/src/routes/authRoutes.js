import { Router } from "express";
import {
  validateUser,
  signIn,
  signUp,
  getSession,
} from "../controllers/authController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = Router();

router.get("/validateUser", validateUser);
router.post("/signIn", signIn);
router.post("/signup", signUp);
router.get("/session", authenticateToken, getSession);

export default router;
