import React from 'react'
import moment from "moment";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


const ExportCSV = ({newDataList, fileName, questionArray}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    console.log("data", newDataList)
console.log('questionArray', questionArray)
    
let arr = [];
    let questionNum = 1;
    for (let i = 0; i < newDataList[0]?.survey?.questions.length; i++) {
      arr.push(questionNum++);
    }
    let questionList =newDataList[0]?.survey?.questions
    
    const formatAnswers = (ans, index) =>{
        console.log("questions:", questionArray[index])//!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if(ans){
            if(typeof ans === 'object'){
                if(ans.questionType==='checkbox'){
                    return ans.options.filter(option=>option.checked).map(option=>{
                        if(option.value==='Other'){
                            return ans.other.value
                        }
                        return option.value
                    })
                }else if(ans.questionType === 'slider'){
                    return ans.values
                }else{
                    return Object.values(ans).map(value => formatAnswers((value.value)))
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
            // console.log("row.answers", row.answers)

        let answersArray= questionList.map((question, ind)=>{
            if(row.answers[ind+1]){
                return row.answers[ind+1]
            }else{
                return null
            }
        })
        console.log("answersArray", answersArray)
        // answersArray.map((ans)=> console.log("ans now:", ans))//ans is one persons'one questions' value, no key!!
        let answerStringOranswerArrays= answersArray.map((ans, index)=> formatAnswers(ans, index)); //!!!!!!!!!!!!!!

        console.log("answerStringOranswerArrays:", answerStringOranswerArrays)
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
                    }else{
                        questionList[index].answerOptions.forEach((option)=>{
                            // console.log("optionText:", option.text)
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