import React, { useState, Component, useEffect, useReducer } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Image,
  Button,
  Form,
  ListGroup,
  Accordion,
} from "react-bootstrap";
import { motion } from "framer-motion";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BackToTopBtn } from "../components/BackToTopBtn";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import {Link} from 'react-router-dom';

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import Axios from 'axios'

// Your render function
// import {ApplicantCard} from '../components/ApplicantCard';
// toast.configure();
export const SearchApplicant = () => {
  const successNotify = () => {
    toast.success("Applied Filter", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  };
  const resetNotify = () => {
    toast.success("Reset Filter", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  };
  const warnNotify = () => {
    toast.warn("Please Enter a Filter", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  };
  const warnNumberNotify = () => {
    toast.warn("Cannot insert number into this field", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  };
  const warnTextNotify = () => {
    toast.warn("Cannot insert text into this field", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  };
  const warnSkillNotify = () => {
    toast.warn("Please enter Major Skill", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  };
  const deleteApplicant = async (_id) => {
    Axios.delete(`https://mongo-cv-api.herokuapp.com/deleteApplicant/${_id}`);
  };

  const [testFetch, setTestFetch] = useState([]);

  const getFile = async (_id) => {
    try {
      const response = await fetch(
        `https://mongo-cv-api.herokuapp.com/applicant/${_id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error! status : ${(response, status)}`);
      }
      const result = await response.json();
      await setTestFetch(result);
      await console.log(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      await setIsLoading(false);
    }
  };
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [bufferData, setBufferData] = useState([]);
  const [datauri, setDataURI] = useState([]);
  const [applicantName, setApplicantName] = useState([]);
  const [currData, setCurrData] = useState([]);
  const [selectedCV, setSelectedCV] = useState("");
  const [currentCV, setCurrentCV] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [expFilter, setExpFilter] = useState("");
  const [currSort, setCurrSort] = useState("");
  const [isMajor, setIsMajor] = useState(true);
  const [sortFilter, setSortFilter] = useState("");
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [value, setValue] = useState("none");
  const [totalApplicant, setTotalApplicant] = useState(0);
  const sortOptions = [
    { value: "none", label: "None" },
    { value: "experience", label: "Experience" },
    { value: "name", label: "Name" },
  ];
  const [selectedOption, setSelectedOption] = useState("");
  const applyFilter = async () => {
    if (
      nameFilter == "" &&
      skillFilter == "" &&
      expFilter == "" &&
      (sortFilter == "" || sortFilter == null || sortFilter == "none")
    ) {
      await warnNotify();
    } else {
      // await setCurrData(data);
      await successNotify();
      if (nameFilter != "") {
        await console.log("apply namefilter");
        await console.log(currData);
        await setSelectedCV(nameFilter);
        let inpLen = nameFilter.length;
        let found = false;
        let temp = [];
        for (let i = 0; i < currData.length; i++) {
          if (
            nameFilter.toLowerCase() ==
            currData[i].name.slice(0, inpLen).toLowerCase()
          ) {
            temp.push(currData[i]);
            found = true;
            console.log("found " + currData[i].name);
          }
        }
        if (found) {
          // currData.length = 0;
          // await setCurrData
          await setCurrData(temp);
          // await console.log(temp)
          setTotalApplicant(temp.length);
          // await forceUpdate();

          // await console.log(currData.length)
        }
      }
      if (skillFilter != "") {
        await console.log("Filter Skill");
        // await console.log(currData);
        let found = false;
        let temp = [];
        let skillLen = skillFilter.length;
        for (let i = 0; i < currData.length; i++) {
          let skillData = currData[i].majorSkill.split(",");
          // console.log(skillData);
          for (let j = 0; j < skillData.length; j++) {
            if (
              skillFilter.toLowerCase() ===
              skillData[j].slice(0, skillLen).toLowerCase()
            ) {
              temp.push(currData[i]);
              console.log("found " + skillData[j]);
              found = true;
              break;
            }
          }
        }

        if (found) {
          // currData.length = 0;
          setCurrData(temp);
          setTotalApplicant(temp.length);
        }
      }
      if (expFilter != "") {
        if (skillFilter != "") {
          await console.log("apply exp filter");

          let found = false;
          let temp = [];
          for (let i = 0; i < currData.length; i++) {
            if (parseInt(expFilter) == currData[i].majorExp) {
              temp.push(currData[i]);
              found = true;
            }
          }
          if (found) {
            // currData.length = 0;
            setCurrData(temp);
            setTotalApplicant(temp.length);
          }
        } else {
          warnSkillNotify();
        }
      }
      if (sortFilter != "" && sortFilter != null && sortFilter != "none") {
        await console.log("sortFilter: " + sortFilter);
        let temp = [];
        if (sortFilter === "name") {
          temp = currData.sort(dynamicSort("name"));
        } else if (sortFilter === "experience") {
          temp = currData.sort(dynamicSort("majorExp"));
        }
        // else if(sortFilter === "default"){
        //   temp = data;
        // }
        await setCurrData(temp);
        await forceUpdate();
      }
    }
    // await renderList();
  };

  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  const handleChange = (value) => {
    setValue(value);
    setSortFilter(value.value);
  };

  const handleClick = async () => {
    // await console.log("reload data");
    setIsLoading(true);
    if (currData.length <= 0) {
      try {
        const response = await fetch(
          "https://mongo-cv-api.herokuapp.com/all-cv",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error! status : ${(response, status)}`);
        }
        const result = await response.json();
        await setData(result);
        setTotalApplicant(result.length);
        // let blob;
        for (let i = 0; i < result.length; i++) {
          currData[i] = result[i];

          applicantName[i] = result[i].name;
        }
        // for (let i = 0; i < result.length; i++) {
        //   console.log("blob start");
        //   blob = base64toBlob(result[i].file);
        //   datauri[i] = URL.createObjectURL(blob);
        // }
      } catch (err) {
        setErr(err.message);
      } finally {
        await setIsLoading(false);
        await console.log(currData);
        console.log(datauri.length);

        // await renderList();
      }
    }
  };

  const getbufferdata = (name) => {
    setApplicantName(name);
    console.log(currData);
    console.log(bufferData);
    console.log(applicantName);
    let inpLen = selectedCV.length;
    for (let i = 0; i < data.length; i++) {
      if (
        selectedCV.toLowerCase() === data[i].name.slice(0, inpLen).toLowerCase()
      ) {
        // const Buffer = require('buffer').Buffer;

        // const buff = Buffer.from(data[i].file);
        // console.log(buff);
        // console.log(buff.toString());
        // setCurrentCV(data[i].file.data);
        // console.log(data[i].file.data);
        break;
      }
    }
  };

  const handleCV = (data) => {
    setCurrentCV(data);
    console.log(data);
  };

  const skillFilterChange = (skill) => {
    setSkillFilter(skill);
    if (skill.length > 0) {
      setIsMajor(false);
    } else {
      setIsMajor(true);
    }
  };

  const resetFilter = async () => {
    await resetFilterOnce();
    await resetFilterOnce();
    await resetNotify();
  };
  const resetFilterOnce = async () => {
    await setIsMajor(true);
    await setNameFilter("");
    await setSkillFilter("");
    await setExpFilter("");
    await setSortFilter(null);
    await setValue(null);
    // await clearList();
    await setCurrData(data);
    await setTotalApplicant(data.length);
    await forceUpdate();

    // await renderList();
    await console.log(currData);
  };

  const hasNumber = (mystring) => {
    return /\d/.test(mystring);
  };
  const hasText = (mystring) => {
    let res = /^\d+$/.test(mystring);
    console.log(mystring + res);
    return /^\d+$/.test(mystring);
  };
  const nameChangeHandle = async (currName) => {
    if (!hasNumber(currName)) {
      await setNameFilter(currName);
      await setSelectedCV(currName);
      // await forceUpdate();
      await console.log(nameFilter);

      // applyFilter();
    } else {
      warnNumberNotify();
    }
  };

  const cvnameChangeHandle = (currName) => {
    if (!hasNumber(currName)) {
      setSelectedCV(currName);
    } else {
      warnNumberNotify();
    }
  };

  const expHandleChange = (exp) => {
    let isnum = /^\d+$/.test(exp);
    if (isnum) {
      setExpFilter(exp);
    } else {
      warnTextNotify();
    }
  };

  const sortChangeHandle = (sort) => {
    setSortFilter(sort);
    // console.log(sort)
  };



  useEffect(() => {
    handleClick();
  }, [data]);

  return (
    <motion.div
      className="searchApp-body mt-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <Container className="filter-panel">
        <Row>
          <Container className="d-flex justify-content-start align-items-bottom">
            <h1>Search Applicant</h1>
          </Container>
        </Row>
        <Accordion
          defaultActiveKey={["0"]}
          alwaysOpen
          className="shadow"
          style={{ borderRadius: "16px" }}
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h5>Filter</h5>
            </Accordion.Header>
            <Accordion.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Label htmlFor="nameFilter">Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="nameFilter"
                      value={nameFilter}
                      onChange={(e) => nameChangeHandle(e.target.value)}
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Form.Label htmlFor="skillFilter">Skill</Form.Label>
                    <Form.Control
                      type="text"
                      id="skillFilter"
                      value={skillFilter}
                      onChange={(e) => skillFilterChange(e.target.value)}
                      // disabled
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Form.Label htmlFor="expFilter">
                      Total relevant experience
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="expFilter"
                      value={expFilter}
                      onChange={(e) => expHandleChange(e.target.value)}
                      // onKeyDown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'"
                      disabled={isMajor}
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Form.Label htmlFor="sortFilter">Sort by</Form.Label>
                    <Select
                      name="sortFilter"
                      id="sortFilter"
                      value={value}
                      options={sortOptions}
                      onChange={handleChange}
                      // isDisabled={(nameFilter > 0)}
                    />
                  </Col>
                </Row>
                <Row className="filter-form mt-3">
                  <Col>
                    <input
                      className="filter-btn"
                      type="button"
                      onClick={applyFilter}
                      value="Apply Filter"
                    ></input>
                  </Col>
                  <Col>
                    <input
                      className="filter-btn"
                      type="reset"
                      value="Reset"
                      onClick={resetFilter}
                    ></input>
                  </Col>
                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Row className="mt-3">
          <h2>Total applicant : {totalApplicant}</h2>
        </Row>
        <Row className="home-main-row mt-3">
          {/* <Col sm={4}> */}
          <Container>
            {currData.map((data) => {
              return (
                <Accordion
                  defaultActiveKey={[data._id]}
                  alwaysOpen
                  className="shadow"
                  style={{ borderRadius: "16px" }}
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <b>Name : {data.name}</b>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <b>Total Experience : {data.totalExp} years</b>
                        <b>GPA : {data.gpa.$numberDecimal}</b>
                        <Row>
                          <b>Technical Expertise</b>
                        </Row>
                        {data.os.length > 0 && (
                          <Row>
                            <Col>Operating System</Col>
                            <Col>
                              <ul>
                                {data.os.map((os) => (
                                  <li>{os}</li>
                                ))}
                              </ul>
                            </Col>
                          </Row>
                        )}
                        {data.pl.length > 0 && (
                          <Row>
                            <Col>Programming Language</Col>
                            <Col>
                              <ul>
                                {data.pl.map((pl) => (
                                  <li>{pl}</li>
                                ))}
                              </ul>
                            </Col>
                          </Row>
                        )}
                        {data.db.length > 0 && (
                          <Row>
                            <Col>Database</Col>
                            <Col>
                              <ul>
                                {data.db.map((db) => (
                                  <li>{db}</li>
                                ))}
                              </ul>
                            </Col>
                          </Row>
                        )}
                        {data.tools.length > 0 && (
                          <Row>
                            <Col>Tools and IDE</Col>
                            <Col>
                              <ul>
                                {data.tools.map((tool) => (
                                  <li>{tool}</li>
                                ))}
                              </ul>
                            </Col>
                          </Row>
                        )}
                        {data.tools.length <= 0 &&
                          data.os.length <= 0 &&
                          data.pl.length <= 0 &&
                          data.db.length <= 0 && (
                            <div>
                              <h5 className="text-danger">None</h5>
                            </div>
                          )}
                          <Row>
                            <Col>
                            Pre-screen Date : {data.prescreenDate}
                            </Col>
                            <Col>
                            Interview Date : {data.interviewDate}
                            </Col>
                            <Col>
                            Availability : {data.startDate}</Col>
                          </Row>
                          <h5 className="mt-1 mb-1">
                              Status : {data.status}
                            </h5>
                      </Row>
                      <Row className="mt-2">
                      <Link to={`/searchApp/${data._id}`} target="_blank" rel="noopener noreferrer">
                        <button className="form-control-btn-upload">View Applicant CV</button>
                        </Link>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              );
            })}
          </Container>
        </Row>
        <BackToTopBtn />
        <ToastContainer />
      </Container>
    </motion.div>
  );
};
