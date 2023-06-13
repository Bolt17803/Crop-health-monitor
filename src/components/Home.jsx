import React from "react"
import { useMediaQuery } from "react-responsive"
import L_home from "./Newhome"
import M_home from "./Mobile_home"

export default function Home(){
    
    const isMobile = useMediaQuery({ maxWidth: 750})

    return(
        <div>
            {isMobile ? (<M_home />):(<L_home />)}
        </div>
    )
}