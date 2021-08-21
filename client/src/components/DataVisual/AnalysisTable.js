import './index.css'

const AnalysisTable = ({xOptions, data, labels, question, qType}) => {
    console.log(`${qType}:: xOptions`, xOptions)
    console.log(`${qType}:: data`, data)
    console.log(`${qType}:: question`, question)
    console.log('------------------------------')

    let obj = {}
    xOptions.forEach((item, i)=>obj[item] = data[i])
    console.log("obj::", obj)

    function roundToTwo(num) {    
        return +(Math.round(num + "e+2")  + "e-2");
    }

    return (
        <table>
            <tbody>
                {Object.keys(obj).map((itm, i)=>{
                    return(
                        <tr>
                            <td style={{fontWeight:"bold"}}>{itm}</td>
                            {qType==='slider'?
                                <td>{`${roundToTwo(obj[itm])}%`}<span style={{fontSize:"small", marginLeft:"5px"}}>(avg.)</span></td>
                            :   
                                <td>{`${roundToTwo(obj[itm])}%`}</td>
                            }
                        </tr>
                    )
                })}  
            </tbody>
        </table>
    );
}
 
export default AnalysisTable;