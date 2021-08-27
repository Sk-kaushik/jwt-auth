import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";

import "../../styles/form.css";
import Loader from "../Loader/Loader";

const LoginForm = () => {
  // DATA FROM CONTEXT
  const { hasAccessToken, isError, error, login, isLoading, removeErrors } = useAuthContext();

  // LOCAL STATES
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  useEffect(() => {
    // REDIRECT TO HOME PAGE ON SUCCESS LOGIN
    hasAccessToken && history.push("/");

    error && toggleError(error.message);
  }, [hasAccessToken, isError]);

  //   Toggle password visibility
  const toggleEye = () => {
    setShowPwd((prev) => !prev);
  };

  const loginUser = () => {
    // CHECKING IF INPUT FIELDS HAS SOME VALUE
    try {
      if (email === "" || password === "") {
        throw new Error("Empty field");
      } else {
        const rawData = {
          email,
          password,
        };
        login(rawData);
      }
    } catch (err) {
      toggleError("Fields cannot be empty");
    }
  };

  // SHOW ERRORS ON FORM
  const toggleError = (text) => {
    var error_container = document.getElementById("error_text");
    error_container.innerHTML = text;
    if (text) {
      applyStyle("1px");
      setTimeout(function () {
        error_container.innerHTML = "";
        applyStyle("0px");
        removeErrors();
      }, 2000);
    } else {
      error_container.innerHTML = "";
      applyStyle("0px");
      removeErrors();
    }
  };

  // TOGGLE RED BORDER AROUND INPUT FIELD
  const applyStyle = (style) => {
    const inputEle = document.querySelectorAll("input");
    inputEle.forEach((item) => {
      item.style.border = `${style} solid red`;
    });
  };

  return (
    <div className="login-form">
      <div className="form-container">
        <h1>Login</h1>
        <div className="form-control">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value.toLowerCase());
            }}
            onFocus={() => {
              toggleError();
            }}
          />
        </div>
        <div className="form-control">
          <i className="fas fa-lock"></i>
          <input
            type={showPwd ? "text" : "password"}
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onFocus={() => {
              toggleError();
            }}
          />
          <span onClick={toggleEye}>{showPwd ? <i className="fas fa-eye-slash eye"></i> : <i className="fas fa-eye eye"></i>}</span>
        </div>

        <p id="error_text"></p>
        <div className="form-control">
          {isLoading ? (
            <button disabled>
              <Loader />
            </button>
          ) : (
            <button onClick={loginUser}>Login</button>
          )}
        </div>
        <div className="footer">
          <p>
            Not a member? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
