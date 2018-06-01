import React from 'react';
import GameCard from './game-card';
import './game-list.css';

export default function GameList(props) {
	// const { collection } = props;
	const { games } = props;
	const cards = games.map((game, i) => {
		return (
			<GameCard 
				game={game} 
				key={i} 
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