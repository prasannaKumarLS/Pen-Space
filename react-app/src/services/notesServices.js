import api from "./api";

const NOTE_PREFIX = "/note";

const writeNotes = async (notesData) => {
  try {
    const response = await api.post(
      `${NOTE_PREFIX}/writeAndUpdateNotes`,
      notesData
    );
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        "Failed to write notes. Please try again.",
    };
  }
};

const getNotes = async (params) => {
  try {
    const response = await api.get(`${NOTE_PREFIX}/getNotes`, {
      params,
    });
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        "Failed to fetch notes. Please try again.",
    };
  }
};

const uploadNotes = async (formData) => {
  try {
    const response = await api.post(`${NOTE_PREFIX}/uploadNotes`, formData);
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        "Failed to upload notes. Please try again.",
    };
  }
};

const generateNoteDocument = async (params) => {
  try {
    const response = await api.post(
      `${NOTE_PREFIX}/generateDocument`,
      {},
      { params, responseType: "blob" }
    );
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        "Failed to generate document. Please try again.",
    };
  }
};

export { writeNotes, getNotes, uploadNotes, generateNoteDocument };
