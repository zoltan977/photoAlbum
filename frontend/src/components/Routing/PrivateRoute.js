import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import LoadingMask from "./../LoadingMask/LoadingMask.component";

const PrivateRoute = ({
  isAuthenticated,
  loading,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <LoadingMask />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(PrivateRoute);
