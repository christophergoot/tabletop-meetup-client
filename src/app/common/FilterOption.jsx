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