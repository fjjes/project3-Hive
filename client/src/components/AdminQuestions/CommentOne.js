import React, { useState, useContext, useEffect } from "react";
import QuestionContext from "../pages/Admin/QuestionContext";
import {
  EditButton,
  DeleteButton,
  SaveButton,
  CancelButton,
} from "./AdminEditButtons";

function CommentOne({ question, questionNumber, setWholeSurveyInEditModeOrNot }) {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [inEditMode, setInEditMode] = useState({ status: false });
  const [questionText, setQuestionText] = useState(
    question.question || "Enter a comment:"
  );

  const onEditClicked = () => {
    console.log("clicked edit");
    setInEditMode({ status: true });
    setWholeSurveyInEditModeOrNot(true);
  };
  const onSave = () => {
    console.log("save!!!");
    setQuestions((questions) => {
      const previousQuestions = [...questions];
      previousQuestions[questionNumber - 1] = {
        ...previousQuestions[questionNumber - 1],
        question: questionText,
      };
      return [...previousQuestions];
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
  };

  const onDelete = (e) => {
    e.preventDefault();
    questions.splice(questionNumber - 1, 1);
    const deleteQuestion = [...questions];
    setQuestions(deleteQuestion);
  };

  useEffect(() => {
    onSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="question-component admin-question-component">
      <div className="question-and-buttons">
        <div className="side-border-line">

      <p className="question-intro">Question {questionNumber}</p>
        <div className="questionText">
          {inEditMode.status ? (
            <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            />
            ) : (
              <p> {questionText}</p>
              )}
          <div>
            <textarea disabled cols="50" label="comment" placeholder="Input" />
          </div>
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

export default CommentOne;
