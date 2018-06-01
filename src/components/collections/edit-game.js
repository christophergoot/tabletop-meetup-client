import React from 'react';
// import updateGame from '../actions';

export default function EditGame(props) {
	return (
		<div className='game-card'>
			<h2>Edit Game</h2>

			<button onClick={props.cancelEdit}>Cancel</button>
		</div>
	);
}