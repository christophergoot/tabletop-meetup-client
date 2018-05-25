import React from 'react';
// import { connect } from 'react-redux';
import { sortGames } from '../actions/collections';
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
	let { sort } = props;
	if (sort === undefined) sort = {
		method: 'name',
		direction: 1
	};
	const listItems = methods.map((el, i) => {
		let className = 'sort';
		if (el.method === sort.method) className = 'sort selected';
		return (
			<li key={i}
				className={className}
				title={el.label} 
				alt={el.label}
				onClick={() => props.dispatch(sortGames(props.collection.games, el.method))} >
				{el.name}
			</li>
		);});

	return (
		<div className='sort-container'>
			Sort
			<ul>
				{listItems}
			</ul>
		</div>
	);
}

// GameSort.defaultProps = {
// 	collection: { sort: {method: 'name', order: 'ascending'}}
// }
