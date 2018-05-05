import React from 'react';
import GameCard from './game-card';
import './game-list.css';

export default function GameList(props) {
	const { collection } = props;
	const gameList = collection.filter(game => game.owned && !game.isExpansion);
	const cards = gameList.map((game, index) => {
		return (
			<GameCard 
				game={game} 
				key={index} 
				dispatch={props.dispatch}
			/>
		);
	});

	return (
		<div className="game-list">
			{cards}
		</div>
	);
}