import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import React from "react";

//Main navigation: top bar
const NavBar = ({ logout, user, isAuthenticated }: any) => {
  const callGoogle = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=581910913527-bte82bsk8dpd68tdv1q3eo4af77edjsk.apps.googleusercontent.com&prompt=select_account&scope=openid%20profile%20email&redirect_uri=http%3A//localhost%3A3000/callback`;
  };

  return (
    <div className="NavBar">
      <div className="menu">
        <NavLink to="/">Home</NavLink>
        <div className="NavLinks">
          Album
          <div>
            <NavLink to="/new-album">Új Album</NavLink>
            <NavLink to="/albums">Albumok</NavLink>
          </div>
        </div>
      </div>
      <div className="login">
        {isAuthenticated ? (
          <div className="user">
            <img src={user.photo} alt="" referrerPolicy="no-referrer" />
            <span>{user.name}</span>
            <div className="logout" onClick={() => logout()}>
              <svg viewBox="0 0 512 512">
                <path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path>
              </svg>
            </div>
          </div>
        ) : (
          <img
            className="google"
            src="google.png"
            alt=""
            onClick={callGoogle}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(NavBar);
