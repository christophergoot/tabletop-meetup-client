import React from 'react';
import './games-paginate.css';

function generatePageList(collection, updateList) {
	const { page, pageCount, limit, sort, filter } = collection;
	
	const pages = [];
	let prevPage = 0;
	if (page !== 1) prevPage = page - 1;
	if (prevPage) pages.push(
		<li key={prevPage * new Date()} className="sort">
			<a onClick={() => updateList(limit, prevPage, sort, filter)} >
				prev
			</a>
		</li>);
	else pages.push(
		<li key={prevPage * new Date()} className="sort selected">
			prev
		</li>
	);
	const pageVis = 4;
	for(let i=page-pageVis; i<page+pageVis; i++) {
		if (i<=0);
		else if (i>pageCount);
		else if (i === page-pageVis) {
			pages.push(
				(<li key={i * new Date()} className="sort">
					<a onClick={() => updateList(limit, 1, sort, filter)} >
					1
					</a>
				</li>),
				(<span key={i + new Date()}>...</span>)
			);
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
					<a onClick={() => updateList(limit, i, sort, filter)} >
						{i}
					</a>
				</li>);
		}
		else if (i === page+pageVis-1) {
			pages.push(
				(<span key={i + new Date()}>...</span>),
				(<li key={pageCount} className="sort">
					<a onClick={() => updateList(limit, pageCount, sort, filter)} >
						{pageCount}
					</a>
				</li>));
		}
		else pages.push(
			<li key={i} className="sort">
				<a onClick={() => updateList(limit, i, sort, filter)} >
					{i}
				</a>
			</li>);
	}

	let nextPage = 0;
	if (page !== pageCount) nextPage = page + 1;
	if (nextPage) pages.push(
		<li key={nextPage * new Date()} className="sort">
			<a onClick={() => updateList(limit, nextPage, sort, filter)} >
				next
			</a>
		</li>);
	else pages.push(
		<li key={nextPage * new Date()} className="sort selected">
			next
		</li>
	);
	
	if (pageCount <= 1) pages.length = 0;

	return pages;
}


export default function GamesPaginate(props) {
	const { page, limit, sort, filter } = props.collection;
	const pages = generatePageList(props.collection, props.updateList);
	const limitOpts = [
		{	value: 10,
			label: 'show 10 per page' },
		{	value: 25,
			label: 'show 25 per page' },
		{	value: 50,
			label: 'show 50 per page' },
		{	value: 100,
			label: 'show 100 per page' },
		{	value: 0,
			label: 'Show All' }
	];
	let options = limitOpts.map((opt, i) => {
		return (
			<option key={i} value={opt.value}>{opt.label}</option>
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
					props.updateList(
						newLimit, 
						newPage,
						sort,
						filter
					);
				}}
			>
				{options}
			</select>
		</div>
	);
}
