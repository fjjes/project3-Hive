import { useEffect, useState } from 'react';
import moment from "moment";
import './AdminPortal.css'

const SurveyAnswersPage =()=>{
    const [newDataList, setNewDataList]=useState([])
    // const [survey, setSurvey]=useState()
    let surveyId="60dca10c89301e61da23c478"

    useEffect(()=>{
        const getAnswers = async ()=>{
            let response = await fetch("/api/answer")
            let data= await response.json();
            console.log('data:', data)
            console.log('id:',data[0].survey._id)//gives... 60dca10c89301e61da23c478

            const filteredData = data.filter(newData=>{
                return newData.survey?._id === surveyId
            })
            setNewDataList(filteredData)
        }
        getAnswers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    console.log("datalist:", newDataList)


    let arr = [];
    let questionNum = 1;
    for (let i = 0; i < newDataList[0]?.survey.questions.length; i++) {
      arr.push(questionNum++);
    }
    console.log("arr",arr)
//    console.log('answersList:', answersList)
//     const answerLength= Object.keys(answersList).length


    // const displayAnswer=(questionNum)=>{
        
    // }

    return(
        <div className='data-collected'>
            <div className="select-survey">
            {/* <div> */}
                <select>
                    <option>--Select a company--</option>
                </select>
            {/* </div>
            <div> */}
                <select>
                    <option>--Select the Survey Version--</option>
                </select>
            {/* </div>
            <div> */}
                <select>
                    <option>--Select the Survey Number--</option>
                </select>
            {/* </div> */}
            <button>Display data</button>
            </div>
            <div>
                <h3>Number of answer records of this Survey:{newDataList?.length}</h3>
                <button style={{float:'right'}}>Export to Excel</button>
            </div>

            <div className="list-table">
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
                            {/* headings Q1, Q2, Q3... */}
                            {arr.map((num,i)=> <th key={i}>Q{num}</th>)} 
                        </tr>
                        {newDataList.map((row, index)=>{
                            return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{moment(row.answeredDate).format("MM/DD/yyyy")}</td>
                                <td></td>
                                {/* {arr.map((num,i)=> <td key={i}>{()=>displayAnswer(num)}</td>)}  */}
                            </tr>
                            )
                        })}
                     
                            
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SurveyAnswersPage