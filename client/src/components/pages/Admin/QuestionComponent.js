import CheckboxesOne from "../../AdminQuestions/CheckboxesOne";
import CommentOne from "../../AdminQuestions/CommentOne";
import MatrixOne from "../../AdminQuestions/MatrixOne";
import MatrixTwo from "../../AdminQuestions/MatrixTwo";
import PostalCodeOne from "../../AdminQuestions/PostalCodeOne";
import RadioOne from "../../AdminQuestions/RadioOne";
import SelectOne from "../../AdminQuestions/SelectOne";
import SliderTwo from "../../AdminQuestions/SliderTwo";

const QuestionComponent = ({questionType, questionNumber})=>{

    return(
        <div>
            {questionType === 'checkbox' && <CheckboxesOne questionNumber={questionNumber} questionType={questionType}/>}
            {questionType === 'comment' && <CommentOne questionNumber={questionNumber} questionType={questionType}/>}
            {questionType === 'matrix1' && <MatrixOne questionNumber={questionNumber} questionType={questionType}/>}
            {questionType === 'matrix2' && <MatrixTwo questionNumber={questionNumber} questionType={questionType}/>}
            {questionType === 'radio' && <RadioOne questionNumber={questionNumber} questionType={questionType}/>}
            {questionType === 'select' && <SelectOne questionNumber={questionNumber} questionType={questionType}/>}
            {questionType === 'slider' && <SliderTwo questionNumber={questionNumber} questionType={questionType}/>}
            {questionType === 'postal' && <PostalCodeOne questionNumber={questionNumber} questionType={questionType}/>}
        </div>
    )
}

export default QuestionComponent