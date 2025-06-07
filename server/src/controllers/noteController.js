import writeNotes from "../config/writeNotes.js";
import queryNotes from "../config/getNotes.js";

const writeAndUpdateNotes = async (req, res) => {
  const notesData = req.body;
  if (!notesData) return res.status(400).json({ error: "Notes Data is empty" });
  try {
    const notesArray = Array.isArray(notesData) ? notesData : [notesData];
    const updatedNotes = notesArray.map((note) => {
      return {
        ...note,
        username: req.session.user.username,
        isActive: true,
      };
    });
    const response = await writeNotes(updatedNotes);
    res.status(200).json({ data: response });
  } catch (err) {
    res
      .status(400)
      .json({ error: `Error while writing Notes data : ${err.message}` });
  }
};

const getNotes = async (req, res) => {
  const params = req.query;
  if (!params) return res.status(400).json({ error: "Params are empty" });
  try {
    const updatedParams =
      params.type === "NOTES"
        ? [
            ...params,
            { username: params.username || req.session.user.username },
          ] // To query the parent note table
        : params; // To query the child note table
    const response = await queryNotes(updatedParams);
    res.status(200).json({ data: response });
  } catch (err) {
    res
      .status(400)
      .json({ error: `Error while fetching Notes data : ${err.message}` });
  }
};

export { writeAndUpdateNotes, getNotes };
