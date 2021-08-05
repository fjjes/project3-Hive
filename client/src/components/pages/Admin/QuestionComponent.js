import CheckboxesOne from "../../AdminQuestions/CheckboxesOne";
import CommentOne from "../../AdminQuestions/CommentOne";
import MatrixOne from "../../AdminQuestions/MatrixOne";
import MatrixTwo from "../../AdminQuestions/MatrixTwo";
import PostalCodeOne from "../../AdminQuestions/PostalCodeOne";
import RadioOne from "../../AdminQuestions/RadioOne";
import SelectOne from "../../AdminQuestions/SelectOne";
import SliderOne from "../../AdminQuestions/SliderOne";

const QuestionComponent = ({ question, questionNumber }) => {
  let questionType = question?.questionType;
  // let answerOptions= question?.answerOptions;
console.log('question component:', question)
  return (
    <div>
      {questionType === "checkbox" && <CheckboxesOne questionNumber={questionNumber} question={question}  />}
      {questionType === "comment" && <CommentOne questionNumber={questionNumber} question={question} />}
      {questionType === "matrix2" && <MatrixTwo questionNumber={questionNumber} question={question}  />}
      {questionType === "matrix1" && <MatrixOne questionNumber={questionNumber} question={question}  />}
      {questionType === "radio" && <RadioOne questionNumber={questionNumber} question={question}  />}
      {questionType === "select" && <SelectOne questionNumber={questionNumber} question={question}   />}
      {questionType === "slider" && <SliderOne questionNumber={questionNumber} question={question}  />}
      {questionType === "postal" && <PostalCodeOne questionNumber={questionNumber} question={question} />}
    </div>
  );
};

export default QuestionComponent;
