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
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  handleSumbit() {
    event.preventDefault();
  }

  render() {
    return (
    <>
      <div>
        <form>
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
            type="number"
            id="duration"
            value=""
            onChange="" />
          </div>
          <div>
            <label>Distance</label>
            <input
            name="distance"
            type="number"
            id="distance"
            value=""
            onChange="" />
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
            <div>
              <button type='submit'>Add Run</button>
            </div>
        </form>
      </div>
    </>
    );
  }
}
