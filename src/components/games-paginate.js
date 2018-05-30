import React from 'react';
import { fetchCollection } from '../actions/collections';
import './games-paginate.css';

function generatePageList(dispatch, collection) {
	const { page, pageCount, limit, userId, sort, filter } = collection;
	const pages = [];
	let prevPage = 0;
	if (page !== 1) prevPage = page - 1;
	if (prevPage) pages.push(
		<li key={'prevPage'} className="sort">
			<a onClick={() => dispatch(fetchCollection(userId, limit, prevPage, sort, filter))} >
				prev
			</a>
		</li>);
	else pages.push(
		<li key={'prevPage'} className="sort selected">
			prev
		</li>
	);
	const pageVis = 4;
	for(let i=page-pageVis; i<page+pageVis; i++) {
		if (i<=0);
		else if (i>pageCount);
		else if (i === page-pageVis) {
			pages.push(
				(<li key='1' className="sort">
					<a onClick={() => dispatch(fetchCollection(userId, limit, 1, sort, filter))} >
					1
					</a>
				</li>),
				'...');
			i++;
		}
		else if (i === page) pages.push(
			<li key={i} className="sort selected">
				{i}
			</li>
		);
		else if (i ===  pageCount) {
			pages.push(
				<li key={i} className="sort">
					<a onClick={() => dispatch(fetchCollection(userId, limit, i, sort, filter))} >
						{i}
					</a>
				</li>);
		}
		else if (i === page+pageVis-1) {
			pages.push('...',
				(<li key={pageCount} className="sort">
					<a onClick={() => dispatch(fetchCollection(userId, limit, pageCount, sort, filter))} >
						{pageCount}
					</a>
				</li>));
		}
		else pages.push(
			<li key={i} className="sort">
				<a onClick={() => dispatch(fetchCollection(userId, limit, i, sort, filter))} >
					{i}
				</a>
			</li>);
	}

	let nextPage = 0;
	if (page !== pageCount) nextPage = page + 1;
	if (nextPage) pages.push(
		<li key={'nextPage'} className="sort">
			<a onClick={() => dispatch(fetchCollection(userId, limit, nextPage, sort, filter))} >
				next
			</a>
		</li>);
	else pages.push(
		<li key={'nextPage'} className="sort selected">
			next
		</li>
	);
	
	if (pageCount <= 1) pages.length = 0;

	return pages;
}


export default function GamesPaginate(props) {
	const { page, limit, userId, sort, filter } = props.collection;
	const pages = generatePageList(props.dispatch, props.collection);
	const limitOpts = [
		{
			value: 10,
			label: 'show 10 per page'
		},
		{
			value: 25,
			label: 'show 25 per page'
		},
		{
			value: 50,
			label: 'show 50 per page'
		},
		{
			value: 100,
			label: 'show 100 per page'
		},
		{
			value: 0,
			label: 'Show All'
		},
	];
	let options = limitOpts.map(opt => {
		return (
			<option key={opt.value} value={opt.value}>{opt.label}</option>
		);
	});
	return (
		<div className='sort-container'>
			<ul>
				{pages}
			</ul> 
			<select 
				defaultValue={limit}
				name="limit"
				onChange={(e) => {
					const newLimit = e.target.value;
					const newPage = Math.floor(limit * page / newLimit);
					props.dispatch(fetchCollection(userId, newLimit, newPage, sort, filter));
				}}>
				{options}
			</select>
		</div>
	);
}
