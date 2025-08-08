import { Router } from "express";
import {
  writeAndUpdateNotes,
  getNotes,
  uploadAndWriteNotes,
  generateNoteDocument,
} from "../controllers/noteController.js";
import multer from "multer";

const router = Router();
const upload = multer();

router.post("/writeAndUpdateNotes", writeAndUpdateNotes);
router.get("/getNotes", getNotes);
router.post("/uploadNotes", upload.single("document"), uploadAndWriteNotes);
router.post("/generateDocument", generateNoteDocument);

export default router;
