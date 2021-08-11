import React from 'react'
import moment from "moment";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const ExportCSV = ({newDataList, fileName}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    console.log("data", newDataList)

    let arr = [];
    let questionNum = 1;
    for (let i = 0; i < newDataList[0]?.survey?.questions.length; i++) {
      arr.push(questionNum++);
    }

    const formatAnswers = (ans) =>{
        if(ans){
            if(typeof ans === 'object'){
                if(ans.questionType==='checkbox'){
                    return ans.options.filter(option=>option.checked).map(option=>{
                        if(option.value==='Other'){
                            return ans.other.value
                        }
                        return option.value
                    })
                }else{
                    return Object.values(ans).map(value => formatAnswers(value.value))

                }
            }
            return ans.toString()
        }else{
            return null
        }   
    }


    const csvData = newDataList.map((row, i)=>{
            let record=i+1;
            let answeredDate= moment(row.answeredDate).format("MM/DD/yyyy");
            let csvRow= {
                Record_Number: record, 
                Answered_date: answeredDate
            }


            let answerStringOranswerArrays= Object.values(row.answers).map((ans)=> formatAnswers(ans)); 
            console.log("answerStringOranswerArrays:", answerStringOranswerArrays)
            
        answerStringOranswerArrays.forEach((item, j)=>{//change i
            // if(item[i]){
                console.log("item", item)
                if(typeof item === 'string'){
                    csvRow[`Q${j+1}`]=item
                }
                // console.log("befor the error:", Object.values(item[i]))
                // if(Object.values(item[i]).isArray()){
                //     let entries= new Map([(item.map((itm, j)=>{
                //         let Q = Object.keys(itm)
                //         let A = Object.values(itm[i][j])
                //         return [Q+1, A]
                //     })
                //     )])
                //     console.log("entries", entries) 
                //     const QAobj= Object.fromEntries(entries)
                // }
            // }else{
            //     return null
            // }
        }) 
        
            return csvRow
        })
        // {id: 1, date:"todate"},
        // {id: 2, date:"date yesterday"}
    
    // console.log("data ",csvData)

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        // const merge = [
        //     { s: { r: 0, c: 2 }, e: { r: 0, c: arr.length +1 }},
        //     { s: { r: 0, c: 0 }, e: { r: 2, c: 0 }},
        //     { s: { r: 0, c: 1 }, e: { r: 2, c: 1 }},

        // ]
        // ws["!merges"] = merge;
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <button  className="export" onClick={(e) => exportToCSV(csvData,fileName)}>Export to Excel</button>
    )

}

export default ExportCSV;