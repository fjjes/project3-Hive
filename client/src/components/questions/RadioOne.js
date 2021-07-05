import RadioButtons from "../questiontypes/RadioButtons"

const RadioOne = ({questionNumber}) => {
    return (
        <div className="radio-one">
            <RadioButtons
            question={"What is your department or team?"}
            questionNumber={questionNumber}
            texts={[
                'Option1',
                'Option2',
                'Option3',
                'Option4',
                'Option5',
                'Option6',
                'Option7',
                'Option8'
            ]}
            />
        </div>
    );
}
 
export default RadioOne;