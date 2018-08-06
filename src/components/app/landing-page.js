import React from 'react';
// import Register from './register';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './landing-page.css';

import LoginForm from './login-form';
import { STATIC_MEDIA_FOLDER } from '../../config';


export function Landing(props) {
	// If we are logged in redirect straight to the user's dashboard
	if (props.loggedIn) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<section>
			<div className='landing-page section'>
				TableTop MeetUp is a progressive web app designed to help a group of tabletop gamers decide which games to get to the table at their next meetup
			</div>

			<h2>Getting started is easy:</h2>
			
			<div className='getting-started'>
				<h3>Create a new Event</h3>
				<div className='getting-started-blocks'>
					<img alt='Gather Votes'
						title='Gather Votes'
						src={STATIC_MEDIA_FOLDER+'create-event.svg'} />
					<div>
						<p>Set a time</p>
						<p>Set a place</p>
						<p>Invite your Guests</p>
					</div>	
				</div>
			</div>
			<div className='getting-started'>
				<h3>Gather Votes</h3>
				<div className='getting-started-blocks'>
					<img alt='Gather Votes'
						title='Gather Votes'
						src={STATIC_MEDIA_FOLDER+'gather-votes.svg'} />
					<p>Let them tell you which games they are interested in playing</p>
				</div>
			</div>				
			<div className='getting-started'>
				<h3>Get it to the TableTop</h3>
				<div className='getting-started-blocks'>
					<img alt='TableTop Games Playing'
						title='TableTop Games Playing'
						src={STATIC_MEDIA_FOLDER+'tabletop.svg'} />
					<p>With less time deciding, and more time playing</p>
				</div>				
			</div>
			<div className='landing-page section'>
				<h2>Give it a Go</h2>
			</div>
			<div className='landing-page-begin'>	
				<p>
					<button>
						<Link to='/register'>Register</Link>
					</button> for an account and start planning your next TableTop MeetUp now
				</p>
				<p>
					<button>
						<Link to='/demo'>Demo</Link>
					</button> TableTop MeetUp to explore
				</p>

			</div>	
			<LoginForm />
		</section>
	);
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Landing);