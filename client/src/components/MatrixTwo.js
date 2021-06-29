import Matrix from './questiontypes/Matrix'

const MatrixTwo = ({questionNumber}) => {
    return (
        <div>
            <Matrix 
                question={"Please rate the importance of followings from 1 to 10:"}
                questionNumber={questionNumber}
                texts={[
                    {text: "text 1", value: "" },
                    {text: "text 2", value: "" },
                    {text: "text 3",value: ""},
                    {text: "text 4",value: ""},
                    {text: "text 5", value: "" }
                ]}
                columns={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                space1={2} space2={3} space3={8} space4={1}
            />
        </div>
    );
}
 
export default MatrixTwo;