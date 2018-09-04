import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { fetchUserWantToPlayList } from '../../actions/collections';
import { castVote, 
	// fetchEventTopGames, fetchSingleEvent
 } from '../../actions/events';
import GameBallot from './GameBallot';
// import './event-top-games.css';
import MoreInfo from '../../components/games/more-info';

class EventTopGames extends Component {
	// componentDidMount() {
	// 	// this.props.event.guests.forEach(guest => this.props.dispatch(fetchUserWantToPlayList(guest.userId)));
	// 	// this.props.dispatch(fetchSingleEvent(this.props.event.eventId));
	// 	this.props.dispatch(fetchEventTopGames(this.props.event.eventId));
	// }
	handleVote = (event, ballot) => {
		event.preventDefault();
		this.props.dispatch(castVote(ballot));
	}

	rankedGames = () => {

		const { event, user } = this.props;
		const { userId } = user;

		let userWantToPlayList = [];
		const userList = this.props.wantToPlayLists.filter(list => list.userId === userId);
		if (userList.length>0) userWantToPlayList = userList[0].list;

		const sortedList = this.props.topGames.filter(game => game.eventVotes > 0);
		return sortedList.map((game, i) => {
			const owners = game.owners.map(ownerId => 
				event.guests.find(guest => guest.userId === ownerId).user[0].username
			);
			let ownerReport = <span className='top-games-owners'>Owned by {owners.join(' & ')}</span>;
			let yearReport = '';
			if (game.yearPublished && game.yearPublished > 0) 
				yearReport = `(${game.yearPublished})`;
			return (
			<div key={i} className='event-top-game'>
				<div className='top-game-text'>{game.name} {yearReport} {ownerReport}</div>
				<GameBallot 
					game={game} 
					eventId={event.eventId} 
					gameVotes={event.gameVotes} 
					userId={userId} 
					userWantToPlayList={userWantToPlayList} 
					handleVote={this.handleVote} />
			</div>);
		});
	}

	render() {
		if (this.rankedGames().length>0) return (
			<div>
				<h2>Top Games <MoreInfo 
					info='Each 👍 = 1 vote, 👎 = minus 1, and 1 vote for each user with the game on their Want to Play list (☑)' />
				</h2>
				<this.rankedGames />
			</div>
		);
		else return (
			<div>
				<h2>No Games of Interest <MoreInfo 
					info='Each 👍 = 1 vote, 👎 = minus 1, and 1 vote for each user with the game on their Want to Play list (☑)' />
				</h2>
				<p>Express interest by upvoting games and/or adding them to your Want to Play List</p>
				<this.rankedGames />
			</div>

		);
	}
}

function mapStateToProps(state) {
	return {
		event: state.events.current,
		wantToPlayLists: state.collections.wantToPlayLists,
		user:	state.auth.currentUser,
		topGames: state.events.currentTopGames
	};
}

export default connect(mapStateToProps)(EventTopGames);