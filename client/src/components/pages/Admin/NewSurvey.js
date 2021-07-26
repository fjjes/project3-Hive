import React, { useState } from "react";
// import { Formik, Form, Field } from "formik";
import NarrativeOne from "../../AdminQuestions/NarrativeOne";
// import NewSliderOne (add when we have it)
import QuestionComponent from './QuestionComponent'
import SaveSurveyButton from "./SaveSurveyButton";
// import id from "date-fns/locale/id";

export const QuestionContext = React.createContext({
  questions: [],
  setQuestions: () => {},
});

const NewSurvey = () => {
  const [company, setCompany] = useState("");
  const [version, setVersion] = useState("");
  const [narrative, setNarrative] = useState("");
  const [questionNumber, setQuestionNumber]=useState(0)

  const [questions, setQuestions]=useState([]);
  const value = { questions, setQuestions};
  // console.log("Stuff", company, version, narrative)
  
  function onInputChange(event, setFunction) {
    setFunction(event.target.value);
  }

  // // Validation to check that the required fields are filled out
  // function validateCompany(value) {
  //   let validationError;
  //   if (!value) {
  //     validationError = "Company name is required";
  //   }
  //   return validationError;
  // }

  // function validateVersion(value) {
  //   let validationError;
  //   if (!value) {
  //     validationError = "Survey version is required";
  //   }
  //   return validationError;
  // }

  const addAQuestion  =(e)=>{
    e.preventDefault();
    let counter=questionNumber+1
    setQuestionNumber(counter)

    const newQuestions=[...questions]
    newQuestions.push({questionType:e.target.value, questionNumber:counter})
    setQuestions(newQuestions)
    //setQuestions([...questions, {questionType:e.target.value, questionNumber:counter}])
  }
 
  // (history, company, version, narrative, questions, error, setError, uuid) 
  return (
    <div>
      {/* TOP PART OF PAGE */}
      <h2>
        Build your own survey by choosing from the components on the left.
      </h2>
      {/* <Formik
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form> */}
            <form className="company-and-survey-name-inputs">
              {/* <Field */}
              <input
                name="company"
                // validate={validateCompany}
                id="company-name"
                className="survey-info"
                placeholder="Company name (required)"
                value={company}
                // required
                onChange={(event) => onInputChange(event, setCompany)}
              />
              {/* <Field */}
              <input
                name="version"
                // validate={validateVersion}
                id="survey-name"
                className="survey-info"
                placeholder="Survey version (required)"
                value={version}
                // required
                onChange={(event) => onInputChange(event, setVersion)}
              />
            </form>
            {/* Add error messages if the company/version fields are left empty */}
            {/* <div style={{ color: "red", textAlign: "center" }}>
              {errors.company && touched.company && <div>{errors.company}</div>}
              {errors.version && touched.version && <div>{errors.version}</div>}
            </div> */}
          {/* </Form>
        )}
      </Formik> */}

      {/* LEFT PART OF PAGE */}
      {/* FOR LATER:  Make it so we can change order and number of questions - drag and drop?? */}
      <div className="survey-selection-container">
        <div className="survey-selection-sidebar">
          {/* Narrative button not needed since this component is now required - delete? */}
          {/* <button value="narrative" onClick={addAQuestion} disabled style={{backgroundColor:"darkGrey"}}>
            Narrative <em>(disabled)</em>
          </button> */}
          <button value="checkbox" onClick={addAQuestion}>
            Checkbox
          </button>
          <button value="comment" onClick={addAQuestion}>
            Comment
          </button>
          <button value="matrix1" onClick={addAQuestion}>
            Matrix
          </button>
          <button value="matrix2" onClick={addAQuestion}>
            Matrix-Num
          </button>
          <button value="radio" onClick={addAQuestion}>
            RadioButton
          </button>
          <button value="postal" onClick={addAQuestion}>
            PostalCode
          </button>
          <button value="select" onClick={addAQuestion}>
            Select
          </button>
          <button value="slider" onClick={addAQuestion}>
            Slider
          </button>
        </div>

        {/* RIGHT PART OF PAGE */}
        <div className="survey-selected-components">
          <div className="survey-selected-components-background">
            {/* Displays the question components that have been selected */}
            <NarrativeOne 
                updateNarrative={narrative => setNarrative(narrative)}
                />
          </div>
          <QuestionContext.Provider value={value}>
          {
            questions.map((questionBlock, index)=>(
              <div key={index}>
                <QuestionComponent 
                  questionType={questionBlock.questionType}
                  questionNumber={questionBlock.questionNumber}
                />
              </div>
            ))
          }
           </QuestionContext.Provider>
        </div>
      </div>

      {/* BOTTOM PART OF PAGE */}
      <div className="dividerLine"></div>
      {/* <div className="save-survey-button-and-link">
        <button
          type="submit"
          className="save-survey-button"
          onClick={handleSubmit}
        >
          Save Survey
        </button>
        <p style={{color: "red", fontSize: "1rem"}}>
          {error} <br/>
          (Make sure the company name and survey version are filled out)
        </p>
      </div> */}
      <SaveSurveyButton 
        company={company} 
        version={version}
        narrative={narrative}
        questions={questions}
        />
    </div>
  );
};

export default NewSurvey;