import React from 'react';
// import Register from './register';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './landing-page.css';

import LoginForm from './login-form';


export function Landing(props) {
	// If we are logged in redirect straight to the user's dashboard
	if (props.loggedIn) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<section>
			<div className='landing-page section'>
				Tabletop Meetup is a progressive web app designed to help a group of tabletop gamers decide which games to get to the table at their next meetup
			</div>

			<h2>Getting started is easy:</h2>
			<ul className='landing-page-list'>
				<li>Create a new Event</li>
				<li>Invite Guests</li>
				<li>Let them tell you which games they are interested in playing</li>
			</ul>
			<div className='landing-page section'>
				<h2>Give it a Go</h2>
				<p>
					<button>
						<Link to='/register'>Register</Link>
					</button> for an account and start planning your next Tabletop Meetup now
				</p>
			</div>				<LoginForm />
		</section>
	);
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Landing);