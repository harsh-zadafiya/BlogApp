import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedUser");
    navigate("/login");
    toast.success("Successfuly loged out!!");
    localStorage.removeItem("email");
    localStorage.removeItem("interestedValue");
    localStorage.removeItem("Role");
    // localStorage.removeItem("SavedBlog");
    localStorage.setItem("isLoggedUser", false);
  };
  return (
    <>
      <div>
        <button className="btn btn-primary me-2" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Logout;
