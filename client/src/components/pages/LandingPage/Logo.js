import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import "../../../App.css";
import { Link } from "react-router-dom";

export default function Logo() {
  const [narrative, setNarrative] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    const getSurveyQuestions = async () => {
      let response = await fetch("/api/survey"); //should be get by id
      let data = await response.json();
      console.log("retrieved data:", data);
      console.log("narrative:", data[0].narrative);
      setNarrative(data[0].narrative);
      setCompany(data[0].company);
    };
    getSurveyQuestions();
  }, []);

  return (
    <div className="card">
      <div className="flip-card">
        <div class="thefront">
          <Player
            autoplay
            loop
            src="https://assets6.lottiefiles.com/packages/lf20_186dxgq7.json"
            className="logo"
          ></Player>
          <button>Click to Flip</button>
        </div>
        <div className="theback">
          <h1>Hello {company} Team!</h1>
          <p>{narrative}</p>
          <Link to="/survey">
            <button className="logo-button" type="button">
              ENTER
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
