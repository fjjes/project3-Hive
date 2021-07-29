import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import NewSurvey from './NewSurvey'

const EditSurveyPage=()=>{
    const {surveyId}=useParams()
    const [survey, setSurvey]=useState({
      surveyNumber:"" ,
      company:"" ,
      version:"",
      narrative:"",
      questions:[],
      createDate: new Date()
    })
    
    useEffect(()=>{
        const getSurvey = async ()=>{
            let response = await fetch(`/survey/${surveyId}`)
            let data= await response.json();
            setSurvey(data)
        }
        getSurvey()
    }, [surveyId])

    return(
        <div>
            <NewSurvey surveyId={surveyId}/>
        </div>
    )
}

export default EditSurveyPage