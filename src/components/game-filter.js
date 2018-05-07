import React from 'react';
import './sort-container.css'

export default function GameFilter(props) {

	const filterMethods = [
		{
			label: 'sort by Number of Players',
			name: 'Players',
			method: 'players'
		},
		{
			name: 'Time',
			label: 'sort by Play Time',
			method: 'playTime'
		},
		{
			name: 'Rating',
			label: 'sort by Average Rating',
			method: 'rating'
		},
		{
			name: 'Weight',
			label: 'sort by Game Weight',
			method: 'weight'
		},
		{
			name: 'RSVP',
			label: 'sort by RSVP Status',
			method: 'rsvp'
		},
	];

	const listItems = filterMethods.map((el,i) => (
		<li className='sort' 
			key={i} 
			title={el.label} 
			alt={el.label} >
			{el.name}
		</li>
	));

    return (
		<div className='sort-container'>
			<p>Filter</p>
			<ul>
				{listItems}
			</ul>
		</div>
	);
};