import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

const ApplicantList = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    axios
      .get("https://mongo-cv-api.herokuapp.com/all-cv")
      .then((res) => {
        console.log(res);
        setApplicants(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderCard = (card, index) => {
    <Card>
      <Card.Body>
        <Card.Title>{card.name}</Card.Title>
        <Card.Text>{card.totalExp}</Card.Text>
      </Card.Body>
    </Card>;
  };

  return <div className="AppList">{applicants.map(renderCard)}</div>;
};

export default ApplicantList;
