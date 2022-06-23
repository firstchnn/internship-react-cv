import React, { useState, Component, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Image,
  Button,
  Form,
} from "react-bootstrap";
import { motion } from "framer-motion";
import Select from "react-select";
// import {ApplicantCard} from '../components/ApplicantCard';

export const SearchApplicant = () => {
  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [bufferData, setBufferData] = useState([]);
  const [applicantName, setApplicantName] = useState([]);
  const [currData, setCurrData] = useState([]);
  const [selectedCV, setSelectedCV] = useState("");
  const [currentCV, setCurrentCV] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [expFilter, setExpFilter] = useState("");
  const [currSort, setCurrSort] = useState("");
  const [isMajor, setIsMajor] = useState(true);
  const sortOptions = [
    { value: "none", label: "None" },
    { value: "experience", label: "Experience" },
  ];
  const applyFilter = async () => {
    if (nameFilter != "") {
      await console.log(currData);
      await setSelectedCV(nameFilter);
      let found = false;
      let temp = [];
      for (let i = 0; i < currData.length; i++) {
        if (nameFilter.toLowerCase() == currData[i].name.toLowerCase()) {
          temp.push(currData[i]);
          found = true;
        }
      }
      if (found) {
        currData.length = 0;
        // for (let i = 0; i < temp.length; i++) {
        //   currData.push(temp[i]);
        // }
        setCurrData(temp);
      }
    }
    if (skillFilter != "") {
      await console.log("Filter Skill");
      await console.log(currData);
      let found = false;
      let temp = [];
      for (let i = 0; i < currData.length; i++) {
        let skillData = currData[i].majorSkill.split(',');
        for(let j = 0 ; j < skillData.length; j++) {
          if (skillFilter.toLowerCase() === skillData[j].toLowerCase()) {
            temp.push(currData[i]);
            found = true;
            break;
          }
        }
      }
      
      if (found) {
        currData.length = 0;
        // for (let i = 0; i < temp.length; i++) {
        //   await currData.push(temp[i]);
        // }
        setCurrData(temp);
      }
    }
    if (expFilter != "") {
      if (skillFilter != "") {
        let found = false;
        let temp = [];
        for (let i = 0; i < currData.length; i++) {
          if (expFilter == currData[i].majorExp) {
            temp.push(currData[i]);
            found = true;
          }
        }
        if (found) {
          currData.length = 0;
          // for (let i = 0; i < temp.length; i++) {
          //   await currData.push(temp[i]);
          // }
          setCurrData(temp);
        }
      } else {
        alert("Please enter Major Skill");
      }
    }
    // await renderList();
  };

  const handleChange = (sortOptions) => {
    setCurrSort(sortOptions);
  };

  const handleClick = async () => {
    setIsLoading(true);
    if(currData.length <= 0){
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
        for (let i = 0; i < result.length; i++) {
          currData[i] = result[i];
          bufferData[i] = result[i].file;
          applicantName[i] = result[i].name;
        }
      } catch (err) {
        setErr(err.message);
      } finally {
        await setIsLoading(false);
        await console.log(currData);
        
        // await renderList();
      }
    }
  };

  // const clearList = () => {
  //   clearBox("applicants");
  // };
  const clearBox = (elementID) => {
    document.getElementById(elementID).innerHTML = "";
  };
  const getbufferdata = () => {
    console.log(currData);
    console.log(bufferData);
    console.log(applicantName);
    for (let i = 0; i < data.length; i++) {
      if (selectedCV.toLowerCase() === data[i].name.toLowerCase()) {
        setCurrentCV(data[i].file);
      }
    }
  };

  // const renderList = async () => {
  //   await clearBox("applicants");
  //   const html = currData
  //     .map((applicants) => {
  //       return `
  //           <div class="applicants mb-2">
  //           <Card >
  //           <Card.Body>
  //           <Card.Title className="mb-2">${applicants.name}</Card.Title>
  //           <div>
  //           <Card.Text className="mb-2">Working years: ${applicants.totalExp}</Card.Text>
  //           </div>
  //           <div>
  //           <Card.Text className="mb-2">GPA: ${applicants.gpa.$numberDecimal}</Card.Text>
  //           </div>
  //           <div>
  //           <Card.Text className="mb-2">Major Skill: <b>${applicants.majorSkill} ${applicants.majorExp}</b> years</Card.Text>
  //           </div>
  //           <div>
  //           <Card.Text className="mb-2">Category: <b>Web Development</b></Card.Text>
  //           </div>
  //           <div>
  //           <Card.Text className="mb-2">Minor Skill: <b>${applicants.minorSkill} ${applicants.minorExp}</b> years</Card.Text>
  //           </div>
  //           <div>
  //           <Card.Text className="mb-2">Category: <b>Programming</b></Card.Text>
  //           </div>
  //           <div>
  //           <Card.Text>Status: ${applicants.status}</Card.Text>
  //           </div>
  //           </Card.Body>
  //           </Card>
  //                       </div>`;
  //     })
  //     .join("");
  //   await document
  //     .querySelector("#applicants")
  //     .insertAdjacentHTML("afterbegin", html);
  // };

  const skillFilterChange = (skill)  => {
    setSkillFilter(skill);
    if(skill.length > 0) {
      setIsMajor(false);
    }else{
      setIsMajor(true);
    }
  }

  const resetFilter = async () => {
    await setIsMajor(true);
    // await clearList();
    await setCurrData(data);
    // await renderList();
  };


  const hasNumber = (mystring) => {
    return /\d/.test(mystring);
  }
  const hasText = (mystring) => {
    let res = /^\d+$/.test(mystring)
    console.log(mystring + res);
    return /^\d+$/.test(mystring);
  }
  const nameChangeHandle = (currName) => {
    if(!hasNumber(currName)){
      setNameFilter(currName);
      setSelectedCV(currName);
    }else{
      alert("Cannot insert number into this field");
    }
  }

  const cvnameChangeHandle = (currName) => {
    if(!hasNumber(currName)){
      setSelectedCV(currName);
    }else{
      alert("Cannot insert number into this field");
    }
    
  }

  useEffect(() => {
    handleClick();
  },[currData])

  return (
    <motion.div
      className="searchApp-body mt-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <Container>
        <Row>
        <Container className="d-flex justify-content-start align-items-center">
            <h1>Search Applicant</h1>
          </Container>
        </Row>
        <Row className="filter-row">
          <Container className="filter-panel">
            <Row>
              <Container className="d-flex justify-content-start">
                <h3>Filter</h3>
              </Container>
            </Row>
            <Row>
              <Form className="filter-form">
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
                    <Form.Label htmlFor="skillFilter">Major Skill</Form.Label>
                    <Form.Control
                      type="text"
                      id="skillFilter"
                      onChange={(e) => skillFilterChange(e.target.value)}
                      // disabled
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Form.Label htmlFor="expFilter">
                      Total relevant experience
                    </Form.Label>
                    <Form.Control
                      type="number"
                      id="expFilter"
                      min={0}
                      max={100}
                      step={1}
                      onChange={(e) => expHandleChange(e.target.value)}
                      // onKeyDown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'"
                      disabled={isMajor}
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Form.Label htmlFor="sortFilter">Sort by</Form.Label>
                    <Select
                      options={sortOptions}
                      name="sortFilter"
                      id="sortFilter"
                      onChange={handleChange}
                      isDisabled={true}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
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
            </Row>
          </Container>
        </Row>
        <Row className="home-main-row">
          <Col sm={4}>
            <div>
              {currData.map((data) => {
                return (
                  <div className="mt-3 mb-3" key={data._id}>
                    <Card className="AppList">
                      <Card.Body>
                        <Card.Title>
                          Name : {data.name}
                        </Card.Title>
                        <div>
                          <Card.Text>
                          Total experience : {data.totalExp} years
                          </Card.Text>
                          <div>
                            <Card.Text>
                              GPA : {data.gpa.$numberDecimal}
                            </Card.Text>
                          </div>
                          <div>
                            <Card.Title>
                              Technical Expertise
                            </Card.Title>
                              { data.os.length > 0 &&
                              (<div>
                                Operating System : <ul>{data.os.map((os) => <li>{os}</li>)}</ul>
                              </div>)}
                              {data.pl.length > 0 && (
                                <div>
                                Programming Language : <ul>{data.pl.map((pl) => <li>{pl}</li>)}</ul>
                              </div>
                              )}
                              {data.db.length > 0 && (
                                <div>
                                Database : <ul>{data.db.map((db) => <li>{db}</li>)}</ul>
                              </div>
                              )}
                              {data.tools.length > 0 && (
                                <div>
                                Tools and IDE : <ul>{data.tools.map((tool) => <li>{tool}</li>)}</ul>
                              </div>
                              )}
                              <Card.Text>
                                Pre-screen Date : {data.prescreenDate}
                              </Card.Text>
                              <Card.Text>
                                Interview Date : {data.interviewDate}
                              </Card.Text>
                              <Card.Text>
                                Availability : {data.startDate}
                              </Card.Text>
                              <Card.Text>
                                Status : {data.status}
                              </Card.Text>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                )
              })}
            </div>

          </Col>
          <Col sm={8}>
            <Row className="search-cv d-flex justify-content-start align-items-center mb-4">
              <Col sm={2}>
              <Container></Container>
              </Col>
              <Col sm={5} className="ml-4">
              <Form>
                  <Form.Label htmlFor="applicant_cv">Applicant Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="applicant_cv"
                    value={selectedCV}
                    onChange={(e) => cvnameChangeHandle(e.target.value)}
                  ></Form.Control>
              </Form>
              </Col>
              <Col sm={4}>
              <input type="button" className="cv-btn" onClick={getbufferdata} value="Display CV"></input>
              </Col>
            </Row>
            <Row>
              <div className="viewer">
                {currentCV != "" && (
                  <embed
                    className="pdf-viewer"
                    src={`data:application/pdf;base64,${currentCV}`}
                  />
                )}
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};
