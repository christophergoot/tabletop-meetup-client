import React from 'react';
// import { connect } from 'react-redux';
import { sortGames } from '../actions';
import './game-sort.css';

// export class GameSort extends React.Component {
// 	constructor(props){
// 		super(props);
// 	};

// 	render() {

export default function GameSort(props) {
	const methods = [
		{
			method: 'name',
			name: 'ABC',
			label: 'sort Alphabetically'
		},
		{
			method: 'rating',
			name: 'Rating',
			label: 'sort by Rating'
		},
		{
			method: 'playTime',
			label: 'sort by Play Time',
			name: 'Time'
		},
		{
			method: 'weight',
			name: 'Weight',
			label: 'sort by Weight'
		},
		{
			method: 'year',
			name: 'Year',
			label: 'sort by Year Published'
		}
	];
	const listItems = methods.map((el, i) => (
		<li key={i}
			className='sort'
			title={el.label} 
			alt={el.label}
			onClick={() => props.dispatch(sortGames(props.collection, el.method))} >
			{el.name}
		</li>
	));

	return (
		<div className='sort-container'>
			Sort
			<ul>
				{listItems}
			</ul>
		</div>
	);
};

// const mapDispatchToProps = dispatch => {
// 	return
// };

// export default connect(null, mapDispatchToProps)(GameSort);