import React, { useState, useContext, useEffect } from 'react';
import { QuestionContext } from '../pages/Admin/NewSurvey'
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";

function PostalCodeOne({questionNumber}) {
  const {questions, setQuestions} = useContext(QuestionContext)
  const [inEditMode, setInEditMode] = useState({ status: false });
  const [question, setQuestion] = useState("Enter your postal code?"  
  );

  const onEditClicked = () => {
    console.log("clicked edit");
    setInEditMode({ status: true });
  
  };
 
  const onSave = (question) => {
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
    newQuestionList[questionNumber]= {...newQuestionList[questionNumber],question, questionNumber, answerOptions:""} 
    setQuestions(newQuestionList)
},[])

    return (
        <div className="question-component admin-question-component">
          <h3 style={{textAlign: "left"}}> Postal Code Section </h3>
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
            style={{marginLeft:'40px'}}
            />
          </div>
          <div className="postalCodeone-buttons">
            {inEditMode.status ? (
              <div>
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
              <div>
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
        );
  }

export default PostalCodeOne;