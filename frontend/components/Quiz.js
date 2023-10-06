import React, { useEffect } from 'react'
import { fetchQuiz, selectAnswer } from '../state/action-creators'
import { connect } from 'react-redux';

const Quiz = props => {
  const {fetchQuiz, initialQuizState, selectAnswer, initialSelectedAnswerState} = props;

  useEffect(() => {
    console.log('Mounted')
    fetchQuiz();
  }, []);

  const handleNewQuizClick = (e) => {
    e.preventDefault();
    fetchQuiz();
  }

  const handleAnswerSelect = (answer) => {
    //console.log(selectAnswer(answer))
    selectAnswer(answer)
  }


console.log(initialSelectedAnswerState);

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        initialQuizState ? (
          <>
            <h2>{initialQuizState.question}</h2>

            <div id="quizAnswers">
              <div className={`answer ${selectAnswer === initialQuizState.answers ? 'selected' : ''}`}>
                {initialQuizState.answers[0].text}
                <button onClick={() => handleAnswerSelect(initialQuizState.answers[0])}>
                {`${selectAnswer === initialQuizState.answers[0].text ? 'SELECTED' : 'select'}`}
                </button>
              </div>

              <div className={`answer ${selectAnswer === initialQuizState.answers[1] ? 'selected' : ''}`}>
              {initialQuizState.answers[1].text}
                <button onClick={() => handleAnswerSelect(initialQuizState.answers[1])}>
                {`${selectAnswer === initialQuizState.answers[1] ? 'SELECTED' : 'select'}`}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" 
            onClick={handleNewQuizClick}
            disabled={true}
            >Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return ({
    initialQuizState: state.quiz,
    initialSelectedAnswerState: state.selectedAnswer
  })
}

export default connect(mapStateToProps, { fetchQuiz, selectAnswer })(Quiz);