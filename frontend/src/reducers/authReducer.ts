import { actionType, userType } from "../actions/authActions";
import { LOGOUT, LOGIN_SUCCESS } from "../actions/types";

import setAuthToken from "./../utils/setAuthToken";

export type authStateType = {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: userType | null;
};

type authReducerType = (
  state: authStateType,
  action: actionType
) => authStateType;

const initialState: authStateType = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

const authReducer: authReducerType = (
  state: authStateType = initialState,
  action: actionType
) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log("auth reducer login success action payload:", action.payload);
      localStorage.setItem("token", action.payload.token);
      setAuthToken(action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      setAuthToken();
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
