import React from 'react';
import GameBoxtop from '../games/game-boxtop';
import GameFilter from '../games/game-filter';
import GameSort from '../games/game-sort';
import GamesPaginate from '../games/games-paginate';
import GameBallot from './game-ballot';
import { fetchSingleEvent } from  '../../actions/collections';
import { castVote } from '../../actions/events';
import { FilterMethods } from '../games/filter-methods-base-set';
import MoreInfo from '../games/more-info';
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

	handleVote = (event, ballot) => {
		event.preventDefault();
		this.props.dispatch(castVote(ballot));
	}

	render() {
		const { event } = this.props;
		let gameList = '';
		if (event.games) {
			gameList = event.games.map((game, i) => {
				const owners = game.owners.map(ownerId => 
					event.guests.find(guest => guest.userId === ownerId).user[0].username
				);
				return (
						<GameBoxtop
							owners={owners}
							game={game} 
							listManager={<GameBallot 
								game={game}
								handleVote={this.handleVote}
								eventId={event.eventId}
								gameVotes={event.gameVotes} 
								userId={this.props.userId}
								userWantToPlayList={this.props.userWantToPlayList}
							/>}
						 />
				);
			});
		}

		const filterMethods = [
			...FilterMethods
		]
	
		return (
			<section>
				<h2>All Games Owned <MoreInfo info='by guests either invited or attending' /></h2>
				<GameSort 
					collection={event}
					updateList={this.updateList}
				/>
				<GamesPaginate 
					collection={event}
					updateList={this.updateList}
				/>
				<GameFilter 
					collection={event}
					updateList={this.updateList}
					filterMethods={filterMethods}
				/>
				<span className="game-list">{gameList}</span>
				<GamesPaginate 
					collection={event}
					updateList={this.updateList}
					view='pagination only'
					/>

			</section>
		);
	}
}
