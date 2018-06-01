import React from 'react';
import { Link } from 'react-router-dom';
import EventGuests from './event-guests';
import EventDetails from './event-details';
import './list-event.css';

export default function ListEvent(props) {
	const { guests, eventId } = props.event;
	// const eventId = props.event;

	return (
		<Link to={`/event/${eventId}`} className="list-event">
			<EventDetails event={props.event} />
			<EventGuests guests={guests} />
		</Link>
	);
}
