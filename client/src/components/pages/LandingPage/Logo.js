import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import "../../../App.css";
import { Link } from "react-router-dom";

export default function Logo({ flashcard }) {
  const [narrative, setNarrative] = useState("");
  const [company, setCompany] = useState("");
  const [flip, setFlip] = useState(false);

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
    <div
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      <div class="thefront">
        <Player
          autoplay
          loop
          src="https://assets6.lottiefiles.com/packages/lf20_186dxgq7.json"
          className="logo"
        ></Player>
        <p>Click to Flip</p>
      </div>
      <div className="theback">
        <h1>Hello {company} Team!</h1>
        <p>{narrative}</p>
        <Link to="/survey">
          <button className="logo-button" type="button">
            ENTER
          </button>
        </Link>
        <Link to="/survey">
          <button className="neu-button" type="button">
            ENTER
          </button>
        </Link>
      </div>
    </div>
  );
}
