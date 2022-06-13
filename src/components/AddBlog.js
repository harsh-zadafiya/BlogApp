import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavHomes from "./NavHomes";
import { MultiSelect } from "react-multi-select-component";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { valueMaker } from "./helper";

const getLocaldata = () => {
  let list = localStorage.getItem("BlogData");
  if (list) {
    return JSON.parse(localStorage.getItem("BlogData"));
  } else {
    return [];
  }
};

const AddBlog = () => {
  const params = useParams();
  const [detailofAdd, setDetailOfAdd] = useState(getLocaldata());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState([]);

  const ref = useRef();

  const navigate = useNavigate();

  const options = [
    { label: "Sport", value: "Sport" },
    { label: "Food", value: "Food" },
    { label: "Travel", value: "Travel" },
    { label: "Fashion", value: "Fashion" },
    { label: "Health", value: "Health" },
  ];

  useEffect(() => {
    if (ref.current === true) return;
    const data = localStorage.getItem("BlogData");
    if (data !== null) {
      setDetailOfAdd(JSON.parse(data));
    }
    ref.current = true;
  }, []);

  useEffect(() => {
    if (params.id) {
      const getBlog = detailofAdd.find(
        (el) => el.idforcred.toString() === params.id
      );
      setTitle(getBlog.title);
      setDescription(getBlog.description);
      let data = valueMaker(getBlog.interstedValue, options);
      setSelected(data);
    }
  }, [params.id, detailofAdd]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (params.id) {
      const updateData = detailofAdd.map((ele) => {
        if (ele.idforcred.toString() === params.id)
          return {
            ...ele,
            title: title,
            description: description,
            interstedValue: selected.map((el) => el.value),
          };
        return ele;
      });

      setDetailOfAdd(updateData);
      setTitle("");
      setDescription("");
      setSelected([]);

      toast.success("Your Blog Edited!");

      localStorage.setItem("BlogData", JSON.stringify(updateData));
      navigate("/home/myblog");
    } else {
      if (selected.some((obj) => obj)) {
        let interstedValue = [];
        selected.forEach((obj) => interstedValue.push(obj.value));

        let dataOfAdd = {
          title,
          description,
          interstedValue,
          // id: JSON.parse(localStorage.getItem("id")),  // problem in second time login
          id: JSON.parse(localStorage.getItem("email")),
          idforcred: Math.trunc(Math.random() * 1000) + 1,
        };
        const totalDataofAdd = [...detailofAdd, dataOfAdd];
        setDetailOfAdd(totalDataofAdd);
        localStorage.setItem("BlogData", JSON.stringify(totalDataofAdd));
        setTitle("");
        setDescription("");
        setSelected([]);
        toast.success("Your Blog Added");
      } else {
        toast.warn("Please Select Topic Related Your Blog!!");
      }
    }
  };

  const onSelected = (data) => {
    setSelected(data);
  };

  return (
    <>
      <div>
        <NavHomes />
        <div className="container my-3 ">
          <h1>{params.id ? "Edit Blog" : "Add Blog"}</h1>
          <form className="my-3">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                style={{ width: "350px" }}
                placeholder="Enter Title"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputDescription1" className="form-label">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                style={{ height: "200px" }}
                className="form-control"
                placeholder="Enter description"
                id="exampleInputDescription1"
              />
            </div>

            <div className="mb-3">
              <h6 className="mb-3">
                Select Topic<span style={{ color: "red" }}> *</span>
              </h6>
              <MultiSelect
                options={options}
                value={selected}
                onChange={onSelected}
                labelledBy="Select"
              />
            </div>
            <button
              type="submit"
              onClick={onSubmit}
              className="btn btn-primary mt-10px"
            >
              {params.id ? "Edit" : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <div>
        <div className="mb-20">
          <p>
            <span style={{ color: "red" }}>*</span>Required Field
          </p>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
