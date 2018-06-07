import React from 'react';
import './event-guests.css';

export default function EventGuests(props) {
	const guests = props.guests;
	const guestList = guests.map((guest, i) => {
		const user = guest.user[0];
		const userName = user.firstName + user.lastName || user.username;
		let status;
		switch (guest.rsvp) {
		case 'invited':
			status = {
				status: 'Invited',
				class: 'rsvp invited'
			};
			break;
		case 'maybe':
			status = {
				status: 'Maybe',
				class: 'rsvp maybe'
			};
			break;
		case 'no':
			status = {
				status: 'Declined',
				class: 'rsvp declined'
			};
			break;
		case 'yes':
			status = {
				status: 'Confirmed',
				class: 'rsvp confirmed'
			};
			break;
		default: 
			status = {
				status: '',
				class: 'rsvp'
			};
			
		}
		return (
			<div key={i}>
				{userName} <span
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