import { Router } from "express";
import { writeChatData, getChatData } from "../controllers/chatController.js";

const router = Router();

router.post("/writeChatData", writeChatData);
router.get("/getChatData", getChatData);

export default router;
