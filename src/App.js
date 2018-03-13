import React, { Component } from 'react';
import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList';

class App extends Component {

  state = { messages: [], selected: [], isFormShown: false };

  componentDidMount = async () => {
    const response = await fetch('http://localhost:8082/api/messages');
    const json = await response.json();
    this.setState({ messages: json._embedded.messages });
  };
  updateStarredMessage = async (id, method, value) => {
    let newMessageList = [...this.state.messages];
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
    newMessageList.forEach(msg => {
      if(msg.id === id) msg.starred = !value;
    });
    this.setState({ messages: newMessageList });
  };
  updateMessageList = async (method, value) => {
    let newMessageList = [...this.state.messages];
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
    for (let i = 0; i < newMessageList.length; i++) {
      let msg = newMessageList[i];
      if (this.state.selected.includes(msg.id)) {
        if (property === 'label') {
          if (msg.labels.includes(value) ){
            if (method === 'removeLabel') msg.labels.splice(msg.labels.indexOf(value), 1);
          } else {
            if (method === 'addLabel') msg.labels.push(value);
          }
        } else if (property === 'read') {
          msg[property] = value;
        } else {
          newMessageList.splice(newMessageList.indexOf(msg), 1);
          i--;
        }
      }
    }
    this.setState({ messages: newMessageList });
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
    let json = await res.json();
    this.componentDidMount();
  };
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
