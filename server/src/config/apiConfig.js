import axios from "axios";

const METHODS_WITH_BODY = ["POST", "PUT", "PATCH", "DELETE"];

const fetchApi = async (
  endpoint,
  method = "GET",
  data = null,
  params = null,
  customHeaders = {}
) => {
  const hasBody = METHODS_WITH_BODY.includes(method.toUpperCase());
  try {
    const response = await axios({
      method,
      url: `${process.env.APPIAN_BASE_URL}${endpoint}`,
      ...(hasBody && { data }),
      headers: {
        // "appian-api-key": process.env.APPIAN_API_KEY,
        ...customHeaders,
      },
      auth: {
        username: process.env.APPIAN_USERNAME,
        password: process.env.APPIAN_PASSWORD,
      },
      params,
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
