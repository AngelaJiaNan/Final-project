import React from 'react';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      username: '',
      password: ''
    });
    this.handleusername = this.handleusername.bind(this);
    this.handlepassword = this.handlepassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleusername(event) {
    this.setState({ username: event.target.value });
  }

  handlepassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('STATE:', this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username</label>
              <input
              name ="username"
              type ="text"
              id ="signup-username"
              value ={this.state.username}
              onChange ={this.handleusername} />
          </div>
          <div>
            <label>Password</label>
              <input
              name="password"
              type="password"
              id="signup-password"
              value={this.state.password}
              onChange ={this.handlepassword} />
          </div>
          <div>
            <button>Sign up</button>
          </div>
        </form>
      </div>
    );
  }
}
