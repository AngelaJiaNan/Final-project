import React from 'react';

export default class NavBar extends React.Component {
  render() {
    return (
      <>
      <nav onClick={this.handleClick} className='header'>
        <div className="row">
          <div className="col-logo">
            <a>Run With Me</a>
              <i className='fas fa-running' id='running-man'></i>
          </div>
          <div className='col-navitem'>
            <a href= '#Runs'>Runs</a>
            <a href='#Events'>Events</a>
            <a>Sign Out</a>
          </div>
        </div>
      </nav>
      </>
    );
  }
}
