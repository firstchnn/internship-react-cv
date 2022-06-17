import React from 'react'
import {Container, Card, Row, Col, Image, Button} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'

const leftButtonPic = "https://img.icons8.com/cotton/344/add-male-user--v2.png"
const rightButtonPic = "https://img.icons8.com/cotton/344/cloud-user.png"

export const Home = () => {

    let navigate = useNavigate();
    const newAppRoute = () => {
        let path = `/newApp`;
        navigate(path);
    }
    const searchAppRoute = () => {
        let path = `/searchApp`;
        navigate(path);
    }
    return (
        <motion.div 
        className="home-body" 
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0, transition : {duration : 0.3}}}
        >
            <Container>
                <div className="home-body-header">
                    <h1>What's your Option</h1>
                </div>
                <Row className="home-main-row">
                    <Col className="home-col" onClick={newAppRoute}>
                    <Container>
                    <Image className="home-col-icon" src={leftButtonPic} height={300}/>
                    </Container>
                    <Container className="mt-4">
                    <h3>Add New Applicant</h3>
                    </Container>
                    </Col>
                    <Col className="home-col" onClick={searchAppRoute}>
                    <Container>
                    <Image className="home-col-icon" src={rightButtonPic} height={300}/>
                    </Container>
                    <Container className="mt-4">
                    <h3>Search Applicant</h3>
                    </Container>
                    </Col>
                </Row>
            </Container>
        </motion.div>
    )
}