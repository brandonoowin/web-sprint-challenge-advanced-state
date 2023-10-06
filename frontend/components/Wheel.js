import React, {useState} from 'react'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'
import { connect } from 'react-redux';

function Wheel(props) {
  
  const {moveClockwise, moveCounterClockwise, initialWheelState} = props; 
  const [activeCogIndex, setActiveCogIndex] = useState(initialWheelState);

  const handleClockwiseClick = () => {
    moveClockwise();
    setActiveCogIndex((activeCogIndex + 1) % 6);
    
  }

  const handleCounterClockwise = () => {
    moveCounterClockwise();
    setActiveCogIndex((activeCogIndex + 5) % 6);
    
  }

  return (
    <div id="wrapper">
      <div id="wheel">
        <div
          className={`cog ${activeCogIndex === 0 ? 'active' : ''}`}
          style={{ '--i': 0 }}
        >
          {activeCogIndex === 0 && 'B'}
        </div>
        <div
          className={`cog ${activeCogIndex === 1 ? 'active' : ''}`}
          style={{ '--i': 1 }}
        >
          {activeCogIndex === 1 && 'B'}
        </div>
        <div
          className={`cog ${activeCogIndex === 2 ? 'active' : ''}`}
          style={{ '--i': 2 }}
        >
          {activeCogIndex === 2 && 'B'}
        </div>
        <div
          className={`cog ${activeCogIndex === 3 ? 'active' : ''}`}
          style={{ '--i': 3 }}
        >
          {activeCogIndex === 3 && 'B'}
        </div>
        <div
          className={`cog ${activeCogIndex === 4 ? 'active' : ''}`}
          style={{ '--i': 4 }}
        >
          {activeCogIndex === 4 && 'B'}
        </div>
        <div
          className={`cog ${activeCogIndex === 5 ? 'active' : ''}`}
          style={{ '--i': 5 }}
        >
          {activeCogIndex === 5 && 'B'}
        </div>
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleCounterClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={handleClockwiseClick}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    initialWheelState: state.wheel
  }
}


export default connect(mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel);