// import { QuestionContext } from "./NewSurvey";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const SaveSurveyButton = ({
  company,
  version,
  narrative,
  questions,
  // history,
  // error,
  // setError,
  // uuid,
}) => {
  async function handleSubmit() {
    const surveyNumber = uuid;

    let currentDate = new Date();
    let surveyToCreate = {
      surveyNumber,
      company,
      version,
      narrative,
      questions,
      createdDate: currentDate,
    };

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

  let history = useHistory();
const [error, setError] = useState();
// Create uuid to be used as survey number
const uuid = uuidv4();
//const url = `localhost:4444/${uuid}`;

  return (
    <div className="save-survey-button-and-link">
      <button
        type="submit"
        className="save-survey-button"
        onClick={handleSubmit}
      >
        Save Survey
      </button>
      <p style={{ color: "red", fontSize: "1rem" }}>
        {error} <br />
        (Make sure the company name and survey version are filled out)
      </p>
    </div>
  );
};

export default SaveSurveyButton;
