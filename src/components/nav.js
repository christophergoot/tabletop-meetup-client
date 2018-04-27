import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css'

export default function Nav(props) {
	return (
		<nav>
			<ul>
				<li><Link to="events">My Events</Link></li>
				<li><Link to="games">My Games</Link></li>
				<li><Link to="logout">Logout</Link></li>
			</ul>
		</nav>
	);
};