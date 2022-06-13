import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import ContactUs from "./ContactUs";
import { BrowserRouter } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import AddBlog from "./AddBlog";
import AllBlog from "./AllBlog";
import MyBlog from "./MyBlog";
import SavedBlog from "./SavedBlog";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AdminPage from "./AdminPage";

const ReactComponents = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="home/addblog/:id"
              element={
                <PrivateRoute>
                  <AddBlog />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminPage />
                </PrivateRoute>
              }
            />
            <Route path="/about" element={<ContactUs />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/home/addblog"
              element={
                <PrivateRoute>
                  <AddBlog />
                </PrivateRoute>
              }
            />
            <Route
              path="/home/allblog"
              element={
                <PrivateRoute>
                  <AllBlog />
                </PrivateRoute>
              }
            />
            <Route
              path="/home/myblog"
              element={
                <PrivateRoute>
                  <MyBlog />
                </PrivateRoute>
              }
            />
            <Route
              path="/home/saveblog"
              element={
                <PrivateRoute>
                  <SavedBlog />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default ReactComponents;
