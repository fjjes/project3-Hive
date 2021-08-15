import React, { useState, useContext, useEffect } from "react";
import QuestionContext from "../pages/Admin/QuestionContext";
import "../pages/Admin/AdminPortal.css";
import {
  EditButton,
  DeleteButton,
  SaveButton,
  CancelButton,
  AddInputButton,
} from "./AdminEditButtons";
import * as RiIcons from "react-icons/ri";

const copyOptions = (originalOptions) =>
  originalOptions.map((option) => {
    return option;
  });

function RadioOne({ question, questionNumber, setWholeSurveyInEditModeOrNot }) {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [inEditMode, setInEditMode] = useState({ status: false });
  const radioOption = "";
  const [questionText, setQuestionText] = useState(
    question.question || "What is your department or team?"
  );
  const [answerOptions, setAnswerOptions] = useState(
    copyOptions(question.answerOptions) ||
      copyOptions([
        "Administration", 
        "Sales Professional", 
        "Specialist Management", 
        "Senior Management", 
        "Director"
      ])
  );

  const onEditClicked = () => {
    console.log("clicked edit");
    setInEditMode({ status: true });
    setWholeSurveyInEditModeOrNot(true);
  };
  console.log("questions in radio", questions);

  const onSave = () => {
    console.log("save!!!");
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
    setWholeSurveyInEditModeOrNot(false);
  };

  const onCancel = () => {
    console.log("clicked cancel");
    setInEditMode({ status: false });
    setWholeSurveyInEditModeOrNot(false);
    setQuestionText(questions[questionNumber - 1].question);
    setAnswerOptions(questions[questionNumber - 1].answerOptions);
  };

  const onDelete = () => {
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
    setAnswerOptions([...answerOptions, radioOption]);
    console.log("answer", answerOptions);
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
    <div className="radio-one question-component admin-question-component">
      <div className="question-and-buttons">
        <div className="question-and-options side-border-line">
          <p className="question-intro">Question {questionNumber}</p>
          {inEditMode.status ? (
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          ) : (
            <p className="question-intro">{questionText}</p>
          )}
          <div className="questionText">
            {answerOptions.map((option, index) => {
              return inEditMode.status ? (
                <div key={option}>
                  <input
                    type="radio"
                    id={option}
                    name="option-group"
                    color="primary"
                  />
                  <input
                    defaultValue={option}
                    onChange={(e) => onInputChange(e, index)}
                  />
                  <button
                    className="delete-option-button"
                    onClick={() => deleteOptions(index)}
                  >
                  <RiIcons.RiDeleteBinFill /> 
                  </button>
                </div>
                
              ) : (
                <div key={option}>
                  <input
                    type="radio"
                    id={option}
                    name="option-group"
                    color="primary"
                    // onChange={(e) => setQuestion(e.target.value)}
                  />
                  <label>{option}</label>
                </div>
              );
            })}
            {inEditMode.status? <AddInputButton onAddInput={onAddInput} /> : null}
          </div>
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
}

export default RadioOne;
