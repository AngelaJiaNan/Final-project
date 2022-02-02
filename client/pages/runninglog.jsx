import React from 'react';
import RunForm from '../components/run-form';

export default class Runninglog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      runninglogs: [],
      showrunform: false
    };
    this.togglerunform = this.togglerunform.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token');
    fetch('/api/runninglogs', {
      headers: {
        'X-Access-Token': token
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          runninglogs: data
        });
      });
  }

  togglerunform() {
    this.setState({
      showrunform: !this.state.showrunform
    });
  }

  handleDeleterun(runninglogID) {
    const token = window.localStorage.getItem('token');
    event.preventDefault();
    fetch(`/api/runninglogs/${runninglogID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      }
    }).then(response => {
      if (!response.error) {
        const newRunningLogs = this.state.runninglogs.filter(runninglog => runninglog.runninglogID !== runninglogID);
        this.setState({
          runninglogs: newRunningLogs
        });
      }
    });
  }

  render() {
    const listRuns = this.state.runninglogs.map(runninglog => {
      return <div className='event-card' key={runninglog.runninglogID}>
                <div className='delete-run'>
                  <i onClick={() => this.handleDeleterun(runninglog.runninglogID)} className="far fa-trash-alt"></i>
                </div>
                <div className='event-text'>
                  <h2>Date:  {runninglog.date.split('T')[0]}</h2>
                  <h2>Duration: {runninglog.duration} </h2>
                  <h2>Distance:  {runninglog.distance}</h2>
                </div>
            </div>;
    });
    return (
      <div className="running-container">
      <div className="header-runpage">
        <h1>Logged Runs</h1>
        <i onClick={this.togglerunform} className="fas fa-plus-circle" id="new"></i>
          {this.state.showrunform && <RunForm togglerunform={this.togglerunform}/>}
      </div>
      <div>
          <ul className='allevents-container'>{listRuns}</ul>
      </div>
      </div>
    );
  }
}
