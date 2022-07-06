import React from "react";
import { motion } from "framer-motion";
import {
  Container,
  Card,
  Row,
  Col,
  Image,
  Button,
  Form,
  FloatingLabel,
  Dropdown,
} from "react-bootstrap";
import { useState } from "react";
import { useEffect, useReducer } from "react";
import Axios from "axios";

export const ManageSkill = () => {
  const [skillSets, setSkillSets] = useState([]);

  const [skillName, setSkillName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const allCategory = [
    "Operating System",
    "Programming Language",
    "Database",
    "Tools and IDE",
  ];
  const [os, setOs] = useState([]);
  const [progLang, setProgLang] = useState([]);
  const [db, setDB] = useState([]);
  const [ide, setIde] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [isDuplicated, setIsDuplicated] = useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted ✅");
    // send state to server with e.g. `window.fetch`
  };

  const getData = () => {
    fetch("https://mongo-cv-api.herokuapp.com/all-skill")
      .then((res) => res.json())
      .then((data) => setSkillSets(data.reverse()))
      .catch((err) => console.log(err));
  };

  const deleteSkill = async (_id) => {
    Axios.delete(`https://mongo-cv-api.herokuapp.com/deleteSkill/${_id}`);
  };

  const handleSkillName = (skill) => {
    setSkillName(skill);
    console.log(skillSets);
    let found = false;
    setIsDuplicated(false);
    for (let i = 0; i < skillSets.length; i++) {
      if (skill.toLowerCase() === skillSets[i].skill.toLowerCase()) {
        found = true;
      }
      // console.log(isDuplicated);
    }
    if (found) {
      setIsDuplicated(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <motion.div
      className="skill-body"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <Container>
        <Row>
          <Col className="mt-3">
            <h1>Manage Skill</h1>
            <Form
              action="https://mongo-cv-api.herokuapp.com/update-skill"
              method="POST"
              encType="multipart/form-data"
              className="manage-skill-form"
            >
              <Form.Group className="mt-3 mb-3">
                {/* <Form.Label htmlFor="skill">Skill</Form.Label> */}
                <FloatingLabel label="Skill Name (only one)">
                  <Form.Control
                    type="text"
                    id="skill"
                    name="skill"
                    value={skillName}
                    placeholder="don't mind me"
                    autoComplete="new-password"
                    onChange={(e) => handleSkillName(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              {isDuplicated && <p>this skill already in database</p>}
              <Form.Group className="mt-3 mb-3">
                {/* <Form.Label htmlFor="category">Category</Form.Label> */}
                <FloatingLabel label="Category">
                  <Form.Control
                    type="text"
                    id="category"
                    name="category"
                    value={categoryName}
                    placeholder="don't mind me"
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Row style={{ textAlign: "center" }}>
                <Col>
                  <input
                    className="form-control-btn-main"
                    type="submit"
                    value="Update Skill"
                  />
                </Col>
              </Row>
            </Form>
          </Col>
          <Col className="mt-3">
            <Row className="justify-content-center align-items-center">
              <Col>
                <h1>Current Skill</h1>
              </Col>
            </Row>
            <Row className="mt-2">
              <Container>
                {skillSets.map((val, key) => {
                  return (
                    <Card key={key} className="mb-3">
                      <Card.Header>
                        <Row>
                          <Col>{val.skill}</Col>
                          <Col style={{ textAlign: "right" }}>
                            <h5
                              onClick={() => {
                                deleteSkill(val._id);
                              }}
                            >
                              X
                            </h5>
                          </Col>
                        </Row>
                      </Card.Header>
                    </Card>
                  );
                })}
              </Container>
            </Row>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};
