import React from 'react';
import DatePicker from 'react-datepicker';
import { Loader } from '@googlemaps/js-api-loader';
import GoogleMapReact from 'google-map-react';
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
      state: '',
      mapLocation: { lat: 34, lng: -118 }
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
    const geoAddress = address.split(' ').join('+');
    // console.log(geoAddress);
    this.setState({ address: geoAddress });
  }

  handleCity(event) {
    const city = event.target.value;
    const geoCity = city.split(' ').join('+');
    // console.log('ADDRESSSTATE:', geoCity);
    this.setState({ city: geoCity });
  }

  handleState(event) {
    const state = event.target.value;
    this.setState({ state: state });
  }

  handleSubmit(event) {
    event.preventDefault();
    const geolocation = `${this.state.address}, +${this.state.city}, +${this.state.state} `;
    // console.log('GEOLOCATION:', geolocation);
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${geolocation}&key=AIzaSyATRROv2KEQF0wX2e5OPR1CCbNaWFgrpcA`)
      .then(response => response.json()).then(data => data.results[0].geometry.location).then(geoLatlon => {
        this.setState({ mapLocation: geoLatlon });
        fetch('/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...this.state, ...geoLatlon })
        });
      }
      )
      // .then(response => response.json())
      .then(() => { location.hash = '#'; });
  }

  handleDate(date) {
    // console.log(date);
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
    // console.log('Map: ', map, maps);
  }

  render() {
    // console.log('state:', this.state);
    return (
      <>
      <div className='header'>
        <h2>Run With Me</h2>
          <i className='fas fa-running' id='running-man'></i>
      </div>
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-inputs'>
            <label>Event Title</label>
              <input
              name="title"
              type="text"
              id="eventTitle"
              value={this.state.title}
              onChange={this.handleChange}/>
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
              onChange={this.handleChange}/>
          </div>
          <div className='form-inputs'>
            <label>Pick a Place</label>
              <input
              name="address"
              type="text"
              id="address"
              value={this.state.address}
              onChange={this.handleAddress}/>
          </div>
          <div className='form-inputs'>
            <label>City</label>
              <input
              name="city"
              type="text"
              id="city"
              value={this.state.city}
              onChange={this.handleCity}/>
          </div>
          <div className='form-inputs'>
            <label>State</label>
              <input
              name="state"
              type="text"
              id="state"
              value={this.state.state}
              onChange={this.handleState}/>
          </div>
          <div style={{ height: '50vh', width: '100%', padding: '20px' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyATRROv2KEQF0wX2e5OPR1CCbNaWFgrpcA' }}
              center={this.state.mapLocation}
              defaultZoom={13}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
            >
            </GoogleMapReact>
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
