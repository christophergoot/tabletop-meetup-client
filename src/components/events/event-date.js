import React from 'react';

export default function EventDate(props) {
	const { startDate, endDate } = props;


	const start = new Date(startDate);
	const end = new Date(endDate);
	const startDateString = start.toDateString();
	const timeString = date => {
		let hours = date.getHours();
		let period = 'AM';
		if (hours > 12) {
			hours = hours - 12;
			period = 'PM';
		}
		const minutes = date.getMinutes();
		return (`${hours}:${minutes}${period}`);
	};
	return (
		<span>{startDateString} from {timeString(start)} - {timeString(end)}</span>
	);
}