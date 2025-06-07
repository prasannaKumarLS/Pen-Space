import fetchApi from "../../src/config/apiConfig.js";

const endpoint = "getUsers";

const getUsers = async (params) => {
  try {
    const response = await fetchApi(endpoint, "GET", null, params);
    return response;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};

export default getUsers;
