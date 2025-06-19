import fetchApi from "./apiConfig.js";

const endpoint = "writeAndUpdateNotes";

const writeAndUpdateNotes = async (noteData) => {
  try {
    const response = await fetchApi(endpoint, "POST", noteData);
    return response;
  } catch (error) {
    console.error("Error writing and updating notes:", error.message);
    throw error;
  }
};

export default writeAndUpdateNotes;
