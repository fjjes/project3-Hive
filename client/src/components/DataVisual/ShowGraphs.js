import { useEffect, useState } from "react"
import Map from './Map'
import { Bar, Line, Pie, Bubble, Radar, Scatter, Doughnut  } from "react-chartjs-2"

const ShowGraphs = ({question, qType,  answers, qNum, dataList, surveyId}) => {
    const [valueLabel, setValueLabel]=useState([])

   let colors=["#197e9c","#35c0c2","#f59645","#bce6f8", "#575759", "#805F42", "#52577C","black", "#6D92A0", "#D4A66A"] // Hive colours
   let colors2=["#197e9c","#35c0c2","#f59645","#bce6f8"] // Hive colours (to use when we have 6 options in a chart, so that the same colour isn't repeated back-to-back)

const getLabel=()=>{
    let labelArr=[]
    console.log("qType:", qType)
    if(qType==='select'){
        let num =1
        // console.log('length:::',dataList[0].survey.questions[qNum-1]?.answerOptions.length )//5 for select
        for(let i=0; i<dataList[0].survey.questions[qNum-1]?.answerOptions.length;i++){
          labelArr.push(num++)
        }
        console.log('select label:', labelArr)
    }else if(qType=== 'matrix1'){
         labelArr = ['Very Satisfied', 'Satisfied', 'Neither satisfied nor dissatisfied', 'Dissatisfied', 'Very dissatisfied']
        console.log('matrix1 label:', labelArr)
    }else if(qType=== 'matrix2'){
        labelArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        console.log('matrix2 label:', labelArr)
    
    }
    setValueLabel(labelArr)
}

useEffect(()=>{
    getLabel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[dataList, qNum])  
//    let count = ans.reduce((acc, e)=>acc.set(e, (acc.get(e) || 0 )+ 1), new Map())
//     let countArr = [...count.values()]


//radio
    let ans=answers?.sort()
    const percentRadio = ans.reduce((pcts, x) => ({...pcts, [x]: (pcts[x] || 0) + 100 / (ans.length)}), {})
    // console.log ('percentRadio',percentRadio)
    let percentArrRadio= Object.values(percentRadio).map(percent=>percent)
    // let optRadio =Object.keys(percentRadio).map(percent=>percent)

// checkboxes ---------------------------
// console.log("All answers: ", answers)
let otherArray = []
let otherArrayWithoutEmptyStrings = []
let checkedOptionsArray = []
let checkboxesOpt = []
let checkboxesPercentArr = []
if(typeof answers === 'object'){
    if (qType==='checkbox'){
        for (let i=0; i<answers.length; i++) {
            // GRAB "OTHER" VALUE:
            otherArray.push(answers[i].other.value)
            otherArrayWithoutEmptyStrings = otherArray.filter(element => {return element}).join("\n");
            // GRAB OPTIONS THAT HAVE BEEN CHECKED
            for (let x = 0; x < answers[i].options.length; x++) {
                if (answers[i].options[x].checked === true) {
                    checkedOptionsArray.push(answers[i].options[x].value)
                }
            }
        }
        let checkboxAns=checkedOptionsArray?.sort()
        const checkboxesPercentages = checkboxAns.reduce((pcts, x) => ({...pcts, [x]: (pcts[x] || 0) + 100 / (checkboxAns.length)}), {})
        checkboxesPercentArr= Object.values(checkboxesPercentages).map(checkboxesPercent=>checkboxesPercent)
        checkboxesOpt =Object.keys(checkboxesPercentages).map(checkboxesPercent=>checkboxesPercent)
    }
}

    //matrix, select
    let optObj = dataList[0].survey?.questions[qNum-1]?.answerOptions.map(op=>op.text)
    // console.log('optObj', optObj)

const getPercentageAnsweredValLabel=(optIndex, valIndex)=>{
    const optAnswers = answers.map((ans, ansIndex)=>{return ans[optIndex]})
    const optAnsForValLabel = optAnswers.filter((optAns)=>optAns.value === valueLabel[valIndex])
    // const percentageAnsweredForValLabel = optAnsForValLabel.length>0 ? ((optAnsForValLabel.length / optAnswers.length) * 100) : 0
    const percentageAnsweredForValLabel = ((optAnsForValLabel.length / optAnswers.length) * 100) 
    // console.log("optAnswersValLabel", optAnsForValLabel)
 return percentageAnsweredForValLabel
}

// slider -------------------------------
let sliderOptionsArray = []
let sliderPercentArr = []
let sliderLabels = []
if(typeof answers === 'object'){
    if (qType === 'slider') {
        console.log("******************")
        console.log("answers: ", answers)
        console.log("question: ", question)
        console.log("qNum: ", qNum)
        console.log("DataList: ", dataList)
        console.log("answers[0]: ", answers[0])
        for (let i=0; i<dataList.length; i++) {
            sliderPercentArr = dataList[i].answers[qNum]
            console.log("sliderPercentArr: ", sliderPercentArr)
            // survey[x]value[i] + survey[y]value[i] + survey[z]value[i]
            // survey[x]value[a] + survey[y]value[a] + survey[z]value[a]
            console.log("+++++++++")
            console.log("dataList[0].survey: ", dataList[0].survey)
            console.log("dataList[0].survey.questions[0]: ", dataList[0].survey.questions[0])
            console.log("dataList[0].survey.questions[0].answerOptions[0]: ", dataList[0].survey.questions[0].answerOptions[0])
            console.log("dataList[0].survey.questions[0].answerOptions[0].text: ", dataList[0].survey.questions[0].answerOptions[0].text)
            console.log("&&&&&&& dataList[0].survey.questions[0].answerOptions[0]: ", dataList[0].survey.questions[0].answerOptions[0])
            console.log("&&&&&&& typeof dataList[0].survey.questions[0].answerOptions[0]: ", typeof dataList[0].survey.questions[0].answerOptions[0])

            sliderLabels = [...sliderLabels, dataList[0].survey.questions[0].answerOptions[0]]
            
        //         for (let x=0; x<dataList[i].survey.questions[qNum].answerOptions.length; x++) {
        //             sliderOptionsArray = [...sliderOptionsArray, dataList[i].survey.questions[qNum].answerOptions[x].text]
        }

        // console.log("@@@@@@@sliderOptionsArry: ", sliderOptionsArray)
        // console.log("dataList[0].survey.questions[1].answerOptions: ", dataList[0].survey.questions[1].answerOptions)
    } 
}
    return (
        <div>
            {qType === 'postal' && <Map surveyId={surveyId}/>} 
            {/* {(qType === 'radio' || qType === 'select' || qType === 'matrix1' || qType=== 'matrix2'|| qType=== 'slider'|| qType=== 'checkbox') &&<>
            <hr/>
            <h4>{`Q${qNum} - ${question}`}<span style={{color:'blue'}}>{`(${qType}-type)`}</span></h4> 
            <hr/></>} */}
            
            <div className="graph-section" style={{width:'25%', height:'25%'}}>
            
                {qType==='radio' ?
                <div className="chart-container">
                    <Pie
                    data={{
                        labels: dataList[0].survey.questions[qNum-1]?.answerOptions.map(op=>op),
                        datasets:[{
                            data:percentArrRadio,
                            backgroundColor:checkboxesPercentArr.length !== 6 ? colors : colors2, // Since our default has 5 colours specified, this code stops the same colour from repeating back-to-back if we have 6 options.
                            hoverBorderWidth:3,
                            hoverBorderColor:'#000'
                        }]
                    }}
                    >
                    </Pie>
                </div>
                :null}
                
                {qType==='checkbox' ?
                <div className="chart-container">
                    <Pie
                    data={{
                        labels: checkboxesOpt,
                        datasets:[{
                            data: checkboxesPercentArr,
                            backgroundColor: checkboxesPercentArr.length !== 6 ? colors : colors2, 
                            hoverBorderWidth:3,
                            hoverBorderColor:'#000'
                        }]
                    }}
                    >
                    </Pie>
                    <div className="checkboxes-other-responses">
                        <p style={{fontWeight: "bold"}}>Other responses reorded: </p>
                        <p style={{whiteSpace: "pre-wrap"}}>{otherArrayWithoutEmptyStrings}</p>
                    </div>
                </div>
                :null}
                
                {qType === 'matrix1' || qType=== 'matrix2' || qType === 'select' ?
                    <div style={{width:"200%"}}>
                        <Bar
                        data={{
                            labels: optObj,
                            datasets: valueLabel?.map((val, i)=>{
                                return(
                                    {
                                        label:val,
                                        // label:Object.keys(getPercentObj(i))[i],
                                        // data:Object.values(getPercentObj(i)),
                                        data:optObj.map((opt,j)=>{
                                            // return valueLabel.map((vl, k)=>{
                                                return getPercentageAnsweredValLabel(j, i)
                                            // })
                                            
                                        }),
                                        backgroundColor:colors[i],
                                        barThickness:12,
                                    }
                                )
                            })
                        }}
                        >
                        </Bar>
                </div>
                :null}

                {qType==='slider' ?
                    <div className="chart-container">
                        <Pie
                        data={{
                            // labels: sliderOptionsArray,
                            // labels: simpleAnswerOptions,
                            labels: sliderLabels,
                            datasets:[{
                                // data: sliderOptions,
                                data: sliderPercentArr,
                                // data: [1, 4, 21, 23, 2],
                                backgroundColor: percentRadio.length !== 6 ? colors : colors2, 
                                hoverBorderWidth:3,
                                hoverBorderColor:'#000'
                            }]
                        }}
                        >
                        </Pie>
                    </div>
                    :null}

            </div>
           
        </div>
    );
}
 
export default ShowGraphs; 







