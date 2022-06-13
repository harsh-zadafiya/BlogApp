// import React, { useState, useEffect } from "react";
import React from "react";
// import { FiEdit } from "react-icons/fi";

const BlogData = ({ title, interstedValue, description }) => {
  // const [getDataAdd, setGetDataAdd] = useState([]);

  // useEffect(() => {
  //   const dataFromAdd = localStorage.getItem("BlogData");
  //   if (dataFromAdd !== null) setGetDataAdd(JSON.parse(dataFromAdd));
  // }, []);
  // const handleEdit = (e) => {
  //   e.preventDefault();
  // };

  return (
    <>
      <div>
        <>
          <div
            className="card mb-2"
            style={{ width: "30rem", border: "solid black" }}
          >
            <div className="card-body">
              <h4 className="card-title mb-4">{title}</h4>
              <h6 className="card-subtitle mb-2 text-muted">
                Topic : {interstedValue + ""}
              </h6>
              <p className="card-text">{description}</p>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default BlogData;
