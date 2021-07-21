import PostalCode from "../questiontypes/PostalCode";

const PostalCodeOne = ({ questionNumber}) => {
    return (
        <div className="postalCodeone question-component admin-question-component">
          <PostalCode
            question = {'Please enter your Postal Code'}
            questionNumber={questionNumber}
            // texts = {[90210]}
          />
        </div>
    );
}
 
export default PostalCodeOne;