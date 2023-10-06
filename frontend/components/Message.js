import React from 'react';
import { connect } from 'react-redux';


const Message = (props) => {
  const {initialMessageState} = props;
  return <div id="message">{initialMessageState}</div>
}

const mapStateToProps = (state) => {
  return({
    initialMessageState: state.initialMessageState
  })
}

export default connect(mapStateToProps)(Message); 