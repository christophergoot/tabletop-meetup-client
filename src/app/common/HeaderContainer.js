import React from 'react';
import './header.css';
// import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { clearAuth } from '../../actions/auth';
import { clearAuthToken } from '../../local-storage';
import HeaderComponent from './HeaderComponent';

export class HeaderContainer extends React.Component {

	logOut = () => {
		this.props.dispatch(clearAuth());
		clearAuthToken();
	}

	render() {
		return (
				<HeaderComponent
					loggedIn={this.props.loggedIn}
					currentUser={this.props.currentUser}
					logOut={this.logOut}
				/>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null,
	currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(HeaderContainer);