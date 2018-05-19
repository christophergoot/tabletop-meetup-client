import React from 'react';
import { connect } from 'react-redux';
import { fetchCollection } from '../actions/collections';
import { fetchEvents } from '../actions/events';
import './dashboard.css';
import Events from './events';
import GameListSummary from './game-list-summary';
import requiresLogin from './requires-login';

export class Dashboard extends React.Component {
	componentDidMount() {
		const { userId } = this.props;
		this.props.dispatch(fetchCollection(userId));
		this.props.dispatch(fetchEvents(userId));
	}

	render() {
		return (
			<div className="dashboard">
				<div className="dashboard-user">
					<p>Username: {this.props.username}</p>
					<p>Name: {this.props.name}</p>
				</div>
				<GameListSummary collection={this.props.collection} />
				{/* <Events events={this.props.events}/> */}
			</div>
		);
	}
}

const mapStateToProps = state => {
	const {currentUser} = state.auth;
	let userCollection = {games: []};
	if (state.collections.length>0) userCollection = state.collections.find(c => c.userId === state.auth.currentUser.userId);
	return {
		userId: state.auth.currentUser.userId,
		username: state.auth.currentUser.username,
		name: `${currentUser.firstName} ${currentUser.lastName}`,
		collection: userCollection,
		events: state.events
	};
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));