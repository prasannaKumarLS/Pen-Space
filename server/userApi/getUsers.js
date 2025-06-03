import fetchApi from "./apiConfig.js";

const endpoint = "getUsers";

const getUsers = async (params) => {
  try {
    const response = await fetchApi(endpoint, "GET", null, params);
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export default getUsers;
