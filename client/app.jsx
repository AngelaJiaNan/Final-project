import React from 'react';
import Listevents from './pages/listevents';
import EventForm from './components/event-form';
import NotFound from './pages/not-found';
import { parseRoute } from './lib';
import NavBar from './components/nav';
import EventDetails from './pages/event-details';
import EditEvent from './pages/edit-event';
import Runninglog from './pages/runninglog';
import Accountinfo from './pages/account-info';
import decodeToken from './lib/decode-token';
import Auth from './pages/auth';
import AppContext from './lib/app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    const token = window.localStorage.getItem('user-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('user-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('');
    this.setState({ user: null });
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
      return <Accountinfo action='sign-in' handleSignIn={this.handleSignIn}/>;
    } else if (route.path === 'sign-up') {
      return <Accountinfo action='sign-up'/>;
    }
    if (route.path === 'auth') {
      return (
        <Auth handleSignOut={this.handleSignOut} user={this.state.user} />
      );
    }
    return <NotFound />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <>
        <NavBar signOut={this.handleSignOut} user={this.state.user} isAuthorizing={this.state.isAuthorizing}/>
        {this.renderPage()}
      </>
      </AppContext.Provider>
    );
  }
}
