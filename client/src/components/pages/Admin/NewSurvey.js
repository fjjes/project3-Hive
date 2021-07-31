import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Formik, Form, Field } from "formik";
import NarrativeOne from "../../AdminQuestions/NarrativeOne";
import QuestionComponent from "./QuestionComponent";
// import { v4 as uuidv4 } from "uuid";
// import id from "date-fns/locale/id";

export const QuestionContext = React.createContext({
  questions: [],
  setQuestions: () => {},
});

const NewSurvey = ({ rowId }) => {
  const history = useHistory();
  const [surveyNumber, setSurveyNumber]=useState()
  const [company, setCompany] = useState("");
  const [version, setVersion] = useState("");
  const [narrative, setNarrative] = useState("This past year has challenged and has had both positive and negative impacts on our working methods and ways of doing things within our office. (Temporarily removed the remaining placeholder narrative text to make the component easier to work with...)");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [error, setError] = useState();
  const [answerOptions, setAnswerOptions] = useState([])

  const [questions, setQuestions] = useState([]);
  const value = { questions, setQuestions };

  useEffect(() => {
    const getSurvey = async () => {
      let response = await fetch(`/api/survey/${rowId}`);
      console.log("Grabbing rowId: ", rowId);
      let data = await response.json();
      console.log("data:", data);
      setQuestions(data.questions);
      setNarrative(data.narrative);
      setCompany(data.company);
      setVersion(data.version);
      setAnswerOptions(data.questions.answerOptions)
      setQuestionNumber(data.questions.length)
    };
    if (rowId) {
      getSurvey();
    }
  }, [rowId]);
  
  console.log("questions: ", questions);
  console.log("narrative: ", narrative)
  console.log("company: ", company);
  console.log("version: ", version);
  console.log("answer options: ", answerOptions)

  function onInputChange(event, setFunction) {
    setFunction(event.target.value);
  }

  // Validation to check that the required fields are filled out
  function validateCompany(value) {
    let validationError;
    if (!value) {
      validationError = "Company name is required";
    }
    return validationError;
  }

  function validateVersion(value) {
    let validationError;
    if (!value) {
      validationError = "Survey version is required";
    }
    return validationError;
  }

  function validateSurveyNum(value) {
    let validationError;
    if (!value) {
      validationError = "Survey # is required";
    }
    return validationError;
  }

  const addAQuestion = (e) => {
    e.preventDefault();
    

    const newQuestions = [...questions];
    newQuestions.push({
      questionType: e.target.value,
      
    });
    setQuestions(newQuestions);
  };

  async function handleSubmit() {
    // const surveyNumber = uuid;

    let currentDate = new Date();
    let surveyToCreate = {
      surveyNumber,
      company,
      version,
      narrative,
      questions,
      createdDate: currentDate,
    };
surveyToCreate.questions.forEach((question,index)=>{
  question.questionNumber= index + 1
})
console.log('surveyToCreate',surveyToCreate)
    console.log("survey:", surveyToCreate);
    // Post the custom survey data to the DB
    try {
      let createSurvey = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(surveyToCreate),
      });
      console.log("Creating a custom-built survey, yay!", surveyToCreate);

      if (createSurvey.status !== 200) {
        let errorMessage = await createSurvey.text();
        console.log("We have an error: ", errorMessage);
        setError(errorMessage);
      } else {
        setError(undefined);
        console.log("create response is successful");
        history.push("/find-list");
      }
    } catch (error) {
      console.log("Fetch failed to reach the server:", error);
    }
  }

  return (
    <div>
      {/* TOP PART OF PAGE */}
      <h2>
        {!rowId
          ? "Build your own survey by choosing from the components on the left."
          : "Edit your survey here."}
      </h2>
      <Formik
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="company-and-survey-name-inputs">
              <Field
                name="company"
                validate={validateCompany}
                id="company-name"
                className="survey-info"
                placeholder="Company name (required)"
                value={company}
                required
                onChange={(event) => onInputChange(event, setCompany)}
              />
              <Field
                name="version"
                validate={validateVersion}
                id="survey-name"
                className="survey-info"
                placeholder="Survey version (required)"
                value={version}
                required
                onChange={(event) => onInputChange(event, setVersion)}
              />
              <Field
                name="surveyNumber"
                validate={validateSurveyNum}
                id="survey-name"
                className="survey-info"
                placeholder="Survey Number (required)"
                value={surveyNumber}
                required
                onChange={(event) => onInputChange(event, setSurveyNumber)}
              />
            </div>
            {/* Add error messages if the company/version fields are left empty */}
            <div style={{ color: "red", textAlign: "center" }}>
              {errors.company && touched.company && <div>{errors.company}</div>}
              {errors.version && touched.version && <div>{errors.version}</div>}
              {errors.surveyNumber && touched.surveyNumber && <div>{errors.surveyNumber}</div>}
            </div>
          </Form>
        )}
      </Formik>

      {/* LEFT PART OF PAGE */}
      <div className="survey-selection-container">
        <div className="survey-selection-sidebar">
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
              narrative={narrative}
              updateNarrative={(narrative) => setNarrative(narrative)}
            />
          </div>
          <QuestionContext.Provider value={value}>
            {questions.map((questionBlock, index) => (
              <div key={index}>
                <QuestionComponent
                  question={questionBlock}
                  questionNumber={index + 1}
                />
              </div>
            ))}
          </QuestionContext.Provider>
        </div>
      </div>

      {/* BOTTOM PART OF PAGE */}
      <div className="dividerLine"></div>
      <div className="save-survey-button-and-link">
        {error && !(company || version || surveyNumber) &&
          <div>
            <p style={{ color: "red", fontSize: "1rem" }}>(Make sure the company name and the survey version filled out!) <br />
              </p>
          </div>
        }
        <button type="submit" className="save-survey-button" onClick={handleSubmit}>Save Survey </button>

      </div>
    </div>
  );
};

export default NewSurvey;
