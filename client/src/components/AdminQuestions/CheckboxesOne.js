import React, { useContext, useEffect, useState } from "react";
import { QuestionContext } from "../pages/Admin/NewSurvey";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import "../pages/Admin/AdminPortal.css";

function CheckboxesOne({ question,questionNumber }) {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [inEditMode, setInEditMode] = useState({ status: false });
  const [checkBoxesOneOption, setCheckBoxesOneOption] = useState("");
  const [questionText, setQuestionText] = useState(
    question.question || "Select up to three options:"
    
  );
  console.log("help");
  // const [answerOptions, setAnswerOptions]=useState([
  //   { checked: false, value: "Option 1" },
  //   { checked: false, value: "Option 2" },
  //   { checked: false, value: "Option 3" },
  //   { checked: false, value: "Option 4" },
  //   { checked: false, value: "Option 5" },
  //   { checked: false, value: "Option 6" },
  //   { checked: false, value: "Option 7" },
  //   { checked: false, value: "Option 8" },
  // ])

  const [answerOptions, setAnswerOptions] = useState(
    question.answerOptions || [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
      "Option 6",
      "Option 7",
      "Option 8",
    ]
  );

  const onEditClicked = () => {
    console.log("clicked checkbox");
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
    e.preventDefault();
    questions.splice(questionNumber - 1, 1);
    const deleteQuestion = [...questions];
    setQuestions(deleteQuestion);
  };

  const OnAddInput = () => {
    console.log("clicked add");
    setAnswerOptions([...answerOptions, checkBoxesOneOption]);
    // setQuestionText ([...questionText]);
    console.log("add input", answerOptions);
    setInEditMode({ status: true });
  };

  const onInputChange = (event, index) => {
    const previousAnswerOptions = answerOptions;
    previousAnswerOptions[index] = event.target.value;
    setAnswerOptions(previousAnswerOptions);
    console.log("input changes here");
  };

  useEffect(() => {
    const newQuestionList = [...questions];
    console.log("newQuestionList", questions);
    console.log("questionNumber", questionNumber);
    newQuestionList[questionNumber - 1] = {
      ...newQuestionList[questionNumber - 1],
      question: questionText,
      // questionNumber,
      answerOptions,
    };
    console.log("questions line 23:", newQuestionList);
    setQuestions(newQuestionList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerOptions]);

  return (
    <div className="question-component admin-question-component">
      <button style={{ float: "right", width: "43px" }} onClick={onDelete}>
        <RiIcons.RiDeleteBinFill />
      </button>
      <div className="edit-button">
        <button
          style={{ float: "right", width: "43px" }}
          className="clear-icn3"
          title="Edit"
          onClick={() => onEditClicked()}
        >
          <BsIcons.BsPencilSquare />
        </button>
        <span className="slash" style={{ color: "#fff" }}>
          /
        </span>
        <div className="checkboxes-buttons">
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
            <div> </div>
          )}
        </div>
      </div>
      <form className="checkbox-form-control">
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
        <div className="checkbox-form-group">
          <div className="questionAndButtons">
            <div className="questionText">
              {answerOptions.map((option, index) => {
                return inEditMode.status ? (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={option}
                      name="option-group"
                      questionNumber={questionNumber}
                    />
                    <input
                      defaultValue={option}
                      onChange={(e) => onInputChange(e, index)}
                    />
                  </div>
                ) : (
                  <div>
                    <input
                      type="checkbox"
                      id={option}
                      name="option-group"
                      questionNumber={questionNumber}
                    />
                    <label>{option}</label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckboxesOne;
