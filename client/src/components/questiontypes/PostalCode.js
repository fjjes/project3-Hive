import React, { useEffect, useState, useContext } from "react";
import { AnswerContext } from "../pages/SurveyQuestionPage";

const PostalCode = ({ questionNumber, question }) => {
  const { answers, setAnswers, setIsNextButtonDisabled, setValidationErrorMessage } =
    useContext(AnswerContext);
  const [postalcode, setPostalCode] = useState("");

  const handleChange = (e) => {
    const possibleCode = e.target.value;
    console.log(possibleCode);
    setPostalCode(possibleCode);
    let updateAnswers = { ...answers };
    updateAnswers[questionNumber] = possibleCode;
    setAnswers(updateAnswers);
    if (
        (/^[abceghjklmnprstvxy][0-9][abceghjklmnprstvwxyz]\s?[0-9][abceghjklmnprstvwxyz][0-9]$/i.test(possibleCode) ||
          /^[0-9]{5}(?:-[0-9]{4})?$/.test(possibleCode)) &&
        possibleCode.trim().length > 0
      ) {
      setIsNextButtonDisabled(false);
      setValidationErrorMessage("")
    } else {
      setIsNextButtonDisabled(true);
      setValidationErrorMessage("Please enter a valid postal code.")
    }
  };

  // Check if the postal code is correct and disable next button accordingly, when using back/next buttons
  useEffect(() => {
    const goodPostalCode = (/^[abceghjklmnprstvxy][0-9][abceghjklmnprstvwxyz]\s?[0-9][abceghjklmnprstvwxyz][0-9]$/i.test(answers[questionNumber]) ||
    /^[0-9]{5}(?:-[0-9]{4})?$/.test(answers[questionNumber])) &&
    answers[questionNumber].trim().length > 0

    if(!goodPostalCode) {
      setIsNextButtonDisabled(true);
      setValidationErrorMessage("Please enter a valid postal code.")
    } else if (
      goodPostalCode
    ) {
      setIsNextButtonDisabled(false)
      setValidationErrorMessage("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (answers.length < questionNumber) {
      let updateAnswers = { ...answers };
      updateAnswers[questionNumber] = postalcode;
      setAnswers(updateAnswers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //    /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/ - CA postal code - case sensitive
  // /^[abceghjklmnprstvxy][0-9][abceghjklmnprstvwxyz]\s?[0-9][abceghjklmnprstvwxyz][0-9]$/i - CA postal code adding i at the end makes it insensitive
  //   /^[0-9]{5}(?:-[0-9]{4})?$/ USA postal code
  //     function validateCityOrPostalCode(postalcode) {
  //     return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(postalcode);
  //   }

  //   function(value) {
  //     console.log(value +":"+ validateCityOrPostalCode(value));
  // }
  return (
		<div className="postal-code-question-component user animate__animated animate__fadeIn">
      <p className="question-intro">Question {questionNumber}</p>
        <p className="question-intro">{question}</p>
      <input
        // rows="4"
        // cols="50"
        label="postalcode"
        // value={postalcode}
        value={answers[questionNumber]}
        onChange={handleChange}
        option="Postal Code"
      />
    </div>
  );
};

export default PostalCode;
