import React from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './header';
import Landing from './landing-page';
import Games from './games';
import Events from './events';
import SingleEvent from './single-event';
import NewEvent from './new-event';
import Footer from './footer';
import Register from './register';
import {refreshAuthToken} from '../actions/auth';
import Dashboard from './dashboard';
import './app.css';


export class App extends React.Component {
	componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <main>
            <Route exact path="/" component={Landing} />
			<Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/games" component={Games} />
            <Route exact path="/events/new" component={NewEvent} />
            <Route exact path="/event/:eventId" component={SingleEvent} />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
// export default withRouter(connect(mapStateToProps)(App));


export default connect(mapStateToProps)(App);