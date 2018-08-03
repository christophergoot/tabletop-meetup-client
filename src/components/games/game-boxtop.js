import React from 'react';
// import CollectionDetails from './collection-details';

import './game-boxtop.css';

export default function GameBoxtop(props) {
	const { gameId, name, thumbnail, yearPublished, averageRating, 
		minPlayers, maxPlayers, playingTime, rank } = props.game;
	const { owners } = props;
	const externalLink = `https://boardgamegeek.com/boardgame/${gameId}/`;
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
		<div className='game-card'>
			<div className='game-card-title'>
				<p><a href={externalLink} target='_blank'>{name}</a> {yearReport}</p>
			</div>
			<div style={{display:'flex'}} >
				<div className='boxtop-img-col'>
					<img src={thumbnail} 
						alt={'Boxart for '+name}
						title={'Boxart for '+name}
						style={{height:'4em',border:'1px solid black',boxShadow:'1px 2px 3px gray',display:'block'}}/>
					{props.listManager}
				</div>
				<div className='boxtop-deets'>
					{rankReport}
					<span>{averageRating.toFixed(2)} Average Rating</span>
					<span>{playerCount(minPlayers, maxPlayers)}</span>
					<span>{playingTime} Min Playing Time</span>
				</div>
			</div>
			<span className='game-owners'>{ownerReport}</span>
		</div>		
	);

	// return (
	// 	<div style={{display:'flex'}}>
	// 		<div style={{flexDirection:'column'}} >
	// 			<img src={thumbnail} style={{height:'4em',border:'1px solid black',boxShadow:'1px 2px 3px gray',display:'block'}}/>
	// 			{props.listManager}
	// 		</div>
	// 		<div>
	// 			<h3><a href={externalLink} target='_blank'>{name}</a> {yearReport}</h3>
	// 			{rankReport}
	// 			<div className='boxtop-deets'>
	// 				<span>{averageRating.toFixed(2)} Average Rating</span>
	// 				<span>{playerCount(minPlayers, maxPlayers)}</span>
	// 				<span>{playingTime} Min Playing Time</span>
	// 			</div>
	// 			{ownerReport}
	// 		</div>
	// 	</div>
	// );


}
