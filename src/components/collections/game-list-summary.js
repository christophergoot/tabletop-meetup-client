import React from 'react';
import AddGame from '../games/add-game';
import { Link } from 'react-router-dom';

export default function GameListSummary(props) {
	const { games } = props.collection;
	let summary;
	if (games.length>0) {
		const owned = games.filter(g => g.owned).length || 0;
		const wantToPlay = games.filter(g => g.wantToPlay).length || 0;
		summary = (
			<div>
				<p>{owned} games Owned</p>
				<p>{wantToPlay} Want to Play</p>
			</div>
		);
	}

	return (
		<div className="dashboard-gamelist-summary">
			{summary}
			<button><Link to='/games'>Manage Games</Link></button>
			<AddGame />
		</div>
	);
}