import { useEffect, useState } from "react";
import { Link} from "react-router-dom";

const FindSurvey = () => {
  const [rows, setRows]= useState([])
  const [searchInputCompany, setSearchInputCompany] = useState("");
  const [searchInputNumber, setSearchInputNumber] = useState("");

  function onSearchInputChange(event, setFunction) {
    console.log(
      `Changing input of "${event.target.id}" to be: ${event.target.value}`
    );
    setFunction(event.target.value);
  }

  useEffect(()=>{
    const getSurveyList = async ()=>{
      let response= await fetch('/api/survey')
      let data = await response.json();
      setRows(data)
    }
    getSurveyList()
  },[])

  return (
    <div className='list-table'>
      <h2>Find an Existing Survey</h2>

      {/* <p className="note-to-self">
        TO BE COMPLETED LATER: Display all saved surveys, search for an existing
        survey and get its url or edit/copy it
      </p> */}
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
        {rows.map((row, index)=>{
          return(
            <tr key={index}>
              <td>{row.company}</td>
              <td>{row.version}</td>
              <td>{row.surveyNumber}</td>
              <td>
                
                <Link to={`/survey/${row._id}`}>{`http://localhost:4444/survey/${row._id}`}</Link>
              </td>
              <td>
                <button>Edit</button>
                <button>delete</button>
              </td>
            </tr>
          )
        })

        }
      </tbody>
   </table>
    </div>
  );
};

export default FindSurvey;
