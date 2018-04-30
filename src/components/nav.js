import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, login } from '../actions/index';
import './nav.css'

export class Nav extends React.Component {
	onClick = e => {
		e.preventDefault();
		if (this.props.loggedIn) {
			console.log('logging out');
			this.props.dispatch(logout());
		} else {
			console.log('loggin in');
			this.props.dispatch(login());
		}
	};
	render() {
		if (this.props.loggedIn) { return (
			<nav>
				<ul>
					<li><Link to="/events">My Events</Link></li>
					<li><Link to="/games">My Games</Link></li>
					<li><a onClick={e => this.onClick(e)}>Logout</a></li>
				</ul>
			</nav>
		)} else { return (
			<nav>
				<ul>
					<li><a onClick={e => this.onClick(e)}>Login</a></li>
				</ul>
			</nav>

		)}
	}
};

const mapStateToProps = state => ({
	loggedIn: state.loggedIn
});

export default connect(mapStateToProps)(Nav);