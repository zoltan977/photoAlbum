import "./App.css";
import { useEffect } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Callback from "./components/Callback/Callback";
import LoadingMask from "./components/LoadingMask/LoadingMask";

import { connect } from "react-redux";
import { loadUser } from "./actions/authActions";

import { useLocation } from "react-router-dom";
import NewAlbum from "./components/NewAlbum/NewAlbum";
import Albums from "./components/Albums/Albums";

import { authStateType } from "./reducers/authReducer";

type appProps = {
  loading: boolean;
  loadUser: () => Promise<void>;
  isAuthenticated: boolean;
};

const App: React.FC<appProps> = ({ loading, loadUser, isAuthenticated }) => {
  const location = useLocation();

  useEffect(() => {
    console.log("app.js location.pathname: ", location.pathname);

    if (location.pathname !== "/callback") loadUser();
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundImage: 'url("background.jpg")',
        backgroundSize: "contain",
        backgroundPositionX: "center",
      }}
    >
      <NavBar />
      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route
          path="/new-album"
          element={
            loading ? (
              <LoadingMask />
            ) : isAuthenticated ? (
              <NewAlbum />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/albums"
          element={
            loading ? (
              <LoadingMask />
            ) : isAuthenticated ? (
              <Albums />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={loading ? <LoadingMask /> : <Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

const mapStateToProps = (state: { auth: authStateType }) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loadUser })(App);
