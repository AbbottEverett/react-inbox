import React from 'react';
import Form from './Form';

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
    let idList = [];
    if (checkboxState !== 'fa fa-check-square-o') {
      idList = props.messages.map((msg) => {
        return msg.id;
      });
    }
    props.updateSelectedList(idList, true);
  }
  const markAsRead = () => {
    props.updateMessageList('read', true);
  }
  const markAsUnread = () => {
    props.updateMessageList('read', false);
  }
  const addLabel = (e) => {
    let label = e.target.value;
    props.updateMessageList('addLabel', label);
  }
  const removeLabel = (e) => {
    let label = e.target.value;
    props.updateMessageList('removeLabel', label);
  }
  const deleteSelected = () => {
    props.updateMessageList('delete');
  }

  const unread = props.messages.filter(message => !message.read);
  const selected = props.messages.filter((message) => {
    return props.selected.includes(message.id);
  });
  return (
    <div>
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unread.length}</span>
            unread messages
          </p>
          <a onClick={props.toggleForm} className="btn btn-danger">
            <i className="fa fa-plus"></i>
          </a>

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
      <div className="row">
        {props.isFormShown ? <Form postMessage={props.postMessage} toggleForm={props.toggleForm} /> : ""}
      </div>
    </div>
  );
}

export default Toolbar;
