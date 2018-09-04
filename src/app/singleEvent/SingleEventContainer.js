import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleEvent, 
	// deleteEvent, 
	fetchEventTopGames } from '../../actions/events';
import requiresLogin from '../common/requires-login';
import { fetchUserWantToPlayList } from '../../actions/collections';
import SingleEventComponent from './SingleEventComponent';


export class SingleEvent extends React.Component {
	componentDidMount() {
		this.props.dispatch(fetchSingleEvent(this.props.match.params.eventId));
		this.props.dispatch(fetchUserWantToPlayList(this.props.user.userId));
		this.props.dispatch(fetchEventTopGames(this.props.match.params.eventId));
	}

	render() {
		return <SingleEventComponent 
			user={this.props.user}
			events={this.props.events}
			wantToPlayLists={this.props.wantToPlayLists}
			redirect={this.props.redirect}
			currentEvent={this.props.currentEvent}
			dispatch={this.props.dispatch}
		/>;
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