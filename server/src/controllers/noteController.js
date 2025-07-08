import writeNotes from "../config/writeNotes.js";
import queryNotes from "../config/getNotes.js";
import uploadNotes from "../config/uploadDocument.js";
import FormData from "form-data";

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
        isActive: notesData.isActive || true,
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
  if (!params)
    return res.status(400).json({ error: "Note ID is required" });
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

export { writeAndUpdateNotes, getNotes, uploadAndWriteNotes };
