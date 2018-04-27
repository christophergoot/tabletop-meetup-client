import React from 'react';
import './game-boxtop.css';

export default function GameBoxtop(props) {
	const { name, thumbnail, yearPublished, averageRating, minPlayers, maxPlayers, playingTime} = props.game;
	const divStyle = {
		backgroundImage: 'url(' + thumbnail + ')'
	};
	return (
		<div className='game-card' style={divStyle}>
			<h3><a href={name}>{name}</a> ({yearPublished})</h3>
			<span>{averageRating.toFixed(2)} Average Rating</span>
			<span>{minPlayers} to {maxPlayers} Players</span>
			<span>{playingTime} Min Playing Time</span>
			<span className='game-action'>edit</span>
			<span className='game-action'>remove</span>
		</div>
	);
}