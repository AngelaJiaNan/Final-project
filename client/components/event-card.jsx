import React from 'react';

export default class EventCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => console.log(data));
  }

  render() {
    return (
      <div>
    <h1>hello new page</h1>
    <h2>Date</h2>
      </div>
    );
  }
}
