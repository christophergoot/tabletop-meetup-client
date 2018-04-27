import React from 'react';
import GameList from './game-list';
import GameSort from './game-sort';

export default function UserGames(props) {
    return (
		<section>
			<h1>Manage Game List</h1>
			<a href>Add a Game</a>
			<GameSort />
			<GameList />
		</section>
	);
};