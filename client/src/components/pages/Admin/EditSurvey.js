import React, { useState, useEffect } from "react";
import { useHistory} from "react-router-dom"
import NarrativeOne from "../../AdminQuestions/NarrativeOne";
import QuestionComponent from "./QuestionComponent";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";
import QuestionContext from './QuestionContext'


  // const EditSurvey=({surveyId, survey})=>{
  //   let questionList= survey?.questions
  //   let company= survey?.company
  //   let version= survey?.version
  //   let surveyNumber= survey?.surveyNumber
  //   let narrative= survey?.narrative
  //   let number= survey?.questions?.length
   
  //     const history = useHistory();
  //     const [newCompany, setNewCompany] = useState(company);
  //     const [newVersion, setNewVersion] = useState(version);
  //     const [newSurveyNumber, setNewSurveyNumber]=useState(surveyNumber)
  //     const [newNarrative, setNewNarrative] = useState(narrative);
  //     const [questionNumber, setQuestionNumber] = useState(number);
  //     const [newAnswerOptions, setNewAnswerOptions]=useState([])
  //     const [error, setError] = useState();
  
  //     const [questions, setQuestions] = useState(questionList);
  //     const value = { questions, setQuestions };

const EditSurvey=({surveyId})=>{
    const history = useHistory();
    const [newCompany, setNewCompany] = useState();
    const [newVersion, setNewVersion] = useState();
    const [newSurveyNumber, setNewSurveyNumber]=useState()
    const [newNarrative, setNewNarrative] = useState();
    // const [questionNumber, setQuestionNumber] = useState(0);
    const [newAnswerOptions, setNewAnswerOptions]=useState([])
    const [error, setError] = useState();

    const [questions, setQuestions] = useState([]);
    const value = { questions, setQuestions };
        
    
    useEffect(() => {
        const getSurvey = async () => {
            let response = await fetch(`/api/survey/${surveyId}`);
            let data = await response.json();
            console.log('data:', data)
            setQuestions(data.questions);
            setNewNarrative(data.narrative);
            setNewCompany(data.company);
            setNewVersion(data.version);
            setNewSurveyNumber(data.surveyNumber)
            // setNewAnswerOptions(data.questions.map((questionBlock, i)=>({answerOptions:questionBlock.answerOptions})))
            // setQuestionNumber(data.questions.length)
        };
        getSurvey();
    }, [surveyId]);


    const addAQuestion = (e) => {
        e.preventDefault();
        // let counter = questionNumber + 1;
        // setQuestionNumber(counter);
    
        // const newQuestions = [...questions];
        // newQuestions.push({questionType: e.target.value, questionNumber: counter});
        // setQuestions(newQuestions);


    const newQuestions = [...questions];
    newQuestions.push({
      questionType: e.target.value,
      
    });
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

        surveyToUpdate.questions.forEach((question,index)=>{
          question.questionNumber= index + 1
        })
    
        console.log("survey:", surveyToUpdate);
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
          } else if(newCompany=== "" || newVersion==="" || newSurveyNumber===""){
              setError("Make sure the company name, survey version & survey # filled out!")
          }else{
            setError(undefined);
            console.log("edit response is successful");
            history.push("/find-list");
          }
        } catch (error) {
          console.log("Fetch failed to reach the server:", error);
        }
        console.log("surveyNum:", newSurveyNumber,"", "version:", newVersion)
    }

    console.log('question 124;', questions)
    return(
        <div>
        {/* TOP PART OF PAGE */}
        <h2>Edit your survey</h2>
            <div className="company-and-survey-name-inputs">
              <div className='col'>
                <label>Company Name<span style={{color:"red"}}>*</span>:</label>
                <input
                    name="company"
                    id="company-name"
                    className="survey-info"
                    placeholder="Company name (required)"
                    value={newCompany}
                    required
                    onChange={(e) => setNewCompany(e.target.value)}
                />
              </div>
              <div className='col'>
                <label>Survey Version<span style={{color:"red"}}>*</span>:</label>
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
              <div className='col'>
                <label>Survey No:<span style={{color:"red"}}>*</span>:</label>
                <input
                    name="surveyNumber"
                    id="survey-number"
                    className="survey-info"
                    placeholder="Enter a Number (required)"
                    value={newSurveyNumber}
                    required
                    onChange={(e) => setNewSurveyNumber(e.target.value)}
                />
              </div>
            </div>
         
  
        {/* LEFT PART OF PAGE */}
        <div className="survey-selection-container">
          <div className="survey-selection-sidebar">
            <button value="checkbox" onClick={addAQuestion}>
            <span className='icons'><RiIcons.RiCheckboxMultipleLine/></span>Checkbox
            </button>
            <button value="comment" onClick={addAQuestion}>
            <span className='icons'><FaIcons.FaRegCommentDots/></span>Comment
            </button>
            <button value="matrix1" onClick={addAQuestion}>
            <span className='icons'><FaIcons.FaListUl/></span>Matrix
            </button>
            <button value="matrix2" onClick={addAQuestion}>
            <span className='icons'><FaIcons.FaListOl/></span>Matrix-Num
            </button>
            <button value="radio" onClick={addAQuestion}>
            <span className='icons'><RiIcons.RiRadioButtonLine/></span>RadioButton
            </button>
            <button value="postal" onClick={addAQuestion}>
            <span className='icons'><MdIcons.MdLocalPostOffice/></span>PostalCode
            </button>
            <button value="select" onClick={addAQuestion}>
            <span className='icons'><IoIcons.IoMdArrowDropdown/></span>Select
            </button>
            <button value="slider" onClick={addAQuestion}>
            <span className='icons'><FaIcons.FaSlidersH/></span>Slider
            </button>
          </div>
  
          {/* RIGHT PART OF PAGE */}
          <div className="survey-selected-components">
            <div className="survey-selected-components-background">
              {/* Displays the question components that have been selected */}
              <NarrativeOne
                narrative={newNarrative}
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