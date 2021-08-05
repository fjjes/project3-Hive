import React, { useState, useContext, useEffect } from "react";
import  QuestionContext from "../pages/Admin/QuestionContext"
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import "../pages/Admin/AdminPortal.css";

const copyOptions = (orginalOptions) => orginalOptions.map((option) => {
	return { text: option.text }
})

const MatrixTwo = ({ question, questionNumber }) => {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [inEditMode, setInEditMode] = useState({ status: false });
  const matrixTwoOption ={};
  const [questionText, setQuestionText] = useState( question.question || "Please rate the importance of the following from 1 to 10:");
  const [answerOptions, setAnswerOptions] = useState(
		copyOptions(question.answerOptions) || copyOptions([
      { text: "text 1" },
      { text: "text 2" },
      { text: "text 3" },
      { text: "text 4" },
      { text: "text 5" },
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
  };

  const onSave = () => {
    console.log("save!!!");
		setQuestions(questions => {
			const updatedQuestions = [...questions]
			updatedQuestions[questionNumber - 1] = {
				...updatedQuestions[questionNumber - 1],
				question: questionText,
				answerOptions: copyOptions(answerOptions)
			}
			console.log("answerOption", answerOptions)
			return [...updatedQuestions]
		})
		console.log("clicked save", questions);
		setInEditMode({ status: false });
};

  const onCancel = () => {
    console.log("clicked cancel");
    setInEditMode({ status: false });
		setQuestionText(questions[questionNumber - 1].question)
		setAnswerOptions(questions[questionNumber - 1].answerOptions)
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
    setAnswerOptions([...answerOptions, matrixTwoOption]);
    // setQuestionText ([...questionText]);
    console.log("add input", answerOptions);
    setInEditMode({ status: true });
  };

  const onInputChange = (event, index) => {
    // const previousAnswerOptions = answerOptions;
    // previousAnswerOptions[index].text = event.target.value;
    // setAnswerOptions(previousAnswerOptions);
    // console.log("input changes here");
		setAnswerOptions(answer => {
			answer[index].text = event.target.value
			return answer
		})
		console.log(questions[questionNumber - 1].answerOptions[index])
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
								<button onClick={() => deleteOptions(i)}>delete</button>
							</td>
                  </tr>
                );
              })
           :answerOptions.map((row, i) => {
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
    </div>
  );
};

export default MatrixTwo;
