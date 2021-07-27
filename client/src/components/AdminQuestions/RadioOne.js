import React, { useState, useContext, useEffect } from "react";
import { QuestionContext } from "../pages/Admin/NewSurvey";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
// import { BsFillPlusCircleFill } from "react-icons/bs";
import "../pages/Admin/AdminPortal.css";

function RadioOne({ questionNumber }) {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [inEditMode, setInEditMode] = useState({ status: false });
  const [question, setQuestion] = useState("What is your department or team?");
  const [answerOptions, setAnswerOptions] = useState([
    <input 
     placeholder = "answerOptions"></input>
    // "Option1",
    // "Option2",
    // "Option3",
    // "Option4",
    // "Option5",
    // "Option6",
    // "Option7",
    // "Option8",
  ]);

  const onEditClicked = () => {
    console.log("clicked edit");
    setInEditMode({ status: true });
  };

  const onSave = () => {
    setQuestion(question);
    console.log("clicked save"); 
    setInEditMode({ status: false });
  };
  const onCancel = () => {
    console.log("clicked cancel");
    setInEditMode({ status: false });
  };

  const OnAddInput = () => {
    console.log("clicked add");
    setAnswerOptions ([...answerOptions, <input placeholder = "value"/>])
    console.log ("answer", answerOptions)
    setInEditMode({ status: true });
  };

useEffect(() => {
  const newQuestionList = [...questions];
  newQuestionList[questionNumber - 1] = {
    ...newQuestionList[questionNumber - 1],
    question,
    questionNumber,
    answerOptions,
  };
  setQuestions(newQuestionList);
}, []);

return (
  <div className="radio-one question-component admin-question-component">
    <p className="question-intro">Q{questionNumber}.</p>
    {inEditMode.status ? (
            <input
            type="text"
            value = {question} 
            questionNumber={questionNumber}
            onChange={(e)=>setQuestion (e.target.value)}
            />
            ) : (
            <p className="question-intro">{question}</p>
            )}
    <div className="questionAndButtons">
    <div className="radiobutton">
      {answerOptions.map((option, index) => {
         return (
           inEditMode.status ? (
         
            <div key={index}>
              <input
                type="radio"
                id={option}
                name="option-group"
                value={option}
                color="primary"
                questionNumber={questionNumber}
                onChange={(e) => setAnswerOptions([e.target.value])}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ):  
      ( 
        <div>
        <input
                type="radio"
                id={option}
                name="option-group"
                value={option}
                color="primary"
                questionNumber={questionNumber}
                // onChange={(e) => setQuestion(e.target.value)}
              />
        <label htmlFor={option}>{option}</label>
        </div>
      )
      // <input />
    )}
    )}
    <div className="radio-buttons">
      {inEditMode.status ? (
        <div className="edit-button">
          <button className="clear icn1" title="Save" onClick={() => onSave()}>
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
        
        
        <div className="edit-button">
          <button
            className="clear icn4"
            title="Add"
            onClick={() => OnAddInput()}
          >
            < BsIcons.BsFillPlusCircleFill/>
          </button>
        </div>
        </div> 
        // </div>
      ) : ( 
       
      <div className="edit-button">
        <button
          className="clear icn3"
          title="Edit"
          onClick={() => onEditClicked()}
        >
          <BsIcons.BsPencilSquare />
        </button>
        <span className="slash" style={{ color: "#fff" }}>
          /
        </span>
      </div>
      )}
    </div>
   {/* )};  */}
</div>
  </div>
  </div>
)}

export default RadioOne;