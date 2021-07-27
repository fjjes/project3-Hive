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
  const [radioOption, setRadioOption] = useState("");
  const [question, setQuestion] = useState("What is your department or team?");
  const [answerOptions, setAnswerOptions] = useState([
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
    setQuestions(questions);
  //   const previousQuestions=questions
  //   previousQuestions[questionNumber]={}
  //   setQuestion(previousQuestions)
  //   console.log("clicked save", questions);
    setInEditMode({ status: false });
  };
  const onCancel = () => {
    console.log("clicked cancel");
    setInEditMode({ status: false });
  };

  const OnAddInput = () => {
    console.log("clicked add");
    setAnswerOptions([...answerOptions, radioOption]);
    console.log("answer", answerOptions);
    setInEditMode({ status: true });
  };
  const onInputChange = (event, index) => {
    const previousAnswerOptions = answerOptions;
    previousAnswerOptions[index] = event.target.value;
    setAnswerOptions(previousAnswerOptions);
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
  }, [radioOption]);

  return (
    <div className="radio-one question-component admin-question-component">
      <p className="question-intro">Q{questionNumber}.</p>
      {inEditMode.status ? (
        <input
          type="text"
          value={question}
          questionNumber={questionNumber}
          onChange={(e) => setQuestion(e.target.value)}
        />
      ) : (
        <p className="question-intro">{question}</p>
      )}
      <div className="questionAndButtons">
        <div className="radioOne">
          {answerOptions.map((option, index) => {
            return inEditMode.status ? (
              <div key={index}>
                <input
                  type="radio"
                  id={option}
                  name="option-group"
                  // value={option}
                  color="primary"
                  questionNumber={questionNumber}
                />
                <input defaultValue={option} onChange={(e) => onInputChange(e, index)} />
              </div>
            ) : (
              <div>
                <input
                  type="radio"
                  id={option}
                  name="option-group"
                  // value={option}
                  color="primary"
                  questionNumber={questionNumber}
                  // onChange={(e) => setQuestion(e.target.value)}
                />
                <label>{option}</label>
              </div>
            );
            // <input />
          })}
          <div className="radio-buttons">
            {inEditMode.status ? (
              <div className="edit-button">
                <button
                  className="clear icn1"
                  title="Save"
                  onClick={() => onSave()}
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

                <div className="edit-button">
                  <button
                    className="clear icn4"
                    title="Add"
                    onClick={() => OnAddInput()}
                  >
                    <BsIcons.BsFillPlusCircleFill />
                  </button>
                </div>
              </div>
            ) : (
              // </div>
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
  );
}

export default RadioOne;
