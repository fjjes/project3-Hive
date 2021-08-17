import { Bar, Line, Pie, Bubble, Radar, Scatter, Doughnut  } from "react-chartjs-2"

const ShowGraphs = ({question, qType,  answers, qNum, dataList}) => {
    // let opt= options?.sort()

    console.log('qtype:', qType)
    // console.log('options:', options)
    // console.log('ans:', ans)

   let colors=["#197e9c","#35c0c2","#f59645","#bce6f8", "#575759"] // Hive colours
        // 'purple', 'green', 'orange', 'cyan', 'purple'
    
    
//    let count = ans.reduce((acc, e)=>acc.set(e, (acc.get(e) || 0 )+ 1), new Map())
//     let countArr = [...count.values()]


//radio --------------------------------
    let ans=answers?.sort()
    const percentRadio = ans.reduce((pcts, x) => ({...pcts, [x]: (pcts[x] || 0) + 100 / (ans.length)}), {})
    console.log ('percent',percentRadio)
    let percentArrRadio= Object.values(percentRadio).map(percent=>percent)
    let optRadio =Object.keys(percentRadio).map(percent=>percent)

//matrix, select -----------------------
    console.log('answers:', answers)
   let ansObj = answers?.map((an, i)=>an[0]?.value)
   console.log('ansObj', ansObj)// Rethinking workspaces in the company=>[3, 1, 1, 1, 4, 2, 4, 5, 1]
    const percentObj = ansObj.reduce((pcts, x) => ({...pcts, [x]: (pcts[x] || 0) + 100 / (ansObj.length)}), {})
    console.log ('percentObj',percentObj)//{1: 44.4444,    2: 11.1111,  3: 11.11111,  4: 22.2222,  5: 11.11111 }
    let percentArrObj= Object.values(percentObj).map(percent=>percent)
    console.log('percentArrObj:', percentArrObj)//[44.4444, 11.1111, 11.11111, 22.2222, 11.11111]
    let optObj = dataList[0].survey.questions[qNum-1]?.answerOptions.map((op,i)=>op.text)
    console.log('optObj', optObj)
    // let labelObj =Object.keys(percentArrObj).map(percent=>percent)
    // console.log ('labelObj',labelObj)

// checkboxes ---------------------------
// console.log("All answers: ", answers)

let otherArray = []
let otherArrayWithoutEmptyStrings = []
let checkedOptionsArray = []
let checkboxesOpt = []
let checkboxesPercentArr = []
if(typeof answers === 'object'){
    if(qType==='checkbox'){
        for (let i=0; i<answers.length; i++) {
            // GRAB OTHER VALUE:
            // console.log("answers[i].other.value: ", i, answers[i].other.value)
            otherArray.push(answers[i].other.value)
            otherArrayWithoutEmptyStrings = otherArray.filter(element => {return element}).join("\n");
            // GRAB OPTIONS THAT HAVE BEEN CHECKED
            for (let x = 0; x < answers[i].options.length; x++) {
                if (answers[i].options[x].checked === true) {
                    // console.log("answers[i].options[x].value: ", i, x, answers[i].options[x].value)
                    checkedOptionsArray.push(answers[i].options[x].value)
                }
            }
        }
        let checkboxAns=checkedOptionsArray?.sort()
        // console.log("checkboxAns: ", checkboxAns)
        const checkboxesPercentages = checkboxAns.reduce((pcts, x) => ({...pcts, [x]: (pcts[x] || 0) + 100 / (checkboxAns.length)}), {})
        // console.log ('checkbox percent', checkboxesPercentages)
        checkboxesPercentArr= Object.values(checkboxesPercentages).map(checkboxesPercent=>checkboxesPercent)
        checkboxesOpt =Object.keys(checkboxesPercentages).map(checkboxesPercent=>checkboxesPercent)
        // console.log("checkboxesOpt: ", checkboxesOpt)
        // console.log("chechboxesPercentages: ", checkboxesPercentages)
        // console.log("chechboxesPercentArr: ", checkboxesPercentArr)
        // console.log("other array: ", otherArray)
        // console.log("pretty other array: ", otherArrayWithoutEmptyStrings)
        // console.log("checkedOptionsArray: ", checkedOptionsArray)
    }
}

    return (
        <div>
            <hr/>
            <h4>{`Q${qNum} - ${question}`}<span style={{color:'blue'}}>{`(${qType}-type)`}</span></h4> 
            <hr/>
            
            <div className="graph-section" style={{width:'25%', height:'25%'}}>
            
                {qType==='radio' ?
                <div className="chart-container">
                    <Pie
                    data={{
                        labels: optRadio,
                        datasets:[{
                            // data:countArr,
                            data:percentArrRadio,
                            backgroundColor:colors,
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
                        // labels: opt,
                        // labels: checkedOptionsArray,
                        labels: checkboxesOpt,
                        datasets:[{
                            // *** HARDCODED DATA NEEDS TO BE REPLACED WITH THE COUNTS PULLED FROM EACH SURVEY ***
                            // data: [1, 4, 2, 5, 7, 12, 2, 24, 11, 19],
                            data: checkboxesPercentArr,
                            // data:countArr,
                            // data:checkboxesPercentArr,
                            backgroundColor:colors,
                            hoverBorderWidth:3,
                            hoverBorderColor:'#000'
                        }]
                    }}
                    >
                    </Pie>
                    <div className="checkboxes-other-responses">
                        <p style={{fontWeight: "bold"}}>Other responses reorded: </p>
                        <p style={{whiteSpace: "pre-wrap"}}>
                            {otherArrayWithoutEmptyStrings}
                        </p>
                    </div>
                </div>
                :null}
                
                {qType === 'matrix1' || qType=== 'matrix2' || qType === 'select' ?
                    <div className="chart-container">
                        <Bar
                        data={{
                            labels: optObj,
                            // {percentObj ?
                            datasets: optObj?.map((opt, i)=>{
                                return(
                                    {
                                        label:Object.keys(percentObj)[i],
                                        data:percentArrObj,
                                        backgroundColor:colors[i],
                                        barThickness:12
                                    }
                                )
                            })
                    //    :[]}
                        }}
                        >
                        </Bar>
                </div>
                :null}
            </div>
           
        </div>
    );
}
 
export default ShowGraphs; 