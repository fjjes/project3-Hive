import React, { useState, useContext, useEffect } from "react";
import { QuestionContext } from "../pages/Admin/NewSurvey";
import * as RiIcons from "react-icons/ri";

const MatrixOne = ({ questionNumber }) => {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [question, setQuestion] = useState(
    "Please indicate for each of the factors below their importance to you in the performance of your work, then your level of satisfaction with these factors in your current work environment:"
  );
  const [answerOptions, setAnswerOptions] = useState([
    { text: "Ability to concentrate" },
    { text: "Ability to conduct telephone conversations" },
    { text: "Ability to find a meeting room within a reasonable timeframe" },
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
  ]);
  const [columns, setColumns] = useState([
    "Very Satisfied",
    "Satisfied",
    "Neither satisfied nor dissatisfied",
    "Dissatisfied",
    "Very dissatisfied",
  ]);

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
      answerOptions,
    };
    setQuestions(newQuestionList);
  }, []);

  return (
    <div className="question-component admin-question-component">
      <button style={{ float: "right", width: "43px" }} onClick={onDelete}>
        <RiIcons.RiDeleteBinFill />
      </button>
      <p className="question-intro">Q{questionNumber}.</p>
      <span>
        <p className="question-intro">{question}</p>
      </span>
      <table>
        <tbody>
          <tr>
            {/* removing this empty <th></th> will mess up the layout of matrix labels */}
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
              <tr key={i}>
                <td className="label-rows">
                  <label>{row.text}</label>
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
    </div>
  );
};

export default MatrixOne;
