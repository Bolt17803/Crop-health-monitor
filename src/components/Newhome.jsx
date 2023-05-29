import React, { useState } from "react"
import { Link } from 'react-router-dom';
import '../Styles.css'
import green_cicle from "../assets/Ellipse 1.png"
import robot_hand from "../assets/hand-transformed.png"
import white1 from "../assets/Ellipse 2.png"
import white2 from "../assets/Ellipse 3.png"
import crop from "../assets/crop.png"

export default function Newhome(){
    function MyComponent() {
        const [response, setResponse] = useState(null);
    }
    return(
        <div>
            <div className="heading">
                <h1>Crop Health Monitor</h1>
            </div>
            <div className="Home_content"><h2 className="home_text">Empowering farmers with smart crop health solutions</h2></div>
            <img src={green_cicle} className="green_circle" />
            <img src={white1} className="white1" />
            <img src={white2} className="white2" />
            <img src={crop} className="crop" />
            <img src={robot_hand} className="robo" />
            <div>< Link to="/Analyze" className="analyze">Analyze plant</Link></div>
        </div>
    )
}