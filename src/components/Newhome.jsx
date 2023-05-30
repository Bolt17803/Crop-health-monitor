import React, { useState } from "react"
import { Link } from 'react-router-dom';
import '../Styles.css'
import green_cicle from "../assets/Ellipse 1.png"
import robot_hand from "../assets/hand-transformed.png"
import white1 from "../assets/Ellipse 2.png"
import white2 from "../assets/Ellipse 3.png"
import crop from "../assets/crop.png"
import leaf from "../assets/leaf.png"
import leaf1 from "../assets/leaf1.png"
import leaf2 from "../assets/leaf2.png"
import leaf3 from "../assets/leaf3.png"
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
                {/* <h1> Monitoring</h1> */}
            </div>
            </div>
            <div className="Home_content"><h7 className="home_text">Empowering farmers with smart crop health solutions</h7></div>
            <img src={leaf4} className="border1" />
            <img src={leaf5} className="border2" />
            <img src={leaf9} className="border3" />
            <img src={leaf10} className="border4" />
            {/* <img src={green_cicle} className="green_circle" />
            <img src={white1} className="white1" />
            <img src={white2} className="white2" />
            <img src={leaf} className="crop" />
            <img src={robot_hand} className="robo" /> */}
            <div>< Link to="/Analyze" className="analyze">Analyze plant</Link></div>
        </div>
    )
}