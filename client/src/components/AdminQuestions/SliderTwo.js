import React, { useState, useContext, useEffect } from "react";
import  QuestionContext from "../pages/Admin/QuestionContext"
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";

const SliderTwo = ({question, questionNumber}) => {
  const {questions, setQuestions} = useContext(QuestionContext)
  const [inEditMode, setInEditMode] = useState({ status: false });
  const [questionText, setQuestionText]=useState(question.question || "Normally, during a regular workweek, what percentage of your time do you work in the following locations? The total of the answers must equal to the sum of 100%.")
  const [answerOptions, setAnswerOptions]=useState(question.answerOptions ||
    [
    "Home",
    "Traveling",
    "At the office",
    "In the client's office",
    "Elsewhere",
  ]);
  const selectionOption = [];

  const onEditClicked = () => {
    console.log("clicked edit");
    setInEditMode({ status: true });
  };

  const onSave = () => {
    // setQuestions(questions);
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
    setAnswerOptions([
      ...answerOptions,selectionOption
    ]);
    console.log("answerOptions", answerOptions);
    setInEditMode({ status: true });
  };

  const onInputChange = (event, index) => {
    const previousAnswerOptions = answerOptions;
    previousAnswerOptions[index] = event.target.value;
    setAnswerOptions(previousAnswerOptions);
    // console.log("answerOptions[index]: ", answerOptions[index])
  };

  useEffect(() => {
    const newQuestionList = [...questions];
    newQuestionList[questionNumber - 1] = {
      ...newQuestionList[questionNumber - 1],
      question: questionText,
      // questionNumber,
      answerOptions,
    };
    setQuestions(newQuestionList);
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
      <p className="question-intro">Q{questionNumber}.</p>
        {inEditMode.status ? (
        <textarea
          type="text"
          className="question-intro"
          value={questionText}
          placeholder={questionText}
          style={{ height: "100px", width: "90%" }}
          onChange={(e) => setQuestionText(e.target.value)}
        />
      ) : (
        <p className="question-intro">{questionText}</p>
      )}
      {answerOptions.map((row, index) => {
        return (
          <div key={index} className="slider">
            {inEditMode.status ? (
              // NEEDS SOME STYLING...
              <input 
              defaultValue={row}
              placeholder={row}
              onChange={(e) => onInputChange(e, index)}
              />
            ):(
              <p>{row}</p>
            )}
            <Slider
              ariaLabelledbyForHandle="input-slider"
              step={5}
              min={0}
              max={100}
            />
            <input
              className="input"
              type="number"
              step={5}
              min={0}
              max={100}
              aria-labelledby="input-slider"
            />
          </div>
        );
      })}
            {/* {inEditMode.status ? (
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
              <BsIcons.BsFillPlusCircleFill />
            </button>
          </div>
        </div>
      ) : (
        // </div>
        <div className="edit-button"> */}
          {/* <button
                className="clear icn3"
                title="Edit"
                onClick={() => onEditClicked()}
              >
                <BsIcons.BsPencilSquare />
              </button> */}
          {/* <span className="slash" style={{ color: "#fff" }}>
            /
          </span> */}
        {/* </div> */}
      
    </div>
  );
};

export default SliderTwo;
