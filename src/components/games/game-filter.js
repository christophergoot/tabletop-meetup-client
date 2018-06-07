import React from 'react';
import RangeSlider from './range-slider';
import './sort-container.css';

export default function GameFilter(props) {
	const { filterMethods } = props;
	const { limit, page, sort, filters:oldFilters } = props.collection;

	const applyFilter = filter => {
		const filters = [filter];
		if (oldFilters && oldFilters.length>0) {
			const otherFilters = oldFilters.filter(el => el.field !== filter.field);
			otherFilters.forEach(el => filters.push(el));			
		}
		props.updateList(limit,page,sort,filters);
	};

	const clearFilter = field => {
		const filters = [];
		if (oldFilters && oldFilters.length>0) {
			const valid = oldFilters.filter(el => el.field !== field);
			valid.forEach(el => filters.push(el));			
		}
		props.updateList(limit,page,sort,filters);
	};

	const listItems = filterMethods.map((el,i) => {	
		if (el.range) {
			let value = [];
			let oldFilter = oldFilters.find(filter => el.field === filter.field);
			if (oldFilter) value = [oldFilter.range.min, oldFilter.range.max];
			return (
				<li key={i}>
					<RangeSlider 
						field={el.field}
						name={el.name}
						step={el.step}
						range={{min: el.range.min, max: el.range.max}}
						value={value}
						valueDescripter={el.valueDescripter}
						applyFilter={applyFilter}
						clearFilter={clearFilter}
					/>
				</li>
			);
		} 
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
		<div >
			<h3>Filters</h3>
			<ul>
				{listItems}
			</ul>
		</div>
	);
}
