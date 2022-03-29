import React from 'react';
import DatePicker from 'react-datepicker';
import '../../node_modules/react-datepicker/dist/react-datepicker.css';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      startingtime: '',
      address: '',
      city: '',
      state: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleState = this.handleState.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  handleAddress(event) {
    const address = event.target.value;
    this.setState({ address });
  }

  handleCity(event) {
    const city = event.target.value;
    this.setState({ city });
  }

  handleState(event) {
    const state = event.target.value;
    this.setState({ state });
  }

  handleSubmit(event) {
    const token = window.localStorage.getItem('user-jwt');
    event.preventDefault();
    const geolocation = `${this.state.address},%20${this.state.city},%20${this.state.state}`;
    // const geolocation = '2002%20maple%20ave%2C%20costa%20mesa%2C%20ca';
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${geolocation}&key=AIzaSyATRROv2KEQF0wX2e5OPR1CCbNaWFgrpcA`)
      .then(response => response.json()).then(data => data.results[0].geometry.location).then(geoLatlon => {
        this.setState({ mapLocation: geoLatlon });
        fetch('/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Token': token
          },
          body: JSON.stringify({ ...this.state, ...geoLatlon })
        });
      }
      )
      .then(() => { location.hash = '#eventpage'; });
  }

  handleDate(date) {
    this.setState({
      date: date
    });
  }

  handleReset() {
    this.setState({
      title: '',
      date: '',
      startingtime: '',
      address: '',
      city: '',
      state: ''
    });
  }

  handleApiLoaded(map, maps) {
  }

  render() {
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
                value={this.state.title}
                onChange={this.handleChange} />
            </div>
            <div className='form-inputs'>
              <label>Pick a Date</label>
              <DatePicker selected={this.state.date}
                onChange={date => this.handleDate(date)}
              />
            </div>
            <div className='form-inputs'>
              <label>Starting Time</label>
              <input
                name="startingtime"
                type="time"
                id="startingTime"
                value={this.state.startingtime}
                onChange={this.handleChange} />
            </div>
            <div className='form-inputs'>
              <label>Pick a Place</label>
              <input
                name="address"
                type="text"
                id="address"
                value={this.state.address}
                onChange={this.handleAddress} />
            </div>
            <div className='form-inputs'>
              <label>City</label>
              <input
                name="city"
                type="text"
                id="city"
                value={this.state.city}
                onChange={this.handleCity} />
            </div>
            <div className='form-inputs'>
              <label>State</label>
              <input
                name="state"
                type="text"
                id="state"
                value={this.state.state}
                onChange={this.handleState} />
            </div>
            <div className='submit-btn'>
              <button type="submit">Create Event</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
