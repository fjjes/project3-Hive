import { Bar, Pie } from "react-chartjs-2"

const ShowGraphs = ({question, options, qType,  answers, qNum}) => {
    let opt= options?.sort()
    let ans=answers?.sort()

    console.log('qtype:', qType)
    console.log('options:', opt)
    console.log('answers:', ans)

   let colors=[
        "#197e9c",
        "#35c0c2",
        "#f59645",
        "#bce6f8",
        "#575759"
        // 'purple', 'green', 'orange', 'cyan', 'purple'
    ]
    
//    let count = ans.reduce((acc, e)=>acc.set(e, (acc.get(e) || 0 )+ 1), new Map())
//     let countArr = [...count.values()]


//radio
    const percentages = ans.reduce((pcts, x) => ({...pcts, [x]: (pcts[x] || 0) + 100 / (ans.length)}), {})
    console.log ('percent',percentages)
    let percentArr= Object.values(percentages).map(percent=>percent)

//matrix, select
   

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