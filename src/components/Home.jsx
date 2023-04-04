import React from "react"
import bg from "../assets/icon.png"
import { BrowserRouter, Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import Navbar from './Navbar'
import Crop from "./Crop"
export default function Home(){
    return(
        < BrowserRouter>
        <div className="home_back">
            {/* <Navbar /> */}
            <img src={bg} />
            <h1>Hellowww!</h1>
            <HashLink to="#crop" smooth>
                <button className="hometocrop_button">
                    <h2>Try it</h2>
                </button>
            </HashLink>
            <Crop />
        </div>
        </BrowserRouter>
    )
}