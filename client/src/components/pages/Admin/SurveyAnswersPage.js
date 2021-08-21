import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import ExportCSV from './ExportCSV';
import moment from "moment";
import ShowGraphs from '../../DataVisual/ShowGraphs';
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as GrIcons from "react-icons/gr";
import * as FaIcons from "react-icons/fa";
import './AdminPortal.css'

const SurveyAnswersPage =()=>{
    // const {surveyId} = useParams();

    const [newDataList, setNewDataList]=useState([])
    const [surveyList, setSurveyList]=useState([])
    const [surveyId, setSurveyId]=useState(null)
    const [showTable, setShowTable]= useState(false)
    const [showChart, setShowChart] = useState(false)

    const [options, setOptions]=useState([])
    const [qType, setQType]=useState()
    const [question, setQuestion]=useState()
    const [answers, setAnswers]=useState([])
    const [qNum, setQnum]=useState()

    // const [Active, setActive]=useState({activeObject:null, objects:null})

    const fileName = 'table1';

    const getSurveyList = async ()=>{
        let response = await fetch("/api/survey")
        let data= await response.json();
        setSurveyList(data)
    }

    useEffect(()=>{
        getSurveyList()
    },[])

    // useEffect(()=>{
        const getAnswers = async ()=>{
            let response = await fetch("/api/answer")
            let data= await response.json();
            // console.log('id:', surveyId)
            const filteredData = data.filter(newData=>{return newData.survey?._id === surveyId})
            setNewDataList(filteredData)
        }
        
    useEffect(()=>{
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
    // setActive({...Active, objects:arr})   

    let questionList =newDataList[0]?.survey?.questions

    // const toggleActive=(index)=>{
    //     setActive({...Active, activeObject:Active.objects[index]})
    // }

    // const toggleStyle=(index)=>{
    //     if(Active.objects[index]=== Active.activeObject){
    //         return "itm active"
    //     }else{
    //         return "itm inactive"
    //     }
    // }

    const getChartInfo = (question, index) =>{
        let q= question?.question
        let options = question?.answerOptions
        let qType = question?.questionType
        let answersForThatQuestion = newDataList.map((data)=> data.answers[index])
        let qNum =index
        
        // toggleActive(index)
   
        setQuestion(q)
        setOptions(options)
        setQType(qType)
        setAnswers(answersForThatQuestion)
        setShowChart(true)
        setQnum(qNum)
        setShowTable(false)
    }

   useEffect(()=>{
        getChartInfo()
            // eslint-disable-next-line react-hooks/exhaustive-deps
   },[surveyId])

    const getTextStringsFromAnswer=(ans, i)=>{
        if(ans){
            if(typeof ans === "object"){
                if(questionList[i].questionType === 'slider'){
                    return questionList[i].answerOptions.join('\n')
                }else if(questionList[i].questionType==='checkbox'){
                    return ans.options.filter(option=>option.checked).map(option=>{
                        if(option.value==='Other'){
                            return ans.other.value
                        }
                        return option.value
                    }).join('\n')
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
                if(questionList[i]?.questionType === 'slider'){
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
            <div className="second-row">
                <h3 className="record-num">Number of answer records for this Survey:<span className="count">{newDataList?.length}</span></h3>
                <div className="button-row">
                    <ExportCSV newDataList={newDataList} fileName={fileName}/>
                    <button className="table-btn" onClick={()=>{setShowTable(true); setShowChart(false);}}>Data table</button>
                </div>
            </div>
            </div>
            {surveyId && newDataList?.length>0 ? 
            <div>
            <div className="question-list">
							<table className="data-visual-table">
                    {arr.map((num, i)=>{
                        return(
                        <button key={i} 
                            // className={toggleStyle(i)} 
                            onClick={()=>{
                                getChartInfo(newDataList[0]?.survey?.questions[i], num); 
                                // toggleActive(num);
                            }}

                            >
                            <td>Q{num}</td>
                            <td className="data-text obj" style={{width: "1000px"}} >{newDataList[0]?.survey?.questions[i].question}</td>
                            {/* <td className="data-text obj"><b>{toUpper(newDataList[0]?.survey?.questions[i].questionType)}</b></td> */}
                            {((newDataList[0]?.survey?.questions[i].questionType!=='comment') && (newDataList[0]?.survey?.questions[i].questionType!=='postal'))? 
														<td>
																<button className="existing-surveys-edit-icon" title="Chart" style={{ width: "20px"}} onClick={()=>getChartInfo(newDataList[0]?.survey?.questions[i], num)}><AiIcons.AiOutlineAreaChart /> </button>
                                {/* <button className="existing-surveys-edit-icon"  title="Table" onClick={()=>{setShowTable(true); setShowChart(false)}}><BiIcons.BiTable/></button> */}
                            </td>
                            :
                            newDataList[0]?.survey?.questions[i].questionType ==='postal' ?
                            <td>
																	<button className="existing-surveys-edit-icon" title="Chart" style={{ width: "20px"}} onClick={()=>getChartInfo(newDataList[0]?.survey?.questions[i], num)}><GrIcons.GrMap/></button>
                                {/* <button className="existing-surveys-edit-icon"  title="Table" onClick={()=>{setShowTable(true); setShowChart(false)}}><BiIcons.BiTable/></button> */}
                            </td>
                            :
                            <td>
																	<button style={{ fontSize: 'medium', width: "30px", backgroundColor: "inherit" }}><FaIcons.FaCommentAlt/></button>
															<br></br>
                                {/* <button className="existing-surveys-edit-icon"  title="Table" onClick={()=>{setShowTable(true); setShowChart(false)}}><BiIcons.BiTable/></button> */}
                            </td>
                            }
                        </button>)
                    })}
                </table>
            </div>
            
            {showTable?
			<div className="master-data-table">
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
                                const answersArray= questionList.map((question, ind)=>{
                                    if(row.answers[ind+1]){
                                        return row.answers[ind+1]
                                    }else{
                                        return null
                                    }
                                })
                                return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td className="data-text">{moment(row.answeredDate).format("MM/DD/yyyy")}</td>  
                                    {answersArray.map((ans, i)=>{
                                        return (<>
                                                {typeof ans !== 'object' ? 
                                                    <td className="data-text" key={i}><pre>{ans?.toString()}</pre></td>
                                                :(
                                                    questionList[i].questionType==='checkbox' ?
                                                            <td className="data-text" key={i}><pre>{getTextStringsFromAnswer(ans, i)}</pre></td>
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
                {showChart ? 
                <div className="data-charts">
                    <ShowGraphs options={options} qType={qType} answers={answers} question={question} qNum={qNum} dataList={newDataList} surveyId={surveyId}/>
                </div>
                :null}

                </div>
                // :<h2>"Selected survey do not have any records for now!"</h2>}
               :null}
            
        </div>
    )
}

export default SurveyAnswersPage