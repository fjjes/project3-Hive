import React, { useState, useContext, useEffect } from "react";
import  QuestionContext from "../pages/Admin/QuestionContext"
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import "../pages/Admin/AdminPortal.css";
import * as RiIcons from "react-icons/ri";

const copyOptions = (orginalOptions) => orginalOptions.map((option) => {
	return option
})

function RadioOne({ question, questionNumber }) {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [inEditMode, setInEditMode] = useState({ status: false });
  const radioOption="";
  const [questionText, setQuestionText] = useState(question.question || "What is your department or team?");
  const [answerOptions, setAnswerOptions] = useState( copyOptions(question.answerOptions) || copyOptions(
    [
    "Option1",
    "Option2",
    "Option3",
    "Option4",
    "Option5",
    // "Option6",
    // "Option7",
    // "Option8",
  ])
  );

  const onEditClicked = () => {
    console.log("clicked edit");
    setInEditMode({ status: true });
  };
console.log('questions in radio', questions)

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
    console.log("deleting", e)
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
    setAnswerOptions([...answerOptions,radioOption]);
    console.log("answer", answerOptions);
    setInEditMode({ status: true });
  };
  const onInputChange = (event, index) => {
    setAnswerOptions(answer => {
			answer[index] = event.target.value
			return  answer
  })
  console.log(questions[questionNumber - 1].answerOptions[index])
    console.log("input changes here");
};

  // useEffect(() => {
  //   const newQuestionList = [...questions];
  //   newQuestionList[questionNumber - 1] = {
  //     ...newQuestionList[questionNumber - 1],
  //     question:questionText,
  //     // questionNumber,
  //     answerOptions,
  //   };
  //   setQuestions(newQuestionList);
  // }, [answerOptions]);

  useEffect(() => {
		onSave()
	}, [])

  return (
    <div className="radio-one question-component admin-question-component">
      <button style={{ float: "right", width: "43px" }} onClick={onDelete}>
        <RiIcons.RiDeleteBinFill />
      </button>
      <div className="edit-button">
        <button
          style={{ float: "right", width: "43px" }}
          className="clear icn3"
          title="Edit"
          onClick={() => onEditClicked()}
        >
          <BsIcons.BsPencilSquare />
        </button>
        <span className="slash" style={{ color: "#fff" }}>
          /
        </span>
        <div className="radio-buttons">
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
            <div></div>
          )}
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
      <div className="questionAndButtons">
        <div className="questionText">
          {answerOptions.map((option, index) => {
            return inEditMode.status ? (
              <div key={index}>
                <input
                  type="radio"
                  id={option}
                  name="option-group"
                  color="primary"
                />
                <input
                  defaultValue={option}
                  onChange={(e) => onInputChange(e, index)}
                />
								<button onClick={() => deleteOptions(index)}>delete</button>
              </div>
            ) : (
              <div>
                <input
                  type="radio"
                  id={option}
                  name="option-group"
                  color="primary"
                  // onChange={(e) => setQuestion(e.target.value)}
                />
                <label>{option}</label>
              </div>
            );
          })}
        </div>
        
        </div>
      </div>
    </div>
  );
}

export default RadioOne;
