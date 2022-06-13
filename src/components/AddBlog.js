import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { valueMaker } from "../services/helper";
import { ButtonCss, BoxWrap, Heading, InputCss } from "./Login";
import { MultiSelectCss } from "./Profile";
// import { addDoc, collection } from "firebase/firestore";
// import { db } from "./firebase-config";

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

  // firebase >>>>>>>>
  // const blogCollection = collection(db, "allBlog");

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   if (selected.some((obj) => obj)) {
  //     await addDoc(blogCollection, {
  //       title,
  //       description,
  //       interestedValue: selected.map((el) => el.value),
  //       id: JSON.parse(localStorage.getItem("email")),
  //       idforcred: Math.trunc(Math.random() * 1000) + 1,
  //     });
  //     setTitle("");
  //     setDescription("");
  //     setSelected([]);
  //     toast.success("Your Blog Added");
  //   } else {
  //     toast.warn("Please Select Topic Related Your Blog!!");
  //   }
  // };

  // localstorage >>>>>>

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
        <BoxWrap
          style={{
            margin: "30px auto 0 auto",
            maxWidth: "550px",
            maxHeight: "1000px",
          }}
        >
          <div>
            {" "}
            <div className="container my-3 ">
              <Heading>{params.id ? "Edit Blog" : "Add Blog"}</Heading>
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <InputCss
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    style={{ width: "350px" }}
                    placeholder="Enter Title"
                    className="form-control"
                    id="addexampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputDescription1"
                    className="form-label"
                  >
                    Description
                  </label>
                  <InputCss
                    type="text"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    style={{ height: "200px" }}
                    className="form-control"
                    placeholder="Enter description"
                    id="addexampleInputDescription1"
                  />
                </div>

                <div className="mb-3">
                  <h6 className="mb-3">
                    Select Topic<span style={{ color: "red" }}> *</span>
                  </h6>
                  <MultiSelectCss
                    options={options}
                    value={selected}
                    onChange={onSelected}
                    labelledBy="Select"
                  />
                </div>
                <ButtonCss type="submit" onClick={onSubmit}>
                  {params.id ? "Edit" : "Submit"}
                </ButtonCss>
              </form>
              <div className="mb-20">
                <p>
                  <span style={{ color: "red" }}>*</span>Required Field
                </p>
              </div>
            </div>
          </div>
        </BoxWrap>
      </div>
      <div></div>
    </>
  );
};

export default AddBlog;
