import React from 'react';
import { Link } from 'react-router-dom';
import ListEvent from './list-event';
import { connect } from 'react-redux';


export class Events extends React.Component {
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
		events: state.events
	});
}

export default connect(mapStateToProps)(Events);