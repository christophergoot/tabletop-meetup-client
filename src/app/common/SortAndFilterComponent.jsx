import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import FilterOption from './FilterOption';
import './sort-and-filter.css';
import { STATIC_MEDIA_FOLDER } from '../../config';


import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class RangeSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false,
			field: this.props.field,
			range: {
				min: this.props.range.min,
				max: this.props.range.max
			}
		};
	}

	onRangeChange(value) {
		this.setState({
			range: {
				min: value[0],
				max: value[1]
			}
		});
	}
	stepValue(event,field,step) {
		event.preventDefault();
		this.setState({
			range: {
				...this.state.range,
				[field]: this.state.range[field] + (step * this.props.step)
			}
		});
	}
	onFilterApply(event) {
		event.preventDefault();
		this.props.applyFilter({
			field: this.props.field,
			range: {
				min: this.state.range.min,
				max: this.state.range.max
			}
		});
		this.setState({ isEditing: false });
	}
	onClearFilter(event) {
		event.preventDefault();
		this.props.clearFilter(
			this.props.field
		);
	}

	buttonControlGroup(rangeSide) {
		return (
			<div className='range-slider-button-group'>
				<button 
					className='range-slider-control-button step'
					onClick={e => this.stepValue(e,rangeSide,-1)} >
					<i className="material-icons">
						arrow_left
					</i>
				</button>
				<button 
					className='range-slider-control-button step'
					onClick={e => this.stepValue(e,rangeSide,1)} >
					<i className="material-icons">
						arrow_right
					</i>
				</button>
			</div>	
		);
	}

	render() {
		let value = [this.props.range.min, this.props.range.max];
		if (this.props.value.length === 2) value = [this.props.value[0], this.props.value[1]];
		if (this.state.isEditing) return (
			<div className='range-slider-filter-box'>
				<div className='range-slider-group'>
					{this.buttonControlGroup('min')}
					<div className='range-slider-slider-container'>
						<Range
							value={[this.state.range.min, this.state.range.max]}
							min={this.props.range.min}
							max={this.props.range.max}
							step={this.props.step}
							defaultValue={value}
							tipFormatter={value => `${value} ${this.props.valueDescripter}`}
							onChange={value => this.onRangeChange(value)} />
						<span>{this.state.range.min || this.state.range.min}-{this.state.range.max || this.props.range.max} {this.props.valueDescripter}</span>
					</div>
					{this.buttonControlGroup('max')}
				</div>
				<div className='range-slider-button-group'>
					<button
						className='range-slider-control-button clear'
						onClick={() => this.setState({ isEditing: false })}>
						<i className="material-icons">
							clear
						</i>
					</button>
					<button
						className='range-slider-control-button clear'
						onClick={e => this.onFilterApply(e)}>
						<i className="material-icons">
							check
						</i>
					</button>
				</div>			
			</div>
		);
		else if (this.props.value.length === 2) return (
			<div className='range-slider-filter-box'>
				<a onClick={() => this.setState({ isEditing: true })}
					className='range-slider-group'>
					{this.state.range.min}-{this.state.range.max} {this.props.valueDescripter}
				</a>
				<div className='range-slider-button-group'>
					<button 
						className='range-slider-button-group range-slider-control-button clear'
						onClick={e => this.onClearFilter(e)}>
						<i className="material-icons">
								clear
						</i>
					</button>
				</div>
			</div>
		);
		else return (
			<a onClick={() => this.setState({ isEditing: true })}
				className='range-slider-filter-box'>
				{this.props.name}
			</a>
		);
	}
}


class GameFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = ({
			isOpen: false
		});
	}

	GameSort(props) {
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
		const { sort, limit, filters } = props.collection;
	
		const listItems = methods.map((el, i) => {
			let className = 'sort';
			let sortDirection = 1;
			if (el.method === sort.method) {
				className = 'sort selected';
				sortDirection = sort.direction * -1;
				if (sortDirection === 1) className += ' asc';
				else if (sortDirection === -1) className += ' desc';
			}
			if (i === 0) className += ' left';
			else if (i === methods.length-1) className += ' right';
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
							filters
						)} 
				>
					{el.name}
				</li>
			);
		});
	
		return (
			<div className='sort-container'>
				<ul>
					{listItems}
				</ul>
			</div>
		);
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

		const filterTitle = type => (
			<div className={'game-filter-title ' + type}>
			Sort & Filter
				<img src={STATIC_MEDIA_FOLDER+'filter-icon.svg'}
					alt='filter icon'
					style={{
						height: '1em',
						width: '1em',
						marginLeft: '1em'}} />
			</div>
		);
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
			<div className='game-filter'>
				<h4 onClick={() => this.setState({ isOpen: false })}>
					{filterTitle('open')}
				</h4>
				
				<ul className='game-filter-container open'>
					<li>
						<this.GameSort 
							collection={this.props.collection}
							updateList={this.props.updateList}
						/>
					</li>
					{listItems}
				</ul>
			</div>);
		else return (
			<div className='game-filter'>
				<h4 onClick={() => this.setState({ isOpen: true })}>
					{filterTitle('closed')}
				</h4>
				<ul className='game-filter-container closed'>
					<li>
						<this.GameSort 
							collection={this.props.collection}
							updateList={this.props.updateList}
						/>
					</li>
					{listItems}
				</ul>
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