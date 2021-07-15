import { useState } from "react";
import "../../../components/Form.css";
// import "./AdminPortal.css";
import CheckboxesOne from "../../AdminQuestions/CheckboxesOne";
import CommentOne from "../../AdminQuestions/CommentOne"
import MatrixOne from "../../AdminQuestions/MatrixOne"
import MatrixTwo from "../../AdminQuestions/MatrixTwo"
import NarrativeOne from "../../AdminQuestions/NarrativeOne";
// import NewSliderOne (add when we have it)
import PostalCodeOne from "../../AdminQuestions/PostalCodeOne"
import RadioOne from "../../AdminQuestions/RadioOne"
import SelectOne from "../../AdminQuestions/SelectOne"
import SliderTwo from "../../AdminQuestions/sliderTwo" // Not working
import { v4 as uuidv4 } from "uuid";

const NewSurvey = (props) => {
  const [companyName, setCompanyName] = useState("");
  const [surveyName, setSurveyName] = useState("");
  const [componentList, setComponentList] = useState([]);
  const [narrativeTextValue, setNarrativeTextValue] = useState("");

  const url = `localhost:4444/${uuidv4()}`;

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
    setNarrativeTextValue(newValue)
  }

  
  async function handleSubmit() {
    console.log("***** DATA TO SAVE *****");
    console.log("companyName: ", companyName);
    console.log("surveyName: ", surveyName);
    console.log("narrativeTextValue: ", narrativeTextValue)
    let componentListNames = []
    for (let i=0; i<componentList.length; i++) {
      componentListNames = [...componentListNames, componentList[i].type.name]
    }
    console.log("List of selected components: ", componentListNames)
  }

  function onInputChange(event, setFunction) {
    setFunction(event.target.value);
  }

  return (
    <div>
      {/* TOP PART OF PAGE */}
      <h2>Build a new survey!</h2>
      <div className="company-and-survey-name-inputs">
        <input
          id="company-name"
          className="survey-info"
          placeholder="Company name"
          onChange={(event) => onInputChange(event, setCompanyName)}
        />
        <input
          id="survey-name"
          className="survey-info"
          placeholder="Survey name/version"
          onChange={(event) => onInputChange(event, setSurveyName)}
        />
      </div>

      {/* LEFT PART OF PAGE */}
      {/* FOR LATER:  Make it so we can change order and number of questions - drag and drop?? */}

      <div className="survey-selection-container">
        <div className="survey-selection-sidebar">
      <h3>Choose your own components:</h3>
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
          <button id="sliderTwo" onClick={addComponent} style={{backgroundColor: "red"}}>
            SliderTwo - <strong> broken! :(</strong>
            
          </button>
        </div>

        {/* <hr style={{ margin: "20px" }} /> */}

        {/* RIGHT PART OF PAGE */}
        <div className="survey-selection">
        <h3>Your survey:</h3>
          <div className="survey-selection-background">

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
          <strong>Save survey</strong> (and eventually receive link for forwarding)
        </button>
        <h3>
          Survey link to send out (will need to make it actually access a
          survey..):
        </h3>
        <a href={url} style={{ paddingBottom: "10px" }}>
          {url}
        </a>
      </div>
    </div>
  );
};

export default NewSurvey;
