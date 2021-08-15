import React, { useState, useContext, useEffect } from "react";
import QuestionContext from "../pages/Admin/QuestionContext";
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
    return { text: option.text };
  });

const SelectOne = ({ question, questionNumber, setWholeSurveyInEditModeOrNot }) => {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [inEditMode, setInEditMode] = useState({ status: false });
  const [questionText, setQuestionText] = useState(
    question.question ||
      "In your opinion, what are the necessary and complementary organizational points for teleworking that should be implemented within the company? Many Answers are possible.\nPlease rank the following in order of interest:"
  );
  const [answerOptions, setAnswerOptions] = useState(
    copyOptions(question.answerOptions) ||
      copyOptions([
        { text: "Rethinking workspaces in the company" },
        { text: "Review the organization of meetings Rethinking moments" },
        { text: "Spaces of conviviality" },
        { text: "Do not change anything" },
        { text: "Other" },
      ])
  );
  const selectionOption = {};

  let selectArray = [];
  let num = 1;
  for (let i = 0; i < answerOptions.length; i++) {
    selectArray.push(num++);
  }

  const onEditClicked = () => {
    console.log("clicked edit");
    setInEditMode({ status: true });
    setWholeSurveyInEditModeOrNot(true);
  };

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

  console.log("questions: ", questions);

  const onCancel = () => {
    console.log("clicked cancel");
    setInEditMode({ status: false });
    setWholeSurveyInEditModeOrNot(false);
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
      answer[index].text = event.target.value;
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
    <div className="selectOne question-component admin-question-component">
      <div className="question-and-buttons">
        <div className="question-and-options side-border-line">
          <p className="question-intro">Question {questionNumber}</p>
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

          {inEditMode.status
            ? answerOptions.map((row, i) => {
                return (
                  <ul key={row.text}>
                    <li style={{ listStyleType: "none", textAlign: "left" }}>
                      <input
                        id={row.text}
                        defaultValue={row.text}
                        style={{ width: row.text && row.text.length + "ch" }}
                        onChange={(e) => onInputChange(e, i)}
                      />
                      :&nbsp;
                      <select value={row.value}>
                        <option>--Select--</option>
                        {selectArray.map((selection, index) => {
                          return (
                            <option key={index} value={selection}>
                              {selection}
                            </option>
                          );
                        })}
                      </select>
                      <button className="delete-option-button" 
                      onClick={() => deleteOptions(i)}>
                        <RiIcons.RiDeleteBinFill /> 
                      </button>
                    </li>
                  </ul>
                );
              })
            : answerOptions.map((row, i) => {
                return (
                  <ul key={i}>
                    <li style={{ listStyleType: "none", textAlign: "left" }}>
                      {answerOptions[i].text}:&nbsp;
                      <select value={row.value}>
                        <option>--Select--</option>
                        {selectArray.map((selection, index) => {
                          return (
                            <option key={index} value={selection}>
                              {selection}
                            </option>
                          );
                        })}
                      </select>
                    </li>
                  </ul>
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

export default SelectOne;
