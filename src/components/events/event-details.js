import React from 'react';
import EventDate from './event-date';

export default function EventDetails(props) {
	const { location, address, locationDescription, additionalInformation,
		endDate, startDate, name } = props.event;
	const eventName = name || 'Game Event';
	return (
		<div>
			<h3>{eventName}</h3>
			<p>{location}</p>
			<p>{address}</p>
			<p>{locationDescription}</p>
			<EventDate endDate={endDate} startDate={startDate} />
			<p>{additionalInformation}</p>
		</div>
	);
}