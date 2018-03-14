import React from 'react';
import Message from './Message';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchMessages } from '../actions'

const MessageList = ({messages, selected}) => (
  <div>
    {messages.map((message, i) => {
      let isSelected = false;
      if (selected.includes(message.id)) isSelected = true;
      return <Message key={`Message${i}`} value={message.id} isSelected={isSelected} message={message} read={message.read} labels={message.labels} starred={message.starred} />
    })}
  </div>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMessages
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);
