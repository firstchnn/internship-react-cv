import React from 'react'
import {motion} from 'framer-motion'
import {
    Container,
    Card,
    Row,
    Col,
    Image,
    Button,
    Form,
    FloatingLabel,
  } from "react-bootstrap";
import { useState } from 'react';
import { useEffect } from 'react';

export const ManageSkill = () => {

    const [skillSets, setSkillSets] = useState([]);


    const [skillName, setSkillName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const allCategory = ["Operating System","Programming Language","Database","Tools and IDE"];
    const [os, setOs] = useState([]);
    const [progLang, setProgLang] = useState([]);
    const [db, setDB] = useState([]);
    const [ide, setIde] =  useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log('form submitted ✅');
        // send state to server with e.g. `window.fetch`
      }

    useEffect(() => {
        fetch("https://mongo-cv-api.herokuapp.com/all-skill")
        .then(res => res.json())
        .then(data => setSkillSets(data))
        .catch(err => console.log(err));
    },[]);


    
    return(
        <motion.div
        className="skill-body" 
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0, transition : {duration : 0.3}}}>
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
                                <Form.Control type="text" id="skill" name="skill" value={skillName} placeholder="don't mind me" onChange={(e) => setSkillName(e.target.value)} required/>
                            </FloatingLabel>
                            </Form.Group>
                            <Form.Group className="mt-3 mb-3">
                                {/* <Form.Label htmlFor="category">Category</Form.Label> */}
                                <FloatingLabel label="Category">
                                <Form.Control type="text" id="category" name="category" value={categoryName} placeholder="don't mind me" onChange={(e) => setCategoryName(e.target.value)} required/>
                            </FloatingLabel>
                            </Form.Group>
                            <Row style={{textAlign: 'center'}}>
                            <Col>
                            <input
                      className="form-control-btn-main"
                      type="submit"
                      value="Update Skill"
                    /></Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col className="mt-3">
                    <h1>Current Skill</h1>
                    <ul>
                        {skillSets.map(skillSets => <li className="justify-content-start" key={skillSets._id}>{skillSets.skill}{" : "}{skillSets.category}</li>)}
                    </ul>
                    </Col>
                </Row>
            </Container>
        </motion.div>
    );
}