import React, { useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const [isLoggedin, setisloggedin] = useState(true);
  const ref = useRef();

  const isUserLogIn = () => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));

    if (user) {
      setisloggedin((prevState) => false);
    } else {
      setisloggedin((prevState) => true);
    }
  };

  useEffect(() => {
    if (ref.current === true) return;
    isUserLogIn();
    ref.current = true;
  }, []);
  return isLoggedin ? children : <Navigate to="/home/allblog" />;
};

export default PublicRoute;
