import React, { useState } from "react"
import { Link } from 'react-router-dom';
import Navbar from "./Navbar.jsx";
import '../Styles.css';
import './nav_bar_styles.css';

import leaf4 from "../assets/leaf4.png"
import leaf5 from "../assets/leaf5.png"
import leaf9 from "../assets/leaf9.png"
import leaf10 from "../assets/leaf10.png"

export default function Newhome(){
    function MyComponent() {
        const [response, setResponse] = useState(null);
    }
    return(
        <div className="home_content">
            <div className="heading">
            <div className="inbox">
                <h1> Crop Health </h1>
                <h2> Monitoring... </h2>
            </div>
            </div>
            <div className="Home_content"><h7 className="home_text">Empowering farmers with smart crop health solutions</h7></div>
            <img src={leaf4} className="border1" />
            <img src={leaf5} className="border2" />
            <img src={leaf9} className="border3" />
            <img src={leaf10} className="border4" />
            <Navbar />
        </div>
    )
}