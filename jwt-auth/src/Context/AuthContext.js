import { createContext, useContext, useReducer } from "react";
import { authReducer } from "./Reducers/authReducer";

import axios from "axios";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = (props) => {
  const initialState = {
    isLoading: false,
    user: {},
    isError: false,
    hasAccessToken: localStorage.getItem("token") ? true : false,
    error: {},
    access_token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : {},
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user) => {
    axios
      .post("http://localhost:8080/login", {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        dispatch({ type: "SUCCESS", payload: res.data });
        localStorage.setItem("token", JSON.stringify(res.data.token));
      })
      .catch((err) => {
        dispatch({ type: "ERROR", payload: err.response.data });
      });
  };

  const signup = (user) => {
    axios
      .post("http://localhost:8080/signup", {
        username: user.username,
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        dispatch({ type: "SUCCESS", payload: res.data });
        localStorage.setItem("token", JSON.stringify(res.data.token));
      })
      .catch((err) => {
        dispatch({ type: "ERROR", payload: err.response.data });
      });
  };

  // GETTING THE USER ON SUCCESSFULL LOGGING IN BASED ON TOKENS
  const getUser = (token) => {
    axios
      .get("http://localhost:8080/home", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        dispatch({ type: "SUCCESS", payload: res.data.user });
      })
      .catch((err) => {
        dispatch({ type: "ERROR", payload: err.response.data });
      });
  };

  const removeErrors = () => {
    dispatch({ type: "REMOVE_ERRORS" });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "REMOVE_TOKEN" });
  };

  const value = {
    login,
    signup,
    getUser,
    logout,
    removeErrors,
    user: state.user,
    loading: state.isLoading,
    error: state.error,
    isError: state.isError,
    hasAccessToken: state.hasAccessToken,
    access_token: state.access_token,
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
