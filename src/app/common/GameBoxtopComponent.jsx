import React from 'react';
import { STATIC_MEDIA_FOLDER } from '../../config';
import './game-boxtop.css';


export default function GameBoxtop(props) {
	const { gameId, name, thumbnail, yearPublished, averageRating, 
		minPlayers, maxPlayers, playingTime, rank } = props.game;
	const externalLink = `https://boardgamegeek.com/boardgame/${gameId}/`;
	const playerCount = (minPlayers, maxPlayers) => {
		if (minPlayers === maxPlayers) {
			return minPlayers;
		}
		else return (`${minPlayers} - ${maxPlayers}`);
	};

	let yearReport = '';
	if (yearPublished > 0) yearReport = `(${yearPublished})`;
	let rankReport = '';
	if (rank && rank > 0) rankReport = 
		<div className='boxtop-icon'>
			<img src={STATIC_MEDIA_FOLDER+'bgg-rank-icon.png'} 
				alt='Boargamegeek Rank'
				title='Boargamegeek Rank' />
			<p>{rank}</p>
		</div>;

	return (
		<div className='game-card'>
			<div className='boxtop-cover'>
				<img src={thumbnail} 
					alt={'Boxart for '+name}
					title={'Boxart for '+name}/>
			</div>
			<div className='boxtop-vote'>{props.listManager}</div>
			<div className='boxtop-title'>
				<p><a href={externalLink} target='_blank'>
					{name}</a> {yearReport}</p>
			</div>
			<div className='boxtop-deets'>
				{rankReport}
				<div className='boxtop-icon'>
					<img src={STATIC_MEDIA_FOLDER+'rating-icon.png'} 
						alt='Average Rating'
						title='Average Rating' />
					<p>{averageRating.toFixed(2)}</p>
				</div>
				<div className='boxtop-icon'>
					<img src={STATIC_MEDIA_FOLDER+'player-count-icon.png'} 
						alt='Player Count'
						title='Player Count' />
					<p>{playerCount(minPlayers, maxPlayers)}</p>
				</div>
				<div className='boxtop-icon'>
					<img src={STATIC_MEDIA_FOLDER+'game-time-icon.png'} 
						alt='Playing Time'
						title='Playing Time' />
					<p>{playingTime}</p>
				</div>
			</div>
		</div>
	);
}
