// NOT NEEDED

// // import React, { useState, useEffect } from "react";
// // import { useHistory} from "react-router-dom"
// // import NarrativeOne from "../../AdminQuestions/NarrativeOne";
// // import QuestionComponent from "./QuestionComponent";
// // import * as RiIcons from "react-icons/ri";
// // import * as FaIcons from "react-icons/fa";
// // import * as MdIcons from "react-icons/md";
// // import * as IoIcons from "react-icons/io";
// // import QuestionContext from './QuestionContext'


// // const EditSurvey=({surveyId})=>{
// //     const history = useHistory();
// //     const [newCompany, setNewCompany] = useState();
// //     const [newVersion, setNewVersion] = useState();
// //     const [newSurveyNumber, setNewSurveyNumber]=useState()
// //     const [newNarrative, setNewNarrative] = useState();
// //     const [error, setError] = useState();

// //     const [questions, setQuestions] = useState([]);
// //     const value = { questions, setQuestions };
        
    
// //     useEffect(() => {
// //         const getSurvey = async () => {
// //             let response = await fetch(`/api/survey/${surveyId}`);
// //             let data = await response.json();
// //             console.log('data:', data)
// //             setQuestions(data.questions);
// //             setNewNarrative(data.narrative);
// //             setNewCompany(data.company);
// //             setNewVersion(data.version);
// //             setNewSurveyNumber(data.surveyNumber)
// //         };
// //         getSurvey();
// //     }, [surveyId]);


//     // const addAQuestion = (e) => {
//     //     e.preventDefault();
//     //     const newQuestions = [...questions];
//     // let answerOptions = null 
//     // let question=""
//     // switch (e.target.value) {
//     //   case "radio":
//     //     answerOptions = [
//     //       "Option1",
//     //       "Option2",
//     //       "Option3",
//     //       "Option4",
//     //       "Option5",
//     //     ] 
//     //     question="What is your department or team?"
//     //     break;
//     //     case "checkbox":
//     //     answerOptions = [
//     //       "Option1",
//     //       "Option2",
//     //       "Option3",
//     //       "Option4",
//     //       "Option5",
//     //     ]
//     //     question="Select up to three options:" 
//     //     break;
//     //     case "matrix1":
//     //       answerOptions = [
//     //         { text: "Ability to concentrate" },
//     //         { text: "Ability to conduct telephone conversations" },
//     //         { text: "Ability to find a meeting room within a reasonable timeframe" },
//     //         { text: "Ability to access collaborative spaces for informal exchanges with my colleagues"},
//     //         { text: "Ability to conduct confidential conversations" },
//     //         { text: "Quality of IT and telephone tools (excluding workstations) made available (connection tools and screens in meeting rooms, etc.)"},
//     //         { text: "Ability to work in the office with remote contacts" },
//     //         { text: "Ability to easily switch between face-to-face work and work at home"},
//     //         { text: "Quality of the environment near my workplace (neighborhood, shops, services, restaurants, etc.)"},
//     //       ]
//     //       question="Please indicate for each of the factors below their importance to you in the performance of your work, then your level of satisfaction with these factors in your current work environment:"
//     //       break;
//     //     case "matrix2":
//     //       answerOptions = [
//     //         { text: "text 1" },
//     //         { text: "text 2" },
//     //         { text: "text 3" },
//     //         { text: "text 4" },
//     //         { text: "text 5" }
//     //       ]
//     //       question="Please rate the importance of the following from 1 to 10:"
//     //       break;
//     //     case "comment":
//     //       answerOptions=""
//     //       question="Enter a comment:"
//     //       break;
//     //     case "select":
//     //       answerOptions=[
//     //         { text: "Rethinking workspaces in the company" },
//     //         { text: "Review the organization of meetings Rethinking moments" },
//     //         { text: "Spaces of conviviality" },
//     //         { text: "Do not change anything" },
//     //         { text: "Other" },
//     //       ]
//     //       question="In your opinion, what are the necessary and complementary organizational points for teleworking that should be implemented within the company? Many Answers are possible.\nPlease rank the following in order of interest:"
//     //       break;
//     //     case "postal":
//     //       answerOptions=""
//     //       question="Enter your postal code:"
//     //       break;
//     //     case "slider":
//     //       answerOptions=[
//     //         "Home",
//     //         "Traveling",
//     //         "At the office",
//     //         "In the client's office",
//     //         "Elsewhere",
//     //       ]
//     //       question="Normally, during a regular workweek, what percentage of your time do you work in the following locations? The total of the answers must equal to the sum of 100%."
//     //       break;
//     //     default:
//     //       answerOptions= ""
//     //       question=""
//     //       break;

//     // }
//     // newQuestions.push({
//     //   questionType: e.target.value,
// 		// 	question: question,
// 		// 	answerOptions: answerOptions
      
//     // });
//     // setQuestions(newQuestions);
//     // };

//     // async function onSaveClicked() {
//     //     // let currentDate = new Date();
//     //     let surveyToUpdate = {
//     //       surveyNumber:newSurveyNumber,
//     //       company:newCompany,
//     //       version:newVersion,
//     //       narrative:newNarrative,
//     //       questions:questions,
//     //     //   LastUpdatedDate: currentDate,
//     //     };

