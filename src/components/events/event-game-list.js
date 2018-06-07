import React from 'react';
import GameBoxtop from '../games/game-boxtop';
import GameFilter from '../games/game-filter';
import GameSort from '../games/game-sort';
import GamesPaginate from '../games/games-paginate';
import GameBallot from './game-ballot';
import { fetchSingleEvent } from  '../../actions/collections';
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
			{
				name: 'Player Count',
				field: 'minPlayers',
				range: { min: 1, max: 10},
				step: 1,
				valueDescripter: 'Players'
			},
			{
				name: 'Time',
				field: 'playingTime',
				range: { min: 0, max: 240},
				step: 5,
				valueDescripter: 'Minutes'
			},
			{
				name: 'Rating',
				field: 'averageRating',
				range: { min: 0, max: 10},
				step: 0.5,
				valueDescripter: 'Rating'
			},
			{
				name: 'BGG Rank',
				field: 'rank',
				range: { min: 0, max: 10000},
				step: 100,
				valueDescripter: 'Game Rank'
			},
			{
				name: 'Year Published',
				field: 'yearPublished',
				range: { min: 1954, max: new Date().getFullYear() + 1},
				step: 1,
				valueDescripter: 'Year Published'
			},
			// {
			// 	name: 'RSVP',
			// 	label: 'filter by RSVP Status',
			// 	method: 'rsvp',
			// 	type: 'radio'
			// },
		];
	
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
