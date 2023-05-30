import React from "react"
import '../Styles.css'
import iitbhilai_logo from "../assets/iitbhilai_logo.png";
import { BrowserRouter, Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"

export default function Navbar(){
    return(
    < BrowserRouter>
    <nav>
        <h1 class="nav--title"><HashLink to="#home" smooth><a href="#" className="nav--title--text">Crop Health Monitor</a></HashLink></h1>
        <ul class="nav--elements">
            <li><HashLink to="#home" smooth><a href="#" className="nav--element--text">Home</a></HashLink></li>
            <li><HashLink to="#crop" smooth><a href="#" className="nav--element--text">Upload</a></HashLink></li>
            <li><HashLink to="#about" smooth><a href="#" className="nav--element--text">About</a></HashLink></li>
        </ul>
    </nav>
    </BrowserRouter>
    )
}
