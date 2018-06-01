import React from 'react';
import GameBoxtop from '../collections/game-boxtop';
import GameFilter from '../collections/game-filter';
import GameSort from '../collections/game-sort';
import GamesPaginate from '../collections/games-paginate';
import GameBallot from './game-ballot';
import { fetchSingleEvent } from  '../../actions/collections';
// import { connect } from 'react-redux';

export default class EventGameList extends React.Component {

	updateList = (limit,page,sort,filter) => {
		this.props.dispatch(fetchSingleEvent(this.props.event.eventId, limit, page, sort, filter))
	}

	render() {
		const { event } = this.props;
		let gameList = '';
		if (event.games) {
			gameList = event.games.map((game, i) => {
				return (
					<GameBoxtop
						listManager={<GameBallot game={game} />}
						game={game} 
						key={i} />
				);
			});
		}
		return (
			<section>
				<h2>Event Game List</h2>
				<GameFilter />
				<GameSort 
					collection={event}
					updateList={this.updateList}
				/>
				<GamesPaginate 
					collection={event}
					updateList={this.updateList}
				/>
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