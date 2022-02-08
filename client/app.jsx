import React from 'react';
import Listevents from './pages/listevents';
import EventForm from './components/eventForm';
import NotFound from './pages/not-found';
import { parseRoute } from './lib';
import NavBar from './components/navBar';
import EventDetails from './pages/event-details';
import EditEvent from './pages/edit-event';
import Runninglog from './pages/runninglog';
import Account from './pages/account';

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
    if (route.path === 'eventpage') {
      return <Listevents/>;
    }
    if (route.path === 'create') {
      return <EventForm/>;
    }
    if (route.path === 'events') {
      const eventID = route.params.get('eventID');
      return <EventDetails eventID={eventID} />;
    }
    if (route.path === 'edit') {
      const eventID = route.params.get('eventID');
      return <EditEvent eventID={eventID} />;
    }
    if (route.path === 'runs') {
      return <Runninglog/>;
    }
    if (route.path === 'login' || route.path === '') {
      return <Account action="sign-in" />;
    } else if (route.path === 'sign-up') {
      return <Account action='sign-up'/>;
    }
    return <NotFound />;
  }

  render() {
    return (
      <>
      <NavBar/>
      { this.renderPage()}
      </>
    );
  }
}
