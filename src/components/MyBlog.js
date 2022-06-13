import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../css/noBlog.css";
// import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";

export const GridBox = styled.div`
  float: left;
  width: 49%;
  margin-right: 20px;
  min-height: 400px;
  background: #fffff7;
  box-shadow: 4px 2px 16px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  padding: 25px;
  color: #414141;
`;

const MyBlog = () => {
  const [getDataAdd, setGetDataAdd] = useState([]);

  const navigate = useNavigate();

  //localstorage ..........

  useEffect(() => {
    const dataFromAdd = JSON.parse(localStorage.getItem("BlogData"));
    const getmail = JSON.parse(localStorage.getItem("email"));
    if (dataFromAdd) {
      const filterdData = dataFromAdd.filter((ele) => ele.id === getmail);

      setGetDataAdd(filterdData);
    }
  }, []);

  //firebase.........

  // useEffect(() => {
  //   const getmail = JSON.parse(localStorage.getItem("email"));
  //   const blogCollection = collection(db, "allBlog");
  //   const getDataFromFb = async () => {
  //     const dataOfMyBlog = await getDocs(blogCollection);

  //     const data = dataOfMyBlog.docs.map((item) => ({
  //       ...item.data(),
  //       idforcred: item.id,
  //     }));

  //     const filterdData = data.filter((ele) => ele.id === getmail);

  //     setGetDataAdd(filterdData);
  //   };

  //   getDataFromFb();
  // }, []);
  // console.log(getDataAdd, "dtaaa of all");

  const handleDelete = (index) => {
    //firebase.........

    // const blogCollection = doc(db, "allBlog", idforcred);
    // deleteDoc(blogCollection);

    // toast.success("Blog Deleted");

    // using localstorage >>>>>>>>>>>>>.

    const updatedData = getDataAdd.filter((elem) => {
      return index !== elem.idforcred;
    });
    setGetDataAdd(updatedData);
    localStorage.setItem("BlogData", JSON.stringify(updatedData));
    toast.success("Blog Deleted");
  };
  const handleEdit = (idforcred) => {
    navigate(`/home/addblog/${idforcred}`);
  };

  return (
    <>
      <div>
        <div>
          {getDataAdd.length !== 0 ? (
            <div>
              {getDataAdd.map((elem, id) => {
                return (
                  <GridBox
                    key={id}
                    className="card mb-4 mt-5"
                    style={{ width: "25rem", border: "solid black" }}
                  >
                    <div className="card-body">
                      <h4 className="card-title mb-4">{elem.title}</h4>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Topic : {elem.interestedValue + ""}
                      </h6>
                      <p className="card-text">{elem.description}</p>
                      <FiEdit
                        cursor="pointer"
                        onClick={() => {
                          handleEdit(elem.idforcred);
                        }}
                        style={{ height: "25px", width: "25px" }}
                      />
                      <MdDelete
                        cursor="pointer"
                        onClick={() => {
                          handleDelete(elem.idforcred);
                        }}
                        style={{ height: "25px", width: "25px" }}
                        className="ms-4"
                      />
                    </div>
                  </GridBox>
                );
              })}
            </div>
          ) : (
            <>
              <div className="page-heading">
                <h1>No Blogs</h1>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MyBlog;
