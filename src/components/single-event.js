import React from 'react';
import ListEvent from './list-event';
import GameList from './game-list';
import { MOCK_PLAYER_EVENTS, MOCK_PLAYER_COLLECTION } from './mock-data';

export default function SingleEvent(props) {
	const { eventId } = props.match.params;
	// const event = // async to find event
	const event = MOCK_PLAYER_EVENTS.find(event => event.id === eventId);
	const games = MOCK_PLAYER_COLLECTION.filter(game => 
		game.owned &&
		game.yearPublished >= 2015 &&
		game.maxPlayers > 1
	);
	return (
		<div>
			<ListEvent event={event} />
			<h2>Games on deck</h2>
			<GameList collection={games} />
		</div>
	);
}