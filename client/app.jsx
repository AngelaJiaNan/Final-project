import React from 'react';
// import Home from './pages/home';
import EventForm from './components/eventForm';
import NotFound from './pages/not-found';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    /**
     * Listen for hash change events on the window object
     * Each time the window.location.hash changes, parse
     * it with the parseRoute() function and update state
     */
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <EventForm/>;
    }
    return <NotFound />;
  }

  render() {
    return (
      <>
      { this.renderPage()}
      </>
    );
  }
}
