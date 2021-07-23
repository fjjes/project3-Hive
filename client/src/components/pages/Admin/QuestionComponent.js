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
            {questionType === 'checkbox' && <CheckboxesOne questionNumber={questionNumber}/>}
            {questionType === 'comment' && <CommentOne questionNumber={questionNumber} />}
            {questionType === 'matrix1' && <MatrixOne questionNumber={questionNumber} />}
            {questionType === 'matrix2' && <MatrixTwo questionNumber={questionNumber} />}
            {questionType === 'radio' && <RadioOne questionNumber={questionNumber} />}
            {questionType === 'select' && <SelectOne questionNumber={questionNumber} />}
            {questionType === 'slider' && <SliderTwo questionNumber={questionNumber} />}
            {questionType === 'postal' && <PostalCodeOne questionNumber={questionNumber} />}
        </div>
    )
}

export default QuestionComponent