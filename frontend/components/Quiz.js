import React, { useEffect } from 'react'
import { fetchQuiz } from '../state/action-creators'
import { connect } from 'react-redux';

const Quiz = props => {
  const {fetchQuiz, initialQuizState} = props;

  useEffect(() => {
    fetchQuiz();
  }, []);

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
                Inset Answer 1 here
                <button>
                  SELECTED
                </button>
              </div>

              <div className="answer">
              Insert Answer 2 here
                <button>
                  Select
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
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