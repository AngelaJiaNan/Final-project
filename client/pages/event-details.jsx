import React from 'react';

export default class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null
    };
  }

  componentDidMount() {
    console.log('WHAT:', this.props.eventID);
    fetch(`/api/events/${this.props.eventID}`)
      .then(res => res.json())
      .then(data => console.log(data));
  }

  render() {
    return (
      <div className='container'>
        <div className='nav-back'>
          <a href="#">
            <i className="fas fa-angle-double-left"></i>
              <h1>Back to events</h1>
          </a>
        </div>
        <div className='event-infor'>
          <div className='event-title'>
            <h2>Event title</h2>
          </div>
          <div className='event-content'>
            <p>Date:</p>
            <p>Address:</p>
          </div>
        </div>
        <button>Edit Events</button>
      </div>
    );
  }
}
