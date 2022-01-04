import React from 'react';
import EventCard from './event-cards';

export default class EventContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => {
        this.setState({
          events: data
        });
      })
      .catch(err => console.error('Unexpected Error has Occured', err));
  }

  render() {
    const events = this.state.events;
    const allEvents = events.map(event => (
      <EventCard event={event} key={event.eventID}/>
    ));
    return (
      <ul className='allEvents-container'>{allEvents}</ul>
    );
  }
}
