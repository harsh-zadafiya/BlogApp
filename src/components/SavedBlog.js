import React, { useEffect, useState } from "react";
import NavHomes from "./NavHomes";
import BlogData from "./BlogData";
import { BsFillSaveFill } from "react-icons/bs";
import { toast } from "react-toastify";

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
              arr.push(ele);
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
    console.log(saveData);

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
            console.log(currentUser);
          }
        }
      } else {
        arr.push(data);
      }
    });
    // setSaveData(saveData.reverse());
    // console.log(saveData);
    localStorage.setItem("detail", JSON.stringify(arr));
  };

  return (
    <>
      <div>
        <NavHomes />

        {saveData.length !== 0 ? (
          <>
            <div>
              <div>
                {saveData.map((elem, id) => {
                  return (
                    <>
                      <div>
                        <div>
                          <BlogData
                            title={elem.title}
                            interstedValue={elem.interstedValue}
                            description={elem.description}
                          />
                        </div>
                        <div className="mb-5">
                          <BsFillSaveFill
                            onClick={() => {
                              handleClickofUnsave(elem.idforcred);
                            }}
                            cursor="pointer"
                            style={{
                              height: "25px",
                              width: "25px",
                              marginLeft: "450px",
                            }}
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-5">
              <p
                className="fs-2"
                style={{
                  textAlign: "center",
                }}
              >
                No Blogs
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SavedBlog;
