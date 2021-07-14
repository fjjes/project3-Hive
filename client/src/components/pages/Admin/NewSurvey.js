import { useState } from "react";
import "../../../components/Form.css";
import "./AdminPortal.css";
import Test from "../../questiontypes/Test";
import CheckboxesOne from "../../AdminQuestions/CheckboxesOne";
import NarrativeOne from "../../AdminQuestions/NarrativeOne";
import { v4 as uuidv4 } from "uuid";

const NewSurvey = (props) => {
  const [searchInputCompany, setSearchInputCompany] = useState("");
  const [searchInputNumber, setSearchInputNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [surveyName, setSurveyName] = useState("");
  const [surveyNarrative, setSurveyNarrative] = useState("");
  const [componentList, setComponentList] = useState([]);

  const url = `localhost:4444/${uuidv4()}`;

  function addComponent(e) {
    console.log(e.target.id);
    // setComponentList(componentList.concat(<Test key={componentList.length} /> ))}

    // setComponentList(
    //   componentList.concat(
    //     <NarrativeOne
    //       key={componentList.length}
    //       question={props.question}
    //       texts={props.texts}
    //       questionNumber={props.questionNumber}
    //     />
    //   )
    // );

    // add state??
    let InsertedComponent;
    switch (e.target.id) {
      case "checkboxes":
        console.log("clicked checkboxes");
        InsertedComponent = CheckboxesOne;
        break;
      case "comment":
        console.log("clicked comment");
        InsertedComponent = NarrativeOne;
        break;
      case "narrative":
        console.log("clicked comment");
        InsertedComponent = NarrativeOne;
        break;
      default:
      // code block
    }

    setComponentList(
      componentList.concat(
        <InsertedComponent
          key={componentList.length}
          question={props.question}
          texts={props.texts}
          questionNumber={props.questionNumber}
        />
      )
    );
    // setComponentList(componentList.concat(<CheckboxesOne key={componentList.length}
    //       question={props.question} texts={props.texts} questionNumber={props.questionNumber}
    //     />
    //   )
    // );
    // console.log(componentList)
  }

  async function handleSubmit() {
    console.log("DATA TO SAVE:");
    console.log("searchInputCompany: ", searchInputCompany);
    console.log("searchInputNumber: ", searchInputNumber);
    console.log("companyName: ", companyName);
    console.log("surveyName: ", surveyName);
    console.log("surveyNarrative: ", surveyNarrative);
  }

  function onInputChange(event, setFunction) {
    // console.log(`Changing input of "${event.target.id}" to be: ${event.target.value}`);
    setFunction(event.target.value);
  }

  return (
    <div>
      <h2>New Survey Component</h2>
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
      {/* <input
        id="survey-narrative"
        className="survey-info"
        placeholder="Survey narrative"
        onChange={(event) => onInputChange(event, setSurveyNarrative)}
      />
      <NarrativeOne
        onChange={(event) => onInputChange(event, setSurveyNarrative)}
      /> */}

      <h3>Choose your own components:</h3>
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
          <button id="selectInput" onClick={addComponent}>
            SelectInput
          </button>
          <button id="slider" onClick={addComponent}>
            Slider
          </button>
        </div>

        <hr style={{ margin: "20px" }} />

        <div className="survey-selection">
          <div style={{ backgroundColor: "lightGrey" }}>{componentList}</div>
        </div>
      </div>

      <div className="dividerLine"></div>
      {/* <hr style={{ margin: "20px" }} /> */}
      <div className="save-survey-button-and-link">
        <button
          type="submit"
          className="save-survey-button"
          onClick={handleSubmit}
        >
          Save survey and receive link for forwarding
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
