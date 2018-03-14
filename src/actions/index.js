export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export function fetchMessages() {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8082/api/messages`)
    const json = await response.json()
    dispatch({
      type: MESSAGES_RECEIVED,
      messages: json._embedded.messages
    })
  }
}

export const MESSAGE_STARRED = 'MESSAGE_STARRED';
export function starMessage(id, value) {
  return async (dispatch) => {
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({messageIds: [id], command: 'star', 'star': !value }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    dispatch({
      type: MESSAGE_STARRED,
      id: id
    })
  }
}

export const MESSAGE_MARK_AS_READ = 'MESSAGE_MARK_AS_READ';
export function markAsRead(selected) {
  return async (dispatch) => {
    console.log(selected);
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({messageIds: selected, command: 'read', 'read': true }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    dispatch({
      type: MESSAGE_MARK_AS_READ,
      selected
    })
  }
}

export const MESSAGE_MARK_AS_UNREAD = 'MESSAGE_MARK_AS_UNREAD';
export function markAsUnread(selected) {
  return async (dispatch) => {
    console.log(selected);
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({messageIds: selected, command: 'read', 'read': false }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    dispatch({
      type: MESSAGE_MARK_AS_UNREAD,
      selected
    })
  }
}

export const MESSAGE_TOGGLE_LABEL = 'MESSAGE_TOGGLE_LABEL';
export function toggleLabel(label, selected, command) {
  return async (dispatch) => {
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({messageIds: selected, command, label }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    dispatch({
      type: MESSAGE_TOGGLE_LABEL,
      selected,
      command,
      label
    })
  }
}

export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export function deleteMessage(selected) {
  return async (dispatch) => {
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({messageIds: selected, command: 'delete' }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    dispatch({
      type: DELETE_MESSAGE,
      selected
    })
    dispatch({
      type: CLEAR_SELECTED
    })
  }
}

export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export function createMessage(subject, body) {
  return async (dispatch) => {
    await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(subject, body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    dispatch(fetchMessages());
  }
}

export const TOGGLE_SELECTED_MESSAGE = 'TOGGLE_SELECTED_MESSAGE';
export function toggleSelected(id) {
  return async (dispatch) => {
    dispatch({
      type: TOGGLE_SELECTED_MESSAGE,
      selectedId: id,
    })
  }
}

export const TOGGLE_SELECT_ALL_MESSAGES = 'TOGGLE_SELECT_ALL_MESSAGES';
export function toggleSelectAllMessages(messages) {
  return async (dispatch) => {
    dispatch({
      type: TOGGLE_SELECT_ALL_MESSAGES,
      messages
    })
  }
}

export const TOGGLE_FORM = 'TOGGLE_FORM';
export function toggleForm() {
  return async (dispatch) => {
    dispatch({
      type: TOGGLE_FORM
    })
  }
}

export const CLEAR_SELECTED = 'CLEAR_SELECTED';
