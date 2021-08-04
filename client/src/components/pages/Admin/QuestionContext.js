import React from 'react'


 const QuestionContext = React.createContext({
    questions: [],
    setQuestions: () => {},
  });

export default QuestionContext;