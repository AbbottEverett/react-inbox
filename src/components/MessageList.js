import React from 'react';
import Message from './Message';

const MessageList = (props) => {
  return (
    <div>
      {props.messages.map((message, i) => {
        let isSelected = false;
        if (props.selected.includes(message.id)) isSelected = true;
        return <Message key={`Message${i}`} value={message.id} updateSelectedList={props.updateSelectedList} updateStarredMessage={props.updateStarredMessage} read={message.read} selected={isSelected} starred={message.starred} labels={message.labels} subject={message.subject}/>
      })}
    </div>
  );
}

export default MessageList;
