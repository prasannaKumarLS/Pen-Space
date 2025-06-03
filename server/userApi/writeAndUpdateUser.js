import fetchApi from "./apiConfig.js";

const endpoint = "writeAndUpdateUsers";

const writeAndUpdateUser = async (userData) => {
  try {
    const response = await fetchApi(endpoint, "POST", userData);
    return response;
  } catch (error) {
    console.error("Error writing and updating user:", error);
    throw error;
  }
};

export default writeAndUpdateUser;
