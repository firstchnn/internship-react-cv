import React, {useState, useEffect} from 'react'
import logo from '../icon/slide-up.png'
import '../css/backtotop.css'
export const BackToTopBtn =() => {
    const [backToTopBtn, setBackToTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () =>{
            if(window.scrollY > 100){
                setBackToTopBtn(true);
            }else{
                setBackToTopBtn(false);
            }
        })
    },[])
    // const imgsrc ="https://icons8.com/icon/114155/logout-rounded-up--v2"
    const scrollUp = () => {
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        })
    }
  return (
    <div className="searchApp-body">
        {backToTopBtn && (
            // <button className="rounded-circle" style={{position:"fixed", bottom: "3rem", right : "3rem",width: "4rem",height:"4rem"}} onClick={scrollUp}>
            //     <img src={logo}></img>
            // </button>
            <img className="totop-logo" style={{position:"fixed", bottom: "4.5rem", right : "3rem",width: "4rem",height:"4rem", zIndex: "99"}} onClick={scrollUp} src={logo}></img>
        )

        }
    </div>
  )
}
