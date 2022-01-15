import React from 'react';
import DatePicker from 'react-datepicker';

export default class RunForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      duration: '',
      distance: '',
      startingtime: ''
    };
    this.handleSumbit = this.handleSumbit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  handleDate(date) {
    this.setState({
      date: date
    });
  }

  handleSumbit() {
    event.preventDefault();
  }

  render() {
    // console.log('STATES:', this.state);
    return (
    <>
    <div>
      <div>
        <h1>New Run</h1>
        </div>
        <div>
            <form onSubmit={this.handleSubmit}>
          <div>
            <label>Date</label>
              <DatePicker selected={this.state.date}
                onChange={date => this.handleDate(date)}
              />
          </div>
          <div>
            <label>Duration</label>
            <input
            name="duration"
            type="text"
            id="duration"
            value={this.state.duration}
            onChange={this.handleChange} />
          </div>
          <div>
            <label>Distance</label>
            <input
            name="distance"
            type="text"
            id="distance"
            value={this.state.distance}
            onChange={this.handleChange} />
          </div>
            <div>
              <button type='submit'>Add Run</button>
            </div>
        </form>
      </div>
    </div>
    </>
    );
  }
}
