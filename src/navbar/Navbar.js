import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuListofPrivate } from "./MenuListofPrivate";
import { MenuListofPulic } from "./MenuListofPublic";
import Logout from "../components/Logout";
import "./css/Navbar.css";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const menuList = MenuListofPrivate.map(({ url, title }, index) => {
    return (
      <li key={index}>
        <NavLink to={url} activeClassName="active">
          {title}
        </NavLink>
      </li>
    );
  });

  const menulistPublic = MenuListofPulic.map(({ url, title }, index) => {
    return (
      <li key={index}>
        <NavLink to={url} activeClassName="active">
          {title}
        </NavLink>
      </li>
    );
  });
  const isloggedUser = localStorage.getItem("isLoggedUser");

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <nav className="menu-list">
      <div className="logo">
        Blog<font>App</font>
      </div>
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "menu-list" : "menu-list close"}>
        {isloggedUser === "false" ? (
          menulistPublic
        ) : (
          <>
            {menuList}
            <li className="nav-item ms-5">
              <Logout />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
