import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useAuthContext } from "../../Context/AuthContext";

import { useHistory } from "react-router";

import "../../styles/form.css";
import Loader from "../Loader/Loader";

const SignupForm = () => {
  const { signup, hasAccessToken, loading, error, isError, isLoading, removeErrors } = useAuthContext();

  const [showPwd, setShowPwd] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  //   Toggle show password
  const toggleEye = () => {
    setShowPwd((prev) => !prev);
  };

  useEffect(() => {
    // REDIRECT TO HOME PAGE ON SUCCESS LOGIN
    hasAccessToken && history.push("/");

    isError && toggleError(error.message);
  }, [hasAccessToken, isError]);

  const signupUser = () => {
    // CHECKING IF INPUT FIELDS HAS SOME VALUE
    try {
      if (email === "" || username === "" || password === "") {
        throw new Error("empty fields");
      } else {
        const rawData = {
          email,
          username,
          password,
        };
        signup(rawData);
      }
    } catch {
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
        applyStyle("0");
        removeErrors();
      }, 2000);
    } else {
      error_container.innerHTML = "";
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
        <h1>Sign Up</h1>

        <div className="form-control">
          <i className="fas fa-user"></i>
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onFocus={() => {
              toggleError();
            }}
            placeholder="Username"
          />
        </div>
        <div className="form-control">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            onFocus={() => {
              toggleError();
            }}
            onChange={(e) => {
              setEmail(e.target.value.toLowerCase());
            }}
            placeholder="Email"
          />
        </div>
        <div className="form-control">
          <i className="fas fa-lock"></i>

          <input
            type={showPwd ? "text" : "password"}
            onFocus={() => {
              toggleError();
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
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
            <button onClick={signupUser}>Signup</button>
          )}
        </div>
        <div className="footer">
          <p>
            Already a member? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default SignupForm;
