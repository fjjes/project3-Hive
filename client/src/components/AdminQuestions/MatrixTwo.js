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
    return { text: option.text };
  });

const MatrixTwo = ({ question, questionNumber, setWholeSurveyInEditModeOrNot }) => {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [inEditMode, setInEditMode] = useState({ status: false });
  const matrixTwoOption = {};
  const [questionText, setQuestionText] = useState(
    question.question ||
      "Please rate the importance of the following from 1 to 10:"
  );
  const [answerOptions, setAnswerOptions] = useState(
    copyOptions(question.answerOptions) ||
      copyOptions([
        { text: "Provide better working comfort" },
        { text: "Stimulate creativity and collective performance" },
        { text: "Facilitate access to information and news from business lines and departments" },
        { text: "Break down silos between departments and increase cross functional lines" },
        { text: "Provide spaces for more tranquility to work and concentration" }
      ])
  );

  const [columns, setColumns] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ]);
  const onEditClicked = () => {
    console.log("clicked matrixbox");
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

  const onCancel = () => {
    console.log("clicked cancel");
    setInEditMode({ status: false });
    setWholeSurveyInEditModeOrNot(false);
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
    setAnswerOptions([...answerOptions, matrixTwoOption]);
    console.log("add input", answerOptions);
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
    <div className="question-component admin-question-component matrix">
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
          <table>
            <tbody>
              <tr>
                <th></th>
                {columns.map((cl, i) => {
                  return (
                    <th key={i}>
                      <label>{cl}</label>
                    </th>
                  );
                })}
              </tr>
              {inEditMode.status
                ? answerOptions.map((row, i) => {
                    return (
                      <tr key={row.text}>
                        <td className="label-rows">
                          <input
                            defaultValue={row.text}
                            onChange={(e) => onInputChange(e, i)}
                          />
                        </td>
                        {columns.map((col, index) => {
                          return (
                            <td key={col}>
                              <input type="radio" name={row.text} value={col} />
                            </td>
                          );
                        })}
                        <td>
                          <button className="delete-option-button" onClick={() => deleteOptions(i)}>
                          <RiIcons.RiDeleteBinFill /> 
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : answerOptions.map((row, i) => {
                    return (
                      <tr key={i}>
                        <td className="label-rows">
                          <label>{answerOptions[i].text}</label>
                        </td>
                        {columns.map((col, index) => {
                          return (
                            <td key={index}>
                              <input type="radio" name={row.text} value={col} />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
            </tbody>
          </table>
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

export default MatrixTwo;
