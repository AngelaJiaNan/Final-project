import React from 'react';
import DatePicker from 'react-datepicker';

export default class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        title: '',
        date: '',
        startingtime: '',
        address: '',
        city: '',
        state: '',
        mapLocation: { }
      }
    };
  }

  componentDidMount() {
    fetch(`/api/events/${this.props.eventID}`)
      .then(res => res.json())
      .then(data => this.setState({ event: data }));
  }

  handleDate(date) {
    this.setState({
      date: date
    });
  }

  render() {
    console.log('edit state: ', this.state.event);

    return (
      <>
        <div className='form-container'>
          <form onSubmit={this.handleSubmit}>
            <div className='form-inputs'>
              <label>Event Title</label>
              <input
                name="title"
                type="text"
                id="eventTitle"
                value={this.state.event.title}
                onChange={this.handleChange} />
            </div>
            <div className='form-inputs'>
              <label>Pick a Date</label>
              <DatePicker selected={this.state.event.date ? new Date(this.state.event.date) : null}
                onChange={date => this.handleDate(date)}
              />
            </div>
            <div className='form-inputs'>
              <label>Starting Time</label>
              <input
                name="startingtime"
                type="time"
                id="startingTime"
                value={this.state.event.startingtime}
                onChange={this.handleChange} />
            </div>
            <div className='form-inputs'>
              <label>Pick a Place</label>
              <input
                name="address"
                type="text"
                id="address"
                value={this.state.event.address}
                onChange={this.handleAddress} />
            </div>
            <div className='form-inputs'>
              <label>City</label>
              <input
                name="city"
                type="text"
                id="city"
                value={this.state.event.city}
                onChange={this.handleCity} />
            </div>
            <div className='form-inputs'>
              <label>State</label>
              <input
                name="state"
                type="text"
                id="state"
                value={this.state.event.state}
                onChange={this.handleState} />
            </div>
            <div className='submit-btn'>
              <button type="submit">Edit Event</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
