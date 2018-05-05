import React from 'react';
import ListEvent from './list-event';
import EventGameList from './event-game-list';
// import { currentUser } from '~/config';
import { connect } from 'net';

export class SingleEvent extends React.Component {
	constructor(props) {
		super(props);
	};
	render() {
		const { eventId, users } = this.props.match.params.event;
		// TODO mash up individual collections into master game list

		const userList = users;
		const collection = this.props.collections.map(games => games.userId === this.state.user.userId)

		// const event = // async to find event
		const event = this.props.events.find(event => event.id === eventId);
		const games = collection.filter(game =>
			game.owned &&
			game.yearPublished >= 2015 &&
			game.maxPlayers > 1
		);
		return (
			<div>
				<ListEvent event={event} />
				<h2>Games on deck</h2>
				<EventGameList eventId={eventId} />
			</div>
		);
	};
}

const mapStateToProps = state => {
	return ({
		user: this.state.currentUser,
		events: this.state.events,
		collections: this.state.collections
	})
}

export default connect(mapStateToProps)(SingleEvent);