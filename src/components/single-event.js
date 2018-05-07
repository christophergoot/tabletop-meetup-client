import React from 'react';
import ListEvent from './list-event';
import EventGameList from './event-game-list';
// import { currentUser } from '~/config';
import { connect } from 'react-redux';

export class SingleEvent extends React.Component {
	render() {
		const { eventId } = this.props.match.params;
		// TODO mash up individual collections into master game list

		// const userList = users;
		const collection = this.props.collections.map(collections => collections.userId === this.props.user)

		// const event = // async to find event
		const event = this.props.events.find(event => event.eventId === eventId);
		const games = collection.filter(game =>
			// game.owned &&
			// game.yearPublished >= 2015 &&
			game.maxPlayers > 1
		);
		return (
			<div>
				<ListEvent event={event} />
				<h2>Games on deck</h2>
				<EventGameList eventId={eventId} games={games} />
			</div>
		);
	};
}

const mapStateToProps = state => {
	return ({
		user: state.currentUser,
		events: state.events,
		collections: state.collections
	})
}

export default connect(mapStateToProps)(SingleEvent);