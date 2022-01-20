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
    fetch('/api/runninglogs')
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
    event.preventDefault();
    fetch(`/api/runninglogs/${runninglogID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
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
                <div className='running-log'>
                  <i onClick={() => this.handleDeleterun(runninglog.runninglogID)} className="far fa-trash-alt"></i>
                    <div className='event-text'>
                      <p>Date: </p>
                      {runninglog.date.split('T')[0]}
                      <p>Duration: </p>
                      {runninglog.duration}
                      <p>Distance: </p>
                      {runninglog.distance}
                    </div>
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
