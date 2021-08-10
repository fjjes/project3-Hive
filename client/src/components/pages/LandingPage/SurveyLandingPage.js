import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import SurveyQuestionPage from "../SurveyQuestionPage";
import "./SurveyLandingPage.css";
//import { Link } from "react-router-dom";
// import image from "../../../images/website.jpg";

export default function Logo({ flashcard }) {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState();
  const [narrative, setNarrative] = useState("");
  const [company, setCompany] = useState("");
  const [questionArray, setQuestionArray] = useState([]);
  const [flip, setFlip] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    const getSurveyQuestions = async () => {
      let response = await fetch(`/api/survey/${surveyId}`);
      let data = await response.json();
      console.log("retrieved data:", data);
      setSurvey(data);
      console.log("narrative:", data.narrative);
      setNarrative(data.narrative);
      setCompany(data.company);
      setQuestionArray(data.questions);
      console.log("Survey questions:", data.questions);
    };
    getSurveyQuestions();
  }, [surveyId]);

  useEffect(()=>{
    const index = localStorage.getItem('index'+ surveyId)
    if(index){
      setShowQuestions(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
      {showQuestions === false ? (
        <div
          className={`card ${flip ? "flip" : ""}`}
        >
          <div class="thefront">
            {!flip ? (
              <>
                <Player
                  autoplay
                  loop
                  src="https://assets6.lottiefiles.com/packages/lf20_186dxgq7.json"
                  className="logo"
                ></Player>
								<button className="enter-button" onClick={() => setFlip(!flip)}>ENTER</button>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="theback">
            <h1>Hello {company} Team!</h1>
            {/* <img src={image} style={{height:100}} alt="start-img"/> */}
            <p>{narrative}</p>

            {/* <Link to="/survey">
          <button className="logo-button" type="button">
            ENTER
          </button>
        </Link>
        <Link to="/survey">
          <button className="neu-button" type="button">
            ENTER
          </button>
        </Link> */}
            {/* <div className="adminportal"
          >
        <Link to="/admin">
        <button className="admin-portal-button">Admin Portal</button>
        </Link>
          </div> */}
            {/* <button
              className="logo-button"
              type="button"
              onClick={() => setShowQuestions(true)}
            >
              ENTER
            </button> */}
            <button
              className="neu-button"
              type="button"
              onClick={() => setShowQuestions(true)}
            >
              ENTER
            </button>
          </div>
        </div>
      ) : (
        <div>
          <SurveyQuestionPage survey={survey} questionArray={questionArray} />
        </div>
      )}
    </div>
  );
}