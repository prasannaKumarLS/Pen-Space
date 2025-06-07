import fetchApi from "../../src/config/apiConfig.js";

const endpoint = "writeAndUpdateUsers";

const writeAndUpdateUser = async (userData) => {
  try {
    const response = await fetchApi(endpoint, "POST", userData);
    return response;
  } catch (error) {
    console.error("Error writing and updating user:", error.message);
  }
};

export default writeAndUpdateUser;
