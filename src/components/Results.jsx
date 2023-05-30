import React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import './results_page_styles.css';

export default function Results({results}){
	
    const ResultCard = (props) => {
        console.log(props.props);
        return(
            <div className="result--card">
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap" rel="stylesheet"/>
                <h2 className="result--card--number">{props.props[0]}.  </h2>
                <h2 className="result--card--name">{props.props[1]}</h2>
                <h2 className="result--card--percentage">{props.props[2]}%</h2>
                <a href={props.props[3]}><button>View Remedies</button></a>
            </div>
        )
    }

    useEffect(()=>{
        console.log("idigora:");
    }, [results]);


    return(
        <div className="results--page" key={results}>
            <h1>Results</h1>
            <div className="results--page--header">
                {/* <h2 className="results--header--number">No.</h2> */}
                <h2 className="results--header--disease">Name of the Disease</h2>
                <h2 className="results--header--probability">Probability</h2>
                <h2 className="results--header--remedy">Remedies</h2>
            </div>
            {
                results 
                && 
                results.map((item)=>{
                    var name = Object.keys(item)[0];  
                    var probability = ((Object.values(item)[0])*100).toFixed(2);
                    console.log("NAMAEWA:"+item);
                    console.log(name,probability);
                    return(
                        <ResultCard props={[(1+results.indexOf(item)),name,probability,"https://www.youtube.com/watch?v=dQw4w9WgXcQ"]} />
                    );
                })
            }
        </div>
    )
}