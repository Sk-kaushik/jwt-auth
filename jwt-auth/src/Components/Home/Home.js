import React, { useEffect } from "react";

import { useAuthContext } from "../../Context/AuthContext";

import "../../styles/home.css";

const Home = () => {
  const { user, getUser, access_token, hasAccessToken, logout } = useAuthContext();

  useEffect(() => {
    if (access_token) {
      getUser(access_token);
    }
  }, [hasAccessToken, access_token]);

  return (
    <div>
      <div className="header">
        <h1>JWT AUTH</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="home_center">
        <h1>Welcome</h1>
        {hasAccessToken && <h2>{user.username}</h2>}
      </div>
    </div>
  );
};

export default Home;
