import React, { useEffect } from 'react'
import { fetchQuiz, selectAnswer } from '../state/action-creators'
import { connect } from 'react-redux';

const Quiz = props => {
  const {fetchQuiz, initialQuizState, selectAnswer} = props;

  useEffect(() => {
    console.log('Mounted')
    fetchQuiz();
  }, []);

  const handleNewQuizClick = (e) => {
    e.preventDefault();
    fetchQuiz();
  }

  const handleSelectAnswer = (answer) => {
    selectAnswer(answer)
    console.log('selected', selectAnswer(answer))
  }
  console.log(initialQuizState);
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        initialQuizState ? (
          <> 
            <h2>{initialQuizState.question}</h2> 

            <div id="quizAnswers">
              <div className="answer selected">
                {initialQuizState.answers} Should be first answer
                <button onClick={() => handleSelectAnswer('Insert Answer 1 Here')}>
                  SELECTED
                </button>
              </div>

              <div className="answer">
              {initialQuizState.answers} Should be second answer
                <button onClick={() => handleSelectAnswer('Insert Answer 2 Here')}>
                  Select
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" 
            onClick={handleNewQuizClick}
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
    selectedAnswer: state.selectedAnswer
  })
}

export default connect(mapStateToProps, { fetchQuiz, selectAnswer })(Quiz);