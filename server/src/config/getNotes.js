import fetchApi from "./apiConfig.js";

const endpoint = "getNotesData";

const getNotes = async (params) => {
  try {
    const response = await fetchApi(endpoint, "GET", null, params);
    return response;
  } catch (error) {
    console.error("Error fetching notes:", error.message);
    throw error;
  }
};
export default getNotes;
