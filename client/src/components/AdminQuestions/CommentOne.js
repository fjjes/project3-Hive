import React, { useState, useContext, useEffect } from "react";
import { QuestionContext } from "../pages/Admin/NewSurvey";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";

function CommentOne({ questionNumber }) {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [inEditMode, setInEditMode] = useState({ status: false });
  const [question, setQuestion] = useState("Enter a comment:");

  const onEditClicked = () => {
    console.log("clicked edit");
    setInEditMode({ status: true });
  };
  const onSave = () => {
    setQuestion(question);
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

  useEffect(() => {
    const newQuestionList = [...questions];
    newQuestionList[questionNumber - 1] = {
      ...newQuestionList[questionNumber - 1],
      question,
      questionNumber,
      answerOptions: "",
    };
    setQuestions(newQuestionList);
    console.log("newQuestionlist:", questions);
  }, []);

  return (
    <div className="question-component admin-question-component">
      <p className="question-intro">Q{questionNumber}.</p>
      <div className="questionAndButtons">
        <div className="questionText">
          {inEditMode.status ? (
            <input
              type="text"
              value={question}
              questionNumber={questionNumber}
              onChange={(e) => setQuestion(e.target.value)}
            />
          ) : (
            <p> {question}</p>
          )}
          <div>
            <input
              textarea
              rows="10"
              cols="50"
              label="comment"
              placeholder="Input"
            />
          </div>
        </div>

        <div className="Commentone-buttons">
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
            </div>
          ) : (
            <div className="edit-button">
              <button
                className="clear icn3"
                title="Edit"
                onClick={() => onEditClicked()}
              >
                <BsIcons.BsPencilSquare />
              </button>
              <button onClick={onDelete}>
                <RiIcons.RiDeleteBinFill />
              </button>
              {/* <span className="slash" style={{ color: "#fff" }}>
                /
              </span> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentOne;
