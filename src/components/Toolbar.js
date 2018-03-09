import React from 'react';

const Toolbar = (props) => {

  const toggleIcon = (selectedList) => {
    if (selectedList.length === props.messages.length) {
      return 'fa fa-check-square-o';
    } else if (selectedList.length > 0) {
      return 'fa fa-minus-square-o';
    } else {
      return 'fa fa-square-o';
    }
  }
  const updateSelectedList = (e) => {
    let checkboxState = e.target.classList.value;
    if (checkboxState === 'fa fa-check-square-o') {
      props.messages.forEach((msg, i) => {
        if (msg.isSelected) {
          msg.isSelected = false;
        }
        props.updateMessageList(msg, i);
      });
    } else {
      props.messages.forEach((msg, i) => {
        if (!msg.isSelected) {
          msg.isSelected = true;
        }
        props.updateMessageList(msg, i);
      });
    }
  }
  const markAsRead = () => {
    props.messages.forEach((msg, i) => {
      if (msg.isSelected) {
        msg.isRead = true;
      }
      props.updateMessageList(msg, i);
    });
  }
  const markAsUnread = () => {
    props.messages.forEach((msg, i) => {
      if (msg.isSelected) {
        msg.isRead = false;
      }
      props.updateMessageList(msg, i);
    });
  }
  const deleteSelected = () => {
    let messageList = props.messages;
    for (let i = 0; i < messageList.length; i++) {
      let msg = messageList[i];
      if (msg.isSelected) {
        msg.deleted = true;
        props.updateMessageList(msg, i);
        messageList.splice(i, 1);
        i--;
      }
    }
  }
  const addLabel = (e) => {
    let label = e.target.value;
    props.messages.forEach((msg, i) => {
      if (msg.isSelected) {
        if (!msg.labels.includes(label)) {
          msg.labels.push(label);
        }
      }
      props.updateMessageList(msg, i);
    });
  }
  const removeLabel = (e) => {
    let label = e.target.value;
    props.messages.forEach((msg, i) => {
      if (msg.isSelected) {
        let index = msg.labels.indexOf(label);
        if (index > -1) {
          msg.labels.splice(index, 1);
        }
      }
      props.updateMessageList(msg, i);
    });
  }
  const unread = props.messages.filter(message => !message.isRead);
  const selected = props.messages.filter(message => message.isSelected);
  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unread.length}</span>
          unread messages
        </p>

        <button onClick={updateSelectedList} className="btn btn-default">
          <i className={toggleIcon(selected)}></i>
        </button>

        <button disabled={selected.length < 1} onClick={markAsRead} className="btn btn-default">
          Mark As Read
        </button>

        <button disabled={selected.length < 1} onClick={markAsUnread} className="btn btn-default">
          Mark As Unread
        </button>

        <select disabled={selected.length < 1} onChange={addLabel} className="form-control label-select">
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select disabled={selected.length < 1} onChange={removeLabel} className="form-control label-select">
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button disabled={selected.length < 1} onClick={deleteSelected} className="btn btn-default">
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
