import React, { useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isLoggedin, setisloggedin] = useState(true);
  const ref = useRef();

  const isUserLogIn = () => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));

    if (user) {
      setisloggedin((prevState) => true);
    } else {
      setisloggedin((prevState) => false);
    }
  };

  useEffect(() => {
    if (ref.current === true) return;
    isUserLogIn();
    ref.current = true;
  }, []);
  return isLoggedin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
