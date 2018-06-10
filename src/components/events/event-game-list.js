import React from 'react';
import GameBoxtop from '../games/game-boxtop';
import GameFilter from '../games/game-filter';
import GameSort from '../games/game-sort';
import GamesPaginate from '../games/games-paginate';
import GameBallot from './game-ballot';
import { fetchSingleEvent } from  '../../actions/collections';
import { FilterMethods } from '../games/filter-methods-base-set';
// import { connect } from 'react-redux';

export default class EventGameList extends React.Component {

	updateList = (limit,page,sort,filters) => {
		this.props.dispatch(fetchSingleEvent(
			this.props.event.eventId, 
			limit, 
			page, 
			sort, 
			filters))
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

		const filterMethods = [
			...FilterMethods,
		]
	
		return (
			<section>
				<h2>Event Game List</h2>
				<GameFilter 
					collection={event}
					updateList={this.updateList}
					filterMethods={filterMethods}
				/>
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
