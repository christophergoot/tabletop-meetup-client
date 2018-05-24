import React from 'react';
import { Link } from 'react-router-dom';
import ListEvent from './list-event';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchEvents } from '../actions/events';


export class Events extends React.Component {
	componentDidMount() {
		this.props.dispatch(fetchEvents());
	}
	render() {
		const { events } = this.props;
		const eventList = events.map((event, i) =>
			<ListEvent event={event} key={i} />);
		return (
			<section>
				<h2>List of Events</h2>
				<Link to="events/new">Add New Event</Link>
				{eventList}
			</section>
		);
	}
}

const mapStateToProps = state => {
	return ({
		events: state.events.list
		// events: state.events.list.filter(event => event.guests.userId === state.auth.currentUser.userId)
	});
};

export default requiresLogin()(connect(mapStateToProps)(Events));