import MatrixNum from '../questiontypes/MatrixNum'

const MatrixTwo = ({questionNumber, onChangedValues}) => {
    return (
        <div>
            <MatrixNum 
                question={"Please rate the importance of followings from 1 to 10:"}
                questionNumber={questionNumber}
                texts={[
                    {text: "text 1"},
                    {text: "text 2"},
                    {text: "text 3"},
                    {text: "text 4"},
                    {text: "text 5"}
                ]}
                onChangedValues={onChangedValues}
            />
        </div>
    );
}
 
export default MatrixTwo;