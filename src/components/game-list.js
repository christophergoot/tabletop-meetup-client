import React from 'react';
import GameBoxtop from './game-boxtop';
import './game-list.css';

export default function GameList(props) {
	const { collection } = props;
	const gameList = collection.filter(game => game.owned && !game.isExpansion);
	const cards = gameList.map((game, index) => {
		return (
			<GameBoxtop game={game} key={index+1} />
		);
	});

	return (
		<div className="game-list">
			{cards}
		</div>
	);
}