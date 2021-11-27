import httpClient from "axios";

const setAuthToken = (token?: string) => {
  if (token)
    httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete httpClient.defaults.headers.common["Authorization"];
};

export default setAuthToken;
