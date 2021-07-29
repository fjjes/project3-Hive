import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";
import * as ImIcons from "react-icons/im";

const FindSurvey = (props) => {
  const history=useHistory();
  const [rows, setRows] = useState([]);
  const [searchInputCompany, setSearchInputCompany] = useState("");
  const [searchInputNumber, setSearchInputNumber] = useState("");

  props.resetRowId();

  function onSearchInputChange(event, setFunction) {
    console.log(
      `Changing input of "${event.target.id}" to be: ${event.target.value}`
    );
    setFunction(event.target.value);
  }

  const getSurveyList = async () => {
    let response = await fetch("/api/survey");
    let data = await response.json();
    setRows(data);

    console.log("data: ", data);
  };
  useEffect(() => {
    getSurveyList();
  }, []);
  
  const handleDeleteClick = async (id) => {
    let answer = window.confirm(`Confirm Deleting the survey?`);
    if (answer) {
      let deleteResponse = await fetch(`/api/survey/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (deleteResponse.status === 200) {
        getSurveyList();
      }
      console.log("delete response:", deleteResponse);
    }
  };

  return (
    <div className="list-table">
      <h2>Find an Existing Survey</h2>
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
      <table>
        <tbody>
          <tr>
            <th>Company</th>
            <th>Version</th>
            <th>Survey No.</th>
            <th>Survey Link</th>
            <th>Action</th>
          </tr>
          {rows.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.company}</td>
                <td>{row.version}</td>
                <td>{row.surveyNumber}</td>
                <td>
                  <Link to={`/survey/${row._id}`}>{`http://localhost:4444/survey/${row._id}`}</Link>
                </td>
                <td>
                  <button 
                    className="icon3" 
                    title="Edit" 
                    onClick={()=>history.push(`/edit-survey/${row._id}`)}>
                    <BsIcons.BsPencilSquare />
                  </button>
                  <span className="slash" style={{ color: "#fff" }}>/</span> 
                  <Link
                    to="/create-new"
                    className="icon5"
                    title="Copy"
                    style={{ color: "black" }}
                    onClick={() => props.setRowId(row._id)}>
                    <ImIcons.ImCopy />
                  </Link>
                  <span className="slash" style={{ color: "#fff" }}>/</span>
                  <button className="icon4" title="Delete"
                    onClick={() => handleDeleteClick(row._id)}>
                    <RiIcons.RiDeleteBinFill />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FindSurvey;
