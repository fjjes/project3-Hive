import React, { useContext, useEffect, useState } from "react";
import QuestionContext from "../pages/Admin/QuestionContext";
import "../pages/Admin/AdminPortal.css";
import {
  EditButton,
  DeleteButton,
  SaveButton,
  CancelButton,
  AddInputButton,
} from "./AdminEditButtons";
import * as RiIcons from "react-icons/ri";

const copyOptions = (originalOptions) =>
  originalOptions.map((option) => {
    return option;
  });

function CheckboxesOne({ question, questionNumber, setWholeSurveyInEditModeOrNot }) {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [inEditMode, setInEditMode] = useState({ status: false });
  const [checkboxesOneOption, setcheckboxesOneOption] = useState("")
  const [questionText, setQuestionText] = useState(
    question.question || "What spaces would you like to use that is not  currently offered by the company? You can select upto three spaces. If none of them interests you, please do not select anything."
  );

  const [answerOptions, setAnswerOptions] = useState(
    copyOptions(question.answerOptions) ||
      copyOptions([
        "A work bubble/pod", 
        "A room of silence to concentrate", 
        "A project space or open creative space", 
        "A nap room", 
        "A work Station in a co-working place located outside the company",
        "Other"
      ])
  );

  const onEditClicked = () => {
    // console.log("clicked checkbox");
    setInEditMode({ status: true });
    setWholeSurveyInEditModeOrNot(true);
  };

  const onSave = () => {
    // console.log("save!!!");
    setQuestions((questions) => {
      const updatedQuestions = [...questions];
      updatedQuestions[questionNumber - 1] = {
        ...updatedQuestions[questionNumber - 1],
        question: questionText,
        answerOptions: copyOptions(answerOptions),
      };
      // console.log("answerOption", answerOptions);
      return [...updatedQuestions];
    });
    // console.log("clicked save", questions);
    setInEditMode({ status: false });
    setWholeSurveyInEditModeOrNot(false);

  };

  const onCancel = () => {
    // console.log("clicked cancel");
    setInEditMode({ status: false });
    setWholeSurveyInEditModeOrNot(false);
    setQuestionText(questions[questionNumber - 1].question);
    setAnswerOptions(questions[questionNumber - 1].answerOptions);
  };

  const onDelete = (qNumber) => {
    const questionIndex= parseInt(qNumber)-1
    const newQuestions =[...questions]
    newQuestions.splice(questionIndex, 1);
    // const deleteQuestion = [...questions];
    setQuestions(newQuestions);
  };

  const deleteOptions = (index) => {
    // console.log(index, "index", answerOptions);
    let updatedAnswerOptions = answerOptions.filter(
      (answer, answerIndex) => index !== answerIndex
    );
    setAnswerOptions(updatedAnswerOptions);
    console.log(updatedAnswerOptions);
  };

  const onAddInput = () => {
    // console.log("clicked add");
    setAnswerOptions([...answerOptions, checkboxesOneOption]);
    // console.log("add input", answerOptions);
    setInEditMode({ status: true });
  };

  const onInputChange = (event, index) => {
    // setAnswerOptions((answer) => {
    //   answer[index] = event.target.value;
    //   return answer;
    // });
    const newAnswerOptions=[...answerOptions]
    newAnswerOptions[index]= event.target.value
    setAnswerOptions (newAnswerOptions)

    // console.log(questions[questionNumber - 1].answerOptions[index]);
    // console.log("input changes here");
  };

  useEffect(() => {
    onSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="question-component admin-question-component">
      <div className="question-and-buttons">
        <div className="question-and-options side-border-line">
          <p className="question-intro">Question {questionNumber}</p>
          {inEditMode.status ? (
            <textarea
              type="text"
              className="question-intro"
              value={questionText}
              style={{ height: "100px", width: "90%" }}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          ) : (
            <p className="question-intro">{questionText}</p>
          )}
          <div className="checkbox-form-group">
            <div className="questionText">
              {answerOptions.map((option, index) => {
                return inEditMode.status ? (
                  <div key={option}>
                    <input type="checkbox" id={option} name="option-group" />
                    <input
                    ref={(input) => {
                      if (input) {
                          input.focus();
                      }
                  }}
                      value={option}
                      onChange={(e) => onInputChange(e, index)}
                    />
                    <button
                      className="delete-option-button"
                      onClick={() => deleteOptions(index)}
                    ><RiIcons.RiDeleteBinFill /> 
                    </button>
                  </div>
                ) : (
                  <div key={option}>
                    <input type="checkbox" id={option} name="option-group" />
                    <label>{option}</label>
                  </div>
                );
              })}
              {inEditMode.status? <AddInputButton onAddInput={onAddInput} /> : null}
              {inEditMode.status ? (
                <p style={{ color: "red" }}>
                  Note: the last option will always be a comment field.
                </p>
              ) : null}
            </div>
          </div>
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
              <DeleteButton onDelete={()=>onDelete(questionNumber)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckboxesOne;
