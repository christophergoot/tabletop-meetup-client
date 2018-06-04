import React from 'react';
import './sort-container.css';

export default function GameFilter() {

	const filterMethods = [
		{
			label: 'sort by Number of Players',
			name: 'Players',
			type: 'range',
			options: [
				{
					name: 'Minimum Players',
					field: 'minPlayers',
					selector: '$gte'
				},
				{
					name: 'Maximum Players',
					field: 'maxPlayers',
					selector: '$lte'
				}
			]
		},
		// {
		// 	name: 'Time',
		// 	label: 'sort by Play Time',
		// 	method: 'playTime',
		// 	type: 'range'
		// },
		// {
		// 	name: 'Rating',
		// 	label: 'sort by Average Rating',
		// 	method: 'rating',
		// 	type: 'range'
		// },
		// {
		// 	name: 'Weight',
		// 	label: 'sort by Game Weight',
		// 	method: 'weight',
		// 	type: 'range'
		// },
		// {
		// 	name: 'RSVP',
		// 	label: 'sort by RSVP Status',
		// 	method: 'rsvp',
		// 	type: 'radio'
		// },
	];

	const listItems = filterMethods.map((el,i) => {
		
		if (el.type === 'range') return (
			<li className='sort' 
				
				key={i} 
				title={el.label} 
				alt={el.label} >
				{el.name}
			</li>
		); 
		else return (
			<li className='sort' 
				key={i} 
				title={el.label} 
				alt={el.label} >
				{el.name}
			</li>
		);
	});

	return (
		<div className='sort-container'>
			<p>Filter</p>
			<ul>
				{listItems}
			</ul>
		</div>
	);
}
