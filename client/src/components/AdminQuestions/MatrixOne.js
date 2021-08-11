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

const copyOptions = (orginalOptions) =>
  orginalOptions.map((option) => {
    return { text: option.text };
  });
const MatrixOne = ({ question, questionNumber }) => {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [inEditMode, setInEditMode] = useState({ status: false });
  const matrixOneOption = {};

  console.log("question", question);
  console.log("questionNumber", questionNumber);
  console.log("questions", questions);
  const [questionText, setQuestionText] = useState(
    question.question ||
      "Please indicate for each of the factors below their importance to you in the performance of your work, then your level of satisfaction with these factors in your current work environment:"
  );
  const [answerOptions, setAnswerOptions] = useState(
    copyOptions(question.answerOptions) ||
      copyOptions([
        { text: "Ability to concentrate" },
        { text: "Ability to conduct telephone conversations" },
        {
          text: "Ability to find a meeting room within a reasonable timeframe",
        },
        {
          text: "Ability to access collaborative spaces for informal exchanges with my colleagues",
        },
        { text: "Ability to conduct confidential conversations" },
        {
          text: "Quality of IT and telephone tools (excluding workstations) made available (connection tools and screens in meeting rooms, etc.)",
        },
        { text: "Ability to work in the office with remote contacts" },
        {
          text: "Ability to easily switch between face-to-face work and work at home",
        },
        {
          text: "Quality of the environment near my workplace (neighborhood, shops, services, restaurants, etc.)",
        },
      ])
  );
  const [columns, setColumns] = useState([
    "Very Satisfied",
    "Satisfied",
    "Neither satisfied nor dissatisfied",
    "Dissatisfied",
    "Very dissatisfied",
  ]);

  const onEditClicked = () => {
    console.log("clicked matrixbox");
    setInEditMode({ status: true });
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
    setAnswerOptions([...answerOptions, matrixOneOption]);
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
          <p className="question-intro">Q{questionNumber}.</p>

          {inEditMode.status ? (
            <input
              type="text"
              value={questionText}
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
              {answerOptions.map((row, i) => {
                return (
                  <tr key={row.text}>
                    {inEditMode.status ? (
                      <>
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
                            delete
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
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

export default MatrixOne;
