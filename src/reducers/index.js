import { combineReducers } from 'redux'
import { MESSAGES_RECEIVED, MESSAGE_STARRED, CLEAR_SELECTED, MESSAGE_MARK_AS_READ, CREATE_MESSAGE, DELETE_MESSAGE, MESSAGE_MARK_AS_UNREAD, MESSAGE_TOGGLE_LABEL, TOGGLE_SELECTED_MESSAGE, TOGGLE_SELECT_ALL_MESSAGES, TOGGLE_FORM } from '../actions'

function messages(state = [], action) {
  switch (action.type) {
    case MESSAGES_RECEIVED:
      if ([...state].length+1 === [...action.messages].length) return [...action.messages];
      return [...state, ...action.messages]
    case MESSAGE_STARRED: {
      let newState = [...state];
      let index = newState.findIndex((msg) => {
        return msg.id === action.id
      });
      newState[index].starred = !newState[index].starred;
      return newState;
    }
    case MESSAGE_MARK_AS_READ: {
      let newState = [...state];
      newState = newState.map(msg => {
        if (action.selected.includes(msg.id)) msg.read = true;
        return msg;
      });
      return newState;
    }
    case MESSAGE_MARK_AS_UNREAD: {
      let newState = [...state];
      newState = newState.map(msg => {
        if (action.selected.includes(msg.id)) msg.read = false;
        return msg;
      });
      return newState;
    }
    case MESSAGE_TOGGLE_LABEL: {
      let newState = [...state];
      newState = newState.map(msg => {
        if (action.selected.includes(msg.id)) {
          if (msg.labels.includes(action.label)) {
            action.command === 'removeLabel' ? msg.labels = [...msg.labels.slice(0, msg.labels.indexOf(action.label)), ...msg.labels.slice(msg.labels.indexOf(action.label)+1)] : console.log('Welp')
          } else {
            action.command === 'addLabel' ? msg.labels = [...msg.labels, action.label] : console.log('Welp')
          }
        }
        return msg;
      });
      return newState;
    }
    case CREATE_MESSAGE: {
      let newState = [...state];
    }
    case DELETE_MESSAGE: {
      let newState = [...state];
      newState = newState.filter(msg => !action.selected.includes(msg.id));
      return newState;
    }
    default:
      return state;
  }
}

function selected(state = [], action) {
  switch(action.type) {
    case TOGGLE_SELECTED_MESSAGE: {
      let newState = [...state];
      if (newState.includes(action.selectedId)) {
        newState.splice(newState.indexOf(action.selectedId), 1);
      } else {
        newState.push(action.selectedId);
      }
      return newState;
    }
    case TOGGLE_SELECT_ALL_MESSAGES: {
      let newState = [...state];
      if (newState.length === action.messages.length) {
        newState = [];
      } else {
        newState = action.messages.map(msg => msg.id);
      }
      return newState;
    }
    case CLEAR_SELECTED: {
      let newState = [];
      return newState;
    }
    default:
      return state;
  }
}

function isFormShown(state = false, action) {
  switch (action.type) {
    case TOGGLE_FORM:
      let newState = state;
      newState = !newState;
      return newState;
    default:
      return state;
  }
}

export default combineReducers({
  messages, selected, isFormShown
})
