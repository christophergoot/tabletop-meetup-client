import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './dashboard.css';
import Events from '../events/EventsContainer';
import AddGame from '../games/AddGameContainer';
import { Link } from 'react-router-dom';

class DashboardComponent extends Component {
	GameListSummary(props) {
		const { games } = props.collection;
		let summary;
		if (games.length>0) {
			const owned = games.filter(g => g.owned).length || 0;
			const wantToPlay = games.filter(g => g.wantToPlay).length || 0;
			summary = (
				<div>
					<p>{owned} games Owned</p>
					<p>{wantToPlay} Want to Play</p>
				</div>
			);
		}

		return (
			<div className="dashboard-gamelist-summary">
				{summary}
				<button><Link to='/games'>Manage Games</Link></button>
				<AddGame />
			</div>
		);
	}
	render() {
		return (
			<div className="dashboard">
				<this.GameListSummary collection={this.props.collection} />
				<Events events={this.props.events}/>
			</div>
		);
	}
}

DashboardComponent.propTypes = {
	collection: PropTypes.object.isRequired,
	events: PropTypes.array.isRequired
};

export default DashboardComponent;