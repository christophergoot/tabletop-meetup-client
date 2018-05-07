import React from 'react';

export const Events = [
	{
		eventId: "jilhjd8890jdsaf",
		date: 1525395600,
		eventName: "Upcomming Event",
		location: "My Garage",
		guests: [
			{
				user: "jgarcia",
				rsvp: "invited",
				invitedBy: "goot"
			},
			{
				user: "cloyd",
				rsvp: 'confirmed',
				invitedBy: "jgarcia"
			},
			{
				user: "soltz",
				rsvp: 'host',
				invitedBy: "goot"
			},

		]
	},
	{
		eventId: "jilhjd8890jdsaf",
		date: 1519956000,
		eventName: "Old Event",
		location: "Cloud Cap Games",
		guests: [
			{
				user: "jgarcia",
				rsvp: 'host',
				invitedBy: "jgarcia"
			},
			{
				user: "goot",
				rsvp: 'confirmed',
				invitedBy: "jgarcia"
			},
			{
				user: "eholland",
				rsvp: 'declined',
				invitedBy: "christophergoot"
			}
		]
	}
];