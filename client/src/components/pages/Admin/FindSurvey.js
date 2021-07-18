import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import * as  BsIcons from 'react-icons/bs';
import * as  RiIcons from 'react-icons/ri';

const FindSurvey = () => {
  const [rows, setRows]= useState([])
  const [searchInputCompany, setSearchInputCompany] = useState("");
  const [searchInputNumber, setSearchInputNumber] = useState("");
  const [company, setCompany] = useState('')
  const [version, setVersion]= useState('')
  const [surveyNum, setSurveyNum] =useState()
  const [inEditMode, setInEditMode]=useState({status:false, rowKey:null})

  function onSearchInputChange(event, setFunction) {
    console.log(
      `Changing input of "${event.target.id}" to be: ${event.target.value}`
    );
    setFunction(event.target.value);
  }

  const getSurveyList = async ()=>{
    let response= await fetch('/api/survey')
    let data = await response.json();
    setRows(data)
  }

  useEffect(()=>{
    getSurveyList()
  },[])

  const updateSurveys = (id, newCompany, newVersion, newSurveyNumber)=>{
    let surveyToUpdate ={
      company: newCompany,
      version: newVersion,
      surveyNumber: newSurveyNumber
    }

    let updateResponse = fetch(`/api/survey/${id}`, {
      method:'PUT',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(surveyToUpdate)
    })
    .then(res => res.json())
    .then(json => {
      onCancel()
      getSurveyList()
      console.log('updateResponse:', updateResponse)
    })
  }

  const onEditClicked = (id, currentCompany, currentVersion, currentSurveyNum)=>{
    setInEditMode({status: true, rowKey:id})
    setCompany(currentCompany)
    setVersion(currentVersion)
    setSurveyNum(currentSurveyNum)
  }

  const onSave= (id, newCompany, newVersion, newSurveyNumber)=> {
    updateSurveys(id, newCompany, newVersion, newSurveyNumber )
  }

  const onCancel=()=>{
    setInEditMode({status:false, rowKey:null})
  }

  const handleDeleteClick = async (id)=>{
    let deleteResponse = await fetch(`/api/survey/${id}`,{
      method:'DELETE',
      headers:{'Content-Type': 'application/json'},
    })
    if(deleteResponse.status === 200){
      getSurveyList()
    }
    console.log('delete response:', deleteResponse) 
  }


  return (
    <div className='list-table'>
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
        {rows.map((row, index)=>{
          return(
            <tr key={index}>
              <td>
                {
                  inEditMode.status && inEditMode.rowKey===row._id ? 
                  <input value={company}  onChange={(e)=> setCompany(e.target.value)}/>
                  :
                  row.company
                }
              </td>
              <td>{
                    inEditMode.status && inEditMode.rowKey===row._id ? 
                    <input value={version}  onChange={(e)=> setVersion(e.target.value)}/>
                    :
                    row.version
                  }
              </td>
              <td>{
                    inEditMode.status && inEditMode.rowKey===row._id ? 
                    <input value={surveyNum}  onChange={(e)=> setSurveyNum(e.target.value)}/>
                    :
                    row.surveyNumber
                  }
              </td>
              <td>
                <Link to={`/survey/${row._id}`}>{`http://localhost:4444/survey/${row._id}`}</Link>
              </td>
              <td>{
                  inEditMode.status && inEditMode.rowKey===row._id ? 
                  <div>
                  <button onClick={()=> onSave(row._id, company, version, surveyNum)}>Save</button>
                  <button onClick={()=> onCancel()}>Cancel</button>
                  </div>
                  :
                  <button className="clear" onClick={()=>onEditClicked(row._id, row.company, row.version, row.surveyNumber)}><BsIcons.BsPencilSquare /></button>
                }
                <span className="slash" style={{color:"#fff"}}>/</span>
                <button className="clear" onClick={()=>{handleDeleteClick(row._id)}}><RiIcons.RiDeleteBinFill/></button>
                {/* <button className="clear"><BsIcons.BsPencilSquare /></button>
                <span className="slash" style={{color:"#fff"}}>/</span>
                <button className="clear" onClick={()=>{handleDeleteClick(row._id)}}><RiIcons.RiDeleteBinFill/></button> */}
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