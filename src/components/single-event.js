import React from 'react';
import ListEvent from './list-event';
import GameList from './game-list';
import { MOCK_USER_EVENTS, MOCK_USER_GAMES } from './mock-data';

export default function Event(props) {
	const { eventId } = props.match.params;
	// const event = // async to find event
	const event = MOCK_USER_EVENTS.find(event => event.id === eventId);
	const games = MOCK_USER_GAMES.filter(game => 
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