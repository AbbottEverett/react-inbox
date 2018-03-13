import React, { Component } from 'react';
import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList';

class App extends Component {

  state = { messages: [], selected: [], isFormShown: false };

  componentDidMount = async () => {
    let messagesState = await this.fetchData();
    this.setState({ messages: messagesState });
  };
  updateStarredMessage = async (id, method, value) => {
    let body = {
      messageIds: [id],
      command: method,
    }
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({...body, 'star': !value}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    let messagesState = await this.fetchData();
    this.setState({ messages: messagesState });
  };
  updateMessageList = async (method, value) => {
    let property;
    let body = {
      messageIds: this.state.selected,
      command: method,
    }
    switch(method) {
      case 'read':
        property = 'read';
        break;
      case 'addLabel':
      case 'removeLabel':
        property = 'label';
        break;
      case 'delete':
      default:
        console.log('asfsafdasdf')
    }
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({...body, [property]: value}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    let messagesState = await this.fetchData();
    this.setState({ messages: messagesState });
  };
  updateSelectedList = (array, all) => {
    let newSelected = [...this.state.selected];
    if (all) {
      this.setState({ selected: array });
      return;
    }
    if (newSelected.includes(array[0])) {
      newSelected.splice(newSelected.indexOf(array[0]), 1);
    } else {
      newSelected.push(array[0]);
    }
    this.setState({ selected: newSelected });
  }
  toggleForm = () => {
    this.setState({ isFormShown: !this.state.isFormShown });
  };
  postMessage = async (reqData) => {
    let body = {
      subject: reqData.subject,
      body: reqData.body,
    };
    let res = await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    let messagesState = await this.fetchData();
    this.setState({ messages: messagesState });
  };
  fetchData = async () => {
    const response = await fetch('http://localhost:8082/api/messages');
    const json = await response.json();
    return json._embedded.messages;
  }
  render() {
    return (
      <div className="container">
        <Toolbar messages={this.state.messages} selected={this.state.selected} isFormShown={this.state.isFormShown} updateMessageList={this.updateMessageList} updateSelectedList={this.updateSelectedList} toggleForm={this.toggleForm} postMessage={this.postMessage}/>
        <MessageList messages={this.state.messages} selected={this.state.selected} updateSelectedList={this.updateSelectedList} updateStarredMessage={this.updateStarredMessage} />
      </div>
    );
  }
}

export default App;
