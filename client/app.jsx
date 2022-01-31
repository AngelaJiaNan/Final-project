import React from 'react';
import Home from './pages/home';
import EventForm from './components/eventForm';
import NotFound from './pages/not-found';
import { parseRoute } from './lib';
import NavBar from './components/navBar';
import EventDetails from './pages/event-details';
import EditEvent from './pages/edit-event';
import Runninglog from './pages/runninglog';
import SignUp from './pages/sign-up';

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
      return <Home/>;
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
    if (route.path === 'signup') {
      return <SignUp/>;
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
