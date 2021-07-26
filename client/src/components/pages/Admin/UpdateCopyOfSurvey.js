import React, { useState, useEffect } from "react";
import QuestionComponent from "./QuestionComponent";
import { QuestionContext } from "./NewSurvey";
// import "../Admin/AdminPortal.css"

const UpdateCopyOfSurvey = ({ question, answerOptions }) => {
  // const [company, setCompany] = useState("");
  // const [version, setVersion] = useState("");
  // const [narrative, setNarrative] = useState("");
  // const [error, setError] = useState();

  const [questions, setQuestions] = useState([]);
  const value = { questions, setQuestions };

  const getSurveyList = async () => {
    let response = await fetch("/api/survey/60f9daf677e59f7a3542e281");
    let data = await response.json();
    // setRows(data)
    console.log("data:", data);
    setQuestions(data.questions);
  };

  console.log("questions: ", questions);

  useEffect(() => {
    getSurveyList();
  }, []);

  return (
    <div className="survey-selected-components admin-container updated-copy-of-survey">
      <div>
        <h2 style={{width: "100%", padding: "20px"}}>Copy of survey - make your edits and save</h2>

        <div className="admin-container-bottom">
          <QuestionContext.Provider value={value}>
            {questions.map((questionBlock, index) => (
              <div key={index}>
                <QuestionComponent
                  questionType={questionBlock.questionType}
                  questionNumber={index + 1}
                />
              </div>
            ))}
          </QuestionContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default UpdateCopyOfSurvey;
