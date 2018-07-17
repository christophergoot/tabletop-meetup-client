import React from 'react';
import './game-ballot.css';

export default class gameBallot extends React.Component{
	render() {
		const { game, eventId, gameVotes, userId, userWantToPlayList } = this.props;
		const votes = [
			{
				field: 'yes',
				description: 'strongly want to play at this event',
				selectedDescription: 'retract vote',
				button: 'Want at this Event',
				icon: '👍',
				src: 'http://localhost:3000/media/thumbs-up.svg'
			},
			{
				field: 'wantToPlay',
				description: 'add to Want to Play list',
				selectedDescription: 'remove from Want to Play List',
				button: 'Want to Play',
				icon: '☑',
				src: 'http://localhost:3000/media/thumbs-middle.svg'
			},
			{
				field: 'no',
				description: 'not interested in playing at this event',
				selectedDescription: 'retract vote',
				button: 'Do Not Want at Event',
				icon: '👎',
				src: 'http://localhost:3000/media/thumbs-down.svg'
			},
			// {
			// 	field: 'hide',
			// 	description: 'never show this game again',
			// 	button: 'Never'
			// },
		];

		const currentGameVotes = gameVotes.filter(vote => vote.gameId === game.gameId)[0];
		let userVote;
		['yes','no'].forEach(opt => { 
			if (currentGameVotes && currentGameVotes[opt].includes(userId)) userVote = opt; 
		});

		const voteActions = votes.map((el, i) => {
			let className = '',
				description = el.description;
			if (userWantToPlayList.includes(game.gameId) && el.field === 'wantToPlay') {
				className = 'selected';
				description = el.selectedDescription;
			} 
			if (userVote === el.field) {
				className = 'selected';
				description = el.selectedDescription;
			} 
			return (
				<a 
					className={className}
					// type="image" 
					onClick={e => this.props.handleVote(e,{
						eventId,
						game,
						vote: el.field
					})}
					key={i}
					alt={description} 
					title={description}
				>
					{el.icon}
					{/* <img src={el.src} 
						alt={el.description} 
						// title={el.description}
						style={{
							height: '1em',
							width: '1em'
						}}
					/> */}
				</a>
			);
		});

		return (
			<div className='collection-details game-ballot'>
				{voteActions}
			</div>
		);
	}
}
