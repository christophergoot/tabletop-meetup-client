import React from 'react';
import EventGuests from './event-guests';
import EventDetails from './event-details';
import "./list-event.css"

export default function ListEvent(props) {
	const { guests } = props.event;
	return (
		<div className="list-event">
			<EventDetails event={props.event} />
			<EventGuests guests={guests} />
		</div>
	);
}

// id: "jilhjd8890jdsaf",
// date: 1525395600,
// eventName: "Upcomming Event",
// location: "My Garage",
// guests: [
// 	{
// 		user: "jgarcia",
// 		confirmed: true,
// 		invitedBy: "christophergoot"
// 	},
// 	{
// 		user: "jabriel",
// 		confirmed: false,
// 		invitedBy: "jgarcia"
// 	},
// 	{
// 		user: "eholland",
// 		confirmed: false,
// 		invitedBy: "christophergoot"
// 	}