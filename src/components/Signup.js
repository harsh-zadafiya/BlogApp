import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import { toast } from "react-toastify";

const Signup = () => {
  const options = [
    { label: "Sport", value: "Sport" },
    { label: "Food", value: "Food" },
    { label: "Travel", value: "Travel" },
    { label: "Fashion", value: "Fashion" },
    { label: "Health", value: "Health" },
  ];

  const [detail, setDetail] = useState(localStorage.getItem("detail") || []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [about, setAbout] = useState("");
  const [passWord, setPassWord] = useState("");
  const [selected, setSelected] = useState([]);
  const [dataOfMail, setDataOfMail] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getDataOfMail = localStorage.getItem("detail");
    if (getDataOfMail !== null) setDataOfMail(JSON.parse(getDataOfMail));
  }, []);

  const submitData = (e) => {
    e.preventDefault();
    const mailofdata = dataOfMail.map((elm) => elm.email);
    const mobileofData = dataOfMail.map((elm) => elm.mobile);
    if (mailofdata.includes(email)) {
      toast.warn("Already Email Exisits!!");
    } else if (mobileofData.includes(mobile)) {
      toast.warn("Already Mobile No. Exisitis!!");
    } else {
      if (name !== "") {
        if (email !== "") {
          if (selected.some((obj) => obj)) {
            if (passWord !== "") {
              let interstedValue = [];
              selected.forEach((obj) => interstedValue.push(obj.value));

              let data = {
                name,
                email,
                mobile,
                about,
                passWord,
                interstedValue,
              };

              const totalData = [...detail, data];
              setDetail(totalData);
              setName("");
              setEmail("");
              setMobile("");
              setAbout("");
              setPassWord("");
              setSelected([]);

              localStorage.setItem("detail", JSON.stringify(totalData));

              toast.success("Successfully Signup!");
              navigate("/login");
            } else {
              toast.warn("Please Enter Password!");
            }
          } else {
            toast.warn("Please Select atleast one Interest!");
          }
        } else {
          toast.warn("Please Enter Your Email!");
        }
      } else {
        toast.warn("Please Enter Your Name!");
      }
    }
  };
  useEffect(() => {
    const data = localStorage.getItem("detail");

    if (data !== null) {
      setDetail(JSON.parse(data));
    }
  }, []);

  const onSelect = (data) => {
    setSelected(data);
  };

  const loginPage = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label">
            Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="form-control"
            id="inputName"
            style={{ width: "350px" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email address"
            className="form-control"
            id="inputEmail"
            style={{ width: "350px" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">
            Mobile Number
          </label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter your Mobile Number"
            className="form-control"
            id="mobileNumber"
            style={{ width: "350px" }}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="aboutMe" className="form-label">
            About Me
          </label>
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Enter about yourself"
            className="form-control"
            id="aboutMe"
            style={{ width: "350px" }}
          />
        </div>
        <p className="mb-2">Gender </p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            checked
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Male
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
          />
          <label className="form-check-label mb-3" htmlFor="flexRadioDefault2">
            Female
          </label>
        </div>
        <div className="mb-3">
          <p>
            Select Interest <span style={{ color: "red" }}>*</span>
          </p>
          <MultiSelect
            options={options}
            value={selected}
            onChange={onSelect}
            labelledBy="Select"
          />
        </div>

        <div className="mb-3 mt-2">
          <label htmlFor="Inputpassword" className="form-label">
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="password"
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
            placeholder="Enter password"
            className="form-control"
            id="Inputpassword"
            style={{ width: "350px" }}
          />
        </div>

        <button type="submit" onClick={submitData} className="btn btn-primary">
          Submit
        </button>
        <div className="mb-3 mt-2">
          <p className="form-label">
            Already User ?
            <button className="btn btn-primary ms-2" onClick={loginPage}>
              Login
            </button>
          </p>
        </div>
      </form>
      <div>
        <p>
          <span style={{ color: "red" }}>*</span>Required Field
        </p>
      </div>
    </>
  );
};

export default Signup;
