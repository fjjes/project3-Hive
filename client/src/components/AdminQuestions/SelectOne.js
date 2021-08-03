import React, { useState, useContext, useEffect } from "react";
import { QuestionContext } from "../pages/Admin/NewSurvey";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";

const SelectOne = ({ question, questionNumber }) => {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [inEditMode, setInEditMode] = useState({ status: false });
  const [questionText, setQuestionText] = useState(
    question.question ||
      "In your opinion, what are the necessary and complementary organizational points for teleworking that should be implemented within the company? Many Answers are possible.\nPlease rank the following in order of interest:"
  );
  const [answerOptions, setAnswerOptions] = useState(
    question.answerOptions || [
      { text: "Rethinking workspaces in the company" },
      { text: "Review the organization of meetings Rethinking moments" },
      { text: "Spaces of conviviality" },
      { text: "Do not change anything" },
      { text: "Other" },
    ]
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
      const previousQuestions=questions
      previousQuestions[questionNumber]={question:questionText,answerOptions}
      setQuestions(previousQuestions)
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


  useEffect(() => {
    const newQuestionList = [...questions];
    newQuestionList[questionNumber - 1] = {
      ...newQuestionList[questionNumber - 1],
      question: questionText,
      // questionNumber,
      answerOptions,
    };
    setQuestions(newQuestionList);
  }, [questionText]);

  const OnAddInput = () => {
    console.log("clicked add");
    setAnswerOptions([
      ...answerOptions,selectionOption
    ]);
    console.log("answerOptions", answerOptions);
    setInEditMode({ status: true });
  };
  const onInputChange = (event, index) => {
    const previousAnswerOptions = answerOptions;
    previousAnswerOptions[index].text = event.target.value;
    setAnswerOptions(previousAnswerOptions);
    // console.log("answerOptions[index]: ", answerOptions[index])
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
      </div>

      <p className="question-intro">Q{questionNumber}.</p>
      {inEditMode.status ? (
        <textarea
          type="text"
          className="question-intro"
          value={questionText}
          placeholder={questionText}
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
                    placeholder={row.text}
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
								<button onClick={deleteOptions}>delete</button>
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

      {inEditMode.status ? (
        <div className="edit-button">
          <button className="clear icn1" title="Save" onClick={() => onSave()}>
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
        // </div>
        <div className="edit-button">
          {/* <button
                className="clear icn3"
                title="Edit"
                onClick={() => onEditClicked()}
              >
                <BsIcons.BsPencilSquare />
              </button> */}
          <span className="slash" style={{ color: "#fff" }}>
            /
          </span>
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default SelectOne;
