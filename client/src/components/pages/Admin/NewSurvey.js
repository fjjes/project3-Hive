import { useState } from "react";
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

const NewSurvey = (props) => {
  const [company, setCompany] = useState("");
  const [version, setVersion] = useState("");
  const [componentList, setComponentList] = useState([]);
  const [narrativeTextValue, setNarrativeTextValue] = useState("");

  // Create uuid to be used as survey number
  const uuid = uuidv4();
  const url = `localhost:4444/${uuid}`;

  // Add question components (from /questiontypes folder) to the custom survey, depending on the id of the clicked button (buttons are in the return statement)
  function addComponent(e) {
    // console.log('Clicked:', e.target.id);
    let InsertedComponent;
    switch (e.target.id) {
      case "narrative":
        InsertedComponent = NarrativeOne;
        break;
      case "checkboxes":
        InsertedComponent = CheckboxesOne;
        break;
      case "comment":
        InsertedComponent = CommentOne;
        break;
      case "matrix":
        InsertedComponent = MatrixOne;
        break;
      case "matrixNum":
        InsertedComponent = MatrixTwo;
        break;
      case "postalCode":
        InsertedComponent = PostalCodeOne;
        break;
      case "radioButtons":
        InsertedComponent = RadioOne;
        break;
      case "selectOne":
        InsertedComponent = SelectOne;
        break;
      case "sliderTwo":
        InsertedComponent = SliderTwo;
        break;
      default:
    }

    // Will need to update handleNarrativeChange in the onChange below to be generic, so it works for the other question components
    // This creates an array of the components that have been added to the custom survey
    setComponentList(
      componentList.concat(
        <InsertedComponent
          key={componentList.length}
          question={props.question}
          texts={props.texts}
          questionNumber={props.questionNumber}
          value={props.narrativeTextValue}
          onChange={handleNarrativeChange}
        />
      )
    );
  }

  function handleNarrativeChange(newValue) {
    setNarrativeTextValue(newValue);
  }

  function onInputChange(event, setFunction) {
    setFunction(event.target.value);
  }

  async function handleSubmit() {
    const surveyNumber = uuid;

    // This just creates a list of the names of the components that have been added to the custom survey - to be updated to include more than just the names...
    let componentListNames = [];
    for (let i = 0; i < componentList.length; i++) {
      componentListNames = [...componentListNames, componentList[i].type.name];
    }
    console.log("List of selected components: ", componentListNames);
    let componentListNamesString = componentListNames.toString();
    console.log("componentListNamesString: ", componentListNamesString);
    
    // Log the info being saved into the DB
    console.log("***** DATA TO SAVE TO DATABASE *****");
    console.log("surveyNumber: ", surveyNumber)
    console.log("company: ", company);
    console.log("version: ", version);
    console.log("narrativeTextValue: ", narrativeTextValue);
    console.log("componentListNamesString: ", componentListNamesString)

    // "questions" (below) will need to be edited so it saves more than just the question names into the database
    let currentDate = new Date();
    let surveyToCreate = {
      surveyNumber,
      company,
      version,
      narrative: narrativeTextValue,
      questions: {
        questionType: componentListNamesString,
      },
      createdDate: currentDate,
    };

    // Post the custom survey data to the DB
    let createSurvey = await fetch("/api/survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(surveyToCreate),
    });
    console.log("Creating a custom-built survey, yay!", surveyToCreate);

    if (createSurvey.status === 200) {
      console.log("create response is successful");
    }
  }

  return (
    <div>
      {/* TOP PART OF PAGE */}
      <h2>
        Build your own survey by choosing from the components on the left.
      </h2>

      <div className="company-and-survey-name-inputs">
        <input
          id="company-name"
          className="survey-info"
          placeholder="Company name (required)"
          required // Fix so that it does validation to check for the required fields, before trying to post
          onChange={(event) => onInputChange(event, setCompany)}
        />
        <input
          id="survey-name"
          className="survey-info"
          placeholder="Survey version (required)"
          required
          onChange={(event) => onInputChange(event, setVersion)}
        />
      </div>

      {/* LEFT PART OF PAGE */}
      {/* FOR LATER:  Make it so we can change order and number of questions - drag and drop?? */}
      <div className="survey-selection-container">
        <div className="survey-selection-sidebar">
          <button id="narrative" onClick={addComponent}>
            Narrative
          </button>
          <button id="checkboxes" onClick={addComponent}>
            Checkboxes
          </button>
          <button id="comment" onClick={addComponent}>
            Comment
          </button>
          <button id="matrix" onClick={addComponent}>
            Matrix
          </button>
          <button id="matrixNum" onClick={addComponent}>
            MatrixNum
          </button>
          <button id="radioButtons" onClick={addComponent}>
            RadioButtons
          </button>
          <button id="postalCode" onClick={addComponent}>
            PostalCode
          </button>
          <button id="selectOne" onClick={addComponent}>
            SelectOne
          </button>
          <button id="sliderTwo" onClick={addComponent}>
            SliderTwo
          </button>
        </div>

        {/* RIGHT PART OF PAGE */}
        <div className="survey-selected-components">
          <div className="survey-selected-components-background">
            {/* Displays the question components that have been selected */}
            <div>{componentList}</div>
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
        <div className="note-to-self">
          Survey link to send out (will need to create this upon saving and make
          it actually access a survey): &nbsp;
          <a href={url} style={{ paddingBottom: "10px" }}>
            {url}
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewSurvey;
