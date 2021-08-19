import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";
import * as ImIcons from "react-icons/im";
import * as GrIcons from "react-icons/gr";
import * as AiIcons from "react-icons/ai";
import useWindowSize from "../../../utilities/useWindowSize";

const FindSurvey = (props) => {
  const history=useHistory();
  const [rows, setRows] = useState([]);
  const [searchInputCompany, setSearchInputCompany] = useState("");
  const [searchInputNumber, setSearchInputNumber] = useState("");
  const {width} = useWindowSize();

  props.resetRowId();
  props.resetCopyOrOriginal();

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
    <div> {width >500 && (
    <div className="list-table">
      <h2>Find an Existing Survey</h2>
      {/* <button className="view-all-button">View all surveys</button>

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
      /> */}
      <table style={{height: "100%"}}>
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
                <td className="existing-surveys-edit-column">
                  <Link 
                    to="/create-new"
                    className="existing-surveys-edit-icon" 
                    title="Edit" 
                    onClick={() => {
                        props.setCopyOrOriginal("original");
                        props.setRowId(row._id);
                    }}>
                    <BsIcons.BsPencilSquare />
                  </Link>
                  <Link
                    to="/create-new"
                    className="existing-surveys-edit-icon"
                    title="Copy"
                    onClick={() => {
                      props.setCopyOrOriginal("copy");
                      props.setRowId(row._id)
                    }}>
                    <ImIcons.ImCopy />
                  </Link>
                  <button 
                    className="existing-surveys-edit-icon" 
                    title="Map"
                    onClick={()=>history.push(`/map/${row._id}`)}>
                    <GrIcons.GrMap/>
                    </button>
                  <button 
                    className="existing-surveys-edit-icon" 
                    title="Chart"
                    onClick={()=>history.push(`/data-visual/${row._id}`)}>
                    <AiIcons.AiOutlineAreaChart />
                  </button>
                  <button 
                    className="existing-surveys-edit-icon" 
                    title="Delete"
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
    )} </div>
  );
};

export default FindSurvey;
