import React from 'react';
import Message from './Message';

const MessageList = (props) => {
  return (
    <div>
      {props.messages.map((message, i) => {
        return <Message key={i} value={i} updateMessageList={props.updateMessageList} isRead={message.isRead} isSelected={message.isSelected} isStarred={message.isStarred} labels={message.labels} messageText={message.messageText}/>
      })}
    </div>
  );
}

export default MessageList;
