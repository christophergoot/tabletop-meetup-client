import React from 'react';
import Register from './register';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from './login-form';


export function Landing(props) {
	// If we are logged in redirect straight to the user's dashboard
	if (props.loggedIn) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<section>
			<h2>Introduction</h2>
			<p>Tabletop Meetup is a progressive web app designed to help a group of tabletop gamers decide which games to get to the table at their next meetup</p>

			<h2>Getting started is easy:</h2>
			<ul>
				<li>Create a new Event</li>
				<li>Invite Guests</li>
				<li>Let them tell you which games they are interested in playing</li>
			</ul>
			<h2>Give it a Go</h2>
			<p><Link to='/register'>Register for an account</Link> and start planning your next Tabletop Meetup now</p>
			<LoginForm />
			<Register />
		</section>
	);
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Landing);