import { Router } from "express";
import { writeAndUpdateNotes, getNotes } from "../controllers/noteController.js";

const router = Router();

router.post("/writeAndUpdateNotes", writeAndUpdateNotes);
router.get("/getNotes", getNotes);

export default router;
