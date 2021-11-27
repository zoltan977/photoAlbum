import { LOGIN_SUCCESS, LOGOUT } from "./types";

import axios from "axios";
import setAuthToken from "./../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export type actionType = { type: string; payload?: any };
export type dispatchType = (object: actionType) => void;
export type userType = {
  name: string;
  email: string;
  photo: string;
};
type jwtPayloadType = {
  user: userType;
};

axios.defaults.baseURL = "http://localhost:8000";

export const logout = (): actionType => {
  return {
    type: LOGOUT,
  };
};

export const setToken = (token: string): actionType => {
  const decoded: jwtPayloadType | null =
    jwt_decode<jwtPayloadType>(token || "") || null;

  const user: userType = decoded.user;

  return {
    type: LOGIN_SUCCESS,
    payload: { token, user },
  };
};

export const loadUser = () => async (dispatch: dispatchType) => {
  const token = localStorage.token;
  if (token) setAuthToken(token);

  try {
    const res = await axios.get("/api/user/loaduser");

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, user: res.data },
    });
  } catch (error: any) {
    console.log("auth actions load user error:", error?.response?.data);

    dispatch({
      type: LOGOUT,
    });
  }
};
