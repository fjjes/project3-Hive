import './index.css'

const AnalysisTable = ({xOptions, data, label, question, qType}) => {
    // console.log(`${qType}:: xOptions`, xOptions)
    // console.log(`${qType}:: data`, data)
    // console.log(`${qType}:: question`, question)
    // console.log(`${qType}:: label`, label)
    // console.log('------------------------------')

    //slider, checkbox
    let obj = {}
    xOptions.forEach((item, i)=>obj[item] = data[i])
    // console.log('obj;;;', obj)
    
    const roundToTwo =(num) =>{    
        return +(Math.round(num + "e+2")  + "e-2");
    }

    return (
        <table>
            <tbody>
                {qType === 'radio' &&
                    Object.keys(data).map((itm, i)=>{
                        return(
                            <tr>
                                <td className='text'>{itm}</td>
                                <td>{`${roundToTwo(data[itm])}%`}</td>   
                            </tr>
                        )
                    })
                }       
                {(qType==='matrix1' || qType==='matrix2' || qType==='select') &&
                <>
                <tr>
                    <th></th>
                    {qType==='matrix1' && (label.map((lbl,i)=><th style={{fontSize:"smaller"}}>{lbl}</th>))}
                    {qType==='matrix2' && (label.map((lbl,i)=><th style={{fontSize:"smaller"}}>Rated {lbl}</th>))}
                    {qType==='select' && (label.map((lbl,i)=><th style={{fontSize:"smaller"}}>Ranked {lbl}</th>))}
                </tr>
                {xOptions.map((option,i)=>{
                    return(
                        <tr>
                            <td className='text'>{option}</td>
                            {data.map((percent,j)=>{
                                return(
                                    <td>{`${roundToTwo(percent[i])}%`}</td>
                                )
                            })}
                        </tr>
                    )
                })}
                </>
                }
                {(qType=== 'slider' || qType === 'checkbox') && 
                    Object.keys(obj).map((itm, i)=>{
                        return(
                            <tr>
                                <td className='text'>{itm}</td>
                                {qType==='slider' ?
                                    <td>{`${roundToTwo(obj[itm])}%`}<span style={{fontSize:"smaller", marginLeft:"5px"}}>(avg.)</span></td>

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