import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserWantToPlayList } from '../../actions/collections';

class EventTopGames extends Component {
	componentDidMount() {
		this.props.event.guests.forEach(guest => this.props.dispatch(fetchUserWantToPlayList(guest.userId)));
	}

	rankedGames = () => {
		const { event, wantToPlayLists } = this.props;
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
		
		const sortedList = rankedList.sort((a,b) => {
			if (a.eventVotes < b.eventVotes) return -1;
			if (a.eventVotes < b.eventVotes) return 1;
			return 0;
		});

		return sortedList.filter(game => game.eventVotes > 0).map((game, i) => (
			<div key={i}>
				{game.name} has {game.eventVotes} votes
			</div>
		))
	}

	render() {
		return (
			<div>
				{this.rankedGames()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		event: state.events.current,
		wantToPlayLists: state.collections.wantToPlayLists
	};
}

export default connect(mapStateToProps)(EventTopGames);