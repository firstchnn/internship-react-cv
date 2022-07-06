import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
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

export const SingleApplicant =() => {

  const params = useParams()
  const [applicant , setApplicant] = useState({});
  const [cv, setCV] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [err , setErr] = useState("");

  const handleClick = async () => {
    // await console.log("reload data");
    setIsLoading(true);
    // console.log(applicant.length);
    // if (applicant.length <= 0) {
      
    // }
    console.log('as;dlfjhkaslkdjfhalskjdhf')
    console.log(Object.keys(applicant).length === 0)
    console.log(applicant == null)
    try {
      const response = await fetch(
        `https://mongo-cv-api.herokuapp.com/singleCV/${params.appId}`,
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
      await console.log('fetched')
      await console.log(result);
      
      await setApplicant(result);
      
    } catch (err) {
      setErr(err.message);
      console.error(err);
    } finally {
      await setIsLoading(false);
      await console.log(applicant);
    }
    
  };

  useEffect(() => {
    handleClick();
  },[params])

  return (
    <Container className="mt-4">
      {isLoading && (
        <Container>
          <h5>
          <b>Getting Applicant CV</b>
          </h5>
        </Container>
      )}
      {Object.keys(applicant).length != 0 && (
        <Container>
          <Row>
            <h5>Name : {applicant.name}</h5>
          </Row>
          <Accordion
                  defaultActiveKey={[applicant._id]}
                  alwaysOpen
                  className="shadow"
                  style={{ borderRadius: "16px" }}
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <b>Original CV</b>
                    </Accordion.Header>
                    <Accordion.Body>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                            <Viewer style={{ borderRadius: '16px'}}
                              fileUrl={
                                // new Uint8Array({currentCV})
                                applicant.file.data
                              }
                              
                            />
                          </Worker>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <b>Gen CV</b>
                    </Accordion.Header>
                    <Accordion.Body>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                            <Viewer style={{ borderRadius: '16px'}}
                              fileUrl={
                                // new Uint8Array({currentCV})
                                applicant.genCV.data
                              }
                            />
                          </Worker>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

        </Container>
      )}
    </Container>
  )
}