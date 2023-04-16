import React from "react"
import '../Styles.css'
import green_cicle from "../assets/Ellipse 1.png"
import robot_hand from "../assets/hand-transformed.png"
import white1 from "../assets/Ellipse 2.png"
import white2 from "../assets/Ellipse 3.png"
import crop from "../assets/crop.png"

export default function Newhome(){
    return(
        <div>
            <div className="heading">
                <h2>Crop Health Monitor</h2>
            </div>
            <img src={green_cicle} className="green_circle" />
            <img src={white1} className="white1" />
            <img src={white2} className="white2" />
            <img src={crop} className="crop" />
            <img src={robot_hand} className="robo" />
        </div>
    )
}