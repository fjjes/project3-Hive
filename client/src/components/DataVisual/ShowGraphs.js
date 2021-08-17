import { Bar, Line, Pie, Bubble, Radar, Scatter, Doughnut  } from "react-chartjs-2"

const ShowGraphs = ({question, options, qType,  answers, qNum}) => {
    // let opt= options?.sort()
    let ans=answers?.sort()

    console.log('qtype:', qType)
    console.log('options:', options)
    console.log('answers:', ans)

   let colors=["#197e9c","#35c0c2","#f59645","#bce6f8", "#575759"]
        // 'purple', 'green', 'orange', 'cyan', 'purple'
    
    
//    let count = ans.reduce((acc, e)=>acc.set(e, (acc.get(e) || 0 )+ 1), new Map())
//     let countArr = [...count.values()]


//radio
    const percentages = ans.reduce((pcts, x) => ({...pcts, [x]: (pcts[x] || 0) + 100 / (ans.length)}), {})
    console.log ('percent',percentages)
    let percentArr= Object.values(percentages).map(percent=>percent)
    let opt =Object.keys(percentages).map(percent=>percent)
//matrix, select
   

// checkboxes
console.log("All answers: ", answers)

let otherArray = []
let prettyOtherArray = []
let checkedOptionsArray = []
// let checkboxAns=checkedOptionsArray?.sort()
// const checkboxesPercentages = checkboxAns.reduce((pcts, x) => ({...pcts, [x]: (pcts[x] || 0) + 100 / (checkboxAns.length)}), {})
// console.log ('checkbox percent', checkboxesPercentages)
// let checkboxesPercentArr= Object.values(checkboxesPercentages).map(checkboxesPercent=>checkboxesPercent)
// let checkboxesOpt =Object.keys(checkboxesPercentages).map(checkboxesPercent=>checkboxesPercent)
// console.log("checkboxesOpt: ", checkboxesOpt)
// console.log("chechboxesPercentages: ", checkboxesPercentages)
if(typeof answers === 'object'){
    if(qType==='checkbox'){
        for (let i=0; i<answers.length; i++) {
            // GRAB OTHER VALUE:
            // console.log("answers[i].other.value: ", i, answers[i].other.value)
            otherArray.push(answers[i].other.value)
            prettyOtherArray = otherArray.filter(element => {return element}).join("\n");
            // GRAB OPTIONS THAT HAVE BEEN CHECKED
            for (let x = 0; x < answers[i].options.length; x++) {
                if (answers[i].options[x].checked === true) {
                    // console.log("answers[i].options[x].value: ", i, x, answers[i].options[x].value)
                    checkedOptionsArray.push(answers[i].options[x].value)
                }
            }
        }
    console.log("other array: ", otherArray)
    console.log("pretty other array: ", prettyOtherArray)
    console.log("checkedOptionsArray: ", checkedOptionsArray)
    }
}

    return (
        <div>
            <hr/>
            <h4>{`Q${qNum} - ${question}`}<span style={{color:'blue'}}>{`(${qType}-type)`}</span></h4> 
            <hr/>
            
            <div className="graph-section" style={{width:'25%', height:'25%'}}>
                {/* <h2>{options}</h2> */}
                {/* <h5>{answers}</h5> */}
                {qType==='radio' ?
                <div className="chart-container">
                    <Pie
                    data={{
                        labels: opt,
                        datasets:[{
                            // data:countArr,
                            data:percentArr,
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
                        labels: checkedOptionsArray,
                        datasets:[{
                            // *** HARDCODED DATA NEEDS TO BE REPLACED WITH THE COUNTS PULLED FROM EACH SURVEY ***
                            data: [1, 4, 2, 5, 7, 12, 2, 24, 11, 19],
                            // data:countArr,
                            // data:checkboxesPercentArr,
                            backgroundColor:colors,
                            hoverBorderWidth:3,
                            hoverBorderColor:'#000'
                        }]
                    }}
                    >
                    </Pie>
                    <p style={{padding: "5px", fontWeight: "bold"}}>Other responses reorded: </p>
                    <p style={{padding: "5px", whiteSpace: "pre-wrap"}}>
                        {prettyOtherArray}
                    </p>
                </div>
                :null}
                {/* {qType === 'matrix1' || qType=== 'matrix2' || qType === 'select' ?
                <Bar
                data={{
                    labels: opt,
                    datasets:[{
                        data:percentArr,
                        backgroundColor:colors
                    }]
                }}
                >
                </Bar>
                
                :null} */}
            </div>
           
        </div>
    );
}
 
export default ShowGraphs;