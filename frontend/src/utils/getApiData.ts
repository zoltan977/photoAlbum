import httpClient from "axios";
import { actionType } from "../actions/authActions";

const getApiData =
  (logout: () => actionType) =>
  async (
    apiPath: string,
    stateSetter: React.Dispatch<React.SetStateAction<any>>
  ) => {
    try {
      const response = await httpClient.get(apiPath);
      stateSetter(response.data);
    } catch (err: any) {
      console.log(err);

      if (
        err?.response?.data?.msg &&
        err.response.data.msg.includes("Authentication error")
      )
        logout();
    }
  };

export default getApiData;
