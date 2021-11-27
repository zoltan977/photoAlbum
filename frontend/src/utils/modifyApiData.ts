import httpClient from "axios";
import { actionType } from "../actions/authActions";

const modifyApiData =
  (getAlbums: () => void, logout: () => actionType) =>
  async (
    method: "get" | "post" | "put" | "delete",
    apiPath: string,
    data?: any
  ) => {
    try {
      await httpClient[method](apiPath, data);
      getAlbums();
    } catch (err: any) {
      console.log(err);

      if (
        err?.response?.data?.msg &&
        err.response.data.msg.includes("Authentication error")
      )
        logout();
    }
  };

export default modifyApiData;
