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
    console.log('fetch');
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

    return (
      <div className='eventdetail-container'>
        <div className='nav-back'>
          <a href="#">
            <i className="fas fa-angle-double-left"></i>
              <h1>Take Me back</h1>
          </a>
        </div>
        <div className='event-infor'>
          <div className='event-title'>
            <h2>{title}</h2>
          </div>
          <div className='event-content'>
            <p>Date:{modDate}</p>
            <p>Starting Time:{startingtime}</p>
            <p>Address:{modAddress}</p>
            <p>City:{city}</p>
          </div>
        </div>
        <div style={{ height: '50vh', width: '50%', padding: '20px' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyATRROv2KEQF0wX2e5OPR1CCbNaWFgrpcA' }}
            center={mapCoordinates}
            defaultZoom={10}
          >
          </GoogleMapReact>
        </div>
        <button>Edit Events</button>
      </div>
    );
  }
}
