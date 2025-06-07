import { Router } from "express";
import {
  validateUser,
  signIn,
  signUp,
  logout,
  getSession,
} from "../controllers/authController.js";

const router = Router();

router.get("/validateUser", validateUser);
router.post("/signIn", signIn);
router.post("/signup", signUp);
router.post("/logout", logout);
router.get("/session", getSession);

export default router;
