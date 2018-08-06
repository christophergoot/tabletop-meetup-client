import React from 'react';
import { Link } from 'react-router-dom';
import EventGuests from './event-guests';
import EventDetails from './event-details';
import './list-event.css';
import { deleteEvent } from '../../actions/events';


function deleteButton(isHost, eventId) {
	if (isHost) return (
		<button 
			onClick={() => this.props.dispatch(deleteEvent(eventId))} 
			style={{margin:'1em auto 0 auto'}} >
			Delete Event
		</button>
	); 
	else return '';
}

export default function ListEvent(props) {
	const { guests, eventId } = props.event;
	const { userId, dispatch } = props;
	let isHost = false;
	const userGuest = guests.find(g => g.userId === userId);
	if (userGuest && userGuest.rsvp === 'host') isHost = true;


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
