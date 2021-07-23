import React, { useState, useContext, useEffect } from 'react';
import { QuestionContext } from '../pages/Admin/NewSurvey'
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import "../pages/Admin/AdminPortal.css"

function PostalCodeOne({questionNumber}) {
  const {questions, setQuestions} = useContext(QuestionContext)
  const [inEditMode, setInEditMode] = useState({ status: false });
  const [question, setQuestion] = useState("Enter your postal code?"  
  );

  const onEditClicked = () => {
    console.log("clicked edit");
    setInEditMode({ status: true });
  
  };
 
  const onSave = () => {
     setQuestion(question)
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
    newQuestionList[questionNumber-1]= {...newQuestionList[questionNumber-1],question, questionNumber, answerOptions:""} 
    setQuestions(newQuestionList)
},[])

    return (
        <div className="question-component admin-question-component">
          <p className="question-intro">Q{questionNumber}.</p>
          <div className= "postalCodecontainer">         
          <div className= "postalCodeone">
            {inEditMode.status ? (
            <input
            type="text"
            value = {question} 
            questionNumber={questionNumber}
            onChange={(e)=>setQuestion (e.target.value)}
            />
            ) : (
              <p>{question}</p>
            )}
            <input
            />
          </div>
          <div className="postalCodeone-buttons">
            {inEditMode.status ? (
              <div className="editbutton">
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
              <div className="editbutton">
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