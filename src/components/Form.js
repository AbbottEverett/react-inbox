import React, { Component } from 'react';

export default class Form extends Component {
  state = { subject: '', body: '' };

  setSubject = (e) => {
    this.setState({ subject: e.target.value });
  }

  setBody = (e) => {
    this.setState({ body: e.target.value });
  }

  composeMessage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.toggleForm();
    this.props.postMessage(this.state);
  }

  render() {
    return (
      <form className="form-horizontal well">
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input onChange={this.setSubject} type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea onChange={this.setBody} name="body" id="body" className="form-control"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input onClick={this.composeMessage} type="submit" value="Send" className="btn btn-primary" />
          </div>
        </div>
      </form>

    );
  }
}
