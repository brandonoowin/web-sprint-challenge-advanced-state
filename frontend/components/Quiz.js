import React, { useEffect } from 'react'
import { fetchQuiz } from '../state/action-creators'
import { connect } from 'react-redux';

const Quiz = props => {
  const {fetchQuiz, initialQuizState} = props;

  useEffect(() => {
    console.log('Mounted')
    fetchQuiz();
  }, []);

  const handleNewQuizClick = (e) => {
    e.preventDefault();
    fetchQuiz();
  }
  
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        initialQuizState ? (
          <>
            <h2>{initialQuizState.question}</h2>

            <div id="quizAnswers">
              <div className="answer selected">
                {initialQuizState.answers[0].text}
                <button>
                  SELECTED
                </button>
              </div>

              <div className="answer">
              {initialQuizState.answers[1].text}
                <button>
                  Select
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" 
            onClick={handleNewQuizClick}
            disabled='disabled'
            >Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return ({
    initialQuizState: state.quiz
  })
}

export default connect(mapStateToProps, { fetchQuiz })(Quiz);