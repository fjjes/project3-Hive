import { useEffect, useState } from 'react';
import ExportCSV from './ExportCSV';
import moment from "moment";
import './AdminPortal.css'

const SurveyAnswersPage =()=>{
    const [newDataList, setNewDataList]=useState([])
    const [surveyList, setSurveyList]=useState([])
    const [surveyId, setSurveyId]=useState(null)
    const fileName = 'table1';

    const getSurveyList = async ()=>{
        let response = await fetch("/api/survey")
        let data= await response.json();
        setSurveyList(data)
    }

    useEffect(()=>{
        getSurveyList()
    },[])

    useEffect(()=>{
        const getAnswers = async ()=>{
            let response = await fetch("/api/answer")
            let data= await response.json();
            console.log('id:', surveyId)
            const filteredData = data.filter(newData=>{return newData.survey?._id === surveyId})
            setNewDataList(filteredData)
        }
        if(surveyId){
            getAnswers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[surveyId])

    let arr = [];
    let questionNum = 1;
    for (let i = 0; i < newDataList[0]?.survey?.questions.length; i++) {
      arr.push(questionNum++);
    }    

    let questionList =newDataList[0]?.survey?.questions
    
    const getTextStringsFromCheckbox=(ans)=>{
        if(ans?.questionType==='checkbox'){
            return ans.options.filter(option=>option.checked).map(option=>{
                if(option.value==='Other'){
                    return ans.other.value
                }
                return option.value
            }).join('\n')
        }
        return ans?.toString()  
    }

    const getTextStringsFromAnswer=(ans, i)=>{
        if(ans){
            if(typeof ans === "object"){
                if(questionList[i].questionType === 'slider'){
                    return questionList[i].answerOptions.join('\n')
                }else{
                    return Object.values(ans).map(value => getTextStringsFromAnswer(value.text)).join('\n')
                }
            }
            return ans?.toString()
        } else{
            return null
        } 
    }

    const getValueStringsFromAnswer=(ans, i)=>{  
        if(ans){ 
            if(typeof ans === "object"){
                if(questionList[i].questionType === 'slider'){
                    return ans.join('\n')
                }else{
                    return Object.values(ans).map(value => getValueStringsFromAnswer(value.value)).join('\n')
                }
            }
            return ans?.toString()
        }else{
            return null
        } 
    }
   
    return(
        <div className='data-collected'>
            <div className='upper-section'>
                <div className="select-survey">
                    <select name="_id"  onChange={(e)=>setSurveyId(e.target.value)}>
                        <option>--Select a Survey--</option>
                        {surveyList.map((item, i)=><option key={i} value={item._id}>{item.company} --- {item.version} ---{item.surveyNumber}</option>)}
                    </select>
                </div>
              
                <h3 className="record-num">Number of answer records for this Survey:<span className="count">{newDataList?.length}</span></h3>
                    <ExportCSV newDataList={newDataList} fileName={fileName}/>
            </div>
            {surveyId && newDataList?.length>0 ? 
            <div>
            <div className="question-list">
                <table >
                    {arr.map((num, i)=>{
                        return(
                        <tr key={i}>
                            <td>Q{num}</td>
                            <td className="data-text obj" >{newDataList[0]?.survey?.questions[i].question}</td>
                        </tr>)
                    })}
                </table>
            </div>

            <div className="data-table">
                
                <table>
                    <tbody>
                        <tr>
                            <th>Record</th>
                            <th>Date Answered</th>
                            <th colSpan="8">Answers</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th></th>
                            {arr.map((num,i)=> <th key={i}>Q{num}</th>)} 
                        </tr>
                        {newDataList.map((row, index)=>{
                            return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td className="data-text">{moment(row.answeredDate).format("MM/DD/yyyy")}</td>                               
                                {Object.values(row.answers).map((ans, i)=>{
                                    // console.log("ans", row.answers)
                                    return (<>
                                            {/* {ans ?
                                            <> */}
                                                {typeof ans !== 'object' ? 
                                                    <td className="data-text" key={i}><pre>{ans?.toString()}</pre></td>
                                                :(
                                                    ans?.questionType==='checkbox' ?
                                                            <td className="data-text" key={i}><pre>{getTextStringsFromCheckbox(ans)}</pre></td>
                                                        :
                                                        <td className="data-text" key={i}>
                                                            <pre>
                                                                <tr>
                                                                <td className="data-text obj">{getTextStringsFromAnswer(ans, i)}</td>
                                                                <td className="data-text obj">{getValueStringsFromAnswer(ans, i)}</td>
                                                                </tr>
                                                            </pre>
                                                        </td> 
                                                )}
                                            {/* </>
                                            :null} */}
                                            </>)   
                                })}
                            </tr>
                            )
                        })}      
                    </tbody>
                </table>
                </div>
          

            </div>
              :null}
        </div>
    )
}

export default SurveyAnswersPage