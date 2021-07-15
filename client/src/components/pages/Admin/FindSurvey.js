import { useState } from "react";
import "../../../components/Form.css";
// import "./AdminPortal.css";

const FindSurvey = () => {
  const [searchInputCompany, setSearchInputCompany] = useState("");
  const [searchInputNumber, setSearchInputNumber] = useState("");

  function onSearchInputChange(event, setFunction) {
    console.log(
      `Changing input of "${event.target.id}" to be: ${event.target.value}`
    );
    setFunction(event.target.value);
  }

  return (
    <div>
      <h2>Find Survey Component</h2>

      <p>
        TO BE COMPLETED LATER: Display all saved surveys, search for an existing
        survey and get its url or edit/copy it
      </p>
      <button className="view-all-button">View all surveys</button>

      <input
        id="search-by-company"
        className="search-input"
        value={searchInputCompany}
        placeholder="Search by company name"
        onChange={(event) => onSearchInputChange(event, setSearchInputCompany)}
      />
      <input
        id="search-by-number"
        className="search-input"
        value={searchInputNumber}
        placeholder="Search by survey number"
        onChange={(event) => onSearchInputChange(event, setSearchInputNumber)}
      />
    </div>
  );
};

export default FindSurvey;
