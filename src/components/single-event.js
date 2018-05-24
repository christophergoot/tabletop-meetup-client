import React from 'react';
import ListEvent from './list-event';
import EventGameList from './event-game-list';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions/events';

export class SingleEvent extends React.Component {
	componentDidMount() {
		this.props.dispatch(fetchEvents());
	}
	render() {
		const { eventId } = this.props.match.params;
		let thisEvent = this.props.events[0];
		if (this.props.events[0].eventId !== '') thisEvent = this.props.events.find(event => event.eventId === eventId);
		// let games = thisEvent.games;

		
		return (
			<div>
				<ListEvent event={thisEvent} />
				<h2>Games on deck</h2>
				<EventGameList eventId={eventId} games={thisEvent.games} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return ({
		user: state.auth.currentUser,
		events: state.events.list,
	});
};

export default connect(mapStateToProps)(SingleEvent);