import React from 'react';
import {connect} from 'react-redux';
import { Redirect} from 'react-router-dom';

import RegistrationForm from './registration-form';

export function Register(props) {
	// redirect to dashboard if logged in
	if (props.loggedIn) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<div className="home">
			<h2>Register for TableTop MeetUp</h2>
			<RegistrationForm />
		</div>
	);
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Register);