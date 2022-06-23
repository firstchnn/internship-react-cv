import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Image,
  Button,
  ThemeProvider,
  FloatingLabel,
} from "react-bootstrap";
import { motion } from "framer-motion";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageToText from "../components/ImageToText";
import PdfToText from "../components/PdfToText";
import Form from "react-bootstrap/Form";
export const NewApplicant = () => {
  const getLanguage = () => {
    var e = document.getElementById("langSkill");
    var lang = e.value;
    console.log(lang);
  };

  const langOptions = [
    { value: "English", label: "English" },
    { value: "Chinese", label: "Chinese" },
    { value: "Arabic", label: "Arabic" },
    { value: "Bengali", label: "Bengali" },
    { value: "German", label: "German" },
    { value: "Hindi", label: "Hindi" },
    { value: "Japanese", label: "Japanese" },
    { value: "Korean", label: "Korean" },
    { value: "Malay", label: "Malay" },
    { value: "Protuguese", label: "Protuguese" },
    { value: "Russian", label: "Russian" },
    { value: "Spanish", label: "Spanish" },
    { value: "Others", label: "Others" },
  ];

  const proficientOptions = [
    { value: "Native", label: "Native" },
    { value: "Fluent", label: "Fluent" },
    { value: "Proficient", label: "Proficient" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Beginner", label: "Beginner" },
  ];

  const statusOptions = [
    { value: "Not interested", label: "Not interested" },
    { value: "Not Qualified", label: "Not Qualified" },
    { value: "Qualified", label: "Qualified" },
    { value: "Selected", label: "Selected" },
  ];

  const resetForm = () => {
    document.getElementById("newApp-form").reset();
  };

  const getSelect = () => {
    const e = document.getElementById("langSkill");
    const lang = e.value;
    console.log(lang);
  };

  const [currName, setCurrName] = useState("");
  const hasNumber = (mystring) => {
    return /\d/.test(mystring);
  }
  const nameChangeHandle = (currName) => {
    if(!hasNumber(currName)){
      setCurrName(currName);
    }else{
      alert("Cannot insert number into this field");
    }
    
  }

  const completeAlert = () => {
    alert("Add new Applicant complete");
  }

  const [skillData, setSkillData] = useState([]);
  const [majorCategory, setMajorCategory] = useState("");
  const [minorCategory, setMinorCategory] = useState("");
  
  const getSkill = async() => {
    try {
      const response = await fetch(
        "https://mongo-cv-api.herokuapp.com/all-skill",
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
      for (let i = 0; i < result.length; i++) {
        skillData[i] = result[i];
      }
    } catch (err) {
      setErr(err.message);
    } finally {
      await console.log(skillData);
    }
  }

  const handleMajorChange = (e) => {
    let skill = e.split(',');
    console.log(skill);
    let cat = [];
    for(let i = 0; i < skill.length; i++) {
      for(let j = 0; j < skillData.length; j++) {
        if(skill[i].toLowerCase() === skillData[j].skill.toLowerCase()) {
          cat[i] = skillData[j].category;
          break;
        }else{
          cat[i] = "Not Found";
        }
      }
    }
    console.log(cat);
    setMajorCategory(cat.join(', '))
    
  }

  const handleMinorChange = (e) => {
    let skill = e.split(',');
    console.log(skill);
    let cat = [];
    for(let i = 0; i < skill.length; i++) {
      for(let j = 0; j < skillData.length; j++) {
        if(skill[i].toLowerCase() === skillData[j].skill.toLowerCase()) {
          cat[i] = skillData[j].category;
          break;
        }else{
          cat[i] = "Not Found";
        }
      }
    }
    console.log(cat);
    setMinorCategory(cat.join(', '))
  }

  const isUpper = (str) => {
    return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}

  // const handleSubmit = async (e) => {
  //   console.log(currName);
  //   e.preventDefault();
  //   try {
  //     let res = await fetch("https://mongo-cv-api.herokuapp.com/upload",{
  //       method : "POST",
  //       body : JSON.stringify({
  //         name: currName,

  //       }),
  //     });
  //     let resJson = await res.json();
  //     if(res.status === 200){
  //       setCurrName("");
  //     }else{
  //       alert("Error");
  //     }
  //   }catch(err){
  //     alert(err);
  //   }
  // }

  useEffect(() => {
    getSkill();
  },[])


  const [prescreenDate, setPrescreenDate] = useState(new Date());
  const [interviewDate, setInterviewDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  return (
    <motion.div
      className="newApp-body mt-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <Container>
        <Row className="align-self">
          <Col>
            <Row className="mb-2">
              <h1>New Applicant</h1>
            </Row>
            <Row className="d-flex justify-content-start">
              <Form
                action="https://mongo-cv-api.herokuapp.com/upload"
                method="POST"
                encType="multipart/form-data"
                className="newApp-form"
                
              >
                <Form.Group className="mb-3">
                  {/* <Form.Label htmlFor="name">Name</Form.Label> */}
                  <FloatingLabel label="Name">
                  <Form.Control placeholder="Name" type="text" id="name" name="name" value={currName} onChange={(e) => nameChangeHandle(e.target.value)} autoComplete="new-password" required/>
                  </FloatingLabel>
                </Form.Group>
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <FloatingLabel label="Total Experience(yrs.)">
                      <Form.Control
                        type="number"
                        id="exp"
                        name="exp"
                        min={0}
                        max={100}
                        step={1}
                        autoComplete="new-password"
                        placeholder ="year"
                        required
                      />
                      </FloatingLabel>
                      
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <FloatingLabel label="GPA">
                      <Form.Control
                        type="number"
                        id="gpa"
                        name="gpa"
                        min={0}
                        max={4}
                        step={0.01}
                        autoComplete="new-password"
                        placeholder="GPA"
                        required
                      />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <FloatingLabel label="Major Skill">
                      <Form.Control
                        type="text"
                        id="majorSkill"
                        name="majorSkill"
                        onChange={(e) => handleMajorChange(e.target.value)}
                        autoComplete="new-password"
                        placeholder="python"
                        required 
                      />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  </Row>
                  <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <FloatingLabel label="Category">
                      <Form.Control
                        type="text"
                        id="majorCategory"
                        name="majorCategory"
                        value={majorCategory}
                        readOnly
                        placeholder="python"
                        required 
                      />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  </Row>
                  <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <FloatingLabel label="Total relevant experience(yrs.)">
                      <Form.Control
                        type="number"
                        id="majorExp"
                        name="majorExp"
                        min={0}
                        max={100}
                        step={1}
                        placeholder="3"
                        autoComplete="new-password"
                        required 
                      />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <FloatingLabel label="Minor Skill">
                      <Form.Control
                        type="text"
                        id="minorSkill"
                        name="minorSkill"
                        onChange={(e) => handleMinorChange(e.target.value)}
                        placeholder="Minor Skill"
                        autoComplete="new-password"
                        required 
                      />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  </Row>
                  <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <FloatingLabel label="Category">
                      <Form.Control
                        type="text"
                        id="minorCategory"
                        name="minorCategory"
                        value={minorCategory}
                        readOnly
                        placeholder="python"
                        required 
                      />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  </Row>
                  <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <FloatingLabel label="Total relevant experience(yrs.)">
                      <Form.Control
                        type="number"
                        id="minorExp"
                        name="minorExp"
                        min={0}
                        max={100}
                        step={1}
                        placeholder="2"
                        autoComplete="new-password"
                        required 
                      />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Label htmlFor="langSkill">Language Skill</Form.Label>
                    <Select
                      options={langOptions}
                      name="langSkill"
                      id="langSkill"
                      required 
                    />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="proficiency">Proficiency</Form.Label>
                    <Select
                      options={proficientOptions}
                      name="proficiency"
                      id="proficiency"
                      required 
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Label htmlFor="prescreenDate">
                      Pre-screen Date
                    </Form.Label>
                    <DatePicker
                      selected={prescreenDate}
                      onChange={(date) => setPrescreenDate(date)}
                      id="prescreenDate"
                      name="prescreenDate"
                      maxDate={prescreenDate}
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="interviewDate">
                      Interview Date
                    </Form.Label>
                    <DatePicker
                      selected={interviewDate}
                      onChange={(date) => setInterviewDate(date)}
                      id="interviewDate"
                      name="interviewDate"
                      minDate={prescreenDate}
                      maxDate={interviewDate}
                      required 
                    />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="startDate">Availability</Form.Label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      id="startDate"
                      name="startDate"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <Form.Label htmlFor="status">Status</Form.Label>
                    <Select options={statusOptions} name="status" id="status" required/>
                  </Col>
                  <Col>
                    <Form.Label htmlFor="file">Upload CV</Form.Label>
                    <input
                      className="form-control"
                      name="uploadedFile"
                      id="file"
                      type="file"
                      encType="multipart/form-data"
                      accept="application/pdf"
                      required
                    ></input>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <input
                      className="form-control-btn-main"
                      type="submit"
                      value="Add Applicant"
                      // onClick={handleSubmit}
                    />
                  </Col>
                  <Col>
                    <input className="form-control-btn-main" type="reset" value="Reset information"></input>
                  </Col>
                </Row>
              </Form>
            </Row>
          </Col>
          <Col>
            <Row className="row-extract-img">
              <ImageToText />
            </Row>
            <Row className="row-extract-pdf">
              <PdfToText />
            </Row>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};
