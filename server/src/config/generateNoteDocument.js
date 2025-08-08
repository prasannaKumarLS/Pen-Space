import fetchApi from "./apiConfig.js";

const endpoint = "generateNote";

const generateDocument = async (params) => {
  try {
    const response = await fetchApi(
      endpoint,
      "POST",
      null,
      params,
      {},
      "stream"
    );
    return response;
  } catch (error) {
    console.error("Error while generating document for notes:", error.message);
    throw error;
  }
};

export default generateDocument;
