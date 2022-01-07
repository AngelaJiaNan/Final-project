import React from 'react';

export default class NavBar extends React.Component {
  render() {
    return (
      <>
      <nav className='header'>
        <div className="row">
          <div className='col-logo'>
              <a className='nav-logo' href='#'>Run With Me</a>
              <i className='fas fa-running' id='running-man'></i>
          </div>
          <div className='col-navitem'>
            <a className='nav-items' href= '#runs'>Runs</a>
              <a className='nav-items'href='#create'>Create Events</a>
              <a className='nav-items' href='#'>Sign In
              </a>
          </div>
        </div>
      </nav>
      </>
    );
  }
}
