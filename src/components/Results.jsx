import React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import './results_page_styles.css';

export default function Results(){
    var percentages = {
        "Tomato late blight" : 95.2,
        "Tomato early blight" : 3.9,
        "Tomato rust" : 0.9
    }

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

    return(
        <div className="results--page">
            <h1>Results</h1>
            <div className="results--page--header">
                {/* <h2 className="results--header--number">No.</h2> */}
                <h2 className="results--header--disease">Name of the Disease</h2>
                <h2 className="results--header--probability">Probability</h2>
                <h2 className="results--header--remedy">Remedies</h2>
            </div>
            <ResultCard props={[1,"Tomato late blight",percentages["Tomato late blight"],"https://ipm.ucanr.edu/agriculture/tomato/late-blight/"]}/>
            <ResultCard props={[2,"Tomato early blight",percentages["Tomato early blight"],"https://ipm.ucanr.edu/agriculture/tomato/early-blight/"]}/>
            <ResultCard props={[3,"Tomato rust",percentages["Tomato rust"],"https://ipm.ucanr.edu/agriculture/tomato/bacterial-spot/"]}/>
        </div>
    )
}