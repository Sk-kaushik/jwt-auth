import { createContext, useContext, useReducer, useState } from "react";
import { authReducer } from "./Reducers/authReducer";

import axios from "axios";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = (props) => {
  const initialState = {
    user: {},
    isError: false,
    hasAccessToken: localStorage.getItem("token") ? true : false,
    error: {},
    access_token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : {},
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);

  const login = (user) => {
    setIsLoading(true);
    axios
      .post("https://jwtauthproject.herokuapp.com/login", {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        dispatch({ type: "SUCCESS", payload: res.data });
        localStorage.setItem("token", JSON.stringify(res.data.token));
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch({ type: "ERROR", payload: err.response.data });
        setIsLoading(false);
      });
  };

  const signup = (user) => {
    setIsLoading(true);

    axios
      .post("https://jwtauthproject.herokuapp.com/signup", {
        username: user.username,
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        dispatch({ type: "SUCCESS", payload: res.data });
        localStorage.setItem("token", JSON.stringify(res.data.token));
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch({ type: "ERROR", payload: err.response.data });
        setIsLoading(false);
      });
  };

  // GETTING THE USER ON SUCCESSFULL LOGGING IN BASED ON TOKENS
  const getUser = (token) => {
    axios
      .get("https://jwtauthproject.herokuapp.com/home", {
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
    setIsLoading,
    isLoading,
    user: state.user,
    error: state.error,
    isError: state.isError,
    hasAccessToken: state.hasAccessToken,
    access_token: state.access_token,
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
