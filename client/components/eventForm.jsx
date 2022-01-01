import React from 'react';
// import PropTypes from 'prop-types';
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
    // '1382 44th ave, sf, ca'
    // now it returns a []
    // [1373, 44th ....]
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
    // console.log('Submitted Values:', this.state);
    //
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
    // this.setState({
    //   title: '',
    //   date: '',
    //   startingtime: '',
    //   address: '',
    //   city: '',
    //   state: ''
    // });
  }

  handleDate(date) {
    console.log(date);
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
    console.log('Map: ', map, maps);
  }

  render() {
    console.log('state:', this.state);
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <div>
        <label>Event Title</label>
        <input
        name="title"
        type="text"
        id="eventTitle"
        value={this.state.title}
        onChange={this.handleChange}/>
        </div>
        <div>
          <label>Pick a Date</label>
          <DatePicker selected={this.state.date}
          onChange={date => this.handleDate(date)}
          isClearable
          placeholderText="I have been cleared!"/>
        </div>
        <div>
          <label>Starting Time</label>
          <input
          name="startingtime"
          type="time"
          id="startingTime"
          value={this.state.startingtime}
          onChange={this.handleChange}/>
        </div>
        <div>
          <label>Pick a Place</label>
          <input
          name="address"
          type="text"
          id="address"
          value={this.state.address}
          onChange={this.handleAddress}/>
        </div>
        <div>
          <label>City</label>
          <input
          name="city"
          type="text"
          id="city"
          value={this.state.city}
          onChange={this.handleCity}/>
        </div>
        <div>
          <label>State</label>
          <input
          name="state"
          type="text"
          id="state"
          value={this.state.state}
          onChange={this.handleState}/>
        </div>
          <div>
            <button type="submit">Create Event</button>
          </div>
      </form>
      <div style={{ height: '50vh', width: '80%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyATRROv2KEQF0wX2e5OPR1CCbNaWFgrpcA' }}
            center={this.state.mapLocation}
            defaultZoom={13}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
            >
          </GoogleMapReact>
      </div>
      </div>
    );
  }
}
