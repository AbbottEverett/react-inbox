import React, { Component } from 'react';
import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList';
import { connect } from 'react-redux';

const App = ({ messages, selected, isFormShown }) => (
  (messages.length) ?
    (
      <div className="container">
        <Toolbar messages={ messages } selected={ selected } isFormShown={ isFormShown } />
        <MessageList messages={ messages } selected={ selected } />
      </div>
    ) :
    (<div>Loading...</div>)
);

const mapStateToProps = (state) => ({
  messages: state.messages,
  selected: state.selected,
  isFormShown: state.isFormShown,
});

const mapDispatchToProps = () => ({});

export default connect( mapStateToProps, mapDispatchToProps)(App);
