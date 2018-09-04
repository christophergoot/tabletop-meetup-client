import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './dashboard.css';
import GameListSummary from '../../components/collections/game-list-summary';
import Events from '../../components/events/events';

class DashboardComponent extends Component {
	render() {
		return (
			<div className="dashboard">
				<GameListSummary collection={this.props.collection} />
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