import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { GridBox } from "./MyBlog";

const MyBlog = () => {
  const [getDataAdd, setGetDataAdd] = useState([]);

  useEffect(() => {
    const dataFromAdd = localStorage.getItem("BlogData");
    if (dataFromAdd !== null) setGetDataAdd(JSON.parse(dataFromAdd));
  }, []);

  const handleDelete = (index) => {
    const updatedData = getDataAdd.filter((elem) => {
      return index !== elem.idforcred;
    });
    setGetDataAdd(updatedData);
    localStorage.setItem("BlogData", JSON.stringify(updatedData));
    toast.success("Blog Deleted");
  };
  return (
    <>
      <div>
        <div>
          <div>
            {getDataAdd.map((elem, id) => {
              return (
                <GridBox
                  key={id}
                  className="card mt-5"
                  style={{ width: "25rem", border: "solid black" }}
                >
                  <div className="card-body">
                    <h4 className="card-title mb-4">{elem.title}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Topic : {elem.interstedValue + ""}
                    </h6>
                    <p className="card-text">{elem.description}</p>

                    <MdDelete
                      cursor="pointer"
                      onClick={() => {
                        handleDelete(elem.idforcred);
                      }}
                      style={{ height: "25px", width: "25px" }}
                    />
                  </div>
                </GridBox>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBlog;
