import React,{useState,useEffect} from 'react';
import axios from 'axios';

function DataFetching(){
    const [applicants, setApplicants] = useState([])
    
    useEffect(() =>{
        axios.get("https://mongo-cv-api.herokuapp.com/all-cv")
        .then(res => {
            console.log(res)
            setApplicants(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])
}

export default DataFetching