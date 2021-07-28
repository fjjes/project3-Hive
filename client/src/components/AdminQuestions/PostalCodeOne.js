import React, { useState, useContext, useEffect } from 'react';
import { QuestionContext } from '../pages/Admin/NewSurvey'
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import "../pages/Admin/AdminPortal.css"

function PostalCodeOne({question}) {
  const {questions, setQuestions} = useContext(QuestionContext)
  const [inEditMode, setInEditMode] = useState({ status: false });
  const [questionText, setQuestionText] = useState(question.question || "Enter your postal code:"  
  );

  const onEditClicked = () => {
    console.log("clicked edit");
    setInEditMode({ status: true });
  
  };
 
  const onSave = () => {
     setQuestionText(questionText)
    // console.log("clicked save");
    // setPostalCode(postalCode)
    setInEditMode({ status: false });
  };

  const onCancel=()=>{
    console.log("clicked cancel")
    setInEditMode({status:false })
  }

  useEffect(()=>{
    const newQuestionList = [...questions]
    newQuestionList[question.questionNumber-1]= {...newQuestionList[question.questionNumber-1],
      question:questionText, 
      // questionNumber, 
      answerOptions:""} 
    setQuestions(newQuestionList)
},[])

    return (
        <div className="question-component admin-question-component">
          <p className="question-intro">Q{question.questionNumber}.</p>
          <div className= "questionAndButtons">         
          <div className= "questionText">
            {inEditMode.status ? (
            <input
            type="text"
            value = {questionText} 
            questionNumber={question.questionNumber}
            onChange={(e)=>setQuestionText (e.target.value)}
            />
            ) : (
              <p>{questionText}</p>
            )}
            <input
            />
          </div>
          <div className="postalCodeone-buttons">
            {inEditMode.status ? (
              <div className="edit-button">
                <button
                  className="clear icn1"
                  title="Save"
                  onClick={() =>
                    onSave()
                  }
                >
                  <GiIcons.GiSaveArrow />
                </button>
                <span className="slash" style={{ color: "#fff" }}>
                  /
                </span>
                <button
                  className="clear icn2"
                  title="Cancel"
                  onClick={() => onCancel()}
                  >
                  <MdIcons.MdCancel />
                </button>
                  </div>
                ) : (
              <div className="edit-button">
                <button
                  className="clear icn3"
                  title="Edit"
                  onClick={
                    () => onEditClicked()
                  }
                >
                  <BsIcons.BsPencilSquare />
                </button>
                <span className="slash" style={{ color: "#fff" }}>
                  /
                </span> 
                
              </div>
            )}
            </div>
          </div>
        </div>
        );
  }

export default PostalCodeOne;