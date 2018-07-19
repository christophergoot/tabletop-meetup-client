import './reset.css';
import 'tachyons/css/tachyons.min.css';
import './app.css';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './header';
import Landing from './landing-page';
import Games from '../collections/games';
import Events from '../events/events';
import SingleEvent from '../events/single-event';
import CreateNewEvent from '../events/create-new-event';
import Footer from './footer';
import Register from './register';
import {refreshAuthToken} from '../../actions/auth';
import Dashboard from './dashboard';
// import 'typeface-roboto';
import { LoginForm } from './login-form';

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

	redirect() {
		if (this.props.redirect) {
			// this.props.dispatch(clearRedirect());
			return <Redirect to={this.props.redirect} />;
		} else return;
	}


	render() {
		return (
			<Router>
				<div className="app">
					<Header />
					{this.redirect()}
					<main>
						<Route exact path="/" component={Landing} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={LoginForm} />
						<Route exact path="/events" component={Events} />
						<Route exact path="/games" component={Games} />
						<Route exact path="/events/new" component={CreateNewEvent} />
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
	loggedIn: state.auth.currentUser !== null,
	redirect: state.events.redirect
});

export default connect(mapStateToProps)(App);