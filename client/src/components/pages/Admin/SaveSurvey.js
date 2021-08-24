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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useWindowSize from "../../../utilities/useWindowSize"

const SaveSurvey = ({ rowId, copyOrOriginal, wholeSurveyInEditModeOrNot, setWholeSurveyInEditModeOrNot }) => {
  const history = useHistory();
  const [surveyNumber, setSurveyNumber] = useState("");
  const [company, setCompany] = useState("");
  const [version, setVersion] = useState("");
  const [heading, setHeading] = useState("");
  const [narrative, setNarrative] = useState(
`This past year has challenged us and has had both positive and negative impacts on our working methods and ways of doing things within our office. It has allowed us to observe, experiment and ask key questions about how we want to future proof our organization. Should we implement a hybrid working model, how do we manage this, and what are the potential impacts on working environment and employees.
  
To define an efficient work organization that suits the vast majority as best as possible, we have chosen to probe the ground and imagine the rest together. Through this participatory approach, xxx wishes to allow you to express your needs and preferences as well as your concerns.
    
In this context, we suggest that you answer an online questionnaire, a task that should only take about fifteen minutes of your time. If necessary, you can save your responses and complete the survey later. Your input is essential for us to understand how the organization of your work environment can influence your ability to perform your tasks and help you be more efficient while taking your daily reality into account as much as possible. The work environment here refers to both the physical space, the working methods (teamwork, face-to-face and remote, work of concentration, creative exchanges, project modes, etc..), the technologies, and the services  available to you to perform your duties.`
  );
  const [error, setError] = useState();
  const [validationErrorDuplicate, setValidationErrorDuplicate] = useState("");
  const [validationErrorCompany, setValidationErrorCompany] = useState("");
  const [validationErrorVersion, setValidationErrorVersion] = useState("");
  const [validationErrorSurveyNumber, setValidationErrorSurveyNumber] =
  useState("");
  const [stillInEditModeError, setStillInEditModeError] = useState("");
  const [questions, setQuestions] = useState([]);
  const value = { questions, setQuestions };
	const [image, setImage] = useState({ preview: "", raw: "" });
  const [action, setAction] = useState("")
  const {width} = useWindowSize();

	const handleChangeImage = e => {
		if (e.target.files.length) {
			setImage({
				preview: URL.createObjectURL(e.target.files[0]),
				raw: e.target.files[0]
			});
		}
	};

	// const handleUpload = async e => {
	// 	// e.preventDefault();
	// 	const formData = new FormData();
	// 	formData.append("image", image.raw);

	// 	await fetch(`/api/survey/${rowId}`, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "multipart/form-data"
	// 		},
	// 		body: formData
	// 	});
	// };


  // If we click on a survey in the find surveys list (which sets rowId), we get that survey's data here:
  useEffect(() => {
    const getSurvey = async () => {
      let response = await fetch(`/api/survey/${rowId}`);
      console.log("Grabbing rowId: ", rowId);
      let data = await response.json();
      console.log("data:", data);
      setQuestions(data.questions);
      setHeading(data.heading);
			setImage(data.img);
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
      setCompany(e.target.value);
      setValidationErrorDuplicate("");
      if (e.target.value) {
        setValidationErrorCompany("");
      } else if (!e.target.value) {
        setValidationErrorCompany("Company name is required.");
      }
    } else if (e.target.id === "survey-version") {
      setVersion(e.target.value);
      setValidationErrorDuplicate("");
      if (e.target.value) {
        setValidationErrorVersion("");
      } else if (!e.target.value) {
        setValidationErrorVersion("Survey version is required.");
      }
    } else if (e.target.id === "survey-number") {
      setValidationErrorDuplicate("");
      if (e.target.value) {
        if (isNaN(e.target.value)) {
          setValidationErrorSurveyNumber("This field must be a number.");
        } else if (!isNaN(e.target.value)) {
          setValidationErrorSurveyNumber("");
        }
      } else if (!e.target.value) {
        setValidationErrorSurveyNumber("Survey number is required.");
      }
      setSurveyNumber(e.target.value);
    }
  };

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
          "Director",
        ];
        question = "What is your department or team?";
        break;
      case "checkbox":
        answerOptions = [
          "A work bubble/pod",
          "A room of silence to concentrate",
          "A project space or open creative space",
          "A nap room",
          "A work station in a co-working place located outside the company",
          "Other",
        ];
        question =
          "What spaces would you like to use that are not currently offered by the company? You can select up to three spaces. If none of them interests you, please do not select anything.";
        break;
      case "matrix1":
        answerOptions = [
          { text: "Ability to concentrate" },
          { text: "Ability to conduct telephone conversations" },
          { text: "Ability to find a meeting room within a reasonable timeframe"},
          { text: "Ability to access collaborative spaces for informal exchanges with my colleagues"},
          { text: "Ability to conduct confidential conversations" },
          { text: "Quality of IT and telephone tools (excluding workstations) made available (connection tools and screens in meeting rooms, etc.)"},
          { text: "Ability to work in the office with remote contacts" },
          { text: "Ability to easily switch between face-to-face work and work at home"},
          { text: "Quality of the environment near my workplace (neighbourhood, shops, services, restaurants, etc.)"},
        ];
        question =
          "Please indicate for each of the factors below their importance to you in the performance of your work, then your level of satisfaction with these factors in your current work environment:";
        break;
      case "matrix2":
        answerOptions = [
          { text: "Provide better working comfort" },
          { text: "Stimulate creativity and collective performance" },
          { text: "Facilitate access to information and news from business lines and departments"},
          { text: "Break down silos between departments and increase cross-functional lines"},
          { text: "Provide spaces for more tranquility to work and concentration"},
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
          { text: "Review the organization of meetings" },
          { text: "Spaces of conviviality" },
          { text: "Do not change anything" },
          { text: "Other" },
        ];
        question =
          "In your opinion, what are the necessary and complementary organizational points for teleworking that should be implemented within the company? Many answers are possible.\nPlease rank the following in order of interest:";
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
    setAction("add")
  };

  // Automatically go to the bottom of the survey as new questions are added, but not when questions are edited/deleted
  useEffect(() => {
    if (action === "add") {
      window.scrollTo(0, document.body.scrollHeight);
      setAction("")
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  const findSurvey = async () => {
    console.log("rowId: ", rowId);
    let response = await fetch(`/api/survey/`);
    let searchData = await response.json();
    console.log("searchData: ", searchData);
    // Check all of the data in the DB to see if an entry already exists that has the same surveyNumber, version, and company as what was just entered in the input fields (set below to only run findSurvey for non-original surveys (so if we click the "edit" button, it will just save using the original surveyNumber, version, and company))
    const surveyExists = searchData.find(survey => 
      survey.surveyNumber === Number(surveyNumber) &&
      survey.version === version &&
      survey.company === company
      )
    if (surveyExists && copyOrOriginal !== "original") {
      setValidationErrorDuplicate("Sorry, this combination of company, version, and survey number is already used.")
      window.scrollTo(0, 0);
      // event.preventDefault();
      // event.stopPropagation();
      return surveyExists
    }
    else {
      setValidationErrorDuplicate("")
      return null
    }
  };

  async function handleSubmit(event) {
    findSurvey()
    // If there are any validation errors for the company/version/survey number, we're automatically taken to the top of the page and error messages appear. If we're still in edit mode in any of the questions, an error message will appear before the save survey button (no scrolling).
    let surveyFound = null
    if (validationErrorSurveyNumber || validationErrorDuplicate || !surveyNumber || !company || !version) {
      window.scrollTo(0, 0);
      if (!company) {
        setValidationErrorCompany("Company Name is required.");
      }
      if (!version) {
        setValidationErrorVersion("Survey Version is required.");
      }
      if (!surveyNumber) {
        setValidationErrorSurveyNumber("Survey Number is required.");
      }
    } else if (wholeSurveyInEditModeOrNot) {
        setStillInEditModeError("Please save all edits before submitting.")
    }
    else {
      if (copyOrOriginal !== "original") {
        surveyFound = await findSurvey(event);
      }
    }

    // If no errors, the survey is created:
    if (!(validationErrorSurveyNumber || validationErrorVersion || validationErrorCompany || validationErrorDuplicate || stillInEditModeError)) {
    let currentDate = new Date();
    let surveyToCreate = {
      surveyNumber,
      company,
      version,
      heading,
			image,
      narrative,
      questions,
      createdDate: currentDate,
    };
		console.log("hooray", surveyToCreate)
    surveyToCreate.questions.forEach((question, index) => {
      question.questionNumber = index + 1;
      // delete question.id;
    });

    // console.log("surveyToCreate", surveyToCreate);

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
        } else {
          setError(undefined);
          console.log("edit response is successful");
          history.push("/existing-surveys");
        }
      } catch (error) {
        console.log("Fetch failed to reach the server:", error);
      }
      // console.log("surveyNum:", surveyNumber, "", "version:", version);
    }

    // Post a survey to the DB (NEW OR COPY - does not save over the original version)
    else if (!surveyFound) {
      // If the combination of company/version/surveyNumber isn't already taken, post the survey to the DB:
      try {
				const formData = new FormData();
				formData.append("image", image.raw);
				console.log("THE image", image)
				// formData.append("data", JSON.stringify(surveyToCreate))
				for (const property in surveyToCreate) {
					if (property === "questions") {
						formData.append(property, JSON.stringify(surveyToCreate[property]))
					}
					else if (property !== "image") {
						formData.append(property, surveyToCreate[property])
					}
				}

        let createSurvey = await fetch("/api/survey/", {
          method: "POST",
				// 	headers: {
				// "Content-Type": "multipart/form-data"
				// },
          body: formData,
        });
        console.log("Creating a custom-built survey, yay!", surveyToCreate);
				console.log(createSurvey.status)
        if (createSurvey.status !== 200) {
          let errorMessage = await createSurvey.text();
          console.log("We have an error: ", errorMessage);
          setError(errorMessage);
        } else {
          setError(undefined);
          console.log("Create response is successful");
          history.push("/existing-surveys");
        }
      } catch (error) {
        console.log("Fetch failed to reach the server:", error);
      }
    }
  }
}

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(questions);
    console.log("drop:ItemsAre",items)
    const [reorderedItem] = items.splice(result.source.index, 1);
    console.log ("drop:SourceIndex", result.source.index)
    items.splice(result.destination.index, 0, reorderedItem);
    console.log("drop:Destination",result.destination.index)
    setQuestions(items);
    console.log("drop:ItemsAre",items)
  }

  useEffect(() => {
    if (wholeSurveyInEditModeOrNot) {
      console.log("*** Whole survey is IN EDIT MODE.")
      setStillInEditModeError("Please save all edits before submitting.")
    }
    else {
      console.log("*** Whole survey is NOT in edit mode.")
      setStillInEditModeError("")
    }
  }, [wholeSurveyInEditModeOrNot])

  return (
    <div>
      {width > 300 && (
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
              placeholder="Company Name"
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
              placeholder="Survey Version (e.g., executive)"
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
              placeholder="Survey Number"
              value={surveyNumber}
              required
              onChange={(e) => handleInputChange(e)}
            />
            <div className="validation-error-name-version-number">
              <p>{validationErrorSurveyNumber}</p>
            </div>
          </div>
        </div>
        <div className="validation-error-name-version-number" style={{marginTop: "-20px"}}>
          <p>
            {validationErrorDuplicate}
          </p>
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
          <button value="postal" onClick={addAQuestion}>
            <span className="icons">
              <MdIcons.MdLocalPostOffice />
            </span>
            Postal Code
          </button>
          <button value="radio" onClick={addAQuestion}>
            <span className="icons">
              <RiIcons.RiRadioButtonLine />
            </span>
            Radio Buttons
          </button>
          <button value="slider" onClick={addAQuestion}>
            <span className="icons">
              <FaIcons.FaSlidersH />
            </span>
            Slider
          </button>
          <button value="matrix2" onClick={addAQuestion}>
            <span className="icons">
              <FaIcons.FaListOl />
            </span>
            Matrix - Number
          </button>
          <button value="matrix1" onClick={addAQuestion}>
            <span className="icons">
              <FaIcons.FaListUl />
            </span>
            Matrix
          </button>
          <button value="select" onClick={addAQuestion}>
            <span className="icons">
              <IoIcons.IoMdArrowDropdown />
            </span>
            Select
          </button>
          <button value="comment" onClick={addAQuestion}>
            <span className="icons">
              <FaIcons.FaRegCommentDots />
            </span>
            Comment
          </button>
        </div>

        {/* RIGHT PART OF PAGE */}
        <div className="survey-selected-components">
          <div className="survey-selected-components-background">
            <div className="heading-and-image">
              <div className="intro-heading admin-question-component">
                <textarea
                  type="text"
                  placeholder="Include a heading (e.g., Hello ABCD executive team!!)"
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                />
              </div>
              <div className="upload-image admin-question-component">
                <label htmlFor="upload-button" style={{paddingTop: "8px"}}>
                  {image?.preview ? (
                    <img alt="" src={image.preview} width="200px" height="200px" />
                  ) : (
                    <>
                      Upload an image
                    </>
                  )}
                </label>
                <input
                  style={{paddingTop: "5px"}}
                  // name="image"
                  // id="image"
                  // value={image}
                  // onChange={(e) => setImage(e.target.files.length)}
                  type="file"
                  onChange={handleChangeImage}
                />
                  {/* <button onClick={handleUpload}>Upload</button> */}
              </div>
            </div>
            {/* Displays the question components that have been selected, and the narrative (not optional) */}
            <NarrativeOne
              narrative={narrative}
              updateNarrative={(narrative) => setNarrative(narrative)}
              wholeSurveyInEditModeOrNot={wholeSurveyInEditModeOrNot}
              setWholeSurveyInEditModeOrNot={setWholeSurveyInEditModeOrNot}
            />
          </div>

          <QuestionContext.Provider value={value}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="questions1">
                {(provided) => (
                  <ul
                    style={{ listStyle: "none" }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {questions.map((questionBlock, index) => {
                      // console.log(questionBlock); check 565 ids
                      return (
                        <Draggable
                          key={questionBlock.id || questionBlock._id}
                          draggableId={questionBlock.id || questionBlock._id} 
                          index={index}
                        >
                          {(provided) => {
                            console.log("draggable:questionBlock.id",questionBlock.id)
                            console.log("draggable:questionBlock._id",questionBlock._id)
                            console.log("draggable:index",index)
                            return (
                            <div>
                              <li
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <QuestionComponent
                                  question={questionBlock}
                                  questionNumber={index + 1}
                                  surveyNumber={surveyNumber}
                                  wholeSurveyInEditModeOrNot={wholeSurveyInEditModeOrNot}
                                  setWholeSurveyInEditModeOrNot={setWholeSurveyInEditModeOrNot}
                                />
                              </li>
                            </div>
                          )}
                            }
                            
                        </Draggable>
                      );
                    })}
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
        <div className="validation-error-name-version-number">
          <p>{stillInEditModeError}</p>
        </div>
        <button
          type="submit"
          className="save-survey-button"
          id="save-survey-button"
          onClick={event => handleSubmit(event)}
        >
          Save Survey
        </button>
      </div>
    </div>
    )} 
    </div>
  );
};

export default SaveSurvey;
