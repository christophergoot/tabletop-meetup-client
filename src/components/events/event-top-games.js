import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserWantToPlayList } from '../../actions/collections';
import { castVote } from '../../actions/events';
import GameBallot from './game-ballot';
import './event-top-games.css';
import MoreInfo from '../games/more-info';

class EventTopGames extends Component {
	componentDidMount() {
		this.props.event.guests.forEach(guest => this.props.dispatch(fetchUserWantToPlayList(guest.userId)));
	}
	handleVote = (event, ballot) => {
		event.preventDefault();
		this.props.dispatch(castVote(ballot));
	}

	rankedGames = () => {
		const { event, wantToPlayLists, user } = this.props;
		const { userId } = user;
		const gameList = event.games;
		const userLists	= wantToPlayLists.filter(list => {
			return event.guests.map(guest => guest.userId).includes(list.userId)
		});
		const rankedList = gameList.map(game => {
			let yesVotes = 0,
				noVotes = 0,
				usersWhoWantToPlay = 0;
			const votes = event.gameVotes.find(vote => vote.gameId === game.gameId);
			if (votes) {
				yesVotes = votes.yes.length;
				noVotes = votes.no.length;
			};
			userLists.forEach(list => {
				if (list.list) {
					if (list.list.includes(game.gameId)) usersWhoWantToPlay ++;
				}
			});
			return ({
				...game,
				eventVotes: yesVotes + usersWhoWantToPlay - noVotes
			});
		})
		let userWantToPlayList = [];
		const userList = this.props.wantToPlayLists.filter(list => list.userId === userId);
		if (userList.length>0) userWantToPlayList = userList[0].list;

		const sortedList = rankedList
			.filter(game => game.eventVotes > 0)
			.sort((a,b) => {
				if (a.averageRating > b.averageRating) return -1;
				if (a.averageRating < b.averageRating) return 1;
				return 0;				
			})
			.sort((a,b) => {
				if (a.eventVotes > b.eventVotes) return -1;
				if (a.eventVotes < b.eventVotes) return 1;
				return 0;
			});
		
		return sortedList.map((game, i) => {
			let yearReport = '';
			if (game.yearPublished && game.yearPublished > 0) 
				yearReport = `(${game.yearPublished})`;
			return (
			<div key={i} className='event-top-game'>
				{game.name} {yearReport}
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
		user:	state.auth.currentUser
	};
}

export default connect(mapStateToProps)(EventTopGames);