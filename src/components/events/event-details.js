import React from 'react';
import EventDate from './event-date';
import './event-details.css';

export default function EventDetails(props) {
	const { locationName, locationAddress, locationDescription, additionalInformation,
		endDate, startDate, name } = props.event;
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
		<div>
			<h3>{eventName}</h3>
			<EventDate endDate={endDate} startDate={startDate} />
			{location}
			<p>{additionalInformation}</p>
		</div>
	);
}