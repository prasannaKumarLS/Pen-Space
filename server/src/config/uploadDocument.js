import fetchApi from "./apiConfig.js";

const endpoint = "/createNoteUploadDocument";

const uploadNotes = async (formData, username) => {
  try {
    const response = await fetchApi(endpoint, "POST", formData, null, {
      "Content-Type": "multipart/form-data",
      username,
    });
    return response;
  } catch (error) {
    console.error("Error while uploading document for notes", error.message);
    throw error;
  }
};

export default uploadNotes;
