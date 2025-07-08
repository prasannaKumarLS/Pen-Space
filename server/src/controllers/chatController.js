import writeChat from "../config/writeChatData.js";
import getChat from "../config/getChatData.js";

const writeChatData = async (req, res) => {
  const chatData = req.body;
  if (!chatData) return res.status(400).json({ error: "Chat Data is empty" });
  try {
    const reponse = await writeChat({
      username: req.user.username,
      question: chatData.question,
    });
    res.status(200).json(reponse);
  } catch {
    res
      .status(400)
      .json({ error: `Error while writing Notes data : ${err.message}` });
  }
};

const getChatData = async (req, res) => {
  const params = req.query;
  try {
    const reponse = await getChat({ ...params, userId: req.user.userId });
    res.status(200).json(reponse);
  } catch {
    res
      .status(400)
      .json({ error: `Error while quering Chat data : ${err.message}` });
  }
};

export { getChatData, writeChatData };
