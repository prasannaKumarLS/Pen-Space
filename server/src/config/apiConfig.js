import axios from "axios";

const fetchApi = async (
  endpoint,
  method = "GET",
  data = null,
  params = null,
  customHeaders = {}
) => {
  try {
    const response = await axios({
      method,
      url: `${process.env.APPIAN_BASE_URL}${endpoint}`,
      data,
      headers: {
        "Content-Type": "application/json",
        "appian-api-key": process.env.APPIAN_API_KEY,
        ...customHeaders,
      },
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching API [${method} - ${process.env.APPIAN_BASE_URL}${endpoint}]:`,
      error
    );
    throw error;
  }
};

export default fetchApi;
