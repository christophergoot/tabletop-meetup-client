import React from 'react';
import ListEvent from './list-event';
import EventGameList from './event-game-list';
import EventTopGames from './event-top-games';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { fetchSingleEvent, deleteEvent } from '../../actions/events';
import requiresLogin from '../app/requires-login';
import { fetchUserWantToPlayList } from '../../actions/collections';
import ReactTooltip from 'react-tooltip';

export class SingleEvent extends React.Component {
	componentDidMount() {
		// this.props.dispatch(fetchEvents());
		this.props.dispatch(fetchSingleEvent(this.props.match.params.eventId));
		this.props.dispatch(fetchUserWantToPlayList(this.props.user.userId));
	}
	deleteButton = (isHost, eventId) => {
		if (isHost) return (
			<button onClick={e => this.props.dispatch(deleteEvent(eventId))} >
				Delete Event
			</button>
		); 
		else return '';
	}

	render() {
		const thisEvent = this.props.currentEvent;
		let userWantToPlayList = [];
		const userList = this.props.wantToPlayLists.filter(list => list.userId === this.props.user.userId);
		if (userList.length>0) userWantToPlayList = userList[0].list;

		return (
			<div>
				<ReactTooltip delayHide={500} effect='solid' type='dark' />
				<ListEvent 
					event={thisEvent} 
					userId={this.props.user.userId}
					dispatch={this.props.dispatch} />
				<EventTopGames />
				<EventGameList 
					event={thisEvent}
					userId={this.props.user.userId}
					userWantToPlayList={userWantToPlayList}
					dispatch={this.props.dispatch} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return ({
		user: state.auth.currentUser,
		events: state.events.list,
		wantToPlayLists: state.collections.wantToPlayLists,
		redirect: state.events.redirect,
		currentEvent: state.events.current
	});
};

export default requiresLogin()(connect(mapStateToProps)(SingleEvent));