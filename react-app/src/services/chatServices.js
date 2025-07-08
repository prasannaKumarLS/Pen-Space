import api from "./api.js";

const CHAT_PREFIX = "/chat";

const writeChatData = async (chatData) => {
  try {
    const response = await api.post(`${CHAT_PREFIX}/writeChatData`, chatData);
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        "Failed to write chat data. Please try again.",
    };
  }
};

const getChatData = async (params) => {
  try {
    const response = await api.get(`${CHAT_PREFIX}/getChatData`, {
      params,
    });
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        "Failed to fetch chat data. Please try again.",
    };
  }
};

export { writeChatData, getChatData };
