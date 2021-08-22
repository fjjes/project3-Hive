import React from 'react'
import moment from "moment";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const ExportCSV = ({newDataList, fileName}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    let arr = [];
    let questionNum = 1;
    for (let i = 0; i < newDataList[0]?.survey?.questions.length; i++) {
      arr.push(questionNum++);
    } 

    let questionList =newDataList[0]?.survey?.questions

    const formatAnswers = (ans, i) =>{
        if(ans){
            if(typeof ans === 'object'){
                if(questionList[i].questionType==='checkbox'){
                    return ans.options.filter(option=>option.checked).map(option=>{
                        if(option.value==='Other'){
                            return ans.other.value
                        }
                        return option.value
                    })
                }else if(questionList[i].questionType === 'slider'){
                    return ans
                }else{
                    return Object.values(ans).map(value => formatAnswers(value.value))
                }
            }
            return ans.toString()
        }else{
            return null
        }   
    }
    let csvData = []
    if(questionList){
        csvData = newDataList.map((row, i)=>{
            let record=i+1;
            let answeredDate= moment(row.answeredDate).format("MM/DD/yyyy");
            let csvRow= {
                Record_Number: record, 
                Answered_date: answeredDate
            }
            // console.log("row.answers", row.answers)

            let answersArray= questionList.map((question, ind)=>{
                if(row.answers[ind+1]){
                    return row.answers[ind+1]
                }else{
                    return null
                }
            })
        
            let answerStringOranswerArrays= answersArray.map((ans, i)=> formatAnswers(ans, i)); 
            // console.log("answerStringOranswerArrays:", answerStringOranswerArrays)
        
            answerStringOranswerArrays.forEach((item, index)=>{
                if(item){
                        // console.log("item", item)
                    if(typeof item === 'string'){
                        csvRow[`Q${index+1}`]=item
                    }else if(typeof item === 'object'){
                        if(questionList[index].questionType === 'checkbox'){
                            for(let ansIndex=0; ansIndex<3; ansIndex++){
                                if(ansIndex<item.length){
                                    csvRow[`Q${(index+1)}-${ansIndex+1}`]=item[ansIndex]
                                }else{
                                    csvRow[`Q${(index+1)}-${ansIndex+1}`]= ""
                                }
                            }
                        }else if(questionList[index].questionType=== 'slider'){
                                item.forEach((answer, i)=>{
                                    csvRow[`Q${(index+1)}-${questionList[index].answerOptions[i]}`]=answer
                                })                        
                        }else if(questionList[index].questionType=== 'select' ||
                                questionList[index].questionType=== 'matrix1' ||
                                questionList[index].questionType=== 'matrix2'){
                                    item.forEach((answer, i)=>{
                                        csvRow[`Q${(index+1)}-${questionList[index].answerOptions[i].text}`]=answer
                                    })
                        }else{
                            questionList[index].answerOptions.forEach((option)=>{
                                item.forEach((itm)=>{
                                    csvRow[`Q${(index+1)}-${option?.text}`]=itm
                                })
                            })
                        }
                    }
                }else{
                    if(questionList[index].questionType ==="checkbox"){
                        for(let ansIndex=0; ansIndex<3; ansIndex++){
                                csvRow[`Q${(index+1)}-${ansIndex+1}`]= ""  
                        }
                    }
                }
            })    
            return csvRow
        })
    }

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        // const merge = [
        //     { s: { r: 0, c: 2 }, e: { r: 0, c: arr.length +1 }},
        //     { s: { r: 0, c: 0 }, e: { r: 2, c: 0 }},
        //     { s: { r: 0, c: 1 }, e: { r: 2, c: 1 }},
        // ]
        // ws["!merges"] = merge;

    //     const range =[
    //         { s: { r: 0, c: 0 }, e: { r: 0, c: arr.length +1 }}
    //     ]
    //    range.s={ font:{bold:true}}

        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <button  className="export-btn" onClick={(e) => exportToCSV(csvData,fileName)}>Export to Excel</button>
    )

}

export default ExportCSV;