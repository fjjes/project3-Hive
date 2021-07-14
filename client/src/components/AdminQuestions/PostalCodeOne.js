import PostalCode from "../questiontypes/PostalCode";

const PostalCodeOne = ({ questionNumber}) => {
    return (
        <div className="postalCodeone">
          <PostalCode
            question = {'Please enter your Postal Code'}
            questionNumber={questionNumber}
            texts = {[90210]}
          />
        </div>
    );
}
 
export default PostalCodeOne;