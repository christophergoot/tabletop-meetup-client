import React from 'react';
// import CollectionDetails from './collection-details';

import './game-boxtop.css';

export default function GameBoxtop(props) {
	const { gameId, name, thumbnail, yearPublished, averageRating, 
		minPlayers, maxPlayers, playingTime, rank } = props.game;
	const { owners } = props;
	const externalLink = `https://boardgamegeek.com/boardgame/${gameId}/`;
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
			if (minPlayers === 1) return ('1 Player');
			else return (minPlayers + ' Players');
		}
		else return (`${minPlayers} to ${maxPlayers} Players`);
	};
	let ownerReport = '';
	if (owners && owners.length === 1) ownerReport = <span>Owned by {owners}</span>;
	else if (owners && owners.length > 1) {
		ownerReport = 'Owned by ';
		for(let i=0; i<owners.length-1; i++) {
			ownerReport += `${owners[i]} & `;
		}
		ownerReport += owners[owners.length-1];
	}
	let yearReport = '';
	if (yearPublished > 0) yearReport = `(${yearPublished})`;
	let rankReport = '';
	if (rank && rank > 0) rankReport = <span>BGG Rank: {rank}</span>;
	return (
		<div className='game-card' style={divStyle}>
			<h3><a href={externalLink}>{name}</a> {yearReport}</h3>
			{props.listManager}
			{rankReport}
			<span>{averageRating.toFixed(2)} Average Rating</span>
			<span>{playerCount(minPlayers, maxPlayers)}</span>
			<span>{playingTime} Min Playing Time</span>
			{ownerReport}
		</div>
	);
}
