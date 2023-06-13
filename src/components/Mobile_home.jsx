import React from "react";
import "../mobile.css";
import mobile_back from "../assets/moile_background.png"
import home_logo from "../assets/mobile_logo.png"
import {Link} from 'react-router-dom'

export default function Mobilehome(){
    return(
        <div>
            <img className="mob_home" src={mobile_back} />
            <div className="mobile_nav">
            < Link to="/"><img className="mob_logo" src={home_logo} /></Link>
                <div className="navbar_buttons">
                <div className="navbar_button1">
                < Link to="/Analyze"><h2 className="navbar_text">Analyze</h2></Link>
                </div>
                <div className="navbar_button2">
                < Link to="/About"><h2 className="navbar_text">About</h2></ Link>
                </div>
                </div>
            </div>
            <div>
                <p className="home_text"> Crop Health Monitor...</p>
            </div>
            <div>
                <h2 className="home_description"> Empowering farmers with smart crop health solutions</h2>
            </div>
        </div>
    )
}