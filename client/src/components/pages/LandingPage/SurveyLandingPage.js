import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import SurveyQuestionPage from "../SurveyQuestionPage";
import "./SurveyLandingPage.css";
// import * as All from '../../../../server/uploads'
//import { Link } from "react-router-dom";
// import image from "../../../images/website.jpg";
import Picture from './orange.png';
import useWindowSize from "../../../utilities/useWindowSize"

export default function Logo({ flashcard }) {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState();
  const [narrative, setNarrative] = useState("");
  const [heading, setHeading]= useState("")
  const [questionArray, setQuestionArray] = useState([]);
  const [flip, setFlip] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
	const [image, setImage] = useState("");
  const {width} = useWindowSize();

  useEffect(() => {
    const getSurveyQuestions = async () => {
      let response = await fetch(`/api/survey/${surveyId}`);
      let data = await response.json();
      console.log("retrieved data:", data);
      setSurvey(data);
      setNarrative(data.narrative);
      setHeading(data.heading)
			setImage(data.img)
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
      {width > 300 && (
  <div className="card-container">
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
            <h1>{heading}</h1>
						{image && <img src={`/api/survey/images/${image}`} style={{height:100}} />}
						{/* {image && <img src={`/server/uploads/${image}`} style={{height:100}} />} */}
            <p style={{ whiteSpace: "pre-wrap",}}>{narrative}</p>
            <button
              className="neu-button"
              type="button"
              onClick={() => setShowQuestions(true)}
							>
              START
            </button>
          </div>
        </div>
      ) : (
				<div>
          <SurveyQuestionPage survey={survey} questionArray={questionArray} />
        </div>
      )}
	</div>
  )}
  </div>
  )}