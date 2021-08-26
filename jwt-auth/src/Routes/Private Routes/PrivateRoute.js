import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuthContext } from "../../Context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { hasAccessToken } = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) => {
        return hasAccessToken ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
