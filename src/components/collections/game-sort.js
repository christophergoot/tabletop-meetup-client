import React from 'react';
// import { fetchCollection } from '../../actions/collections';
import './game-sort.css';

export default function GameSort(props) {
	const methods = [
		{
			method: 'name',
			name: 'ABC',
			label: 'sort Alphabetically'
		},
		{
			method: 'averageRating',
			name: 'Rating',
			label: 'sort by Rating'
		},
		{
			method: 'playingTime',
			label: 'sort by Play Time',
			name: 'Time'
		},
		{
			method: 'yearPublished',
			name: 'Year',
			label: 'sort by Year Published'
		},
		{
			method: 'rank',
			name: 'Rank',
			label: 'sort by BBG Rank'
		}
	];
	const { sort, limit, filter } = props.collection;

	const listItems = methods.map((el, i) => {
		let className = 'sort';
		let sortDirection = 1;
		if (el.method === sort.method) {
			className = 'sort selected';
			sortDirection = sort.direction * -1;
		}
		return (
			<li key={i}
				className={className}
				title={el.label} 
				alt={el.label}
				onClick={() => 
					props.updateList(
						limit, 
						1,
						{ method: el.method, direction: sortDirection},
						filter
					)} 
			>
				{el.name}
			</li>
		);
	});

	return (
		<div className='sort-container'>
			Sort
			<ul>
				{listItems}
			</ul>
		</div>
	);
}