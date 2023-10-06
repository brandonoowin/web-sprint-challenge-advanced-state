import React from 'react';
import { connect } from 'react-redux';
import { SET_INFO_MESSAGE } from '../state/action-types';
import { setMessage } from '../state/action-creators';


const Message = (props) => {
  const {initialMessageState} = props;
  console.log(initialMessageState);
  return <div id="message">{initialMessageState}</div>
}

const mapStateToProps = (state) => {
  return({
    initialMessageState: state.infoMessage
  })
}

export default connect(mapStateToProps, {setMessage})(Message); 