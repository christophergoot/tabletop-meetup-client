import React from 'react';
import './games-paginate.css';

function generatePageList(collection, updateList) {
	const { page, pageCount, limit, sort, filters } = collection;
	
	const pages = [];
	let prevPage = 0;
	if (page !== 1) prevPage = page - 1;
	if (prevPage) pages.push(
		<li className="sort">
			<a onClick={() => updateList(limit, prevPage, sort, filters)} >
				prev
			</a>
		</li>);
	else pages.push(
		<li className="sort selected">
			prev
		</li>
	);
	const pageVis = 4;
	for(let i=page-pageVis; i<page+pageVis; i++) {
		if (i<=0);
		else if (i>pageCount);
		else if (i === page-pageVis) {
			pages.push(
				(<li className="sort">
					<a onClick={() => updateList(limit, 1, sort, filters)} >
					1
					</a>
				</li>),
				(<li>
					...
				</li>)
			);
			i++;
		}
		else if (i === page) pages.push(
			<li className="sort selected">
				{i}
			</li>
		);
		else if (i ===  pageCount) {
			pages.push(
				<li className="sort">
					<a onClick={() => updateList(limit, i, sort, filters)} >
						{i}
					</a>
				</li>);
		}
		else if (i === page+pageVis-1) {
			pages.push(
				(<li>
					...
				</li>),
				(<li className="sort">
					<a onClick={() => updateList(limit, pageCount, sort, filters)} >
						{pageCount}
					</a>
				</li>));
		}
		else pages.push(
			<li className="sort">
				<a onClick={() => updateList(limit, i, sort, filters)} >
					{i}
				</a>
			</li>);
	}

	let nextPage = 0;
	if (page !== pageCount) nextPage = page + 1;
	if (nextPage) pages.push(
		<li className="sort">
			<a onClick={() => updateList(limit, nextPage, sort, filters)} >
				next
			</a>
		</li>);
	else pages.push(
		<li className="sort selected">
			next
		</li>
	);
	
	if (pageCount <= 1) pages.length = 0;

	// const myItemsWithIds = myItems.map((item, index) => { ...item, myId: index })

	const keyedPages = pages.map((el, i) => {
		return {...el, key:i+1};
	});
	// };

	return keyedPages;
}

// function generatePages(collection, updateList) {
// 	const { page, pageCount, limit, sort, filter } = collection;
	
// 	const pages = [];
// 	const pageVis = 4;
// 	for (let i=0; i<=pageCount+1; i++) {
// 		const link = false;
// 		if (page !== 1) {
// 			prevPage = page - 1;
// 		}


// 		if (link) pages.push(
// 			<li key={i} 
// 				className="sort"
// 				onClick={() => updatePagination(limit, page)}
// 			>
// 				{label}
// 			</li>
// 		);
// 	}

// 	return pages;
// }


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
						newLimit, newPage, sort, filter
					);
				}}
			>
				{options}
			</select>
		</div>
	);
}