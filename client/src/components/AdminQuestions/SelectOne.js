import SelectInput from "../questiontypes/SelectInput";

const SelectOne = ({ questionNumber}) => {
    return (
        <div className="selectOne question-component admin-question-component">
          <SelectInput
            question = {'In your opinion, what are the necessary and complementary organizational points for teleworking that should be implemented within the company? Many Answers are possible.\nPlease rank the following in order of interest:'}
            questionNumber={questionNumber}
            texts = {[
                {text:'Rethinking workspaces in the company'},
                {text:'Review the organization of meetings Rethinking moments'},
                {text:'Spaces of conviviality'},
                {text:'Do not change anything'},
                {text:'Other'}
            ]}
          />
        </div>
    );
}
 
export default SelectOne;

