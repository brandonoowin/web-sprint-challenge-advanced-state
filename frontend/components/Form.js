import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'


export function Form(props) {
  const { resetForm, inputChange, setMessage} = props; 


  const onChange = evt => {
    const { id, value } = evt.target;
    inputChange(id, value)
  }

  const onSubmit = evt => {
    evt.preventDefault();
    const newMessage = `Congrats: "${props.newQuestion}" is a great question!`;
    setMessage(newMessage)
    resetForm();
    

  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={props.newQuestion}/>
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={props.newTrueAnswer} />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={props.newFalseAnswer}/>
      <button id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return ({
    newQuestion: state.form.newQuestion,
    newTrueAnswer: state.form.newTrueAnswer, 
    newFalseAnswer: state.form.newFalseAnswer
  })
}
export default connect(mapStateToProps, actionCreators)(Form)
