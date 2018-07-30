import React from 'react';
import { Link } from 'react-router-dom';
import ListEvent from './list-event';
import { connect } from 'react-redux';
import requiresLogin from '../app/requires-login';
import { fetchEvents } from '../../actions/events';


export class Events extends React.Component {
	componentDidMount() {
		this.props.dispatch(fetchEvents());
	}
	render() {
		const { events, userId } = this.props;
		let eventTitle = 'List of Events';
		if (events.length < 1) eventTitle = 'Events';
		const eventList = events.map((event, i) =>
			<ListEvent 
				event={event} 
				key={i} 
				userId={userId} 
				dispatch={this.props.dispatch}
			/>);
		return (
			<section>
				<h2>{eventTitle}</h2>
				<button>
					<Link to="events/new">Add New Event</Link>
				</button>
				{eventList}
			</section>
		);
	}
}

const mapStateToProps = state => {
	return ({
		events: state.events.list,
		userId: state.auth.currentUser.userId
	});
};

export default requiresLogin()(connect(mapStateToProps)(Events));