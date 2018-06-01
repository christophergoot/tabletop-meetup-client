import React from 'react';
import './game-ballot.css';

export default class gameBallot extends React.Component{
	render() {
		// const { game } = this.props;
		const votes = [
			{
				field: 'wantToPlay',
				description: 'strongly want to play',
				button: 'Yes'
			},
			{
				field: 'interested',
				description: 'like to play',
				button: 'Maybe'
			},
			{
				field: 'notInterested',
				description: 'not interested',
				button: 'No'
			},
			{
				field: 'hide',
				description: 'never show this game again',
				button: 'Never'
			},
		];

		const voteActions = votes.map((el, i) => {
			return (
				<a 
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
