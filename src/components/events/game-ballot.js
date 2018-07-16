import React from 'react';
import './game-ballot.css';

export default class gameBallot extends React.Component{
	render() {
		const { game, eventId, gameVotes, userId, userWantToPlayList } = this.props;
		const votes = [
			{
				field: 'yes',
				description: 'strongly want to play',
				button: 'Want at this Event'
			},
			{
				field: 'wantToPlay',
				description: 'add to Want to Play list',
				button: 'Want to Play'
			},
			{
				field: 'no',
				description: 'not interested',
				button: 'Do Not Want at Event'
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
			let className = '';
			if (userWantToPlayList.includes(game.gameId) && el.field === 'wantToPlay') className = 'selected';
			if (userVote === el.field) className = 'selected';
			return (
				<a className={className}
					onClick={e => this.props.handleVote(e,{
						eventId,
						game,
						vote: el.field
					})}
					key={i}
					alt={el.description} 
					title={el.description}
				>
					{el.button}
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
