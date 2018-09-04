import React from 'react';
import GameBoxtop from '../common/GameBoxtopComponent';
import GameFilter from '../common/SortAndFilterComponent';
import GamesPaginate from '../common/GamesPaginate';
import GameBallot from './GameBallot';
import { fetchSingleEvent } from  '../../actions/collections';
import { castVote } from '../../actions/events';
import { FilterMethods } from '../../components/games/filter-methods-base-set';
import MoreInfo from '../common/MoreInfo';

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
							key={i}
							owners={owners}
							game={game} 
							listManager={
									<GameBallot 
										game={game}
										handleVote={this.handleVote}
										eventId={event.eventId}
										gameVotes={event.gameVotes} 
										userId={this.props.userId}
										userWantToPlayList={this.props.userWantToPlayList}
									/>
							}
						 />
				);
			});
		}

		const filterMethods = [
			...FilterMethods
		]
	
		return (
			<section>
				<h2>All Available Games <MoreInfo info='by guests either invited or attending' /></h2>
			
				<GameFilter 
					collection={event}
					updateList={this.updateList}
					filterMethods={filterMethods}
				/>
				<GamesPaginate 
					collection={event}
					updateList={this.updateList}
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
