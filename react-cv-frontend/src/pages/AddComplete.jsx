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
import { useState } from 'react';

export const AddComplete =() => {
  return (
    <motion.div>
        <h1>
            Complete
        </h1>
        <h1>
            Add more applicants ?
        </h1>
    </motion.div>
    
  )
}
