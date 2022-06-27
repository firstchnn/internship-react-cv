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
} from "react-bootstrap";
import { motion } from "framer-motion";
import Select from "react-select";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// import {ApplicantCard} from '../components/ApplicantCard';
// toast.configure();
export const SearchApplicant = () => {
  const successNotify = () => {
    toast.success('Applied Filter', {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1500})
  }
  const resetNotify = () => {
    toast.success('Reset Filter', {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1500})
  }
  const warnNotify = () => {
    toast.warn('Please Enter a Filter', {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1500})
  }
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
  const [sortFilter, setSortFilter] = useState("");
  const [ignored, forceUpdate] = useReducer(x => x+1,0);
  const [value, setValue] = useState("none");
  const sortOptions = [
    { value: "none", label: "None" },
    { value: "experience", label: "Experience" },
    { value: "name", label: "Name"},
  ];
const [selectedOption, setSelectedOption] = useState("");
  const applyFilter = async () => {
    if((nameFilter == "") && (skillFilter == "") && (expFilter == "") && (sortFilter == "")){
      await warnNotify();
    }else{
      await successNotify();
      if (nameFilter != "") {
        await console.log("apply namefilter");
        await setSelectedCV(nameFilter);
        let inpLen = nameFilter.length;
        let found = false;
        let temp = [];
        for (let i = 0; i < currData.length; i++) {
          if (nameFilter.toLowerCase() == currData[i].name.slice(0,inpLen).toLowerCase()) {
            temp.push(currData[i]);
            found = true;
            console.log("found " + currData[i].name)
          }
        }
        if (found) {
          // currData.length = 0;
          // await setCurrData
          await setCurrData(temp);
          
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
          let skillData = currData[i].majorSkill.split(',');
          // console.log(skillData);
          for(let j = 0 ; j < skillData.length; j++) {
            if (skillFilter.toLowerCase() === skillData[j].slice(0,skillLen).toLowerCase()) {
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
        }
      }
      if (expFilter != "") {
        if (skillFilter != "") {
          await console.log("apply exp filter");

          let found = false;
          let temp = [];
          for (let i = 0; i < currData.length; i++) {
            if (expFilter == currData[i].majorExp) {
              temp.push(currData[i]);
              found = true;
            }
          }
          if (found) {
            // currData.length = 0;
            setCurrData(temp);
          }
        } else {
          alert("Please enter Major Skill");
        }
      }
      if(sortFilter != "" && sortFilter != "none" ){
        await console.log("sortFilter: " + sortFilter);
        let temp = [];
        if(sortFilter === "name"){
          temp = currData.sort(dynamicSort("name"));
        }else if(sortFilter === "experience"){
          temp = currData.sort(dynamicSort("majorExp"));
        }
        await setCurrData(temp);
        await forceUpdate();
      };
    }
    // await renderList();
  };

  function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
  

const handleChange = (value) => {
  setValue(value);
  setSortFilter(value.value);
};

  const handleClick = async () => {
    // await console.log("reload data");
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


  const getbufferdata = () => {
    console.log(currData);
    console.log(bufferData);
    console.log(applicantName);
    let inpLen = selectedCV.length;
    for (let i = 0; i < data.length; i++) {
      if (selectedCV.toLowerCase() === data[i].name.slice(0,inpLen).toLowerCase()) {
        setCurrentCV(data[i].file);
      }
    }
  };


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
    await setNameFilter("");
    await setSkillFilter("");
    await setExpFilter("");
    await setSortFilter(null);
    await setValue(null)
    // await clearList();
    await setCurrData(data);
    await forceUpdate();
    await resetNotify();  
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
  const nameChangeHandle = async (currName) => {
    if(!hasNumber(currName)){
      await setNameFilter(currName);
      await setSelectedCV(currName);
      // await forceUpdate();
      await console.log(nameFilter);
      
            // applyFilter();
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

  const expHandleChange = (exp) => {
    if(hasText(exp)){
      setExpFilter(exp);
    }else{
      alert("Cannot insert text into this field");
    }
  }

  const sortChangeHandle = (sort) => {
    setSortFilter(sort);
    // console.log(sort)
  }

  useEffect(() => {
    handleClick();
  },[data])

  return (
    <motion.div
      className="searchApp-body mt-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <Container className="filter-panel">
        <Row>
        <Container className="d-flex justify-content-start align-items-center">
            <h1>Search Applicant</h1>
          </Container>
        </Row>
        <Row className="filter-row shadow-lg">
          <Container className="filter-panel">
            <Row>
              <Container className="d-flex justify-content-start">
                <h3>Filter</h3>
              </Container>
            </Row>
            <Row>
              <Form >
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
                      type="number"
                      id="expFilter"
                      min={0}
                      max={100}
                      step={1}
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
                      isDisabled={(nameFilter > 0)}
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
            </Row>
          </Container>
        </Row>
        <Row className="home-main-row">
          <Col sm={4}>
            <div>
              {currData.map((data) => {
                return (
                    <Card className="Applist mt-3 mb-3 shadow-lg" key={data._id}>
                      <Card.Header>
                        <h5 className="mt-1 mb-1">
                        Name : {data.name}
                        </h5>
                      </Card.Header>
                      <Card.Body>
                          <ListGroup>
                          <ListGroup.Item>
                          <Card.Subtitle className="mt-1 mb-1">
                          Total experience : {data.totalExp} years | GPA : {data.gpa.$numberDecimal}
                          </Card.Subtitle>
                          </ListGroup.Item>
                            <ListGroup.Item>
                            <Card.Title>
                              Technical Expertise
                            </Card.Title>
                            
                              { data.os.length > 0 &&
                              (
                                <Row>
                              <Col >
                              Operating System
                              </Col>
                              <Col >
                              <ul>{data.os.map((os) => <li>{os}</li>)}</ul>
                              </Col>
                            </Row>
                              )}
                              {data.pl.length > 0 && (
                              <Row>
                              <Col >
                              Programming Language
                              </Col>
                              <Col >
                              <ul>{data.pl.map((pl) => <li>{pl}</li>)}</ul>
                              </Col>
                            </Row>
                              )}
                              {data.db.length > 0 && (
                              <Row>
                              <Col >
                              Database
                              </Col>
                              <Col >
                              <ul>{data.db.map((db) => <li>{db}</li>)}</ul>
                              </Col>
                            </Row>
                              )}
                              {data.tools.length > 0 && (
                              <Row>
                              <Col >
                              Tools and IDE
                              </Col>
                              <Col >
                              <ul>{data.tools.map((tool) => <li>{tool}</li>)}</ul>
                              </Col>
                            </Row>
                              )}
                              {data.tools.length <= 0 && data.os.length <= 0 && data.pl.length <= 0 && data.db.length <= 0 && (
                                <div>
                                  <h5 className="text-danger">None</h5>
                                </div>
                              )
                              }
                              <div>
                                  <h5 >Total Relevant Experience : {data.majorExp}</h5>
                                </div>
                            </ListGroup.Item>
                              <ListGroup.Item>
                              <Card.Text>
                                Pre-screen Date : {data.prescreenDate}
                              </Card.Text>
                              </ListGroup.Item>
                              <ListGroup.Item>
                              <Card.Text>
                                Interview Date : {data.interviewDate}
                              </Card.Text>
                              </ListGroup.Item>
                              <ListGroup.Item>
                              <Card.Text>
                                Availability : {data.startDate}
                              </Card.Text>
                              </ListGroup.Item>
                          </ListGroup>
                      </Card.Body>
                      <Card.Footer >
                              
                              <h5 className="mt-1 mb-1">
                              Status : {data.status}
                              </h5>
                              </Card.Footer>
                    </Card>
                )
              })}
            </div>

          </Col>
          <Col sm={8}>
            <Row className="search-cv align-items-center mb-4 shadow-lg">
              <Col sm={2}>
              </Col>
              <Col sm={5} className="ml-4">
              <Form className="filter-form">
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
                    className="pdf-viewer shadow-lg"
                    src={`data:application/pdf;base64,${currentCV}`}
                  />
                )}
              </div>
            </Row>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </motion.div>
  );
};
