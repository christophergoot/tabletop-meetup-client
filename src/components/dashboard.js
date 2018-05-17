import React from 'react';
import { connect } from 'react-redux';
import { fetchCollection } from '../actions/collections';
import requiresLogin from './requires-login';
import GameListSummary from './game-list-summary';
import Events from './events';
import './dashboard.css';

export class Dashboard extends React.Component {
	componentDidMount() {
		this.props.dispatch(fetchCollection(this.props.userId));
	}

	render() {
		return (
			<div className="dashboard">
				<div className="dashboard-user">
					<p>Username: {this.props.username}</p>
					<p>Name: {this.props.name}</p>
				</div>
				<GameListSummary collection={this.props.collection} />
				<Events />
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
		collection: userCollection
	};
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));