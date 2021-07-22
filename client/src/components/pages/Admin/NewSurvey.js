import React, { useState } from "react";
import { useHistory } from "react-router";
import { Formik, Form, Field } from "formik";
import CheckboxesOne from "../../AdminQuestions/CheckboxesOne";
import CommentOne from "../../AdminQuestions/CommentOne";
import MatrixOne from "../../AdminQuestions/MatrixOne";
import MatrixTwo from "../../AdminQuestions/MatrixTwo";
import NarrativeOne from "../../AdminQuestions/NarrativeOne";
// import NewSliderOne (add when we have it)
import PostalCodeOne from "../../AdminQuestions/PostalCodeOne";
import RadioOne from "../../AdminQuestions/RadioOne";
import SelectOne from "../../AdminQuestions/SelectOne";
import SliderTwo from "../../AdminQuestions/SliderTwo";
import { v4 as uuidv4 } from "uuid";

let InsertedComponent 
const NewSurvey = (props) => {
  let history = useHistory();
  const [company, setCompany] = useState("");
  const [version, setVersion] = useState("");
  const [componentList, setComponentList] = useState([]);
  const [narrative, setNarrative] = useState("");
  const [questions, setQuestions]=useState([]);
  const [questionType, setQuestionType]=useState('');
  // const [insertedComponent, setInsertedComponent]=useState()
  const [questionNumber, setQuestionNumber]=useState(0);
  const [error, setError] = useState();
  
  // Create uuid to be used as survey number
  const uuid = uuidv4();
  //const url = `localhost:4444/${uuid}`;

  // Add question components (from /questiontypes folder) to the custom survey, depending on the id of the clicked button (buttons are in the return statement)
  function addComponent(e) {
    // console.log('Clicked:', e.target.id);
    let counter = questionNumber + 1
    setQuestionNumber(counter)

    // let InsertedComponent;
    switch (e.target.id) {
      case "checkboxes":
        InsertedComponent = CheckboxesOne;
        setQuestionType("checkboxes")
        break;
      case "comment":
        InsertedComponent = CommentOne;
        setQuestionType("comment")
        break;
      case "matrix":
        InsertedComponent = MatrixOne;
        setQuestionType("matrix")
        break;
      case "matrixNum":
        InsertedComponent = MatrixTwo;
        setQuestionType("matrixNum")
        break;
      case "postalCode":
        InsertedComponent = PostalCodeOne;
        setQuestionType("postalCode")
        break;
      case "radioButtons":
        InsertedComponent = RadioOne;
        setQuestionType("radioButtons")
        break;
      case "selectOne":
        InsertedComponent = SelectOne;
        setQuestionType("selectOne")
        break;
      case "sliderTwo":
        InsertedComponent = SliderTwo; 
        setQuestionType("sliderTwo")    
        break;
      default:
    }

    // Will need to update handleNarrativeChange in the onChange below to be generic, so it works for the other question components
    // This creates an array of the components that have been added to the custom survey
     setComponentList(
      componentList.concat(
        <div>
          {/* <InsertedComponent
            key={componentList.length}
            question={props.question}
            texts={props.texts}
            questionNumber={counter}
            value={props.narrative}
            // onChange={handleNarrativeChange}
          /> */}
      
        </div>
      )
    );
  }

  function onInputChange(event, setFunction) {
    setFunction(event.target.value);
  }

  // Validation to check that the required fields are filled out - NEEDS WORK
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

  async function handleSubmit() {
    const surveyNumber = uuid;

    // This just creates a list of the names of the components that have been added to the custom survey - to be updated to include more than just the names...
    let componentListNames = [];
    for (let i = 0; i < componentList.length; i++) {
      componentListNames = [...componentListNames, componentList[i].type.name];
    }
    // console.log("List of selected components: ", componentListNames);
    let componentListNamesString = componentListNames.toString();
    // console.log("componentListNamesString: ", componentListNamesString);

    // Log the info being saved into the DB
    console.log("***** DATA TO SAVE TO DATABASE *****");
    console.log("surveyNumber: ", surveyNumber);
    console.log("company: ", company);
    console.log("version: ", version);
    console.log("narrative: ", narrative);
    console.log("componentListNamesString: ", componentListNamesString);

    // "questions" (below) will need to be edited so it saves more than just the question names into the database
    let currentDate = new Date();
    let surveyToCreate = {
      surveyNumber,
      company,
      version,
      narrative,
      questions,
      // questions: {
      //   questionType: componentListNamesString,
      // },
      createdDate: currentDate,
    };

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
        Build your own survey by choosing from the components on the left.
      </h2>
      <Formik
        onSubmit={(values) => {
          console.log("Submitted values: ", values);
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
                required
                onChange={(event) => onInputChange(event, setCompany)}
              />
              <Field
                name="version"
                validate={validateVersion}
                id="survey-name"
                className="survey-info"
                placeholder="Survey version (required)"
                required
                onChange={(event) => onInputChange(event, setVersion)}
              />
            </div>
            {/* Add error messages if the company/version fields are left empty */}
            <div style={{ color: "red", textAlign: "center" }}>
              {errors.company && touched.company && <div>{errors.company}</div>}
              {errors.version && touched.version && <div>{errors.version}</div>}
            </div>
          </Form>
        )}
      </Formik>

      {/* LEFT PART OF PAGE */}
      {/* FOR LATER:  Make it so we can change order and number of questions - drag and drop?? */}
      <div className="survey-selection-container">
        <div className="survey-selection-sidebar">
          {/* Narrative button not needed since this component is now required - delete? */}
          {/* <button id="narrative" onClick={addComponent} disabled style={{backgroundColor:"darkGrey"}}>
            Narrative <em>(disabled)</em>
          </button> */}
          <button id="checkboxes" onClick={addComponent}>
            Checkbox
          </button>
          <button id="comment" onClick={addComponent}>
            Comment
          </button>
          <button id="matrix" onClick={addComponent}>
            Matrix
          </button>
          <button id="matrixNum" onClick={addComponent}>
            Matrix-Num
          </button>
          <button id="radioButtons" onClick={addComponent}>
            RadioButton
          </button>
          <button id="postalCode" onClick={addComponent}>
            PostalCode
          </button>
          <button id="selectOne" onClick={addComponent}>
            Select
          </button>
          <button id="sliderTwo" onClick={addComponent}>
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
            {/* <div>{componentList}</div> */}
            {
              componentList.map((component, index)=>{
                return(
                    <InsertedComponent
                      key={index}
                      questionType={questionType}
                      question={component.question}
                      answerOptions={component.texts}
                      questionNumber={questionNumber}
                      // updatePostalCode={postalCode=>setPostalCode(postalCode)}
                    />
                  
                )
              })
            }
          </div>
        </div>
      </div>

      {/* BOTTOM PART OF PAGE */}
      <div className="dividerLine"></div>
      <div className="save-survey-button-and-link">
        <button
          type="submit"
          className="save-survey-button"
          onClick={handleSubmit}
        >
          Save Survey
        </button>
        {error}
        {/* <div className="note-to-self">
          Survey link to send out (will need to create this upon saving and make
          it actually access a survey): &nbsp;
          <a href={url} style={{ paddingBottom: "10px" }}>
            {url}
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default NewSurvey;
