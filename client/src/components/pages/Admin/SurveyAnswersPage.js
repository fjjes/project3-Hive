import { useEffect, useState } from 'react';
import ExportCSV from './ExportCSV';
import moment from "moment";
import './AdminPortal.css'

const SurveyAnswersPage =()=>{
    const [newDataList, setNewDataList]=useState([])
    const [surveyList, setSurveyList]=useState([])
    // const [displayTable, setDisplayTable]=useState(false)
    // const [count, setCount]=useState(0)
    // const [surveyId, setSurveyId]=useState()
    // const [dataCollected, setDataCollected]=useState([])
    const fileName = 'table1';
    let surveyId="60dca10c89301e61da23c478";
// let surveyId="61144bf3b0e7595740e9ca4c"




    const getSurveyList = async ()=>{
        let response = await fetch("/api/survey")
        let data= await response.json();
        setSurveyList(data)
    }

    useEffect(()=>{
        getSurveyList()
    },[])

  
    // const display =()=>{
    //     setDisplayTable(true)
    //     setCount(newDataList.length)
    // }
  
  

    useEffect(()=>{
        const getAnswers = async ()=>{
            let response = await fetch("/api/answer")
            let data= await response.json();
            console.log('data:', data)
            console.log('id:',data[0].survey._id)

            const filteredData = data.filter(newData=>{return newData.survey?._id === surveyId})
            setNewDataList(filteredData)
            // setDataCollected(filteredData)
        }
        getAnswers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    console.log("newDatalist:", newDataList)


    let arr = [];
    let questionNum = 1;
    for (let i = 0; i < newDataList[0]?.survey?.questions.length; i++) {
      arr.push(questionNum++);
    }
    console.log("arr",arr)
    
    
    const getTextStringsFromCheckbox=(ans)=>{
        if(ans?.questionType==='checkbox'){
            return ans.options.filter(option=>option.checked).map(option=>{
                if(option.value==='Other'){
                    return ans.other.value
                }
                return option.value
            }).join('\n')
        }
        // if(typeof ans === "object"){
        //     return Object.values(ans).map(value => getTextStringsFromCheckbox(value))
        // }
        return ans?.toString()  
    }

    const getTextStringsFromAnswer=(ans)=>{
        // console.log("ans 76", ans)
        if(ans){
            if(typeof ans === "object"){
                // if(ans?.questionType==='slider'){
                //     return null
                // }
                    // console.log('obj',Object.values(ans).map(value=>value.text))
                    return Object.values(ans).map(value => getTextStringsFromAnswer(value.text))
            } 
            return ans?.toString()
        } else{
            return null
        } 
    }

    const getValueStringsFromAnswer=(ans)=>{  
        if(ans){
            // if(ans?.questionType==='slider'){
            //     console.log("ans line 93:", ans)
            //     return ans.values.map(value => value)
            // }   
            if(typeof ans === "object"){
                // console.log("...", Object.values(ans).map(value => getValueStringsFromAnswer(value.value)))
               return Object.values(ans).map(value => getValueStringsFromAnswer(value.value))
            //    setDataCollected(str)
            //     return str;
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
                
                <select name="_id"  
                // onChange={(e)=>setSurveyId(e.target.value)}
                >
                    <option>--Select a Survey--</option>
                    {surveyList.map((item, i)=><option key={i} value={item._id}>{item.company} - {item.version} - {item.surveyNumber}</option>)}
                </select>
                <button className="display" 
                // onClick={()=>display()}
                >Display data</button>
                </div>
              
                <h3 className="record-num">Number of answer records for this Survey:<span className="count">{newDataList?.length}</span></h3>
                <ExportCSV newDataList={newDataList} fileName={fileName}/>
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
                                                        // <td className="data-text" key={i}>
                                                        //     <pre>
                                                        //         <tr>
                                                        //         <td className="data-text">{getTextStringsFromAnswer(ans)}</td>
                                                        //         <td className="data-text">{getValueStringsFromAnswer(ans)}</td>
                                                        //         </tr>
                                                        //     </pre>
                                                        // </td> 
                                                        
                                                        <td className="data-text" key={i}>
                                                            { i === 0 ?
                                                            <table>
                                                                <tbody>
                                                                <tr>
                                                                   { getTextStringsFromAnswer(ans).map((textCol, x)=>{
                                                                       return(
                                                                        <td key={x}>{textCol}</td>
                                                                       )
                                                                   })}
                                                               </tr>
                                                               <tr>
                                                                   {getValueStringsFromAnswer(ans).map((col, ind)=>{
                                                                       return(
                                                                           <td key={ind}>{col}</td>
                                                                       )
                                                                   })

                                                                   }
                                                               </tr>
                                                                </tbody>
                                                            </table>
                                                            :
                                                            <tr>
                                                                    {getValueStringsFromAnswer(ans).map((col, ind)=>{
                                                                        return(
                                                                            <td key={ind}>{col}</td>
                                                                        )
                                                                    })

                                                                    }
                                                            </tr>
                                                            } 
                                                           
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
    )
}

export default SurveyAnswersPage