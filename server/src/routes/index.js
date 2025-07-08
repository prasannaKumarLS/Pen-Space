import { Router } from "express";
import loginRoutes from "./authRoutes.js";
import noteRoutes from "./noteRoutes.js";
import authenticateToken from "../middleware/authenticateToken.js";
import chatRoutes from "./chatRoutes.js";

const router = Router();

router.use("/login", loginRoutes);
router.use("/note", authenticateToken, noteRoutes);
router.use("/chat", authenticateToken, chatRoutes);

export default router;
