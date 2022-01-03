import React from 'react';

export default class NavBar extends React.Component {
  render() {
    return (
      <>
      <nav className='header'>
        <div className="row">
          <div className="col-logo">
            <a>Run With Me</a>
              <i className='fas fa-running' id='running-man'></i>
          </div>
          <div className='col-navitem'>
            <a href= '#Runs'>Runs</a>
            <a href='#Create'>Create Events</a>
            <a>Sign In</a>
          </div>
        </div>
      </nav>
      </>
    );
  }
}
