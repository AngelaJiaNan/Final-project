import React from 'react';
class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {
      user: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.signOut();
  }

  render() {
    return (
      <div>
        <div>
          <a href='#login'>
            <button onClick={this.handleClick}>Sign Out</button>
          </a>
        </div>
      </div>
    );
  }
}
export default Auth;
