import React from 'react';
import { connect } from 'react-redux';
import { fetchCollection } from '../../actions/collections';
import { fetchEvents } from '../../actions/events';
import './dashboard.css';
import Events from '../events/events';
import GameListSummary from '../collections/game-list-summary';
import requiresLogin from './requires-login';
import { loadAuthToken } from '../../local-storage';

export class Dashboard extends React.Component {
	componentDidMount() {
		const { userId } = this.props;
		// this.props.dispatch(loadAuthToken());
		this.props.dispatch(fetchCollection(userId));
		this.props.dispatch(fetchEvents(userId));
	}

	render() {
		let displayName = '';
		if (this.props.name.trim() !== '') displayName = `Name: ${this.props.name}`;
		return (
			<div className="dashboard">
				<div className="dashboard-user">
					<p>Username: {this.props.username}</p>
					<p>{displayName}</p>
				</div>
				<GameListSummary collection={this.props.collection} />
				<Events events={this.props.events}/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { currentUser } = state.auth;
	const authToken = loadAuthToken();

	return {
		userId: state.auth.currentUser.userId,
		username: state.auth.currentUser.username,
		name: `${currentUser.firstName} ${currentUser.lastName}`,
		collection: state.collections.list,
		events: state.events.list,
		authToken
	};
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));