import React, { useState, useContext, useEffect } from "react";
import QuestionContext from "../pages/Admin/QuestionContext";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  EditButton,
  DeleteButton,
  SaveButton,
  CancelButton,
  AddInputButton,
} from "./AdminEditButtons";
import * as RiIcons from "react-icons/ri";

const copyOptions = (orginalOptions) =>
  orginalOptions.map((option) => {
    return option;
  });

const SliderOne = ({ question, questionNumber }) => {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [inEditMode, setInEditMode] = useState({ status: false });
  const [questionText, setQuestionText] = useState(
    question.question ||
      "Normally, during a regular workweek, what percentage of your time do you work in the following locations? The total of the answers must equal to the sum of 100%."
  );
  const [answerOptions, setAnswerOptions] = useState(
    copyOptions(question.answerOptions) ||
      copyOptions([
        "Home",
        "Traveling",
        "At the office",
        "In the client's office",
        "Elsewhere",
      ])
  );

  const selectionOption = "";

  const onEditClicked = () => {
    console.log("clicked edit");
    setInEditMode({ status: true });
  };

  const onSave = () => {
    setQuestions((questions) => {
      const updatedQuestions = [...questions];
      updatedQuestions[questionNumber - 1] = {
        ...updatedQuestions[questionNumber - 1],
        question: questionText,
        answerOptions: copyOptions(answerOptions),
      };
      console.log("answerOption", answerOptions);
      return [...updatedQuestions];
    });
    console.log("clicked save", questions);
    setInEditMode({ status: false });
  };

  const onCancel = () => {
    console.log("clicked cancel");
    setInEditMode({ status: false });
    console.log(questions, answerOptions);
    setQuestionText(questions[questionNumber - 1].question);
    setAnswerOptions(questions[questionNumber - 1].answerOptions);
  };

  const onDelete = (e) => {
    e.preventDefault();
    questions.splice(questionNumber - 1, 1);
    const deleteQuestion = [...questions];
    setQuestions(deleteQuestion);
  };

  const deleteOptions = (index) => {
    console.log(index, "index", answerOptions);
    let updatedAnswerOptions = answerOptions.filter(
      (answer, answerIndex) => index !== answerIndex
    );
    setAnswerOptions(updatedAnswerOptions);
    console.log(updatedAnswerOptions);
  };

  const onAddInput = () => {
    console.log("clicked add");
    setAnswerOptions([...answerOptions, selectionOption]);
    console.log("answerOptions", answerOptions);
    setInEditMode({ status: true });
  };

  const onInputChange = (event, index) => {
    setAnswerOptions((answer) => {
      answer[index] = event.target.value;
      return answer;
    });
    console.log(questions[questionNumber - 1].answerOptions[index]);
    console.log("input changes here");
  };

  useEffect(() => {
    onSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="question-component admin-question-component">
      <div className="question-and-buttons">
        <div className="question-and-options side-border-line">
          <p className="question-intro">Q{questionNumber}.</p>
          {inEditMode.status ? (
            <textarea
              type="text"
              className="question-intro"
              value={questionText}
              style={{ height: "100px", width: "90%" }}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          ) : (
            <p className="question-intro">{questionText}</p>
          )}
          {answerOptions.map((row, index) => {
            return inEditMode.status ? (
              <div key={row} className="slider-admin">
                <div className="slider-admin-edit">
                  <input
                    defaultValue={row}
                    onChange={(e) => onInputChange(e, index)}
                  />
                </div>
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
                <button
                  className="delete-option-button"
                  onClick={() => deleteOptions(index)}
                >
                <RiIcons.RiDeleteBinFill /> 
                </button>
              </div>
            ) : (
              <div key={row} className="slider-admin">
                <p>{row}</p>
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
          {inEditMode.status? <AddInputButton onAddInput={onAddInput} /> : null}
        </div>
        <div className="edit-buttons-group">
          {inEditMode.status ? (
            <div className="edit-button">
              <SaveButton onSave={onSave} />
              <CancelButton onCancel={onCancel} />
            </div>
          ) : (
            <div className="edit-button">
              <EditButton onEditClicked={onEditClicked} />
              <DeleteButton onDelete={onDelete} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SliderOne;
