import React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import './about_page_styles.css';

export default function About(){

    return(
        <div className="about--page">
            <Navbar />
            <h1>A Project under <a href="https://www.iitbhilai.ac.in/index.php?pid=nitin">Dr.Nitin Khanna</a> Sir,</h1>
            <h2>By <a href="https://github.com/Bolt17803">A. Chaitanya Sai</a> and <a href="https://github.com/HemanthGaddey">G. Hemanth Chowdary</a></h2>
        </div>
    )
}