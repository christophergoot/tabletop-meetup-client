import React from 'react';

export default function EventDate(props) {
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