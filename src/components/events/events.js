import React from 'react';
import { Link } from 'react-router-dom';
import ListEvent from './list-event';
import { connect } from 'react-redux';
import requiresLogin from '../../app/common/requires-login';
import { fetchEvents } from '../../actions/events';
import Spinner from '../../app/common/Spinner';


export class Events extends React.Component {
	componentDidMount() {
		this.props.dispatch(fetchEvents());
	}

	loadingEventList = () => (
		<div className='list-event'>
			<div className="event-details">
				<h3><Spinner /> Loading . . .</h3>
				<span>
					<div style={{width:'100%',height:'1em',backgroundColor:'#00000042',borderRadius:'3px',marginBottom:'.5em'}}></div>
					<div style={{width:'100%',height:'1em',backgroundColor:'#00000042',borderRadius:'3px',marginBottom:'.5em'}}></div>
				</span>
			</div>
			<div className="event-guests-wrapper" style={{width:'40%'}}>
				<div className="event-guestlist">
					<div style={{width:'100%',height:'1em',backgroundColor:'#00000042',borderRadius:'3px',marginBottom:'.5em',marginTop:'.5em'}}></div>
					<div style={{width:'100%',height:'1em',backgroundColor:'#00000042',borderRadius:'3px',marginBottom:'.5em'}}></div>
					<div style={{width:'100%',height:'1em',backgroundColor:'#00000042',borderRadius:'3px',marginBottom:'.5em'}}></div>
					<div style={{width:'100%',height:'1em',backgroundColor:'#00000042',borderRadius:'3px',marginBottom:'.5em'}}></div>
				</div>
			</div>
		</div>
		);

	render() {
		const { events, userId } = this.props;
		let eventTitle = 'List of Events';
		if (events.length < 1) eventTitle = 'Events';
		let eventList;
		if (this.props.isLoading) eventList = <this.loadingEventList />
		else eventList = events.map((event, i) =>
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
		userId: state.auth.currentUser.userId,
		isLoading: state.events.listIsLoading
	});
};

export default requiresLogin()(connect(mapStateToProps)(Events));