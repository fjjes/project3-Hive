import { useEffect, useState } from 'react';
import moment from "moment";
import './AdminPortal.css'
// import { get } from 'lodash';

const SurveyAnswersPage =()=>{
    const [newDataList, setNewDataList]=useState([])
    let surveyId="60dca10c89301e61da23c478"

    useEffect(()=>{
        const getAnswers = async ()=>{
            let response = await fetch("/api/answer")
            let data= await response.json();
            console.log('data:', data)
            console.log('id:',data[0].survey._id)

            const filteredData = data.filter(newData=>{return newData.survey?._id === surveyId})
            setNewDataList(filteredData)
        }
        getAnswers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    console.log("newDatalist:", newDataList)


    let arr = [];
    let questionNum = 1;
    let typeArr=[]
    for (let i = 0; i < newDataList[0]?.survey.questions.length; i++) {
      arr.push(questionNum++);
      typeArr.push(newDataList[0]?.survey.questions[i].questionType)
    }
    console.log("arr",arr)
    console.log("typeArr",typeArr)

    
    const getStringsFromAnswer=(ans)=>{
        if(ans.questionType==='checkbox'){
            return ans.options.filter(option=>option.checked).map(option=>{
                if(option.value==='Other'){
                    return ans.other.value
                }
                return option.value
            }).join('\n')
        }
        if(typeof ans === "object"){
            return Object.values(ans).map(value => getStringsFromAnswer(value)).join('\n')
        }
        return ans.toString()
    }
    

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
                                {Object.values(row.answers).map((ans, i)=>{return <td className="data-text" key={i}><pre>{getStringsFromAnswer(ans)}</pre></td>})}
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