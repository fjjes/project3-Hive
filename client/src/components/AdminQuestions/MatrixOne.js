import React, { useState, useContext, useEffect } from "react";
import  QuestionContext from "../pages/Admin/QuestionContext"
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import "../pages/Admin/AdminPortal.css";

const MatrixOne = ({ question, questionNumber }) => {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [inEditMode, setInEditMode] = useState({ status: false });
  const matrixOneOption ={};
 
  const [questionText, setQuestionText] = useState(
    question.question ||
      "Please indicate for each of the factors below their importance to you in the performance of your work, then your level of satisfaction with these factors in your current work environment:"
  );
  const [answerOptions, setAnswerOptions] = useState(
		question.answerOptions || [
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
      // { text: "Ability to work in the office with remote contacts" },
      // {
      //   text: "Ability to easily switch between face-to-face work and work at home",
      // },
      // {
      //   text: "Quality of the environment near my workplace (neighborhood, shops, services, restaurants, etc.)",
      // },
    ]
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
    // const previousQuestions=[...questions]
    // previousQuestions[questionNumber]={question:questionText,answerOptions:[...answerOptions]}
    // setQuestions(previousQuestions)
		setQuestions(questions => {
			const updatedQuestions = [...questions]
			updatedQuestions[questionNumber] = {
				question: questionText,
				answerOptions: answerOptions
			}
			return [...updatedQuestions]
		})
    console.log("clicked save", questions);
  setInEditMode({ status: false });
};

  const onCancel = () => {
    console.log("clicked cancel");
    setInEditMode({ status: false });
		console.log(questions, answerOptions)
		setAnswerOptions([...questions[questionNumber].answerOptions])
  };

  const onDelete = (e) => {
    e.preventDefault();
    questions.splice(questionNumber - 1, 1);
    const deleteQuestion = [...questions];
    setQuestions(deleteQuestion);
  };

	const deleteOptions = (index) => {  
		console.log(index, "index", answerOptions)
		let updatedAnswerOptions = answerOptions.filter((answer, answerIndex) => index !== answerIndex)
		setAnswerOptions(updatedAnswerOptions);
		console.log(updatedAnswerOptions)
	};

  const OnAddInput = () => {
    console.log("clicked add");
    setAnswerOptions([...answerOptions, matrixOneOption]);
    // setQuestionText ([...questionText]);
    console.log("add input", answerOptions);
    setInEditMode({ status: true });
  };

  const onInputChange = (event, index) => {
		setAnswerOptions(answer => {
			answer[index].text = event.target.value
			return  answer
		})
		console.log(questions[questionNumber].answerOptions[index])
    console.log("input changes here");
  };

  // useEffect(() => {
  //   const newQuestionList = [...questions];
  //   newQuestionList[questionNumber - 1] = {
  //     ...newQuestionList[questionNumber - 1],
  //     question: questionText,
  //     // questionNumber,
  //     answerOptions,
  //   };
  //   console.log("showing up?", newQuestionList);
  //   setQuestions(newQuestionList);
  // }, [answerOptions]);

	useEffect(() => {
		onSave()
	}, [])

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
            {/* removing this empty <th></th> will mess up the layout of matrix labels */}
            {/* cl is the satisfied,disatisfied ,column headings */}
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
							<tr key ={row.text}>
								{inEditMode.status
									? <>
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
										<button onClick={() => deleteOptions(i)}>delete</button>
									</td>
									</>
									: 
									<>
										<td className="label-rows">
											<label>{answerOptions[i].text}</label>
										</td>
										{columns.map((col, index) => {
											return (
                        <td key={index}>
                          <input type="radio" name={row.text} value={col} />
                        </td>
										)})}
									</>
								}
							</tr>
						)
					})}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixOne;
