import React, { useState, useContext, useEffect } from "react";
import { QuestionContext } from "../pages/Admin/NewSurvey";
import * as RiIcons from "react-icons/ri";

const MatrixTwo = ({question}) => {
    const {questions, setQuestions} = useContext(QuestionContext)
    const [questionText, setQuestionText]=useState(question.question || "Please rate the importance of the following from 1 to 10:")
    const [answerOptions, setAnswerOptions]=useState(question.answerOptions ||
        [
        {text: "text 1"},
        {text: "text 2"},
        {text: "text 3"},
        {text: "text 4"},
        {text: "text 5"}
    ])

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

  const onDelete = (e) => {
    e.preventDefault();
    questions.splice(question.questionNumber - 1, 1);
    const deleteQuestion = [...questions];
    setQuestions(deleteQuestion);
  };

  useEffect(() => {
    const newQuestionList = [...questions];
    newQuestionList[question.questionNumber - 1] = {
      ...newQuestionList[question.questionNumber - 1],
      question:questionText,
      // questionNumber,
      answerOptions,
    };
    setQuestions(newQuestionList);
  }, []);

  return (
    <div className="question-component admin-question-component">
      <button style={{ float: "right", width: "43px" }} onClick={onDelete}>
        <RiIcons.RiDeleteBinFill />
      </button>
      <p className="question-intro">Q{question.questionNumber}.</p>
      <span>
        <p className="question-intro">{questionText}</p>
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

export default MatrixTwo;
