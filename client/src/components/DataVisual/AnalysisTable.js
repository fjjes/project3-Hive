import './index.css'

const AnalysisTable = ({xOptions, data, label, question, qType}) => {
    console.log(`${qType}:: xOptions`, xOptions)
    console.log(`${qType}:: data`, data)
    console.log(`${qType}:: question`, question)
    console.log(`${qType}:: label`, label)
    console.log('------------------------------')

    //radio, select, checkbox
    let obj = {}
    xOptions.forEach((item, i)=>obj[item] = data[i])
    // console.log("obj::", obj)


    const roundToTwo =(num) =>{    
        return +(Math.round(num + "e+2")  + "e-2");
    }

    return (
        <table>
            <tbody>
                {(qType==='matrix1' || qType==='matrix2' || qType==='select') ?
                <>
                <tr>
                    <th></th>
                    {label.map((lbl,i)=><th style={{fontSize:"small"}}>{lbl}</th>)}
                </tr>
                {xOptions.map((option,i)=>{
                    return(
                        <tr>
                            <td style={{fontWeight:"bold", fontSize:"small"}}>{option}</td>
                            {data.map((percent,j)=>{
                                return(
                                    <td>{`${roundToTwo(percent[i])}%`}</td>
                                )
                            })}
                        </tr>
                    )
                })}
                </>
                :
                Object.keys(obj).map((itm, i)=>{
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
                })
                }
               
            </tbody>
        </table>
    );
}
 
export default AnalysisTable;