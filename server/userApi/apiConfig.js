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
      url: `https://vuramdemo.appiancloud.com/suite/webapi/${endpoint}`,
      data,
      headers: {
        "Content-Type": "application/json",
        "appian-api-key":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiZWRjZTIwYi0zNzRlLWU3NzEtZjFmYy1lNjk2NzdmODZlOGIifQ.m_xIoEiM5dDd440AZhy7BZX_FbOio7eR-UVwq2RwHzw",
        ...customHeaders,
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching API [${method} - https://vuramdemo.appiancloud.com/suite/webapi/${endpoint}]:`,
      error
    );
    throw error;
  }
};

export default fetchApi;
