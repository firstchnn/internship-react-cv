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
  } from "react-bootstrap";

export const ManageSkill = () => {
    
    return(
        <motion.div
        className="skill-body" 
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0, transition : {duration : 0.3}}}>
            <Container>
                <h1>HIIIIIIIIIIIIIIIIIIIIIIII</h1>
            </Container>
        </motion.div>
    );
}