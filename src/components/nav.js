import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css'

export default function Nav(props) {
	const onClick = e => {
		e.preventDefault();
		console.log('logging out');
	};
	return (
		<nav>
			<ul>
				<li><Link to="/events">My Events</Link></li>
				<li><Link to="/games">My Games</Link></li>
				<li><a onClick={e => onClick(e)}>Logout</a></li>
			</ul>
		</nav>
	);
};