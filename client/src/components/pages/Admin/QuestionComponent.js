import CheckboxesOne from "../../AdminQuestions/CheckboxesOne";
import CommentOne from "../../AdminQuestions/CommentOne";
import MatrixOne from "../../AdminQuestions/MatrixOne";
import MatrixTwo from "../../AdminQuestions/MatrixTwo";
import PostalCodeOne from "../../AdminQuestions/PostalCodeOne";
import RadioOne from "../../AdminQuestions/RadioOne";
import SelectOne from "../../AdminQuestions/SelectOne";
import SliderOne from "../../AdminQuestions/SliderOne";

const QuestionComponent = ({ question, questionNumber, wholeSurveyInEditModeOrNot, setWholeSurveyInEditModeOrNot }) => {
  let questionType = question?.questionType;
  // let answerOptions= question?.answerOptions;
console.log('question component:', question)
  return (
    <div>
      {questionType === "checkbox" && <CheckboxesOne questionNumber={questionNumber} question={question} wholeSurveyInEditModeOrNot={wholeSurveyInEditModeOrNot} setWholeSurveyInEditModeOrNot={setWholeSurveyInEditModeOrNot} />}
      {questionType === "comment" && <CommentOne questionNumber={questionNumber} question={question} wholeSurveyInEditModeOrNot={wholeSurveyInEditModeOrNot} setWholeSurveyInEditModeOrNot={setWholeSurveyInEditModeOrNot} />}
      {questionType === "matrix2" && <MatrixTwo questionNumber={questionNumber} question={question} wholeSurveyInEditModeOrNot={wholeSurveyInEditModeOrNot} setWholeSurveyInEditModeOrNot={setWholeSurveyInEditModeOrNot} />}
      {questionType === "matrix1" && <MatrixOne questionNumber={questionNumber} question={question} wholeSurveyInEditModeOrNot={wholeSurveyInEditModeOrNot} setWholeSurveyInEditModeOrNot={setWholeSurveyInEditModeOrNot} />}
      {questionType === "radio" && <RadioOne questionNumber={questionNumber} question={question} wholeSurveyInEditModeOrNot={wholeSurveyInEditModeOrNot} setWholeSurveyInEditModeOrNot={setWholeSurveyInEditModeOrNot} />}
      {questionType === "select" && <SelectOne questionNumber={questionNumber} question={question} wholeSurveyInEditModeOrNot={wholeSurveyInEditModeOrNot} setWholeSurveyInEditModeOrNot={setWholeSurveyInEditModeOrNot} />}
      {questionType === "slider" && <SliderOne questionNumber={questionNumber} question={question} wholeSurveyInEditModeOrNot={wholeSurveyInEditModeOrNot} setWholeSurveyInEditModeOrNot={setWholeSurveyInEditModeOrNot} />}
      {questionType === "postal" && <PostalCodeOne questionNumber={questionNumber} question={question} wholeSurveyInEditModeOrNot={wholeSurveyInEditModeOrNot} setWholeSurveyInEditModeOrNot={setWholeSurveyInEditModeOrNot} />}
    </div>
  );
};

export default QuestionComponent;
