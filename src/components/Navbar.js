import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logout from "./Logout";

const Navbar = () => {
  const location = useLocation();
  const isloggedUser = localStorage.getItem("isLoggedUser");

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            BlogApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-5 mb-lg-0">
              {isloggedUser === "false" ? (
                <>
                  <li className="nav-item ms-5">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/login" ? "active" : ""
                      }`}
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item ms-5">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/signup" ? "active" : ""
                      }`}
                      to="/signup"
                    >
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item ms-5">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/about" ? "active" : ""
                      }`}
                      to="/about"
                    >
                      Contact Us
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item ms-5">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/home" ? "active" : ""
                      }`}
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </Link>
                  </li>

                  <li className="nav-item ms-5">
                    <Logout />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
