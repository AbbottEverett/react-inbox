import React, { Component } from 'react';
import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: [
        { isRead: false, isSelected: false, isStarred: false, labels: [], messageText: 'Here is some message text that has a bunch of stuff' },
        { isRead: false, isSelected: false, isStarred: false, labels: [], messageText: 'Here is some message text that has a bunch of stuff2' }
      ]
    };
  }

  updateMessageList = (message, i) => {
    let newMessagesList = [...this.state.messages];
    if (!message.deleted) {
      const newMessage = { isRead: message.isRead, isSelected: message.isSelected, isStarred: message.isStarred, labels: message.labels, messageText: message.messageText}
      newMessagesList[i] = newMessage;
    } else {
      newMessagesList.splice(i, 1);
    }
    this.setState({ messages: newMessagesList });
  }

  render() {
    return (
      <div className="container">
        <Toolbar messages={this.state.messages} updateMessageList={this.updateMessageList} />
        <MessageList messages={this.state.messages} updateMessageList={this.updateMessageList} />
      </div>
    );
  }
}

export default App;
