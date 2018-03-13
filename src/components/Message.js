import React from 'react';

const Message = (props) => {

  const toggleSelected = () => {
    props.updateSelectedList([props.value]);
  }

  const toggleStarred = () => {
    props.updateStarredMessage(props.value, 'star', props.starred);
  }


  let {read, selected, starred, labels, subject} = props;
  return (
    <div className={"row message " + (read ? "read " : "unread ") + (selected ? "selected" : "")}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input onChange={toggleSelected} type="checkbox" checked={selected ? "checked" : ""}/>
          </div>
          <div className="col-xs-2">
            <i onClick={toggleStarred} className={"star fa " + (starred ? "fa-star" : "fa-star-o")}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {labels.map((label, i)=> <span key={`Label${i}`} className="label label-warning">{label}</span>)}
        <a href="#">
          {subject}
        </a>
      </div>
    </div>
  );

}

export default Message;
