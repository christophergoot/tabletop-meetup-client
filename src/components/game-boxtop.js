import React from 'react';
import './game-boxtop.css';

export default function GameBoxtop(props) {
	const { name, thumbnail, yearPublished, averageRating, minPlayers, maxPlayers, playingTime} = props.game;
	const divStyle = {
		background: 
			'linear-gradient(' +
				// 'to bottom, rgba(125,126,125,0.5) 0%,rgba(14,14,14,1) 100%),' + // black gradient
				'to bottom, rgba(256,256,256,0.5) 0%,rgba(256,256,256,1) 100%),' + // white gradient
				'url(' + thumbnail + ')',
		backgroundSize: 'cover',
		backgroundPosition: 'top',
	};
	const playerCount = (minPlayers, maxPlayers) => {
		if (minPlayers === maxPlayers) {
			if (minPlayers === 1) return ('1 Player')
			else return (minPlayers + ' Players')
		}
		else return (`${minPlayers} to ${maxPlayers} Players`)
	};
	return (
		<div className='game-card' style={divStyle}>
			<h3><a href={name}>{name}</a> ({yearPublished})</h3>
			<span>{averageRating.toFixed(2)} Average Rating</span>
			<span>{playerCount(minPlayers, maxPlayers)}</span>
			<span>{playingTime} Min Playing Time</span>
			<span className='game-action'>edit</span>
			<span className='game-action'>remove</span>
		</div>
	);
}