import React from 'react';

export const Events = [
	{
		id: "jilhjd8890jdsaf",
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
		id: "jilhjd8890jdsaf",
		date: 1519956000,
		eventName: "Old Event",
		location: "Cloud Cap Games",
		guests: [
			{
				user: "jgarcia",
				confirmed: 'host',
				invitedBy: "jgarcia"
			},
			{
				user: "goot",
				confirmed: 'confirmed',
				invitedBy: "jgarcia"
			},
			{
				user: "eholland",
				confirmed: 'declined',
				invitedBy: "christophergoot"
			}
		]
	}
];