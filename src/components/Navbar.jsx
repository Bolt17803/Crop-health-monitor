import React from "react"
import '../Styles.css';
import './nav_bar_styles.css';
import iitbhilai_logo from "../assets/iitbhilai_logo.png";
import { BrowserRouter, Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"

export default function Navbar(){
    return(
        <div className="nav">
                < Link to="/Crop-health-monitor" className="analyze"><div className="nav--Home">Crop Health Monitor</div></Link>
                < Link to="/Crop-health-monitor/Analyze" className="analyze"><div className="nav--Analyze">Analyze plant</div></Link>
                < Link to="/Crop-health-monitor/About" className="analyze"><div className="nav--About">About</div></Link>
        </div>
    )
}
