import Matrix from './questiontypes/Matrix'

const MatrixOne = ({questionNumber, onChangedValues}) => {
    return (
        <div>
            <Matrix 
                question={"Please indicate for each of the factors below their importance to you in the performance of your work, then your level of satisfaction with these factors in your current work environment:"}
                questionNumber={questionNumber}
                texts={[
                {text: "Ability to concentrate", value: "" },
                {text: "Ability to conduct telephone conversations", value: "" },
                {text: "Ability to find a meeting room within a reasonable timeframe",value: ""},
                {text: "Ability to access collaborative spaces for informal exchanges with my colleagues",value: ""},
                {text: "Ability to conduct confidential conversations", value: "" },
                {text: "Quality of IT and telephone tools (excluding workstations) made available (connection tools and screens in meeting rooms, etc.)",value: ""},
                {text: "Ability to work in the office with remote contacts", value: "" },
                {text: "Ability to easily switch between face-to-face work and work at home",value: ""},
                {text: "Quality of the environment near my workplace (neighborhood, shops, services, restaurants, etc.)",value: ""}
                ]}
                columns={[
                "Very Satisfied",
                "Satisfied",
                "Neither satisfied nor dissatisfied",
                "Dissatisfied",
                "Very dissatisfied"
                ]}
                onChangedValues={onChangedValues}   //!!!!!!!!!!!!!!!!!!
            />
        </div>
    );
}
 
export default MatrixOne;