import React from 'react';
import PropTypes from 'prop-types'; 
import RangeSlider from './range-slider';
import FilterOption from './filter-option';
import FilterIcon from '../../../src/filter-icon.svg';
import './sort-container.css';

class GameFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = ({
			isOpen: false
		});
	}
	render() {
		const { filterMethods } = this.props;
		const { limit, page, sort, filters:oldFilters } = this.props.collection;

		const applyFilter = filter => {
			const filters = [filter];
			if (oldFilters && oldFilters.length>0) {
				const otherFilters = oldFilters.filter(el => el.field !== filter.field);
				otherFilters.forEach(el => filters.push(el));			
			}
			this.props.updateList(limit,page,sort,filters);
		};

		const clearFilter = field => {
			const filters = [];
			if (oldFilters && oldFilters.length>0) {
				const valid = oldFilters.filter(el => el.field !== field);
				valid.forEach(el => filters.push(el));			
			}
			this.props.updateList(limit,page,sort,filters);
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
			else {
				let value = false;
				let prevFilter = oldFilters.find(filter => el.field === filter.field);
				if (prevFilter) value = true;
				return (
					<li key={i}>
						<FilterOption 
							name={el.name}
							field={el.field}
							value={value}
							applyFilter={applyFilter}
							clearFilter={clearFilter}
						/>
					</li>
				);
			}
		});

		if (this.state.isOpen) return (
			<div >
				<h3 onClick={() => this.setState({ isOpen: false })}>
					Filters  
					<i className="material-icons">
						edit_attributes
					</i>
				</h3>
				<ul>
					{listItems}
				</ul>
			</div>);
		else return (
			<div>
				<h3 onClick={() => this.setState({ isOpen: true })}>
					Filters 

					{/* <svg 
						xmlns="http://www.w3.org/2000/svg" 
						// xmlns:xlink="http://www.w3.org/1999/xlink">       
					>
						<image xlinkHref="../filter-icon.svg" height="25" width="25" />    
					</svg> */}

					{/* <FilterIcon /> */}


					{/* <image 
						src='./src/filter-icon.svg' 
						alt='open filters'
						// title='open filters'
						style={{
							height: '1em',
							width: '1em'
						}}
					/> */}
				</h3>
			</div>
		);
	}
}

GameFilter.propTypes = {
	collection: PropTypes.object.isRequired,
	updateList: PropTypes.func.isRequired,
	filterMethods: PropTypes.array.isRequired,
};

export default GameFilter;