import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'


export function Form(props) {
  const { resetForm, inputChange, setMessage, postQuiz} = props; 
  const {newQuestion, newTrueAnswer, newFalseAnswer} = props;


  const onChange = evt => {
    const { id, value } = evt.target;
    inputChange(id, value)
  }

  const onSubmit = evt => {
    evt.preventDefault();
    const newMessage = `Congrats: "${newQuestion}" is a great question!`;
    setMessage(newMessage)
    const payload = {
      question_text: newQuestion,
      true_answer_text: newTrueAnswer,
      false_answer_text: newFalseAnswer,
    };

    inputChange("newQuestion", ""); // Clear the input values
    inputChange("newTrueAnswer", "");
    inputChange("newFalseAnswer", "");

    postQuiz(payload)
    

  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={newQuestion}/>
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={newTrueAnswer} />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={newFalseAnswer}/>
      <button id="submitNewQuizBtn" 
        disabled={
          newQuestion.trim().length < 1 ||
          newTrueAnswer.trim().length < 1 ||
          newFalseAnswer.trim().length < 1 }
      >Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return ({
    newQuestion: state.form.newQuestion,
    newTrueAnswer: state.form.newTrueAnswer, 
    newFalseAnswer: state.form.newFalseAnswer
  })
}
export default connect(mapStateToProps, actionCreators)(Form)
