import writeNotes from "../config/writeNotes.js";
import queryNotes from "../config/getNotes.js";
import uploadNotes from "../config/uploadDocument.js";
import FormData from "form-data";
import generateDocument from "../config/generateNoteDocument.js";

const writeAndUpdateNotes = async (req, res) => {
  const notesData = req.body;
  if (!notesData) return res.status(400).json({ error: "Notes Data is empty" });
  try {
    const notesArray = Array.isArray(notesData) ? notesData : [notesData];
    const updatedNotes = notesArray.map((note) => {
      return {
        ...note,
        username: req.user.username,
        userId: req.user.userId,
        isActive: note.isActive ?? true,
      };
    });
    const response = await writeNotes(updatedNotes);
    res.status(200).json(response);
  } catch (err) {
    res
      .status(400)
      .json({ error: `Error while writing Notes data : ${err.message}` });
  }
};

const getNotes = async (req, res) => {
  const params = req.query;
  if (!params) return res.status(400).json({ error: "Note ID is required" });
  try {
    const updatedParams =
      params.TYPE === "NOTES"
        ? { ...params, username: req.user.username } // To query the parent note table
        : params; // To query the child note table
    const response = await queryNotes(updatedParams);
    res.status(200).json(response);
  } catch (err) {
    res
      .status(400)
      .json({ error: `Error while fetching Notes data : ${err.message}` });
  }
};

const uploadAndWriteNotes = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Document is empty" });
  try {
    const form = new FormData(); //Initialize the form data object
    form.append("document", req.file.buffer, req.file.originalname); //Adding the file to the form data object
    const response = await uploadNotes(form, req.user.username);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      error: `Error while uploading document for Notes : ${err.message}`,
    });
  }
};

const generateNoteDocument = async (req, res) => {
  const { query } = req;
  const getTimestamp = () => {
    const date = new Date();
    return (
      date.toISOString().slice(0, 10).replace(/-/g, "") +
      "_" +
      date.toTimeString().slice(0, 5).replace(":", "")
    );
  };
  if (!query) return res.status(400).json({ error: "Note ID is required" });
  try {
    const response = await generateDocument(query);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `Exported_Document_Pen_Space_${getTimestamp()}.pdf`
    );
    return response.pipe(res);
  } catch (err) {
    res
      .status(400)
      .json({ error: `Dcument generation failed : ${err.message}` });
  }
};

export {
  writeAndUpdateNotes,
  getNotes,
  uploadAndWriteNotes,
  generateNoteDocument,
};
