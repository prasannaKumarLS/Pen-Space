import fetchApi from "./apiConfig.js";

const endpoint = "writeQuestionAndGetAnswer";

const writeChatData = async (noteData) => {
  try {
    const response = await fetchApi(endpoint, "POST", noteData);
    return response;
  } catch (error) {
    console.error("Error writing chat data:", error.message);
    throw error;
  }
};

export default writeChatData;
