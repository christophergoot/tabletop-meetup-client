import React from 'react';
import GameBoxtop from './game-boxtop';
// import { connect } from 'react-redux';

export default class EventGameList extends React.Component {
	render() {
		const { games } = this.props;
		const gameList = games.list.map((game, i) => (<GameBoxtop game={game} key={i} />));
		return (
			<section>
				<h2>Event Game List</h2>
				<span className="game-list">{gameList}</span>
			</section>
		);
	}
}

// const mapStateToProps = state => {
// 	return {
// 		events: state.events,
// 		users: state.users
// 	}
// };

// export default connect(mapStateToProps)(EventGameList);