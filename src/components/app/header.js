import React from 'react';
import Nav from './nav';
import { Link } from 'react-router-dom';
import './header.css';
import ReactTooltip from 'react-tooltip';


export default function Header() {
	return (
		<header>
			<ReactTooltip />
			<h1><Link to="/">TableTop MeetUp</Link></h1>
			<Nav />
		</header>
	);
}