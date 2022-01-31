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
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleState = this.handleState.bind(this);
  }

  componentDidMount() {
    fetch(`/api/events/${this.props.eventID}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ event: data });
      })
      .catch(err => {
        alert('There is a error ' + err);
      });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      event: {
        ...this.state.event,
        [name]: value
      }
    });
  }

  handleDate(date) {
    this.setState({
      event: {
        ...this.state.event,
        date: date
      }
    });
  }

  handleAddress(event) {
    const address = event.target.value;
    const geoAddress = address.split(' ').join('+');
    this.setState({
      event: {
        ...this.state.event,
        address: geoAddress
      }
    });
  }

  handleCity(event) {
    const city = event.target.value;
    const geoCity = city.split(' ').join('+');
    this.setState({
      event: {
        ...this.state.event,
        city: geoCity
      }
    });
  }

  handleState(event) {
    const state = event.target.value;
    this.setState({
      event: {
        ...this.state.event,
        state: state
      }
    });
  }

  handleUpdate(event) {
    event.preventDefault();
    const geolocation = `${this.state.address}, +${this.state.city}, +${this.state.state} `;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${geolocation}&key=AIzaSyATRROv2KEQF0wX2e5OPR1CCbNaWFgrpcA`)
      .then(response => response.json()).then(data => data.results[0].geometry.location).then(geoLatlon => {
        this.setState({ mapLocation: geoLatlon });
        fetch(`/api/events/${this.props.eventID}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...this.state, ...geoLatlon })
        });
      }
      )
      .then(() => {
        location.hash = '#';
      })
      .catch(err => {
        alert('There is a error ' + err);
      });
  }

  render() {
    return (
      <>
        <div className='form-container'>
          <form onSubmit={this.handleUpdate}>
            <div className='form-inputs'>
              <label>Event Title</label>
              <input
                name="title"
                type="text"
                id="eventTitle"
                defaultValue={this.state.event.title}
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
                defaultValue={this.state.event.startingtime}
                onChange={this.handleChange} />
            </div>
            <div className='form-inputs'>
              <label>Pick a Place</label>
              <input
                name="address"
                type="text"
                id="address"
                defaultValue={this.state.event.address}
                onChange={this.handleAddress} />
            </div>
            <div className='form-inputs'>
              <label>City</label>
              <input
                name="city"
                type="text"
                id="city"
                defaultValue={this.state.event.city}
                onChange={this.handleCity} />
            </div>
            <div className='form-inputs'>
              <label>State</label>
              <input
                name="state"
                type="text"
                id="state"
                defaultValue={this.state.event.state}
                onChange={this.handleState} />
            </div>
            <div className='event-btn'>
              <button className='delete-btn'>Cancel</button>
              <button className='edit-btn' type="submit">Create Event</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
