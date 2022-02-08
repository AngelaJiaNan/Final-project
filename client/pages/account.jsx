import React from 'react';

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    console.log('props', props);
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

  handleSubmit() {
    event.preventDefault();
    const { action } = this.props;
    fetch(`/api/auth/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = '#';
        } else if (action === 'sign-in') {
          window.localStorage.setItem('token', result.token);
          window.location.hash = 'eventpage';
        }
      })
      .catch(err => console.error(err));

    this.setState({
      username: '',
      password: ''
    });
  }

  handleDemoSubmit(event) {
    event.preventDefault();
    const guestSignIn = {
      username: 'demoUser',
      password: 'temp'
    };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(guestSignIn)
    };
    fetch('/api/auth/sign-in', req)
      .then(res => res.json())
      .then(result => {
        window.localStorage.setItem('token', result.token);
        window.location.hash = 'home-page';
      })
      .catch(err => console.error(err));
  }

  render() {
    const { action } = this.props;
    return (
      <div className='sign-in'>
        <form className='account-form'onSubmit={this.handleSubmit}>
          <div className='account-header'>
            <h2>{action === 'sign-in' ? 'Welcome Back' : 'Create Account'}</h2>
          </div>
          <div className= 'form-inputs'>
            <label>Username</label>
              <input
              name ="username"
              type ="text"
              id ="signup-username"
              value ={this.state.username}
              onChange ={this.handleusername} />
          </div>
          <div className='form-input'>
            <label>Password</label>
              <input
              name="password"
              type="password"
              id="signup-password"
              value={this.state.password}
              onChange ={this.handlepassword} />
          </div>
          <div className='btn-container'>
            <button className='account-btn' type='submit'>
              <a href="sign-up"></a>{action === 'sign-up' ? 'Sign up' : 'Login'}
            </button>
            <button id='demo-login' onClick={this.handleGuestLogin}>Demo</button>
            </div>
            <div className='account-text'><span>
              {action === 'sign-up' ? 'Already a member?' : 'Need an account?'}
            </span>
              <a href={action === 'sign-in' ? '#sign-up' : '#login'} id='login'>
                {action === 'sign-in' ? 'Sign up' : 'Login'}</a>
            </div>
        </form>
      </div>
    );
  }
}
