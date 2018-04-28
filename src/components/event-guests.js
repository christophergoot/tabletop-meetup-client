import React from 'react';
import './event-guests.css';

export default function EventGuests(props) {
	const guests = props.guests;
	const guestList = guests.map((guest, i) => {
		const hasConfirmed = guest => {
			if (guest.confirmed) return ("Confirmed");
			else return ("Invited");
		};
		return (
			<div key={i}>
				{guest.user} ({hasConfirmed(guest)})
			</div>
		);
	});
	return (
		<div className="event-guests">
			{guestList}
		</div>
	);
}

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