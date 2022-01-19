import React from 'react';
import DatePicker from 'react-datepicker';

export default class RunForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      duration: '',
      distance: ''
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

  handleSumbit(event) {
    event.preventDefault();
    console.log('SUMBIT:', this.state.value);

    // const runningData = new FormData();
    // runningData.append('date', this.state.date);
    // runningData.append('duration', this.state.duration);
    // runningData.append('distance', this.state.distance);
    // console.log('RUNNINGLOG:', runningData);
    // fetch('/api/runninglogs', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(this.state)
    // })
    //   .then(response => response.json())
    //   .then(() => {
    //     this.setState({
    //       date: '',
    //       duration: '',
    //       distance: '',
    //       finish: true
    //     });
    //   })
    //   .catch(err => {
    //     throw err;
    //   });
  }

  render() {
    return (
          <div className='form-container'>
            <form onSubmit={this.handleSubmit}>
              <div className='form-inputs'>
                <label>Date</label>
                  <DatePicker selected={this.state.date}
                  onChange={date => this.handleDate(date)}/>
              </div>
              <div className='form-inputs'>
                <label>Duration</label>
                <input
                name="duration"
                type="text"
                id="duration"
                value={this.state.duration}
                onChange={this.handleChange} />
              </div>
              <div className='form-inputs'>
                <label>Distance</label>
                <input
                name="distance"
                type="text"
                id="distance"
                value={this.state.distance}
                onChange={this.handleChange} />
              </div>
              <div className='submit-btn'>
                <button type='submit'>Add Run</button>
              </div>
            </form>
      </div>
    );
  }
}
