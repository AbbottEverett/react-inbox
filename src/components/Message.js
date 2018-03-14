import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleSelected, starMessage, toggleLabel } from '../actions'

const Message = ({
  toggleSelected,
  starMessage,
  message,
  read,
  labels,
  starred,
  isSelected
}) => {
  let {id, subject} = message;
  return (
    <div className={"row message " + (read ? "read " : "unread ") + (isSelected ? "selected" : "")}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input onChange={() => toggleSelected(id)} type="checkbox" checked={isSelected ? "checked" : ""}/>
          </div>
          <div className="col-xs-2">
            <i onClick={() => starMessage(id, starred)} className={"star fa " + (starred ? "fa-star" : "fa-star-o")}></i>
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

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleSelected, starMessage, toggleLabel
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);
