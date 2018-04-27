import React from 'react';
import RegistrationForm from './registration-form';

export default function Landing(props) {
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
			<p>Register for an account and start planning your next Tabletop Meetup now</p>
			<RegistrationForm />
		</section>
	);
};