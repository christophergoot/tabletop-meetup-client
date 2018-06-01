import React from 'react';
import EventDate from './event-date';

export default function EventDetails(props) {
	const { location, endDate, startDate } = props.event;
	const eventName = props.event.eventName || 'Game Event';
	return (
		<div>
			<h3>{eventName}</h3>
			<p>{location}</p>
			<EventDate endDate={endDate} startDate={startDate} />
		</div>
	);
}