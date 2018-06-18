import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../app/requires-login';
import NewEventForm from './new-event-form';

function mapStateToProps(state) {
	return {
		userId: state.auth.currentUser.userId
	};
}

class CreateNewEvent extends Component {
	render() {
		return (
			<main>
				<h2>Create a new Event</h2>
				<NewEventForm />
			</main>
		);
	}
}

export default requiresLogin()(connect(mapStateToProps)(CreateNewEvent));