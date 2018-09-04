import React from 'react';
import {connect} from 'react-redux';
import { Redirect} from 'react-router-dom';

import LoginForm from '../forms/login-form';



export class Login extends React.Component {
	render() {
		if (this.props.loggedIn) {
			return <Redirect to="/dashboard" />;
		}
		return (
			<div className="home">
				<h2>Login to TableTop MeetUp</h2>
				<LoginForm />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Login);