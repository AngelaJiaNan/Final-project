import React from 'react';

export default class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    event.preventDefault();
    fetch(`/api/events/${this.props.eventID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data));
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div className='modal-container'>
          <div className='delete-modal'>
            <div className='modal-text'>
              <h2>Are you sure you want to delete this event?</h2>
            </div>
            <div className='event-btn'>
              <button onClick={this.props.modalClose} className='edit-btn' >Cancel</button>
              <button onClick={this.handleDelete} className='delete-btn'>Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