//     //     surveyToUpdate.questions.forEach((question,index)=>{
//     //       question.questionNumber= index + 1
//     //     })
    
//     //     console.log("survey:", surveyToUpdate);
//         // try {
//         //   let editResponse = await fetch(`/api/survey/${surveyId}`, {
//         //     method: "PUT",
//         //     headers: { "Content-Type": "application/json" },
//         //     body: JSON.stringify(surveyToUpdate),
//         //   });
//         //   console.log("surveyToUpdate:", surveyToUpdate);
    
//         //   if (editResponse.status !== 200) {
//         //     let errorMessage = await editResponse.text();
//         //     console.log("We have an error: ", errorMessage);
//         //     setError(errorMessage);
//         //   } else if(newCompany=== "" || newVersion==="" || newSurveyNumber===""){
//         //       setError("Make sure the company name, survey version & survey # filled out!")
//         //   }else{
//         //     setError(undefined);
//         //     console.log("edit response is successful");
//         //     history.push("/find-list");
//         //   }
//         // } catch (error) {
//         //   console.log("Fetch failed to reach the server:", error);
//         // }
//         // console.log("surveyNum:", newSurveyNumber,"", "version:", newVersion)
//     }

//     console.log('question 124;', questions)
//     return(
//         <div>
//         {/* TOP PART OF PAGE */}
//         <h2>Edit your survey</h2>
//             <div className="company-and-survey-name-inputs">
//               <div className='col'>
//                 <label>Company Name<span style={{color:"red"}}>*</span>:</label>
//                 <input
//                     name="company"
//                     id="company-name"
//                     className="survey-info"
//                     placeholder="Company name (required)"
//                     value={newCompany}
//                     required
//                     onChange={(e) => setNewCompany(e.target.value)}
//                 />
//               </div>
//               <div className='col'>
//                 <label>Survey Version<span style={{color:"red"}}>*</span>:</label>
//                 <input
//                     name="version"
//                     id="survey-name"
//                     className="survey-info"
//                     placeholder="Survey version (required)"
//                     value={newVersion}
//                     required
//                     onChange={(e) => setNewVersion(e.target.value)}
//                 />
//               </div>
//               <div className='col'>
//                 <label>Survey No:<span style={{color:"red"}}>*</span>:</label>
//                 <input
//                     name="surveyNumber"
//                     id="survey-number"
//                     className="survey-info"
//                     placeholder="Enter a Number (required)"
//                     value={newSurveyNumber}
//                     required
//                     onChange={(e) => setNewSurveyNumber(e.target.value)}
//                 />
//               </div>
//             </div>
         
  
//         {/* LEFT PART OF PAGE */}
//         <div className="survey-selection-container">
//           <div className="survey-selection-sidebar">
//             <button value="checkbox" onClick={addAQuestion}>
//             <span className='icons'><RiIcons.RiCheckboxMultipleLine/></span>Checkbox
//             </button>
//             <button value="comment" onClick={addAQuestion}>
//             <span className='icons'><FaIcons.FaRegCommentDots/></span>Comment
//             </button>
//             <button value="matrix1" onClick={addAQuestion}>
//             <span className='icons'><FaIcons.FaListUl/></span>Matrix
//             </button>
//             <button value="matrix2" onClick={addAQuestion}>
//             <span className='icons'><FaIcons.FaListOl/></span>Matrix-Num
//             </button>
//             <button value="radio" onClick={addAQuestion}>
//             <span className='icons'><RiIcons.RiRadioButtonLine/></span>RadioButton
//             </button>
//             <button value="postal" onClick={addAQuestion}>
//             <span className='icons'><MdIcons.MdLocalPostOffice/></span>PostalCode
//             </button>
//             <button value="select" onClick={addAQuestion}>
//             <span className='icons'><IoIcons.IoMdArrowDropdown/></span>Select
//             </button>
//             <button value="slider" onClick={addAQuestion}>
//             <span className='icons'><FaIcons.FaSlidersH/></span>Slider
//             </button>
//           </div>
  
//           {/* RIGHT PART OF PAGE */}
//           <div className="survey-selected-components">
//             <div className="survey-selected-components-background">
//               {/* Displays the question components that have been selected */}
//               <NarrativeOne
//                 narrative={newNarrative}
//                 updateNarrative={(narrative) => setNewNarrative(narrative)}
//               />
//             </div>
//             <QuestionContext.Provider value={value}>
//               {questions.map((questionBlock, index) => (
//                 <div key={index}>
//                   <QuestionComponent
//                     question={questionBlock}
//                     questionNumber={index + 1}
                    
//                   />
//                 </div>
//               ))}
//             </QuestionContext.Provider>
//           </div>
//         </div>
  
//         {/* BOTTOM PART OF PAGE */}
//         <div className="dividerLine"></div>
//         <div className="save-survey-button-and-link">
//           {error &&
//             <div>
//               <p style={{ color: "red", fontSize: "1rem" }}>{error}</p>
//             </div>
//           }
//           <button type="submit" className="save-survey-button" onClick={onSaveClicked}>Save Survey </button>
  
//         </div>
//       </div>
//     )
// }

// export default EditSurvey;