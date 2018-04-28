import React from 'react';
import EventDate from './event-date';

export default function EventDetails(props) {
	const { eventName, location, date } = props.event;
	return (
		<div>
			<h3>{eventName}</h3>
			<p>{location}</p>
			<EventDate date={date} />
		</div>
	);
}