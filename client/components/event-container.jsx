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
    const token = window.localStorage.getItem('user-jwt');
    fetch('/api/events', {
      headers: {
        'X-Access-Token': token
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ events: data });
      });
  }

  render() {
    const events = this.state.events;
    const allEvents = events && events.map(event => (
      <EventCard event={event} key={event.eventID}/>
    ));
    return (
      <ul className='allevents-container'>{allEvents}</ul>
    );
  }
}
