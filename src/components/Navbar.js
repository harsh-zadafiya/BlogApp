import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { CgProfile } from "react-icons/cg";
import styled from "styled-components";

export const ButtonOfNav = styled.button`
  font-family: "Open Sans";
  color: #ffffff;
  text-transform: uppercase;
  background: #000;
  padding: 10px;
  border: 4px solid #8c8c8c;
  border-radius: 10px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease 0s;
  &:hover {
    color: #000;
    border-radius: 50px;
    border-color: #ffffff;
    background: #ffffff;
    transition: all 0.6s ease 0s;
  }
`;

export const Header = styled.nav`

  background: linear-gradient(110deg, #F8C8DC 60%, #f4f5dc 60%);
  text-align: center;
  width: 100%;
  height: auto;
  background-size: cover;
  background-color
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 85% 85% / 30%;
`;

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const location = useLocation();
  const isloggedUser = localStorage.getItem("isLoggedUser");
  const navigate = useNavigate();
  const handleAddBlog = (e) => {
    e.preventDefault();
    navigate("/home/addblog");
  };
  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <nav className="menu-list">
        <div className="logo">
          Blog<font>App</font>
        </div>
        <ul
          onClick={handleClick}
          className={clicked ? "menu-list" : "menu-list close"}
        >
          {isloggedUser === "false" ? (
            <>
              <li>
                <Link
                  className={`nav-link ${
                    location.pathname === "/login" ? "active" : ""
                  }`}
                  to="/login"
                  style={{ marginRight: "90px" }}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className={`nav-link ${
                    location.pathname === "/signup" ? "active" : ""
                  }`}
                  to="/signup"
                  style={{ marginRight: "90px" }}
                >
                  Signup
                </Link>
              </li>
              <li>
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                  style={{ marginRight: "90px" }}
                >
                  Contact Us
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className={`nav-link ${
                    location.pathname === "/home/allblog" ? "active" : ""
                  }`}
                  style={{ marginRight: "90px" }}
                  to="/home/allblog"
                >
                  All Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/home/myblog" ? "active" : ""
                  }`}
                  style={{ marginRight: "90px" }}
                  to="/home/myblog"
                >
                  My Blog
                </Link>
              </li>
              <li>
                <Link
                  className={`nav-link ${
                    location.pathname === "/home/saveblog" ? "active" : ""
                  }`}
                  style={{ marginRight: "90px" }}
                  to="/home/saveblog"
                >
                  Saved Blog
                </Link>
              </li>
              <li className="nav-item">
                <ButtonOfNav
                  onClick={handleAddBlog}
                  style={{ marginRight: "90px" }}
                >
                  Add Blog
                </ButtonOfNav>
              </li>
              <li>
                <Link
                  className={`nav-link ${
                    location.pathname === "/profile" ? "active" : ""
                  }`}
                  aria-current="page"
                  style={{ marginRight: "90px" }}
                  to="/profile"
                >
                  <CgProfile
                    style={{
                      height: "40px",
                      width: "40px",
                    }}
                  />
                </Link>
              </li>

              <li>
                <Logout style={{ marginRight: "90px" }} />
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
