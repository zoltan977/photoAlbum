import httpClient from "axios";

const getApiData = (logout) => async (apiPath, stateSetter) => {
  try {
    const response = await httpClient.get(apiPath);
    stateSetter(response.data);
  } catch (err) {
    console.log(err);

    if (
      err?.response?.data?.msg &&
      err.response.data.msg.includes("Authentication error")
    )
      logout();
  }
};

export default getApiData;
