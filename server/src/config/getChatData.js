import fetchApi from "./apiConfig.js";

const endpoint = "getChatData";

const getChatData = async (params) => {
  try {
    const response = await fetchApi(endpoint, "GET", null, params);
    return response;
  } catch (error) {
    console.error("Error fetching Chat Data:", error.message);
    throw error;
  }
};
export default getChatData;
