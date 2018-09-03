import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { ReactTooltip } from 'react-tooltip';
import './header.css';


class HeaderComponent extends Component {
	nav = () => {
		if (this.props.loggedIn) { return (
			<nav>
				<ul>
					<li><Link to="/events">My Events</Link></li>
					<li><Link to="/games">My Games</Link></li>
					<li><a onClick={() => this.props.logOut()}>Log out ({this.props.currentUser.displayName})</a></li>
				</ul>
			</nav>
		);} else { return (
			<nav>
				<ul>
					<li><Link to='/login'>Login</Link></li>
					<li><Link to='/register'>Register</Link></li>
					<li><Link to='/demo'>Demo</Link></li>
				</ul>
			</nav>
	
		);}
	}
	
	render() {
		return (
			<header>
				<h1><Link to="/">TableTop MeetUp</Link></h1>
				<this.nav />
			</header>
		);
	}
}

HeaderComponent.propTypes = {
	logOut: PropTypes.func,
	loggedIn: PropTypes.bool
};

export default HeaderComponent;