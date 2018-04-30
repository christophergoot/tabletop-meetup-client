import React from 'react';
import Nav from './nav';
import { Link } from 'react-router-dom';
import './header.css';


export default function Header(props) {
    return (
		<header>
			<h2><Link to="/">Tabletop Meetup</Link></h2>
			<Nav />
		</header>
	);
};