// ***** TO BE DELETED IN THE NEAR FUTURE *****

// import React, { useState, useEffect } from "react";
// import moment from "moment";
// import * as FileSaver from "file-saver";
// import * as XLSX from "xlsx";
// import { Bar, Pie } from "react-chartjs-2";

// const Chart = () => {
//   const [newDataList, setNewDataList] = useState([]);
//   const [surveyList, setSurveyList] = useState([]);
//   const [surveyId, setSurveyId] = useState("6116929db0e7595740e9cda8");

//   const getSurveyList = async () => {
//     let response = await fetch("/api/survey");
//     let data = await response.json();
//     setSurveyList(data);
//   };

//   useEffect(() => {
//     getSurveyList();
//   }, []);

//   useEffect(() => {
//     const getAnswers = async () => {
//       let response = await fetch("/api/answer");
//       let data = await response.json();
//       const filteredData = data.filter((newData) => {
//         return newData.survey?._id === surveyId;
//       });
//       setNewDataList(filteredData);
//     };
//     if (surveyId) {
//       getAnswers();
//     }
//     console.log("surveyId: ", surveyId);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [surveyId]);

//   // const fileType =
//   //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//   // const fileExtension = ".xlsx";

//   // let arr = [];
//   // // let questionNum = 1;
//   // // for (let i = 0; i < newDataList[0]?.survey?.questions.length; i++) {
//   // //   arr.push(questionNum++);
//   // // }

//   let questionList = newDataList[0]?.survey?.questions;

//   const formatAnswers = (ans, i) => {
//     if (ans) {

//       if (typeof ans === "object") {
//         if (questionList[i].questionType === "checkbox") {
//           return ans.options
//             .filter((option) => option.checked)
//             .map((option) => {
//               if (option.value === "Other") {
//                 return ans.other.value;
//               }
//               return option.value;
//             });
//         } else if (questionList[i].questionType === "slider") {
//           return ans;
//         } else {
//           return Object.values(ans).map((value) => formatAnswers(value.value));
//         }
//       }
//       return ans.toString();
//     } else {
//       return null;
//     }
//   };

//   let csvData = [];
//   if (questionList) {
//     csvData = newDataList.map((row, i) => {
//       let record = i + 1;
//       let answeredDate = moment(row.answeredDate).format("MM/DD/yyyy");
//       let csvRow = {
//         Record_Number: record,
//         Answered_date: answeredDate,
//       };
//       let answersArray = questionList.map((question, ind) => {
//         if (row.answers[ind + 1]) {
//           return row.answers[ind + 1];
//         } else {
//           return null;
//         }
//       });

//       let answerStringOranswerArrays = answersArray.map((ans, i) =>
//         formatAnswers(ans, i)
//       );

//       answerStringOranswerArrays.forEach((item, index) => {
//         if (item) {
//           if (typeof item === "string") {
//             csvRow[`Q${index + 1}`] = item;
//           } else if (typeof item === "object") {
//             if (questionList[index].questionType === "checkbox") {
//               for (let ansIndex = 0; ansIndex < 3; ansIndex++) {
//                 if (ansIndex < item.length) {
//                   csvRow[`Q${index + 1}-${ansIndex + 1}`] = item[ansIndex];
//                 } else {
//                   csvRow[`Q${index + 1}-${ansIndex + 1}`] = "";
//                 }
//               }
//             } else if (questionList[index].questionType === "slider") {
//               item.forEach((answer, i) => {
//                 csvRow[
//                   `Q${index + 1}-${questionList[index].answerOptions[i]}`
//                 ] = answer;
//               });
//             } else if (
//               questionList[index].questionType === "select" ||
//               questionList[index].questionType === "matrix1" ||
//               questionList[index].questionType === "matrix2"
//             ) {
//               item.forEach((answer, i) => {
//                 csvRow[
//                   `Q${index + 1}-${questionList[index].answerOptions[i].text}`
//                 ] = answer;
//               });
//             } else {
//               questionList[index].answerOptions.forEach((option) => {
//                 item.forEach((itm) => {
//                   console.log("itm:", itm); //this doesn't show up
//                   csvRow[`Q${index + 1}-${option?.text}`] = itm;
//                 });
//               });
//             }
//           }
//         } else {
//           if (questionList[index].questionType === "checkbox") {
//             for (let ansIndex = 0; ansIndex < 3; ansIndex++) {
//               csvRow[`Q${index + 1}-${ansIndex + 1}`] = "";
//             }
//           }
//         }
//       });
//       return csvRow;
//     });
//     // return csvData
//   }

//   // const exportToCSV = (csvData, fileName) => {
//   //   const ws = XLSX.utils.json_to_sheet(csvData);
//   //   // const merge = [
//   //   //     { s: { r: 0, c: 2 }, e: { r: 0, c: arr.length +1 }},
//   //   //     { s: { r: 0, c: 0 }, e: { r: 2, c: 0 }},
//   //   //     { s: { r: 0, c: 1 }, e: { r: 2, c: 1 }},
//   //   // ]
//   //   // ws["!merges"] = merge;

//   //   //     const range =[
//   //   //         { s: { r: 0, c: 0 }, e: { r: 0, c: arr.length +1 }}
//   //   //     ]
//   //   //    range.s={ font:{bold:true}}

//   //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//   //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//   //   const data = new Blob([excelBuffer], { type: fileType });
//   //   FileSaver.saveAs(data, fileName + fileExtension);
//   // };

//   let q5Array = [];
//   const counts = {};
//   if (csvData.length) {
//     for (let i = 0; i < csvData.length; i++) {
//       let csvObj = csvData[i];
//       let newItem = Object.values(csvObj["Q5"]).join("");
//       q5Array = [...q5Array, newItem];
//       console.log("q5Array (in progress): ", q5Array)
//     }
//     console.log("q5Array (final): ", q5Array)
//     var unique = q5Array.filter((v, i, a) => a.indexOf(v) === i);
//     console.log("unique array (in progress): ", unique)
//     for (const num of q5Array) {
//       counts[num] = counts[num] ? counts[num] +1 : 1;
//     }
//     console.log("Unique array: ", unique)
//     console.log("Unique array length: ", unique.length)
//     console.log("Object.values(counts): ", Object.values(counts))
//   }

//   const data = {
//     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//     // labels: unique,
//     datasets: [
//       {
//         label: "# of Votes",
//         data: Object.values(counts),
//         // data: [12, 19, 2, 3],
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(255, 206, 86, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(153, 102, 255, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//           "rgba(153, 102, 255, 1)",
//           "rgba(255, 159, 64, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     // displayLegend: true,
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//     // maintainAspectRatio: false
//   };
  
//   useEffect(() => {
//     console.log("counts: ", counts)
//   }, [counts])

//   return (
//     <div style={{ width: "600px" }}>
//       <div className="header">
//         <h1 className="title">Charts</h1>
//       </div>
//       <h2>(IN PROGRESS!!!) The Q5 answer array for survey {surveyId}:</h2>
//         <div>
//           <Bar
//             data={data}
//             options={options}
//           />
//           <hr />
//           <Pie data={data} options={options} />
//         </div>
//     </div>
//   );
// };

// export default Chart;
