import React from 'react';
import AppContext from '../lib/app-context';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ isOpen: false });
    this.handleMenuContent = this.handleMenuContent.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuclose = this.handleMenuclose.bind(this);
  }

  handleMenuOpen() {
    this.setState({ isOpen: true });
  }

  handleMenuContent() {
    this.setState({ isOpen: false });
  }

  handleMenuclose() {
    return (this.state.isOpen ? '' : 'hidden');
  }

  render() {
    const hidden = this.handleMenuclose();
    const { user, handleSignOut } = this.context;
    return (
      <div className='row'>
        <div onClick={this.handleMenuOpen} className='icon'>
          <i className='fas fa-running'></i>
        </div>
        <div className='header'>
          <h1>Run With Me</h1>
        </div>
        <div onClick={this.handleMenuContent} className={`container ${hidden}`}>
          <nav className="menu-content">
            <a onClick={this.handleMenuContent} href='#eventpage'>Events</a>
            <a onClick={this.handleMenuContent} href='#runs'>Runs</a>
            <a onClick={this.handleMenuContent} href='#create'>Create Events</a>
            <div>
              {
                user !== null &&
                <a href='#login' onClick={handleSignOut}>Sign out</a>
              }
              {
                user === null &&
                <a href='#login'>Sign In</a>
              }
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
NavBar.contextType = AppContext;
