import React from 'react';
import GameList from './game-list';
import GameSort from './game-sort';

export default function UserGames() {
	return (
		<section>
			<h1>Game Collection</h1>
			<a href>Add a Game</a>
			<GameSort />
			<GameList />
		</section>
	);
}