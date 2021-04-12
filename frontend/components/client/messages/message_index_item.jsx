import React from 'react';
import EditMessageForm from './edit_message_form'

class MessageIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      content: ""
    }

    this.dismissEditForm = this.dismissEditForm.bind(this);
    this.authorId = this.props.message.author_id;
    this.renderName = this.renderName.bind(this);
    this.userFullName = "placeholderName";
  }

  openEditForm() {
    return this.setState({
      editing: true
    })
  }

  dismissEditForm() {
    this.setState({
      editing: false
    })
  }

  handleDelete(e) {
    e.preventDefault();
    App.cable.subscriptions.subscriptions[0].destroy({
      messageId: this.props.message.id
    });
  }

  // 2021-04-12T02:25:35.121Z
  formatTime(){
    let datetime = this.props.message.created_at;
    let [date, timezone] = datetime.split("T");
    let [time, zone] = timezone.split(".");
    return time;
  }

  renderName() {
    return this.props.fullName
    // // this.user = this.props.requestUser(this.authorId);
    // return this.user.fullName;
  }

  render() {
    console.log("MessageIndexItem#render#this.state", this.state);
    console.log("MessageIndexItem#render#this.props", this.props);
    const editCheck = (this.props.currentUser === this.authorId) && (!this.state.editing);
    const deleteCheck = this.props.currentUser === this.authorId;
    if (this.state.loaded) {
      this.userFullName = this.renderName();
    }

    return (
      <li key={this.props.liKey}>
        {this.state.editing ? <EditMessageForm 
        message={this.props.message} 
          dismiss={this.dismissEditForm} /> : `(${this.formatTime()}) ${this.props.fullName} ${this.props.message.content}`}
        <div ref={this.props.refForDiv} />
        {editCheck ? <button onClick={this.openEditForm.bind(this)}>Edit</button> : null }
        {deleteCheck ? <button onClick={this.handleDelete.bind(this)}>Delete</button> : null}
      </li>
    );
  }
}

export default MessageIndexItem;