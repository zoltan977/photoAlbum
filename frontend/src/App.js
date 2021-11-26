import "./App.css";
import React, { useEffect } from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Callback from "./components/Callback/Callback";
import LoadingMask from "./components/LoadingMask/LoadingMask.component";

import PrivateRoute from "./components/Routing/PrivateRoute";
import UnAuthRoute from "./components/Routing/UnAuthRoute";

import { connect } from "react-redux";
import { loadUser } from "./actions/authActions";

import { useLocation } from "react-router-dom";
import NewAlbum from "./components/NewAlbum/NewAlbum";

const App = ({ loading, loadUser }) => {
  const location = useLocation();

  useEffect(() => {
    console.log("app.js location.pathname: ", location.pathname);

    if (location.pathname !== "/callback") loadUser();
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundImage: 'url("background.svg")',
        backgroundSize: "contain",
      }}
    >
      <NavBar />
      <Switch>
        <Route path="/callback" component={Callback} />
        <PrivateRoute path="/new-album" component={NewAlbum} />
        <Route exact path="/">
          {loading ? <LoadingMask /> : <Home />}
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { loadUser })(App);
