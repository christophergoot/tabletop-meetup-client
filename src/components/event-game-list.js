import React from 'react';
import GameBoxtop from './game-boxtop';
import GameFilter from './game-filter';
import GameSort from './game-sort';
import GamesPaginate from './games-paginate';
// import { connect } from 'react-redux';

export default class EventGameList extends React.Component {
	render() {
		const { event } = this.props;
		let gameList = '';
		if (event.games) {
			gameList = event.games.map((game, i) => (<GameBoxtop game={game} key={i} />));
		}
		return (
			<section>
				<h2>Event Game List</h2>
				<GameFilter />
				<GameSort 
					collection={event}
					dispatch={this.props.dispatch} />
				<GamesPaginate 
					collection={event}
					dispatch={this.props.dispatch} />
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