import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../../actions/events';
// import './dashboard.css';
import requiresLogin from '../common/requires-login';
import { loadAuthToken } from '../../local-storage';
import DashboardComponent from './DashboardComponent';


function mapStateToProps(state) {
	const { currentUser } = state.auth;
	const authToken = loadAuthToken();

	return {
		userId: state.auth.currentUser.userId,
		username: state.auth.currentUser.username,
		name: `${currentUser.firstName} ${currentUser.lastName}`,
		collection: state.collections.list,
		events: state.events.list,
		authToken
	};
}

class DashboardContainer extends Component {
	componentDidMount() {
		const { userId } = this.props;
		this.props.dispatch(fetchEvents(userId));
	}
	render() {
		return (
			<DashboardComponent 
				collection={this.props.collection}
				events={this.props.events}
			/>
		);
	}
}

export default requiresLogin()(connect(mapStateToProps)(DashboardContainer));