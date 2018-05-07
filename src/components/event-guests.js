import React from 'react';
import './event-guests.css';

export default function EventGuests(props) {
	const guests = props.guests;
	// debugger
	const guestList = guests.map((guest, i) => {
		function rsvp(guest) {
			switch (guest.rsvp) {
				case 'host':
					return {
						status: 'Hosting',
						class: 'rsvp host'
					};
				case 'invited':
					return {
						status: 'Invited',
						class: 'rsvp invited'
					};
				case 'declined':
					return {
						status: 'Declined',
						class: 'rsvp declined'
					};
				case 'confirmed':
					return {
						status: 'Confirmed',
						class: 'rsvp confirmed'
					};
			};
		};
		const status = rsvp(guest);
		return (
			<div key={i}>
				{guest.user} <span
					className={status.class}>({status.status})</span>
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