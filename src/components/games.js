import React from 'react';
import GameList from './game-list';
import GameSort from './game-sort';
import GameFilter from './game-filter';
import { MOCK_USER_GAMES } from './mock-data';


export default function Games(props) {
	return (
		<section>
			<h1>Manage Game List</h1>
			<GameFilter />
			<GameSort />
			<GameList collection={MOCK_USER_GAMES}/>
		</section>
	);
}