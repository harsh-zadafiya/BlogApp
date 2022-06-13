import React, { useEffect, useState } from "react";
import { BsFillSaveFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { GridBox } from "./MyBlog";
import "../css/noBlog.css";

const SavedBlog = () => {
  const [getDatafromLs, setGetDatafromLs] = useState([]);
  const [getDataofAllUser, setGetDataofAllUser] = useState([]);

  const [saveData, setSaveData] = useState([]);
  const getmail = JSON.parse(localStorage.getItem("email"));

  useEffect(() => {
    const datafromLs = localStorage.getItem("BlogData");
    if (datafromLs) setGetDatafromLs(JSON.parse(datafromLs));

    const datafromLsofUser = localStorage.getItem("detail");
    if (datafromLsofUser) setGetDataofAllUser(JSON.parse(datafromLsofUser));
  }, []);

  useEffect(() => {
    const arr = [];
    getDataofAllUser.forEach((element) => {
      if (getmail === element.email) {
        if (element.blogId && Array.isArray(element.blogId)) {
          getDatafromLs.forEach((ele) => {
            if (element.blogId.includes(ele.idforcred)) {
              arr.unshift(ele);
            }
          });
        }
      }
      setSaveData(arr);
    });
  }, [getDatafromLs, getDataofAllUser, getmail]);

  const handleClickofUnsave = (idforcred) => {
    const arr = [];
    setSaveData((prev) => {
      return prev.filter((data) => {
        return idforcred !== data.idforcred;
      });
    });

    getDataofAllUser.forEach((data) => {
      if (data.email === getmail) {
        let currentUser = data;
        if (currentUser.blogId && Array.isArray(currentUser.blogId)) {
          if (data.blogId.includes(idforcred)) {
            const updateData = currentUser.blogId.filter((index) => {
              return idforcred !== index;
            });

            toast.warn("Bloged Unsaved");
            currentUser.blogId = updateData;
            arr.push(currentUser);

            localStorage.setItem("loggedUser", JSON.stringify(currentUser));
          }
        }
      } else {
        arr.push(data);
      }
    });

    localStorage.setItem("detail", JSON.stringify(arr));
  };

  return (
    <>
      <div>
        {saveData.length !== 0 ? (
          <>
            <div>
              {saveData.map((elem, id) => {
                return (
                  <GridBox
                    // key={elem.idforcred}
                    key={id}
                    className="card mb-4 mt-5"
                    style={{ width: "25rem", border: "solid black" }}
                  >
                    <div className="card-body">
                      <h4 className="card-title mb-4">{elem.title}</h4>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Topic : {elem.interstedValue + ""}
                      </h6>
                      <p className="card-text">{elem.description}</p>
                      <BsFillSaveFill
                        onClick={() => {
                          handleClickofUnsave(elem.idforcred);
                        }}
                        cursor="pointer"
                        style={{
                          height: "25px",
                          width: "25px",
                        }}
                      />
                    </div>
                  </GridBox>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="page-heading">
              <h1>No Blogs</h1>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SavedBlog;
