import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import NarrativeOne from "../../AdminQuestions/NarrativeOne";
import { v4 as uuidv4 } from "uuid";
import QuestionComponent from "./QuestionComponent";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";
import QuestionContext from "./QuestionContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const SaveSurvey = ({ rowId, copyOrOriginal }) => {
  const history = useHistory();
  const [surveyNumber, setSurveyNumber] = useState("");
  const [company, setCompany] = useState("");
  const [version, setVersion] = useState("");
  const [heading, setHeading] = useState("")
  const [narrative, setNarrative] = useState(
    "This past year has challenged and has had both positive and negative impacts on our working methods and ways of doing things within our office. (Temporarily removed the remaining placeholder narrative text to make the component easier to work with...)"
  );
  const [error, setError] = useState();
  const [validationErrorCompany, setValidationErrorCompany] = useState("")
  const [validationErrorVersion, setValidationErrorVersion] = useState("")
  const [validationErrorSurveyNumber, setValidationErrorSurveyNumber] = useState("")
  const [questions, setQuestions] = useState([]);
  const value = { questions, setQuestions };

  // If we click on a survey in the find surveys list (which sets rowId), we get that survey's data here:
  useEffect(() => {
    const getSurvey = async () => {
      let response = await fetch(`/api/survey/${rowId}`);
      console.log("Grabbing rowId: ", rowId);
      let data = await response.json();
      console.log("data:", data);
      setQuestions(data.questions);
      setHeading(data.heading);
      setNarrative(data.narrative);
      setCompany(data.company);
      setVersion(data.version);
      setSurveyNumber(data.surveyNumber);
    };
    if (rowId) {
      getSurvey();
    }
  }, [rowId]);

  // Check that the company/version/survey number fields are all filled out appropriately and set error messages as needed:
  const handleInputChange = (e) => {
    if (e.target.id === "company-name") {
      setCompany(e.target.value)
      if (e.target.value) {
        setValidationErrorCompany("")
      }
      else if (!e.target.value) {
        setValidationErrorCompany("Company name is required.")
      }
    }
    else if (e.target.id === "survey-version") {
      setVersion(e.target.value)
      if (e.target.value) {
        setValidationErrorVersion("")
      }
      else if (!e.target.value) {
        setValidationErrorVersion("Survey version is required.")
      }
    }
    else if (e.target.id === "survey-number") {
      if (e.target.value) {
        if (isNaN(e.target.value)) {
          setValidationErrorSurveyNumber("This field must be a number.")
        }
        else if (!isNaN(e.target.value)) {
          setValidationErrorSurveyNumber("")
        }
      }
      else if (!e.target.value) {
        setValidationErrorSurveyNumber("Survey number is required.")
      }
      setSurveyNumber(e.target.value)
    }
  }

  // Default answer options and questions to be pulled into each question component that's added to a new survey:
  const addAQuestion = (e) => {
    e.preventDefault();
    const newQuestions = [...questions];
    let answerOptions = null;
    let question = "";
    switch (e.target.value) {
      case "radio":
        answerOptions = [
          "Administration", 
          "Sales Professional", 
          "Specialist Management", 
          "Senior Management", 
          "Director"
        ];
        question = "What is your department or team?";
        break;
      case "checkbox":
        answerOptions = [
          "A work bubble/pod", 
          "A room of silence to concentrate", 
          "A project space or open creative space", 
          "A nap room", 
          "A work Station in a co-working place located outside the company",
          "Other"
        ];
        question = "What spaces would you like to use that is not  currently offered by the company? You can select upto three spaces. If none of them interests you, please do not select anything.";
        break;
      case "matrix1":
        answerOptions = [
          { text: "Ability to concentrate" },
          { text: "Ability to conduct telephone conversations" },
          { text: "Ability to find a meeting room within a reasonable timeframe" },
          { text: "Ability to access collaborative spaces for informal exchanges with my colleagues" },
          { text: "Ability to conduct confidential conversations" },
          { text: "Quality of IT and telephone tools (excluding workstations) made available (connection tools and screens in meeting rooms, etc.)" },
          { text: "Ability to work in the office with remote contacts" },
          { text: "Ability to easily switch between face-to-face work and work at home" },
          { text: "Quality of the environment near my workplace (neighborhood, shops, services, restaurants, etc.)" },
        ];
        question =
          "Please indicate for each of the factors below their importance to you in the performance of your work, then your level of satisfaction with these factors in your current work environment:";
        break;
      case "matrix2":
        answerOptions = [
          { text: "Provide better working comfort" },
          { text: "Stimulate creativity and collective performance" },
          { text: "Fascilitate access to information and news from business lines and departments" },
          { text: "Break down silos between departments and increase cross functional lines" },
          { text: "Provide spaces for more tranquility to work and concentration" }
        ];
        question = "Please rate the importance of the following from 1 to 10:";
        break;
      case "comment":
        answerOptions = "";
        question = "Enter a comment:";
        break;
      case "select":
        answerOptions = [
          { text: "Rethinking workspaces in the company" },
          { text: "Review the organization of meetings Rethinking moments" },
          { text: "Spaces of conviviality" },
          { text: "Do not change anything" },
          { text: "Other" },
        ];
        question =
          "In your opinion, what are the necessary and complementary organizational points for teleworking that should be implemented within the company? Many Answers are possible.\nPlease rank the following in order of interest:";
        break;
      case "postal":
        answerOptions = "";
        question = "Enter your postal code:";
        break;
      case "slider":
        answerOptions = [
          "Home",
          "Traveling",
          "At the office",
          "In the client's office",
          "Elsewhere",
        ];
        question =
          "Normally, during a regular workweek, what percentage of your time do you work in the following locations? The total of the answers must equal to the sum of 100%.";
        break;
      default:
        answerOptions = "";
        question = "";
        break;
    }
    newQuestions.push({
      questionType: e.target.value,
      id: uuidv4(),
      question: question,
      answerOptions: answerOptions,
    });
    setQuestions(newQuestions);
  };

  // Automatically go to the bottom of the survey as new questions are added
  useEffect(() => {
    window.scrollTo(0,document.body.scrollHeight);

  }, [questions])

  async function handleSubmit() {
    // If there are any validation errors for the company/version/survey number, we're automatically taken to the top of the page and error messages appear.
    if (validationErrorSurveyNumber || !surveyNumber || !company || !version) {
      window.scrollTo(0,0);
      if (!company) {
        setValidationErrorCompany("Company name is required.")
      }
      if (!version) {
        setValidationErrorVersion("Survey version is required.")
      }
      if (!surveyNumber) {
        setValidationErrorSurveyNumber("Survey number is required.")
      }
    }

    // If no errors, the survey is created:
    let currentDate = new Date();
    let surveyToCreate = {
      surveyNumber,
      company,
      version,
      heading,
      narrative,
      questions,
      createdDate: currentDate,
    };
    surveyToCreate.questions.forEach((question, index) => {
      question.questionNumber = index + 1;
      delete question.id 
    });
    console.log("surveyToCreate", surveyToCreate);
    console.log("survey:", surveyToCreate);

    // Post a survey to the DB (EDITED ORIGINAL SURVEY - saves over original version)
    if (copyOrOriginal === "original") {
      try {
        let editResponse = await fetch(`/api/survey/${rowId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(surveyToCreate),
        });
        console.log("surveyToUpdate:", surveyToCreate);
  
        if (editResponse.status !== 200) {
          let errorMessage = await editResponse.text();
          console.log("We have an error: ", errorMessage);
          setError(errorMessage);
        }else{
          setError(undefined);
          console.log("edit response is successful");
          history.push("/existing-surveys");
        }
      } catch (error) {
        console.log("Fetch failed to reach the server:", error);
      }
      console.log("surveyNum:", surveyNumber,"", "version:", version)
    }

    // Post a survey to the DB (NEW OR COPY - does not save over the original version)
    else {
      // Check if the surveyNumber or version is already used (currently surveyNumber needs to be unique but version doesn't - check with client and update?).
      const findSurvey = async () => {
        let response = await fetch(`/api/survey/${rowId}`);
        let searchData = await response.json();
        console.log("searchData.surveyNumber: ", searchData.surveyNumber);
        if (searchData.surveyNumber === surveyNumber) {
          setValidationErrorSurveyNumber("Sorry, this number is already used.")
          window.scrollTo(0,0);
        }
        if (searchData.version === version) {
          setValidationErrorVersion("Sorry, this version is already used.")
          window.scrollTo(0,0);
        }
      }

      findSurvey()

      // If the survey number isn't already taken, post the survey to the DB:
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
          history.push("/existing-surveys");
        }
      } catch (error) {
        console.log("Fetch failed to reach the server:", error);
      }
    }
  }
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQuestions(items);
  }
  return (
    <div>
      {/* TOP PART OF PAGE */}
      <h2>
        {!rowId
          ? "Build your own survey by choosing from the components on the left"
          : "Edit your survey here"}
      </h2>
      <form className="company-and-survey-name-inputs-and-error">
        <div className="company-and-survey-name-inputs">
          <div className="company col">
            <input
              name="company"
              id="company-name"
              className="survey-info"
              placeholder="Company name"
              value={company}
              required
              onChange={(e) => handleInputChange(e)}
            />
            <div className="validation-error-name-version-number">
              <p>{validationErrorCompany}</p>
            </div>
          </div>
          <div className="version col">
            <input
              name="version"
              id="survey-version"
              className="survey-info"
              placeholder="Survey version"
              value={version}
              required
              onChange={(e) => handleInputChange(e)}
            />
            <div className="validation-error-name-version-number">
              <p>{validationErrorVersion}</p>
            </div>
          </div>
          <div className="surveyNumber col">
            <input
              name="surveyNumber"
              id="survey-number"
              className="survey-info"
              placeholder="Survey number"
              value={surveyNumber}
              required
              onChange={(e) => handleInputChange(e)}
            />
            <div className="validation-error-name-version-number">
              <p>{validationErrorSurveyNumber}</p>
            </div>
          </div>
        </div>
      </form>
      
      {/* LEFT PART OF PAGE */}
      <div className="survey-selection-container">
        <div className="survey-selection-sidebar">
          <button value="checkbox" onClick={addAQuestion}>
            <span className="icons">
              <RiIcons.RiCheckboxMultipleLine />
            </span>
            Checkbox
          </button>
          <button value="comment" onClick={addAQuestion}>
            <span className="icons">
              <FaIcons.FaRegCommentDots />
            </span>
            Comment
          </button>
          <button value="matrix1" onClick={addAQuestion}>
            <span className="icons">
              <FaIcons.FaListUl />
            </span>
            Matrix
          </button>
          <button value="matrix2" onClick={addAQuestion}>
            <span className="icons">
              <FaIcons.FaListOl />
            </span>
            Matrix - Number
          </button>
          <button value="radio" onClick={addAQuestion}>
            <span className="icons">
              <RiIcons.RiRadioButtonLine />
            </span>
            Radio Buttons
          </button>
          <button value="postal" onClick={addAQuestion}>
            <span className="icons">
              <MdIcons.MdLocalPostOffice />
            </span>
            Postal Code
          </button>
          <button value="select" onClick={addAQuestion}>
            <span className="icons">
              <IoIcons.IoMdArrowDropdown />
            </span>
            Select
          </button>
          <button value="slider" onClick={addAQuestion}>
            <span className="icons">
              <FaIcons.FaSlidersH />
            </span>
            Slider
          </button>
        </div>

        {/* RIGHT PART OF PAGE */}
        <div className="survey-selected-components">
          <div className="survey-selected-components-background">
            <div className="intro-heading">
              <input 
                  type="text" 
                  placeholder="Include a heading,    Ex: Hello ABCD executive Team!!"
                  value={heading}
                  onChange={(e)=>setHeading(e.target.value)}
              />
            </div>
            {/* Displays the question components that have been selected, and the narrative (not optional) */}
            <NarrativeOne
              narrative={narrative}
              updateNarrative={(narrative) => setNarrative(narrative)}
            />
          </div>

        <QuestionContext.Provider value={value}>
          <DragDropContext  onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="questions1">
              {(provided) => (
                <ul style={{listStyle: "none"}} {...provided.droppableProps} ref={provided.innerRef}>
                  
                  {questions.map((questionBlock, index) => {
                    console.log(questionBlock)
                    return (
                      <Draggable key={questionBlock.id} draggableId={questionBlock.id || questionBlock._id} index={index}>
                        {(provided) => (
                          <div>
                          <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <QuestionComponent
                              question={questionBlock}
                              questionNumber={index + 1}
                              surveyNumber={surveyNumber}
                            />
                          </li>
                        </div>
                        )}
                      </Draggable>
                    )})}
                    {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </QuestionContext.Provider>

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
      </div>
    </div>
  );
};

export default SaveSurvey;
