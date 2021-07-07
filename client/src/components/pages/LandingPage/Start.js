import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import "../../../App.css";


export default function Start() {
  const [narrative, setNarrative]=useState("");

  useEffect(()=>{
    const getSurveyQuestions = async () =>{   
      let response = await fetch('/api/survey')  //should be get by id   
      let data = await response.json();
      console.log('retrieved data:', data) 
      console.log('narrative:', data[0].narrative) 
      setNarrative(data[0].narrative)
  }
  getSurveyQuestions()
  },[])
  return (
    <div className="start">
      <p><h1>{narrative}</h1></p>
      <Link to="/survey">
        <button className="start-button" type="button">
          Enter
        </button>
        {/* <a href="#">Enter</a> */}
      </Link>
    </div>
  );
}
