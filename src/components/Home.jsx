import React from "react"
import bg from "../assets/home-logo.png"
import { BrowserRouter, Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import Navbar from './Navbar'
import Crop from "./Crop"

export default function Home(){
    return(
        < BrowserRouter>
        <div className="home_back" id="home">
            <div className="home--container">
                <img src={bg} className="home--image"/>
                <h1 className="home--text"> Empowering farmers with smart crop health solutions  </h1>
                <h1 className="home--text" > through image analysis </h1>
                <HashLink to="#crop" smooth>
                    <button className="hometocrop--button">
                    Try it
                    </button>
                </HashLink>
            </div>
        </div>
        </BrowserRouter>
    )
}