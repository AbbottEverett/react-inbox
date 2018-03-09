import React from 'react';

const Message = (props) => {

  const toggleSelected = () => {
    let newState = {...props};
    newState.isSelected = !newState.isSelected;
    props.updateMessageList(newState, newState.value);
  }

  const toggleStarred = () => {
    let newState = {...props};
    newState.isStarred = !newState.isStarred;
    props.updateMessageList(newState, newState.value);
  }


  let {isRead, isSelected, isStarred, labels, messageText} = props;
  return (
    <div className={"row message " + (isRead ? "read " : "unread ") + (isSelected ? "selected" : "")}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input onChange={toggleSelected} type="checkbox" checked={isSelected ? "checked" : ""}/>
          </div>
          <div className="col-xs-2">
            <i onClick={toggleStarred} className={"star fa " + (isStarred ? "fa-star" : "fa-star-o")}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {labels.map(label => <span className="label label-warning">{label}</span>)}
        <a href="#">
          {messageText}
        </a>
      </div>
    </div>
  );

}

export default Message;
