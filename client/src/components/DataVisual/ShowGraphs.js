import { Bar, Pie } from "react-chartjs-2"
// import {useState } from 'react';

const ShowGraphs = ({question, qType,  answers, qNum, dataList}) => {
    // const [valueLabel, setValueLabel]=useState([])
    console.log('datalist:', dataList)
    console.log('qtype:', qType)
    

   let colors=["#197e9c","#35c0c2","#f59645","#bce6f8", "#575759"]
        // 'purple', 'green', 'orange', 'cyan', 'purple'
    
    
//    let count = ans.reduce((acc, e)=>acc.set(e, (acc.get(e) || 0 )+ 1), new Map())
//     let countArr = [...count.values()]



//radio
    let ans=answers?.sort()
    const percentRadio = ans.reduce((pcts, x) => ({...pcts, [x]: (pcts[x] || 0) + 100 / (ans.length)}), {})
    console.log ('percentRadio',percentRadio)
    let percentArrRadio= Object.values(percentRadio).map(percent=>percent)
    // let optRadio =Object.keys(percentRadio).map(percent=>percent)
   
    //matrix, select
    let optObj = dataList[0].survey.questions[qNum-1]?.answerOptions.map(op=>op.text)
    console.log('optObj', optObj)


  const getPercentObj=(i)=>{
    let ansObj = answers?.map((an, ind)=>an[i]?.value)
    const percentObj = ansObj.reduce((pcts, x) => ({...pcts, [x]: (pcts[x] || 0) + 100 / (ansObj.length)}), {})
    console.log ('percentObj',percentObj)    
      return percentObj
  }

    return (
        <div>
            {qType === 'comment' &&
                <h3>Please visit "Data-Collected" tab to view all the comments for this question</h3>} 
            {qType === 'postal' &&
                <p>Please visit "Data-Collected" tab to view all the postalcodes for this question</p>} 
            {(qType === 'radio' || qType === 'select' || qType === 'matrix1' || qType=== 'matrix2'|| qType=== 'slider'|| qType=== 'checkbox') &&<>
            <hr/>
            <h4>{`Q${qNum} - ${question}`}<span style={{color:'blue'}}>{`(${qType}-type)`}</span></h4> 
            <hr/></>}
            
            <div className="graph-section" style={{width:'25%', height:'25%'}}>
            
                {qType==='radio' ?
                <div className="chart-container">
                    <Pie
                    data={{
                        // labels: optRadio,
                        labels: dataList[0].survey.questions[qNum-1]?.answerOptions.map(op=>op),
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
                
                {qType === 'matrix1' || qType=== 'matrix2' || qType === 'select' ?
                    <div className="chart-container">
                        <Bar
                        data={{
                            labels: optObj,
                            // {percentObj ?
                            datasets: optObj?.map((opt, i)=>{
                                console.log('label:', Object.keys(getPercentObj(i))[i])
                                // console.log('label:',valueLabel[i] )
                                return(
                                    {
                                        // label:valueLabel[i],
                                        label:Object.keys(getPercentObj(i))[i],
                                        data:Object.values(getPercentObj(i)).map(percent=>percent),
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
                {/* {qType === 'comment' &&
                <p>Please visit "Data-Collected" tab to view all the comments for this question</p>} */}
            </div>
           
        </div>
    );
}
 
export default ShowGraphs; 


    // //matrix, select
    // // if(qType === 'matrix1' || qType=== 'matrix2' || qType === 'select' ){
    //     console.log('answers:', answers)
    //     let ansObj = answers?.map((an, i)=>an[0]?.value)
    //     console.log('ansObj', ansObj)// Rethinking workspaces in the company=>[3, 1, 1, 1, 4, 2, 4, 5, 1]
    //      const percentObj = ansObj.reduce((pcts, x) => ({...pcts, [x]: (pcts[x] || 0) + 100 / (ansObj.length)}), {})
    //      console.log ('percentObj',percentObj)//{1: 44.4444,    2: 11.1111,  3: 11.11111,  4: 22.2222,  5: 11.11111 }
    //      let percentArrObj= Object.values(percentObj).map(percent=>percent)
    //      console.log('percentArrObj:', percentArrObj)//[44.4444, 11.1111, 11.11111, 22.2222, 11.11111]
   
   
    // let optObj = dataList[0].survey.questions[qNum-1]?.answerOptions.map(op=>op.text)
    // console.log('optObj', optObj)
   
   
    //  let labelObj =Object.keys(percentArrObj).map(percent=>percent)
   //  console.log ('labelObj',labelObj)     
// // }



// if(qType==='select'){
//     let labelArr=[]
//     let num =1
//     console.log('length:::',dataList[0].survey.questions[qNum].answerOptions.length )//5 for select
//     for(let i=0; i<dataList[0].survey.questions[qNum].answerOptions.length;i++){
//       labelArr.push(num++)
//     }
//     console.log('select label:', labelArr)
//    setValueLabel(labelArr)
// }else if(qType=== 'matrix1'){
//     let labelArr = ['Very Satisfied', 'Satisfied', 'Neither Satisfied Nor Dissatisfied', 'Dissatisfied', 'Very Satisfied']
//     setValueLabel(labelArr)
//     console.log('matrix1 label:', labelArr)

//   }else if(qType=== 'matrix2'){
//       let labelArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
//       setValueLabel(labelArr)
//       console.log('matrix2 label:', labelArr)

//   }

