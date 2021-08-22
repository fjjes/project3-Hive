import { useEffect, useState } from "react"
import Map from './Map'
import AnalysisTable from "./AnalysisTable"
import { Bar, Pie} from "react-chartjs-2" //Bar, Line, Pie, Bubble, Radar, Scatter, Doughnut 

const ShowGraphs = ({question, qType,  answers, qNum, dataList, surveyId}) => {
    const [valueLabel, setValueLabel]=useState([])
    const [objArr, setObjArr]=useState([])
   let colors=["#197e9c","#35c0c2","#f59645","#bce6f8", "#575759", "#805F42", "#52577C","maroon", "#6D92A0", "#D4A66A"] // Hive colours
   let colors2=["#197e9c","#35c0c2","#f59645","#bce6f8"] // Hive colours (to use when we have 6 options in a chart, so that the same colour isn't repeated back-to-back)

    const getLabel=()=>{
        let labelArr=[]
        // console.log("qType:", qType)
        if(qType==='select'){
            let num =1
            for(let i=0; i<dataList[0].survey.questions[qNum-1]?.answerOptions.length;i++){
            labelArr.push(num++)
            }
        }else if(qType=== 'matrix1'){
            labelArr = ['Very Satisfied', 'Satisfied', 'Neither Satisfied nor Dissatisfied', 'Dissatisfied', 'Very Dissatisfied']
        }else if(qType=== 'matrix2'){
            labelArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }
        setValueLabel(labelArr)
    }

    useEffect(()=>{
        getLabel()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dataList, qNum])  
    

    // radio --------------------------------
    console.log('ans"', answers)
    // let ans=answers?.sort()
    const percentRadio = answers.reduce((pcts, x) => ({...pcts, [x]: (pcts[x] || 0) + 100 / (answers.length)}), {})
    let percentArrRadio= Object.values(percentRadio)
    console.log('percentRadio', percentArrRadio)

    // checkboxes ---------------------------
    let otherArray = []
    let otherArrayWithoutEmptyStrings = []
    let checkedOptionsArray = []
    let checkboxesPercentArr = []
    let checkboxesAnswerOptions = dataList[0].survey.questions[qNum-1]?.answerOptions

    if(typeof answers === 'object'){
        if (qType==='checkbox'){
            for (let i=0; i<answers.length; i++) {
                if (answers[i]) {
                    // GRAB "OTHER" VALUE:
                    if (answers[i].other) {
                        otherArray.push(answers[i].other.value)
                        otherArrayWithoutEmptyStrings = otherArray.filter(element => {return element}).join("\n");
                    }
                    // GRAB OPTIONS THAT HAVE BEEN CHECKED
                    for (let x = 0; x < answers[i].options.length; x++) {
                        if (answers[i].options[x].checked === true) {
                            checkedOptionsArray.push(answers[i].options[x].value)
                        }
                    }
            }}
            const numberOfOptionsSelected = answers.reduce((totalOptionsSelected, answer) => {
                return totalOptionsSelected + 
                answer.options.reduce((totalOptionsSelectedForPerson, option) => {
                    return totalOptionsSelectedForPerson + (option.checked ? 1 : 0)
                }, 0)
            }, 0)
            checkboxesPercentArr = checkboxesAnswerOptions?.map((option, optionIndex) => {
                const peopleWhoSelected = answers.filter(answer => answer.options[optionIndex].checked)
                const percentageSelected = (peopleWhoSelected.length / numberOfOptionsSelected) * 100
                return percentageSelected
            })
        }
    }

    //matrix, select -----------------------
    let optObj = dataList[0].survey?.questions[qNum-1]?.answerOptions.map(op=>op.text)

    const getPercentageAnsweredValLabel=(optIndex, valIndex)=>{
        const optAnswers = answers.map((ans, ansIndex)=>{return ans[optIndex]})
        const optAnsForValLabel = optAnswers.filter((optAns)=>optAns.value === valueLabel[valIndex])
        const percentageAnsweredForValLabel = ((optAnsForValLabel.length / optAnswers.length) * 100) 
    return percentageAnsweredForValLabel
    }


    useEffect(()=>{
        let arrObj=[]
        valueLabel?.map((val, i)=>{
            return(
                arrObj.push(optObj.map((opt,j)=>getPercentageAnsweredValLabel(j, i)))
            )
        })
        setObjArr(arrObj)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[valueLabel])



    // slider -------------------------------
    let sliderPercentArr = []
    let sliderPercentTotalsArray = []
    let sliderAnswerOptions = dataList[0].survey.questions[qNum-1]?.answerOptions
    if(typeof answers === 'object'){
        if (qType === 'slider') {
            for (let i=0; i<dataList.length; i++) {
                sliderPercentArr = [...sliderPercentArr, dataList[i].answers[qNum]]
            }
            let sliderPercentTotalsArrayTooBig = sliderPercentArr.reduce((acc, curr) => curr.map((val, i) => (acc[i] || 0) + val), []);
            sliderPercentTotalsArray = sliderPercentTotalsArrayTooBig.map(item => (item / dataList.length))
        } 
    }

    return (
        <div>
            {qType === 'postal' && <Map surveyId={surveyId}/>} 
            <div className="graph-section">
            
                {qType==='radio' ?
                <div className='lower-sec'>
                <div className="chart-container pie">
                    <Pie
                    data={{
                        // labels: dataList[0].survey.questions[qNum-1]?.answerOptions,
                        labels: Object.keys(percentRadio),
                        datasets:[{
                            data:percentArrRadio,
                            backgroundColor:colors,
                            // backgroundColor:percentArrRadio.length !== 6 ? colors : colors2, // Since our default has 5 colours specified, this code stops the same colour from repeating back-to-back if we have 6 options.
                            hoverBorderWidth:3,
                            hoverBorderColor:'#000'
                        }]
                    }}
                    >
                    </Pie>
                    <div className="chart-table ptable" >
                        <AnalysisTable xOptions={dataList[0].survey.questions[qNum-1]?.answerOptions} data={percentRadio} question={question} qType={qType}/>
                    </div>
                </div>
                </div>
                :null}
                
                {qType==='checkbox' ?
                 <div className='lower-sec'>
                    <div className="chart-container pie">
                        <Pie
                        data={{
                            labels: checkboxesAnswerOptions,
                            datasets:[{
                                data: checkboxesPercentArr,
                                // backgroundColor: checkboxesPercentArr.length !== 6 ? colors : colors2, 
                                backgroundColor:colors, 
                                hoverBorderWidth:3,
                                hoverBorderColor:'#000'
                            }]
                        }}
                        >
                        </Pie>
                        <div className="chart-table ptable">
                                <AnalysisTable xOptions={checkboxesAnswerOptions} data={checkboxesPercentArr} question={question} qType={qType}/>
                        </div>
                        <div className="checkboxes-other-responses">
                            <p style={{fontWeight: "bold"}}>Other responses reorded: </p>
                            <p style={{whiteSpace: "pre-wrap"}}>{otherArrayWithoutEmptyStrings}</p>
                        </div>
                    </div>
                </div>
                :null}
                
                {qType === 'matrix1' || qType=== 'matrix2' || qType === 'select' ?
                 <div className='lower-sec'>
                    <div style={{width:'80%'}}>
                        <Bar
                        data={{
                            labels: optObj,
                            datasets: valueLabel?.map((val, i)=>{
                                return(
                                    {
                                    label:val,
                                    data:optObj.map((opt,j)=>{
                                        return getPercentageAnsweredValLabel(j, i)
                                    }),
                                    backgroundColor:colors[i],
                                    barThickness:12,
                                    }
                                )
                            })
                        }}
                       
                       >
                        </Bar>
                        <div className="chart-table">
                                <AnalysisTable xOptions={optObj} data={objArr} label={valueLabel} question={question} qType={qType}/>
                        </div>
                </div>
                </div>
                :null}

                {qType==='slider' ?
                 <div className='lower-sec'>
                    <div className="chart-container pie">
                        <Pie
                        data={{
                            labels: sliderAnswerOptions,
                            datasets:[{
                                data: sliderPercentTotalsArray,
                                // backgroundColor: percentRadio.length !== 6 ? colors : colors2, 
                                backgroundColor:colors,
                                hoverBorderWidth:3,
                                hoverBorderColor:'#000'
                            }]
                        }}
                        >
                        </Pie>
                        <div className="chart-table ptable">
                                <AnalysisTable xOptions={sliderAnswerOptions} data={sliderPercentTotalsArray} question={question} qType={qType}/>
                        </div>
                    </div>
                    </div>
                    :null}
            </div> 
        </div>
    );
}
 
export default ShowGraphs; 







