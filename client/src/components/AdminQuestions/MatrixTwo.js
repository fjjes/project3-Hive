import React, { useState, useContext, useEffect } from "react";
import { QuestionContext } from "../pages/Admin/NewSurvey";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import "../pages/Admin/AdminPortal.css";

const MatrixTwo = ({ question, questionNumber }) => {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [inEditMode, setInEditMode] = useState({ status: false });
  const [MatrixTwoOption, setMatrixTwoOption] = useState("");
  const [questionText, setQuestionText] = useState(
    question.question ||
      "Please rate the importance of the following from 1 to 10:"
  );
  const [answerOptions, setAnswerOptions] = useState(
    question.answerOptions || [
      { text: "text 1" },
      { text: "text 2" },
      { text: "text 3" },
      { text: "text 4" },
      { text: "text 5" },
    ]
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
  };

  const onSave = () => {
    // setQuestions(questions);
    console.log("save!!!");
    const previousQuestions = questions;
    previousQuestions[questionNumber] = {
      question: questionText,
      answerOptions,
    };
    setQuestions(previousQuestions);
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

	const deleteOptions = () => {  //delete starts on the bottom
		answerOptions.splice(answerOptions - 1, 1);
		const deleteOptions = [...answerOptions];
		setAnswerOptions(deleteOptions);
		setInEditMode({ status: true });
	};

  const OnAddInput = () => {
    console.log("clicked add");
    setAnswerOptions([...answerOptions, MatrixTwoOption]);
    // setQuestionText ([...questionText]);
    console.log("add input", answerOptions);
    setInEditMode({ status: true });
  };

  const onInputChange = (event, index) => {
    const previousAnswerOptions = answerOptions;
    previousAnswerOptions[index] = event.target.value;
    setAnswerOptions(previousAnswerOptions);
    console.log("input changes here");
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
    <div className="question-component admin-question-component matrix">
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
        <div className="matrixone-buttons">
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
								<button onClick={deleteOptions}>delete</button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixTwo;
