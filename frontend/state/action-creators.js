// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios';
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_INFO_MESSAGE, SET_SELECTED_ANSWER, INPUT_CHANGE, RESET_FORM } from './action-types';


export function moveClockwise() { 
  return({type: MOVE_CLOCKWISE})
}

export function moveCounterClockwise() {
  return({type: MOVE_COUNTERCLOCKWISE})
 }

export function selectAnswer(answer) { 
  return({type: SET_SELECTED_ANSWER, payload: answer})
}

export function setMessage(message) { 
  return({type: SET_INFO_MESSAGE, payload: message})
}

export function setQuiz(quizData) {
  return({type: SET_QUIZ_INTO_STATE, payload: quizData})
 }

export function inputChange(name, value) { 
  return({type: INPUT_CHANGE, payload: { name, value }})
}

export function resetForm() { 
  return({type: RESET_FORM})
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios.get(`http://localhost:9000/api/quiz/next`)
    .then(res => {
      //console.log(res);
      dispatch({type: SET_QUIZ_INTO_STATE, payload: res.data})
    })
    .catch(err => {
      console.log(err)
    })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}





export function postAnswer(answer) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/answer", answer)
      .then(( res ) => {
        console.log(res);

        dispatch({ type: SET_INFO_MESSAGE, payload: res.data.message });
        // If needed, dispatch the fetching of the next quiz here.
        if (res.data.correct) {
          // If the answer is correct, fetch the next quiz
          fetchNextQuiz(dispatch);
        }
      })
      .catch((err) => {
        console.error("Error posting answer:", err);
        dispatch({ type: SET_INFO_MESSAGE, payload: "Error posting answer" });
      });
  };
}

function fetchNextQuiz(dispatch) {
  console.log("Fetching next quiz..."); // Add this line
  axios
    .get("http://localhost:9000/api/quiz/next")
    .then((res) => {
      console.log("Received next quiz data:", res.data); // Add this line
      dispatch({ type: SET_QUIZ_INTO_STATE, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
}


export function postQuiz(payload) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', payload)
      .then((response) => {
        if (response.status === 201) {
          dispatch({ type: RESET_FORM });
        } else {
          console.error('Unexpected response status:', response.status);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          console.error('Validation error:', error.response.data.reason);
        } else {
          console.error('An error occurred while creating the quiz:', error);
        }
      });
  };
}
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
