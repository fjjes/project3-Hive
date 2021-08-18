import { useEffect, useState } from 'react';
import ShowGraphs from './ShowGraphs';
import { useParams } from "react-router-dom";

const DataVisualization =()=>{
    const [newDataList, setNewDataList]=useState([])
    const [showChart, setShowChart] = useState(false)
    const [surveyList, setSurveyList]=useState([])
    // const [surveyId, setSurveyId]=useState(null)
    const [options, setOptions]=useState([])
    const [qType, setQType]=useState()
    const [question, setQuestion]=useState()
    const [answers, setAnswers]=useState([])
    const [qNum, setQnum]=useState()

    const {surveyId} = useParams();

    const getSurveyList = async ()=>{
        let response = await fetch("/api/survey")
        let data= await response.json();
        setSurveyList(data)
    }

    useEffect(()=>{
        getSurveyList()
    },[])

    useEffect(()=>{
        const getDataForAnswers = async ()=>{
            let response = await fetch("/api/answer")
            let data= await response.json();
            const filteredData = data.filter(newData=>{return newData.survey?._id === surveyId})
            setNewDataList(filteredData)
            console.log("Data for survey #: ", surveyId)
            console.log('data', filteredData)
        }
        if(surveyId){
            getDataForAnswers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[surveyId])

    let arr = [];
    let questionNum = 1;
    for (let i = 0; i < newDataList[0]?.survey?.questions.length; i++) {
      arr.push(questionNum++);
    }    
    
    const getChartInfo = (question, index) =>{
        let q= question?.question
        let options = question?.answerOptions
        let qType = question?.questionType
        let answersForThatQuestion = newDataList.map((data)=> data.answers[index])
        let qNum =index
    //  console.log(answersForThatQuestion)
    //  console.log('options:', options)
    //  console.log('questionType:', qType)
        setQuestion(q)
        setOptions(options)
        setQType(qType)
        setAnswers(answersForThatQuestion)
        setShowChart(true)
        setQnum(qNum)
    }
   useEffect(()=>{
        getChartInfo()
            // eslint-disable-next-line react-hooks/exhaustive-deps
   },[surveyId])

    return(
        <div className='data-visual'>
            <div className='upper-section'>
                {/* <div className="select-survey">
                    <select name="_id"  onChange={(e)=>setSurveyId(e.target.value)}>
                        <option>--Select a Survey--</option>
                        {surveyList.map((item, i)=><option key={i} value={item._id}>{item.company} --- {item.version} ---{item.surveyNumber}</option>)}
                    </select>
                </div> */}
            </div>
            {surveyId && newDataList?.length>0 ? 
            <div>
            <div className="question-list">
                <table >
                    {arr.map((num, i)=>{
                        return(
                        <tr key={i} onClick={()=>getChartInfo(newDataList[0]?.survey?.questions[i], num)}>
                            <td>Q{num}</td>
                            {/* <td className="data-text obj" >{newDataList[0]?.survey?.questions[i].question}</td> */}
                        </tr>)
                    })}
                </table>
            </div>
            {showChart && 
            <div className="data-charts">
                <ShowGraphs options={options} qType={qType} answers={answers} question={question} qNum={qNum} dataList={newDataList}/>
            </div>}
            </div>
            :<h2>"Selected survey do not have any records for now!"</h2>}
        </div>
    )
}

export default DataVisualization;