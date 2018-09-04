import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import EventGuests from './EventGuests';
import { deleteEvent } from '../../actions/events';
import './Events.css';

export const ListEvent = props => {
	const { guests, eventId } = props.event;
	const { userId, dispatch } = props;
	let isHost = false;
	const userGuest = guests.find(g => g.userId === userId);
	if (userGuest && userGuest.rsvp === 'host') isHost = true;

	const EventDate = (props) => {
		const { startDate, endDate } = props;
	
		const start = new Date(startDate);
		const end = new Date(endDate);
		const startDateString = start.toDateString();
		const timeString = date => {
			let hours = date.getHours();
			let period = 'AM';
			if (hours === 0) {
				hours = 12;
			}
			else if (hours > 12) {
				hours = hours - 12;
				period = 'PM';
			}
			let minutes = date.getMinutes().toString();
			if (minutes.length < 2) minutes = `${minutes}0`;
	
			return (`${hours}:${minutes}${period}`);
		};
		if (endDate) { return (
			<span>{startDateString} from {timeString(start)} - {timeString(end)}</span>
		);} else { return (
			<span>{startDateString} at {timeString(start)}</span>
		);}
	}
	const deleteButton = (isHost, eventId) => {
		if (isHost) return (
			<button 
				onClick={() => this.props.dispatch(deleteEvent(eventId))} 
				style={{margin:'1em auto 0 auto'}} >
				Delete Event
			</button>
		); 
		else return '';
	}
	const EventDetails = (props) => {
		const { event } = props;
		const { locationName, locationAddress, locationDescription, additionalInformation,
			endDate, startDate, name } = event;
		
		const eventName = name || 'Game Event';
		let location = '';
		if (locationName || locationAddress || locationDescription) location = (
			<div className='event-details-location'>
				<p>{locationName}</p>
				<p>{locationAddress}</p>
				<p>{locationDescription}</p>
			</div>
		);
		return (
			<div className='event-details'>
				<h3>{eventName}</h3>
				<EventDate endDate={endDate} startDate={startDate} />
				{location}
				<p>{additionalInformation}</p>
			</div>
		);
	};

	return (
		<Link to={`/event/${eventId}`} className="list-event">
			<EventDetails 
				userId={userId} 
				event={props.event} />
			<EventGuests 
				guests={guests} 
				userId={userId} 
				dispatch={dispatch}
				eventId={eventId} />
			{deleteButton(isHost,eventId)}
		</Link>
	);
}

class EventsComponent extends Component {
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

EventsComponent.propTypes = {
	events: PropTypes.array.isRequired,
	userId: PropTypes.string.isRequired,
	isLoading: PropTypes.bool.isRequired
};

export default EventsComponent;