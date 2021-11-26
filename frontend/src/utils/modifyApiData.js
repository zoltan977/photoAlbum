import httpClient from "axios";

const modifyApiData = (getAlbums, logout) => async (method, apiPath, data) => {
  try {
    await httpClient[method](apiPath, data);
    getAlbums();
  } catch (err) {
    console.log(err);

    if (
      err?.response?.data?.msg &&
      err.response.data.msg.includes("Authentication error")
    )
      logout();
  }
};

export default modifyApiData;
