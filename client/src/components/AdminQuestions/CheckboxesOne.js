import React, { useContext, useEffect, useState } from "react";
import  QuestionContext from "../pages/Admin/QuestionContext"
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import "../pages/Admin/AdminPortal.css";

const copyOptions = (orginalOptions) => orginalOptions.map((option) => {
	return option
})

function CheckboxesOne({ question, questionNumber }) {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [inEditMode, setInEditMode] = useState({ status: false });
  const checkBoxesOneOption="";
  const [questionText, setQuestionText] = useState(
    question.question || "Select up to three options:"
  );

  const [answerOptions, setAnswerOptions] = useState( copyOptions(question.answerOptions) || copyOptions ([
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
      "Option 6",
      "Option 7",
      "Option 8",
    ])
  );

  const onEditClicked = () => {
    console.log("clicked checkbox");
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

  const onDelete = () => {
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
    setAnswerOptions([...answerOptions, checkBoxesOneOption]);
    // setQuestionText ([...questionText]);
    console.log("add input", answerOptions);
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
  //   console.log("newQuestionList", questions);
  //   console.log("questionNumber", questionNumber);
  //   newQuestionList[questionNumber - 1] = {
  //     ...newQuestionList[questionNumber - 1],
  //     question: questionText,
  //     // questionNumber,
  //     answerOptions,
  //   };
  //   console.log("questions line 23:", newQuestionList);
  //   setQuestions(newQuestionList);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [answerOptions]);

  useEffect(() => {
		onSave()
	}, [])

  return (
    <div className="question-component admin-question-component">
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
        <div className="checkboxes-buttons">
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
      <form className="checkbox-form-control">
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
        <div className="checkbox-form-group">
          <div className="questionAndButtons">
            <div className="questionText">
              {answerOptions.map((option, index) => {
                return inEditMode.status ? (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={option}
                      name="option-group"
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
                      type="checkbox"
                      id={option}
                      name="option-group"
                    />
                    <label>{option}</label>

                  </div>
                );
              })}
            </div>
          </div>
            {inEditMode.status 
              ? <p style={{color: "red"}}>Note: the last option will always be a comment field.</p>
              : null
            }
        </div>
      </form>
    </div>
  );
}

export default CheckboxesOne;
