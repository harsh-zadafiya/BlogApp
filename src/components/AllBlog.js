import { BsSave2 } from "react-icons/bs";
import { BsFillSaveFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GridBox } from "./MyBlog";
import "../css/noBlog.css";
import { MultiSelectCss } from "./Profile";

const AllBlog = () => {
  const options = [
    { label: "Sport", value: "Sport" },
    { label: "Food", value: "Food" },
    { label: "Travel", value: "Travel" },
    { label: "Fashion", value: "Fashion" },
    { label: "Health", value: "Health" },
  ];
  const [allData, setAllData] = useState([]); // Duplicate
  const [getDataAdd, setGetDataAdd] = useState([]); //all Data
  const [isRefresh, setIsRefresh] = useState(true);
  const [selected, setSelected] = useState([]); // handleChange interested
  const [search, setSearch] = useState(""); //handleChange title
  const [alreadyInpFilter, setAlreadyInpFilter] = useState([]); // already  title
  const [alreadySelFilter, setAlreadySelFilter] = useState([]); //already interested

  const navigate = useNavigate();

  const getInterest = JSON.parse(localStorage.getItem("loggedUser"));
  const getmail = JSON.parse(localStorage.getItem("email"));

  // Filter Data as per Interest and Add

  useEffect(() => {
    const getInterest = JSON.parse(localStorage.getItem("loggedUser"));
    const dataFromAdd = JSON.parse(localStorage.getItem("BlogData"));
    const getmail = JSON.parse(localStorage.getItem("email"));

    if (getInterest) {
      if (dataFromAdd) {
        let filteredData = [];
        const selfBlog = dataFromAdd.filter((el) => el.id === getmail);

        const withOutId = dataFromAdd.filter((el) => el.id !== getmail);

        withOutId.forEach((el) => {
          el.interstedValue.forEach((element) => {
            if (getInterest.interstedValue.includes(element)) {
              filteredData.push(el);
            }
          });
        });

        setGetDataAdd([...selfBlog, ...filteredData]);
        setAllData([...selfBlog, ...filteredData]);
      }
    }
  }, []);

  // Saved Data into saveBlog

  const handleClickofSave = (idforcred) => {
    const arr = [];
    const getDataofAllUser = JSON.parse(localStorage.getItem("detail"));
    const getmail = JSON.parse(localStorage.getItem("email"));

    getDataofAllUser.forEach((data) => {
      if (data.email === getmail) {
        let currentUser = data;
        if (currentUser.blogId && Array.isArray(currentUser.blogId)) {
          if (!data.blogId.includes(idforcred)) {
            toast.success("Bloged Saved");
            currentUser.blogId.push(idforcred);
          } else {
            toast.warn("Bloged Unsaved");
            const updateData = currentUser.blogId.filter((index) => {
              return idforcred !== index;
            });
            currentUser.blogId = updateData;
          }
          localStorage.setItem("loggedUser", JSON.stringify(currentUser));
        } else {
          currentUser.blogId = [idforcred];
        }
        arr.push(currentUser);
      } else {
        arr.push(data);
      }
    });

    localStorage.setItem("detail", JSON.stringify(arr));
    setIsRefresh(!isRefresh);
  };

  // Search Filter handle onCHnage

  const handleOnSearch = (e) => {
    setSearch(e.target.value);
    filteredData.handleOnSearch = e.target.value;

    filteredData();
  };
  const onSelect = (obj) => {
    setSelected(obj);

    filteredData(obj);
  };

  const filteredData = (obj) => {
    let blogs = [...allData];

    if (blogs) {
      const arr = [];
      const id = [];
      if (filteredData.handleOnSearch) {
        let inputFilter = [];
        if (alreadySelFilter.length !== 0) {
          blogs = alreadySelFilter.filter((data) => {
            return data.title
              .toLowerCase()
              .includes(filteredData.handleOnSearch.toLowerCase());
          });
          inputFilter = blogs;
        } else {
          blogs = blogs.filter((data) => {
            return data.title
              .toLowerCase()
              .includes(filteredData.handleOnSearch.toLowerCase());
          });
          inputFilter = blogs;
        }
        setAlreadyInpFilter(inputFilter);
      }
      if (filteredData.handleOnSearch === undefined || search.length !== 0) {
        if (obj) {
          if (obj.length !== 0) {
            blogs.forEach((data) => {
              obj.forEach((item) => {
                if (data.interstedValue.includes(item.value)) {
                  if (!id.includes(data.idforcred)) {
                    arr.push(data);
                    id.push(data.idforcred);
                  }
                }
              });
            });
            blogs = arr;
          }
        } else {
          if (selected.length !== 0) {
            blogs.forEach((data) => {
              selected.forEach((item) => {
                if (data.interstedValue.includes(item.value)) {
                  if (!id.includes(data.idforcred)) {
                    arr.push(data);
                    id.push(data.idforcred);
                  }
                }
              });
            });
            blogs = arr;
          }
        }
      } else {
        if (selected.length !== 0) {
          blogs.forEach((data) => {
            selected.forEach((item) => {
              if (data.interstedValue.includes(item.value)) {
                if (!id.includes(data.idforcred)) {
                  arr.push(data);
                  id.push(data.idforcred);
                }
              }
            });
          });
          blogs = arr;
        }
      }
      if (obj) {
        if (search.length === 0) {
          setAlreadySelFilter(allData);
          setAlreadyInpFilter([]);
        }
        if (obj.length > 0) {
          if (search.length !== 0) {
            const itemsArr = [];
            const itemsId = [];
            alreadyInpFilter.forEach((data) => {
              obj.forEach((item) => {
                if (data.interstedValue.includes(item.value)) {
                  if (!itemsId.includes(data.idforcred)) {
                    itemsArr.push(data);
                    itemsId.push(data.idforcred);
                  }
                }
              });
            });
            blogs = itemsArr;
          } else {
            blogs.forEach((data) => {
              obj.forEach((item) => {
                if (data.interstedValue.includes(item.value)) {
                  if (!id.includes(data.idforcred)) {
                    arr.push(data);
                    id.push(data.idforcred);
                  }
                }
              });
            });
            blogs = arr;
          }
          setAlreadySelFilter([]);
        }
        if (obj.length === 0) {
          if (search !== 0) {
            blogs = allData.filter((data) => {
              return data.title.toLowerCase().includes(search.toLowerCase());
            });
          }
        }
      }
      setGetDataAdd(blogs);
    }
  };

  //editData

  const handleEdit = (idforcred) => {
    navigate(`/home/addblog/${idforcred}`);
  };

  // Render Data
  return (
    <>
      <div>
        <div className="input-group  mt-3 mb-5">
          <div className="form-outline">
            <input
              type="search"
              id="form1"
              value={search}
              onChange={handleOnSearch}
              placeholder="Search topic"
              className="form-control mt-4"
            />
          </div>

          <div className="form-outline mx-5">
            <MultiSelectCss
              type="search"
              options={options}
              value={selected}
              onChange={onSelect}
              labelledBy="Select As Per Interest"
            />
          </div>
        </div>

        {getDataAdd.length !== 0 ? (
          <>
            <div>
              <div>
                {getDataAdd.map((elem, id) => {
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

                        {elem.id === getmail && (
                          <FiEdit
                            cursor="pointer"
                            onClick={() => {
                              handleEdit(elem.idforcred);
                            }}
                            style={{
                              height: "25px",
                              width: "25px",
                            }}
                          />
                        )}

                        {getInterest.blogId &&
                        getInterest.blogId.indexOf(elem.idforcred) > -1 ? (
                          <BsFillSaveFill
                            className="ms-4"
                            onClick={() => {
                              handleClickofSave(elem.idforcred);
                            }}
                            cursor="pointer"
                            style={{
                              height: "25px",
                              width: "25px",
                            }}
                          />
                        ) : (
                          <BsSave2
                            className="ms-4"
                            onClick={() => {
                              handleClickofSave(elem.idforcred);
                            }}
                            cursor="pointer"
                            style={{
                              height: "25px",
                              width: "25px",
                            }}
                          />
                        )}
                      </div>
                    </GridBox>
                  );
                })}
              </div>
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

export default AllBlog;
