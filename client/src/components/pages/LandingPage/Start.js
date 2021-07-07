import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import "../../../App.css";


export default function Start() {
  const [narrative, setNarrative]=useState("");
  const [company, setCompany]=useState("");

  useEffect(()=>{
    const getSurveyQuestions = async () =>{   
      let response = await fetch('/api/survey')  //should be get by id   
      let data = await response.json();
      console.log('retrieved data:', data) 
      console.log('narrative:', data[0].narrative) 
      setNarrative(data[0].narrative)
      setCompany(data[0].company)
  }
  getSurveyQuestions()
  },[])
  return (
    <div className="start">
      <h2>Hello {company} Team!</h2>
      <p><h3>{narrative}</h3></p>
      <Link to="/survey">
        <button className="start-button" type="button">
          Enter
        </button>
      </Link>
    </div>
  );
}
