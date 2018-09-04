import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import ListEvent from '../../components/events/list-event';
import EventGameList from '../../components/events/event-game-list';
import EventTopGames from '../../components/events/event-top-games';
import ReactTooltip from 'react-tooltip';
import { ListEvent } from '../events/EventsComponent';

class SingleEventComponent extends Component {
	

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

SingleEventComponent.propTypes = {
	user: PropTypes.object.isRequired,
	events: PropTypes.arrayOf(PropTypes.object).isRequired,
	wantToPlayLists: PropTypes.array.isRequired,
	currentEvent: PropTypes.object.isRequired
};

export default SingleEventComponent;