import React from 'react';
import ListEvent from './list-event';
import EventGameList from './event-game-list';
import { connect } from 'react-redux';
import { fetchSingleEvent } from '../../actions/events';
import requiresLogin from '../app/requires-login';
import { fetchUserWantToPlayList } from '../../actions/collections';

export class SingleEvent extends React.Component {
	componentDidMount() {
		// this.props.dispatch(fetchEvents());
		this.props.dispatch(fetchSingleEvent(this.props.match.params.eventId));
		this.props.dispatch(fetchUserWantToPlayList(this.props.user.userId));
	}
	render() {
		const { eventId } = this.props.match.params;
		let thisEvent = this.props.events.find(ev => ev.eventId === eventId) || this.props.events[0];
		let userWantToPlayList = [];
		const userList = this.props.wantToPlayLists.filter(list => list.userId === this.props.user.userId);
		if (userList.length>0) userWantToPlayList = userList[0].list;
		return (
			<div>
				<ListEvent event={thisEvent} />
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
		wantToPlayLists: state.collections.wantToPlayLists
	});
};

export default requiresLogin()(connect(mapStateToProps)(SingleEvent));