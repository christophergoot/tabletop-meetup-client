import React from 'react';
import { Link } from 'react-router-dom';

export default function GameListSummary(props) {
	const { games } = props.collection;
	let summary;
	if (games.length>0) {
		const owned = games.filter(g => g.owned).length;
		const wantToPlay = games.filter(g => g.wantToPlay).length;
		summary = (
			<div>
				<p>{owned} games owned</p>
				<p>{wantToPlay} want to play</p>
				<Link to='/games'>Manage Games</Link>
			</div>
		);
	}

	return (
		<div className="dashboard-gamelist-summary">
			{summary}
			<a>AddGame component</a>

		</div>
	);
}