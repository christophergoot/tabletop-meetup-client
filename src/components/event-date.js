import React from 'react';

export default function EventDate(props) {
	const date = new Date(props.date);
	const dateString = date.toDateString();
	const timeString = date.toTimeString();
	return (
		<span>{dateString} at {timeString}</span>
	);
}