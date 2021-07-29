import CheckboxesOne from "../../AdminQuestions/CheckboxesOne";
import CommentOne from "../../AdminQuestions/CommentOne";
import MatrixOne from "../../AdminQuestions/MatrixOne";
import MatrixTwo from "../../AdminQuestions/MatrixTwo";
import PostalCodeOne from "../../AdminQuestions/PostalCodeOne";
import RadioOne from "../../AdminQuestions/RadioOne";
import SelectOne from "../../AdminQuestions/SelectOne";
import SliderTwo from "../../AdminQuestions/SliderTwo";

const QuestionComponent = ({ question }) => {
  let questionType = question?.questionType;

  return (
    <div>
      {questionType === "checkbox" && <CheckboxesOne question={question} />}
      {questionType === "comment" && <CommentOne question={question} />}
      {questionType === "matrix2" && <MatrixTwo question={question} />}
      {questionType === "matrix1" && <MatrixOne question={question} />}
      {questionType === "radio" && <RadioOne question={question} />}
      {questionType === "select" && <SelectOne question={question} />}
      {questionType === "slider" && <SliderTwo question={question} />}
      {questionType === "postal" && <PostalCodeOne question={question} />}
    </div>
  );
};

export default QuestionComponent;
