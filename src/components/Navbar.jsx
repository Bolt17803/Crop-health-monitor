import React from "react";
import './nav_bar_styles.css';
import chm_logo from '../assets/mainlogo.png';
import iitbhilai_logo from "../assets/iitbhilai_logo.png";
import { useState, useEffect } from 'react';
import { BrowserRouter, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Navbar(){
    const [navClass,setNavClass] = useState("nav");

    const handleScroll = () => {
      const scrollPosition = window.scrollY; // => scroll position
      if(scrollPosition > 100){
        setNavClass("nav-transparent");
      }
      else{
        setNavClass("nav");
      }
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    }, []);

    return(
        <div className={navClass}>
                <img className="logo" src={chm_logo} alt="Logo" />
                < Link to="/" className="logo--text"><div className="nav--Logo">Crop Health Monitor</div></Link>
                <div className="nav--Home">< Link to="/" className="analyze">Home</Link></div>
                <div className="nav--Analyze">< Link to="/Analyze" className="analyze">Analyze plant</Link></div>
                <div className="nav--About">< Link to="/About" className="analyze">About</Link></div>
        </div>
    )
}
