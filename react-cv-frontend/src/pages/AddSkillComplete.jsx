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
} from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./complete.css";

export const AddSkillComplete = () => {
  const navigate = useNavigate();
  const doneIcon = "https://img.icons8.com/cotton/344/checkmark.png";
  return (
    <motion.div
      className="addComplete-body mt-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <Container classname="mt-3">
        <div className="home-body-header">
          <h1>Update skill complete</h1>
        </div>
        <Row>
        <Container>
        <Image className="home-col-icon" src={doneIcon} height={250} width={250}/>
        </Container>
        </Row>
        <Row className="home-main-row">
          <Col className="home-col">
            <Container className="mt-0">
              <a className="p-link" onClick={() => navigate("/manageSkill")}>
                Update more Skill ?
              </a>
            </Container>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};
