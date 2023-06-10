import React from "react";
import './nav_bar_styles.css';
import chm_logo from '../assets/mainlogo.png';
import iitbhilai_logo from "../assets/iitbhilai_logo.png";
import { useState, useEffect } from 'react';
import { BrowserRouter, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Navbar(){
    const [navClass,setNavClass] = useState("nav");
    const [navExpanded, setNavExpanded] = useState(false);

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

    const BurgerButton = () => {
        return(
            <button className="hamburger" onClick={()=>{setNavExpanded(!navExpanded);}}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="black">
                    <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                    />
                </svg>
            </button>
        );
    };

    return(
        <nav className={navClass}>
                <img className="logo" src={chm_logo} alt="Logo" />
                < Link to="/" className="logo--text"><div className="nav--Logo">Crop Health Monitor</div></Link>
                <BurgerButton />
                <div class="break"></div>
                <ul className={navExpanded?"nav--menu expanded":"nav--menu"}>
                    <li className="nav--Home">< Link to="/" className={navExpanded?"analyze expanded":"analyze"}>Home</Link></li>
                    <li className="nav--Analyze">< Link to="/Analyze" className={navExpanded?"analyze expanded":"analyze"}>Analyze plant</Link></li>
                    <li className="nav--About">< Link to="/About" className={navExpanded?"analyze expanded":"analyze"}>About</Link></li>
                </ul>
        </nav>
    )
}
