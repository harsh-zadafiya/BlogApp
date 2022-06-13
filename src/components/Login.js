import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

export const BoxWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  min-height: 400px;
  box-sizing: border-box;
  background: #fffff7;
  box-shadow: 4px 2px 16px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  margin: 100px auto 0 auto;
  padding: 25px;
  color: #414141;
`;

export const InputCss = styled.input`
  display: block;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  margin: 14px auto;
  border-radius: 20px;
  color: #046772;
  border: 2px solid #ccc;
  &:hover {
    outline: 0;
    border-color: #046772;
  }
`;

export const Heading = styled.h2`
  color: #046772;
  font-family: "Open Sans", sans-serif;
  font-size: 34px;
  font-weight: 300;
  line-height: 40px;
  margin: 0 0 16px;
`;

export const ButtonCss = styled.button`
  font-family: "Open Sans";
  color: #00134d !important;
  text-transform: uppercase;
  background: #ffffff;
  padding: 10px;
  border: 4px solid #8c8c8c !important;
  border-radius: 10px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease 0s;
  &:hover {
    color: #000000 !important;
    border-radius: 50px;
    border-color: #046772 !important;
    transition: all 0.6s ease 0s;
  }
`;

const Login = () => {
  const navigate = useNavigate();

  const [emailofLogin, setEmailofLogin] = useState("");
  const [passwordofLogin, setpasswordofLogin] = useState("");
  const [getdatals, setGetdatals] = useState([]);

  useEffect(() => {
    const getdata = localStorage.getItem("detail");
    if (getdata !== null) setGetdatals(JSON.parse(getdata));
  }, []);

  const adminEmail = [
    "harsh.zadafiya@portpro.io",
    "harsh.zadafiya13@portpro.io",
  ];
  const adminPassword = ["1234"];

  const isUser = getdatals.find(
    (el) =>
      (el.email === emailofLogin || el.mobile === emailofLogin) &&
      el.passWord === passwordofLogin
  );

  const user = () => {
    if (isUser) {
      localStorage.setItem("loggedUser", JSON.stringify(isUser));
      toast.success("Successful Login");
      localStorage.setItem("email", JSON.stringify(emailofLogin));
      localStorage.setItem("Role", "User");
    } else {
      navigate("/login");
      toast.error("Wrong Email or Password!!");
    }
    return isUser;
  };

  const loginPage = (e) => {
    e.preventDefault();
    const data = user();
    if (
      emailofLogin === (adminEmail[0] || adminEmail[1]) &&
      passwordofLogin === adminPassword[0]
    ) {
      if (isUser) {
        navigate("/admin");
        localStorage.setItem("Role", "Admin");
        localStorage.setItem("isLoggedUser", true);
      }
    } else if (data) {
      navigate("/home/allblog");
      localStorage.setItem("isLoggedUser", true);
    }
  };

  const onEmail = (e) => {
    setEmailofLogin(e.target.value);
  };
  return (
    <>
      <BoxWrap>
        <div>
          <div>
            <Heading>Login Form</Heading>
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Username<span style={{ color: "red" }}> *</span>
            </label>
            <InputCss
              type="email"
              value={emailofLogin}
              onChange={onEmail}
              placeholder="Enter Your Email address or Mobile number"
              className="form-control"
              id="inputEmail"
              style={{ width: "350px" }}
            />
            <div className="mb-3 mt-2">
              <label htmlFor="Inputpassword" className="form-label">
                Password<span style={{ color: "red" }}> *</span>
              </label>
              <InputCss
                type="password"
                value={passwordofLogin}
                onChange={(e) => {
                  setpasswordofLogin(e.target.value);
                }}
                placeholder="Enter password"
                className="form-control"
                id="Inputpassword"
                style={{ width: "350px" }}
              />
            </div>
            <ButtonCss onClick={loginPage}>Login</ButtonCss>
            <div className="mb-3 mt-2">
              <p className="form-label">
                You don't have account? <Link to={"/signup"}>SignUp </Link>
              </p>
            </div>
          </div>
          <div>
            <p>
              <span style={{ color: "red" }}>*</span>Required Field
            </p>
          </div>
        </div>
      </BoxWrap>
    </>
  );
};

export default Login;
