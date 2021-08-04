import React, { useState, useContext, useEffect } from "react";
import  QuestionContext from "../pages/Admin/QuestionContext"
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";

const copyOptions = (orginalOptions) => orginalOptions.map((option) => {
	return {text: option.text}
})

const SelectOne = ({ question, questionNumber }) => {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [inEditMode, setInEditMode] = useState({ status: false });
  const [questionText, setQuestionText] = useState(
    question.question ||
      "In your opinion, what are the necessary and complementary organizational points for teleworking that should be implemented within the company? Many Answers are possible.\nPlease rank the following in order of interest:"
  );
  const [answerOptions, setAnswerOptions] = useState(
    copyOptions(question.answerOptions) || copyOptions([
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
  };

  // const onSave = () => {
  //   setQuestions(questions);
  //   setQuestionText(questionText);
  //   //   const previousQuestions=questions
  //   //   previousQuestions[questionNumber]={}
  //   //   setQuestion(previousQuestions)
  //   //   console.log("clicked save", questions);
  //   setInEditMode({ status: false });
  // };

  const onSave = () => {
    // setQuestions(questions);
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


  console.log("questions: ", questions); 
  // console.log("questionText: ", questionText);
  // console.log("answerOptions: ", answerOptions)
  // console.log("answerOptions[0]: ", answerOptions[0])
  // console.log("answerOptions[0].text: ", answerOptions[0].text)

  const onCancel = () => {
    console.log("clicked cancel");
    setInEditMode({ status: false });
    console.log(questions, answerOptions)
		setQuestionText(questions[questionNumber - 1].question)
		setAnswerOptions(questions[questionNumber - 1].answerOptions)
  };

  const onDelete = (e) => {
    e.preventDefault();
    questions.splice(questionNumber - 1, 1);
    const deleteQuestion = [...questions];
    setQuestions(deleteQuestion);
  };

	const deleteOptions = (index) => {  //delete starts on the bottom
		console.log(index, "index", answerOptions)
		let updatedAnswerOptions = answerOptions.filter((answer, answerIndex) => index !== answerIndex)
		setAnswerOptions(updatedAnswerOptions);
		console.log(updatedAnswerOptions)
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
  // }, [questionText]);

  const OnAddInput = () => {
    console.log("clicked add");
    setAnswerOptions([
      ...answerOptions,selectionOption
    ]);
    console.log("answerOptions", answerOptions);
    setInEditMode({ status: true });
  };
  const onInputChange = (event, index) => {
    setAnswerOptions(answer => {
			answer[index].text = event.target.value
			return  answer
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
    <div className="selectOne question-component admin-question-component">
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
      <div>
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
      <p className="question-intro">Q{questionNumber}.</p>
      {inEditMode.status ? (
        <textarea
          type="text"
          className="question-intro"
          value={questionText}
          // placeholder={questionText}
          style={{ height: "100px", width: "90%" }}
          onChange={(e) => setQuestionText(e.target.value)}
        />
      ) : (
        <p className="question-intro">{questionText}</p>
      )}

      {inEditMode.status
        ? answerOptions.map((row, i) => {
            return (
              <ul key={i}>
                <li style={{ listStyleType: "none", textAlign: "left" }}>
                  <input
                    id={row.text}
                    defaultValue={row.text}
                    // placeholder={row.text}
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
								<button onClick={() => deleteOptions(i)}>delete</button>
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
        </div>
    </div>
  );
};

export default SelectOne;
