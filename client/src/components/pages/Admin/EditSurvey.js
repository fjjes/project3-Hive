import React, { useState, useEffect } from "react";
import { useHistory} from "react-router-dom"
import NarrativeOne from "../../AdminQuestions/NarrativeOne";
import QuestionComponent from "./QuestionComponent";

export const QuestionContext = React.createContext({
    questions: [],
    setQuestions: () => {},
  });

const EditSurvey=({surveyId})=>{
    const history = useHistory();
    const [newCompany, setNewCompany] = useState("");
    const [newVersion, setNewVersion] = useState("");
    const [newSurveyNumber, setNewSurveyNumber]=useState()
    const [newNarrative, setNewNarrative] = useState("");
    const [questionNumber, setQuestionNumber] = useState(0);
    const [error, setError] = useState();

    const [questions, setQuestions] = useState([]);
    const value = { questions, setQuestions };
        
    
    useEffect(() => {
        const getSurvey = async () => {
            let response = await fetch(`/api/survey/${surveyId}`);
            let data = await response.json();
            setQuestions(data.questions);
            setNewCompany(data.company);
            setNewVersion(data.version);
            setNewSurveyNumber(data.surveyNumber)
            // setAnswerOptions(data.questions.answerOptions)
            setQuestionNumber(data.questions.length)
        };
        getSurvey();
    }, [surveyId]);


    const addAQuestion = (e) => {
        e.preventDefault();
        let counter = questionNumber + 1;
        setQuestionNumber(counter);
    
        const newQuestions = [...questions];
        newQuestions.push({questionType: e.target.value, questionNumber: counter});
        setQuestions(newQuestions);
    };

    async function onSaveClicked() {
        // let currentDate = new Date();
        let surveyToUpdate = {
          surveyNumber:newSurveyNumber,
          company:newCompany,
          version:newVersion,
          narrative:newNarrative,
          questions:questions,
        //   LastUpdatedDate: currentDate,
        };
    
        console.log("survey:", surveyToUpdate);
        // Post the custom survey data to the DB
        try {
          let editResponse = await fetch(`/api/survey/${surveyId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(surveyToUpdate),
          });
          console.log("surveyToUpdate:", surveyToUpdate);
    
          if (editResponse.status !== 200) {
            let errorMessage = await editResponse.text();
            console.log("We have an error: ", errorMessage);
            setError(errorMessage);
          } else if(newCompany=== "" || newVersion===""){
              setError("Make sure the company name and the survey version filled out!")
          }else{
            setError(undefined);
            console.log("edit response is successful");
            history.push("/find-list");
          }
        } catch (error) {
          console.log("Fetch failed to reach the server:", error);
        }
    }

    return(
        <div>
        {/* TOP PART OF PAGE */}
        <h2>"Edit your survey here"</h2>
            <div className="company-and-survey-name-inputs">
            <input
                name="company"
                id="company-name"
                className="survey-info"
                placeholder="Company name (required)"
                value={newCompany}
                required
                onChange={(e) => setNewCompany(e.target.value)}
            />
            <input
                name="version"
                id="survey-name"
                className="survey-info"
                placeholder="Survey version (required)"
                value={newVersion}
                required
                onChange={(e) => setNewVersion(e.target.value)}
            />
            </div>
         
  
        {/* LEFT PART OF PAGE */}
        <div className="survey-selection-container">
          <div className="survey-selection-sidebar">
            <button value="checkbox" onClick={addAQuestion}>
              Checkbox
            </button>
            <button value="comment" onClick={addAQuestion}>
              Comment
            </button>
            <button value="matrix1" onClick={addAQuestion}>
              Matrix
            </button>
            <button value="matrix2" onClick={addAQuestion}>
              Matrix-Num
            </button>
            <button value="radio" onClick={addAQuestion}>
              RadioButton
            </button>
            <button value="postal" onClick={addAQuestion}>
              PostalCode
            </button>
            <button value="select" onClick={addAQuestion}>
              Select
            </button>
            <button value="slider" onClick={addAQuestion}>
              Slider
            </button>
          </div>
  
          {/* RIGHT PART OF PAGE */}
          <div className="survey-selected-components">
            <div className="survey-selected-components-background">
              {/* Displays the question components that have been selected */}
              <NarrativeOne
                updateNarrative={(narrative) => setNewNarrative(narrative)}
              />
            </div>
            <QuestionContext.Provider value={value}>
              {questions.map((questionBlock, index) => (
                <div key={index}>
                  <QuestionComponent
                    question={questionBlock}
                    questionNumber={index + 1}
                  />
                </div>
              ))}
            </QuestionContext.Provider>
          </div>
        </div>
  
        {/* BOTTOM PART OF PAGE */}
        <div className="dividerLine"></div>
        <div className="save-survey-button-and-link">
          {error &&
            <div>
              <p style={{ color: "red", fontSize: "1rem" }}>{error}</p>
            </div>
          }
          <button type="submit" className="save-survey-button" onClick={onSaveClicked}>Save Survey </button>
  
        </div>
      </div>
    )
}

export default EditSurvey;