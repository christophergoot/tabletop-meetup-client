import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FilterOption extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false,
			name: this.props.name,
			field: this.props.field,
			value: this.props.value
		};
	}
	onFilterApply(event) {
		event.preventDefault();
		this.props.applyFilter({
			field: this.props.field,
			value: true
		});
		this.setState({ isEditing: false });
	}
	onClearFilter(event) {
		event.preventDefault();
		this.props.clearFilter(
			this.props.field
		);
	}

	render() {
		// if filter is being edited
		if (this.state.isEditing) {
			return (
				<div className='range-slider-filter-box'>
					<div className='range-slider-group'>
						<label htmlFor={this.props.field}>
							<input type="checkbox" name={this.props.field} />
							{this.props.name}
						</label>
					</div>
					<div className='range-slider-button-group'>
						<button
							className='range-slider-control-button clear'
							onClick={() => this.setState({ isEditing: false })}>
							<i className="material-icons">
							clear
							</i></button>
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
		}
		// if filter is active, but not being edited
		else if (this.props.value === true) return (
			<div className='range-slider-filter-box'>
				<a onClick={() => this.setState({ isEditing: true })}
					className='range-slider-group'>
					{this.state.name}
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

		// if filter is inactive and not being edited
		else return (
			<a onClick={() => this.setState({ isEditing: true })}
				className='range-slider-filter-box'>
				{this.props.name}
			</a>
		);
	}
}

FilterOption.propTypes = {
	name: PropTypes.string.isRequired,
	field: PropTypes.string.isRequired,
	value: PropTypes.bool.isRequired,
	applyFilter: PropTypes.func.isRequired,
	clearFilter: PropTypes.func.isRequired,
};

export default FilterOption;

// let value = [this.props.range.min, this.props.range.max];
// if (this.props.value.length === 2) value = [this.props.value[0], this.props.value[1]];
// if (this.state.isEditing) return (
// 	<div className='range-slider-filter-box'>
// 		<div className='range-slider-group'>
// 			{this.buttonControlGroup('min')}
// 			<div className='range-slider-slider-container'>
// 				<Range
// 					value={[this.state.range.min, this.state.range.max]}
// 					min={this.props.range.min}
// 					max={this.props.range.max}
// 					step={this.props.step}
// 					defaultValue={value}
// 					tipFormatter={value => `${value} ${this.props.valueDescripter}`}
// 					onChange={value => this.onRangeChange(value)} />
// 				<span>{this.state.range.min || this.state.range.min}-{this.state.range.max || this.props.range.max} {this.props.valueDescripter}</span>
// 			</div>
// 			{this.buttonControlGroup('max')}
// 		</div>
// 		<div className='range-slider-button-group'>
// 			<button
// 				className='range-slider-control-button clear'
// 				onClick={e => this.setState({ isEditing: false })}>
// 				X
// 			</button>
// 			<button
// 				className='range-slider-control-button clear'
// 				onClick={e => this.onFilterApply(e)}>
// 				SAVE
// 			</button>
// 		</div>			
// 	</div>
// );
// else if (this.props.value.length === 2) return (
// 	<div className='range-slider-filter-box'>
// 		<a onClick={e => this.setState({ isEditing: true })}
// 			className='range-slider-group'>
// 			{this.state.range.min}-{this.state.range.max} {this.props.valueDescripter}
// 		</a>
// 		<button 
// 			className='range-slider-button-group range-slider-control-button clear'
// 			onClick={e => this.onClearFilter(e)}>
// 			X
// 		</button>
// 	</div>
// )
// else return (
// 	<a onClick={e => this.setState({ isEditing: true })}
// 		className='range-slider-filter-box'>
// 		{this.props.name}
// 	</a>
