import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { STATIC_MEDIA_FOLDER } from '../../config';

class GameBallot extends Component {
	render() {
		const { game, eventId, gameVotes, userId, userWantToPlayList } = this.props;
		const votes = [
			{
				field: 'no',
				description: 'not interested in playing at this event',
				selectedDescription: 'retract vote',
				button: 'Do Not Want at Event',
				icon: '👎',
				src: 'thumbs-down.png',
				class: 'down'
			},
			{
				field: 'wantToPlay',
				description: 'add to Want to Play list',
				selectedDescription: 'remove from Want to Play List',
				button: 'Want to Play',
				icon: '☑',
				src: 'thumbs-middle.png',
				class: 'middle'
			},
			{
				field: 'yes',
				description: 'strongly want to play at this event',
				selectedDescription: 'retract vote',
				button: 'Want at this Event',
				icon: '👍',
				src: 'thumbs-up.png',
				class: 'up'
			}
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
					onClick={e => this.props.handleVote(e,{
						eventId,
						game,
						vote: el.field
					})}
					key={i}
					alt={description} 
					data-tip={description}
				>
					<img src={STATIC_MEDIA_FOLDER + el.src} className={el.class} alt={description}/>
				</a>
			);
		});

		return (
			<div className='game-ballot'>
				{voteActions}
			</div>
		);
	}

}

GameBallot.propTypes = {
	game: PropTypes.object.isRequired, 
	eventId: PropTypes.string.isRequired, 
	gameVotes: PropTypes.array.isRequired, 
	userId: PropTypes.string.isRequired, 
	userWantToPlayList: PropTypes.array.isRequired
};

export default GameBallot;