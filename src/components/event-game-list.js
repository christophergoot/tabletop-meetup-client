import React from 'react';
import { connect } from 'react-redux';

export class EventGameList extends React.Component {
	render() {
		const event = this.props.events.find(event => event.id === this.props.eventId);
		return (
			<section>
				<h2>Event Game List</h2>
				{JSON.stringify(event)}
			</section>
		);
	};
}

const mapStateToProps = state => {
	return {
		events: state.events,
		users: state.users
	}
};

export default connect(mapStateToProps)(EventGameList);