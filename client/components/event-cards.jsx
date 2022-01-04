import React from 'react';

export default class EventCard extends React.Component {
  render() {
    const { event } = this.props;
    const newDate = event.date.split('T')[0];

    return (
      <div className='event-card'>
        <div className='event-text'>
        <h2>{event.title}</h2>
        <h3>{newDate}</h3>
        </div>
      </div>);
  }
}
