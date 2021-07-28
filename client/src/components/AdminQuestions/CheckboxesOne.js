import React, { useContext, useEffect } from 'react';
import { QuestionContext } from '../pages/Admin/NewSurvey'


function CheckboxesOne({question}) {
  const {questions, setQuestions} = useContext(QuestionContext)
  // const [question, setQuestion]=useState("Select up to three options:")
  const questionText = question.question || "Select up to three options:"
  // const [answerOptions, setAnswerOptions]=useState([
  // //   { checked: false, value: "Option 1" },
  // //   { checked: false, value: "Option 2" },
  // //   { checked: false, value: "Option 3" },
  // //   { checked: false, value: "Option 4" },
  // //   { checked: false, value: "Option 5" },
  // //   { checked: false, value: "Option 6" },
  // //   { checked: false, value: "Option 7" },
  // //   { checked: false, value: "Option 8" },
  // // ])
  const answerOptions = question.answerOptions || 
  [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
    "Option 7",
    "Option 8"]

console.log("answer options: ", answerOptions)
console.log("question: ", question)

  useEffect(()=>{
    const newQuestionList = [...questions]
    console.log('newQuestionList', questions)
    console.log('questionNumber', question.questionNumber)
    newQuestionList[question.questionNumber-1]= {...newQuestionList[question.questionNumber-1],question:questionText, answerOptions} 
    console.log('questions line 23:', newQuestionList )
    setQuestions(newQuestionList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
  
  return (
    <div className="question-component admin-question-component">
      <form className="checkbox-form-control">
        <p className="question-intro">Q{question.questionNumber}.</p><span>
        <p className="question-intro">{questionText}</p></span>
        <div className="checkbox-form-group">
          {answerOptions.map((option, index) => {
            return(<div key={index}>
              <input
                type="checkbox"
                name="option"
                value={option}
              />
              <label
                htmlFor={option}
                key={option}
              >
                {option}
              </label>
            </div>
            )})
        }
        </div>
      </form>
    </div>
  );
}

export default CheckboxesOne;
