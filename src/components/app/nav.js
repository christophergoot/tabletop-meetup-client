import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {clearAuth} from '../../actions/auth';
import {clearAuthToken} from '../../local-storage';
import './nav.css';

export class Nav extends React.Component {

	logOut() {
		this.props.dispatch(clearAuth());
		clearAuthToken();
	}

	render() {
		if (this.props.loggedIn) { return (
			<nav>
				<ul>
					<li><Link to="/events">My Events</Link></li>
					<li><Link to="/games">My Games</Link></li>
					<li><a onClick={() => this.logOut()}>Log out ({this.props.currentUser.displayName})</a></li>
				</ul>
			</nav>
		);} else { return (
			<nav>
				<ul>
					<li><Link to='/'>Login</Link></li>
					<li><Link to='/register'>Register</Link></li>
				</ul>
			</nav>

		);}
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null,
	currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(Nav);