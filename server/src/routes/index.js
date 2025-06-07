import { Router } from "express";
import loginRoutes from "./authRoutes.js";
import noteRoutes from "./noteRoutes.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = Router();

router.use("/login", loginRoutes);
router.use("/note", isAuthenticated, noteRoutes);

export default router;
