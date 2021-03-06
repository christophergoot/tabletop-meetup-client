import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../../app/common/requires-login';
import NewEventForm from '../forms/new-event-form';

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


function mapStateToProps(state) {
	return {
		userId: state.auth.currentUser.userId
	};
}

export default requiresLogin()(connect(mapStateToProps)(CreateNewEvent));