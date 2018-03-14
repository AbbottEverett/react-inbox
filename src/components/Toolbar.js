import React from 'react';
import Form from './Form';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleForm, toggleSelectAllMessages, markAsRead, markAsUnread, toggleLabel, deleteMessage } from '../actions'

const Toolbar = ({
  messages,
  selected,
  isFormShown,
  toggleForm,
  toggleSelectAllMessages,
  markAsRead,
  markAsUnread,
  deleteMessage,
  toggleLabel
}) => {
  const unread = messages.filter(message => !message.read);
  const selectedList = messages.filter(message => selected.includes(message.id));
  const toggleIcon = (selectedList) => {
    if (selectedList.length === messages.length) {
      return 'fa fa-check-square-o';
    } else if (selectedList.length > 0) {
      return 'fa fa-minus-square-o';
    } else {
      return 'fa fa-square-o';
    }
  }
  return (
    <div>
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unread.length}</span>
            unread messages
          </p>

          <a onClick={toggleForm} className="btn btn-danger">
            <i className="fa fa-plus"></i>
          </a>

          <button onClick={() => toggleSelectAllMessages(messages)} className="btn btn-default">
            <i className={toggleIcon(selected)}></i>
          </button>

          <button onClick={() => markAsRead(selected)} disabled={selectedList.length < 1} className="btn btn-default">
            Mark As Read
          </button>

          <button onClick={() => markAsUnread(selected)} disabled={selectedList.length < 1} className="btn btn-default">
            Mark As Unread
          </button>

          <select onChange={(e) => toggleLabel(e.target.value, selected, 'addLabel')} disabled={selectedList.length < 1} className="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select onChange={(e) => toggleLabel(e.target.value, selected, 'removeLabel')} disabled={selectedList.length < 1}  className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button onClick={() => deleteMessage(selected)} disabled={selectedList.length < 1} className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
      <div className="row">
        {isFormShown ? <Form /> : ""}
      </div>
    </div>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleForm, toggleSelectAllMessages, markAsRead, markAsUnread, toggleLabel, deleteMessage
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
