import React, { useState, useContext, useEffect } from "react";
import { QuestionContext } from "../pages/Admin/NewSurvey";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import "../pages/Admin/AdminPortal.css";
import * as RiIcons from "react-icons/ri";

function RadioOne({ question, questionNumber }) {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [inEditMode, setInEditMode] = useState({ status: false });
  const [radioOption, setRadioOption] = useState("");
  const [questionText, setQuestionText] = useState(question.question || "What is your department or team?");
  const [answerOptions, setAnswerOptions] = useState(question.answerOptions ||
    [
    "Option1",
    "Option2",
    "Option3",
    "Option4",
    "Option5",
    // "Option6",
    // "Option7",
    // "Option8",
  ]);

  const onEditClicked = () => {
    console.log("clicked edit");
    setInEditMode({ status: true });
  };

  const onSave = () => {
    console.log("save!!!");
    const previousQuestions=questions
    previousQuestions[questionNumber]={question:questionText,answerOptions}
    setQuestions(previousQuestions)
    console.log("clicked save", questions);
  setInEditMode({ status: false });
};

  const onCancel = () => {
    console.log("clicked cancel");
    setInEditMode({ status: false });
  };

  const onDelete = (e) => {
    console.log("deleting", e)
    e.preventDefault();
    questions.splice(questionNumber - 1, 1);
    const deleteQuestion = [...questions];
    setQuestions(deleteQuestion);
  };

	const deleteOptions = () => {  //delete starts on the bottom
		answerOptions.splice(answerOptions - 1, 1);
		const deleteTheOptions = [...answerOptions];
		setAnswerOptions(deleteTheOptions);
		setInEditMode({ status: true });
	};


  const OnAddInput = () => {
    console.log("clicked add");
    setAnswerOptions([...answerOptions,radioOption]);
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
      question:questionText,
      // questionNumber,
      answerOptions,
    };
    setQuestions(newQuestionList);
  }, [answerOptions]);

  return (
    <div className="radio-one question-component admin-question-component">
      <button style={{ float: "right", width: "43px" }} onClick={onDelete}>
        <RiIcons.RiDeleteBinFill />
      </button>
      <div className="edit-button">
        <button
          style={{ float: "right", width: "43px" }}
          className="clear icn3"
          title="Edit"
          onClick={() => onEditClicked()}
        >
          <BsIcons.BsPencilSquare />
        </button>
        <span className="slash" style={{ color: "#fff" }}>
          /
        </span>
        <div className="radio-buttons">
          {inEditMode.status ? (
            <div className="edit-button2">
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
            <div></div>
          )}
      </div>
      <p className="question-intro">Q{questionNumber}.</p>
      {inEditMode.status ? (
        <input
          type="text"
          value={questionText}
          questionNumber={questionNumber}
          onChange={(e) => setQuestionText(e.target.value)}
        />
      ) : (
        <p className="question-intro">{questionText}</p>
      )}
      <div className="questionAndButtons">
        <div className="questionText">
          {answerOptions.map((option, index) => {
            return inEditMode.status ? (
              <div key={index}>
                <input
                  type="radio"
                  id={option}
                  name="option-group"
                  color="primary"
                  questionNumber={questionNumber}
                />
                <input
                  defaultValue={option}
                  onChange={(e) => onInputChange(e, index)}
                />
								<button onClick={deleteOptions}>delete</button>
              </div>
            ) : (
              <div>
                <input
                  type="radio"
                  id={option}
                  name="option-group"
                  color="primary"
                  questionNumber={questionNumber}
                  // onChange={(e) => setQuestion(e.target.value)}
                />
                <label>{option}</label>
              </div>
            );
          })}
        </div>
        
        </div>
      </div>
    </div>
  );
}

export default RadioOne;
