import React from 'react';
import GoogleMapReact from 'google-map-react';

export default class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null
    };
  }

  componentDidMount() {
    fetch(`/api/events/${this.props.eventID}`)
      .then(res => res.json())
      .then(data => this.setState({ event: data }));
  }

  render() {
    // console.log(this.state.event);
    if (!this.state.event) return null;
    const { title, date, startingtime, address, city, state, lat, lng } = this.state.event;
    console.log(this.state);
    const modlat = parseInt(lat);
    const modlng = parseInt(lng);
    const mapCoordinates = { lat: modlat, lng: modlng };
    const modDate = date.split('T')[0];
    const modAddress = address.split('+').join(' ');
    const modCity = city.split('+').join(' ');
    const cityState = `${modCity}, ${state}`;

    return (
      <div className='eventdetail-container'>
          <a className='backbtn' href="#">
          &lt; Back to event
          </a>
        <div className='event-infor'>
          <div className='event-title'>
            <h2>{title}</h2>
          </div>
          <div className='event-content'>
            <p>Date: {modDate}</p>
            <p>Time: {startingtime}</p>
            <p>Address: {modAddress}</p>
            <p>{cityState}</p>
          </div>
          <div style={{ height: '40vh', width: '40%', padding: '10px', margin: 'auto' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyATRROv2KEQF0wX2e5OPR1CCbNaWFgrpcA' }}
            center={mapCoordinates}
            defaultZoom={10}
          >
          </GoogleMapReact>
          </div>
          </div>
          <div className='submit-btn'>
        <button id='edit-btn'>Edit Events</button>
        </div>
      </div>
    );
  }
}
