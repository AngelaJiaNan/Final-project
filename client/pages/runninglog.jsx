import React from 'react';
import RunForm from '../components/run-form';

export default class Runninglog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      runninglogs: null,
      showrunform: false
    };
    this.togglerunform = this.togglerunform.bind(this);
  }

  togglerunform() {
    this.setState({
      showrunform: !this.state.showrunform
    });
  }

  // closerunform() {
  //   this.setState({
  //     showrunform: false
  //   });
  // }

  render() {
    console.log(this.state);
    return (
      <div className="header">
        <h1>All Logged Runs</h1>
        <i onClick={this.togglerunform} className="fas fa-plus-circle"></i>
        {this.state.showrunform && <RunForm />}
      </div>
    );
  }
}
