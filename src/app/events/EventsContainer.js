import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../common/requires-login';
import { fetchEvents } from '../../actions/events';
import EventsComponent from './EventsComponent';

export class Events extends React.Component {
	componentDidMount() {
		this.props.dispatch(fetchEvents());
	}

	render() {
		return (
			<EventsComponent 
				events={this.props.events}
				userId={this.props.userId}
				isLoading={this.props.isLoading}
				dispatch={this.props.dispatch}
			/>
		);}
}

const mapStateToProps = state => {
	return ({
		events: state.events.list,
		userId: state.auth.currentUser.userId,
		isLoading: state.events.listIsLoading
	});
};

export default requiresLogin()(connect(mapStateToProps)(Events));