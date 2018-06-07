import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import './range-slider.css';
import React, { Component } from 'react';
// import Tooltip from 'rc-tooltip';
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
		}
	}

	onRangeChange = (value) => {
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
	onFilterApply = event => {
		this.props.applyFilter({
			field: this.props.field,
			range: {
				min: this.state.range.min,
				max: this.state.range.max
			}
		})
		this.setState({ isEditing: false })
	}
	onClearFilter = event => {
		event.preventDefault();
		this.props.clearFilter(
			this.props.field
		)
	}

	buttonControlGroup = (rangeSide) => {
		// const { rangeSide } = side;
		return (
			<div className='range-slider-button-group'>
			<button 
				className='range-slider-control-button step'
				onClick={e => this.stepValue(e,rangeSide,-1)} >
				&lt;
			</button>
			<button 
				className='range-slider-control-button step'
				onClick={e => this.stepValue(e,rangeSide,1)} >
				&gt;
			</button>
			<button className='range-slider-control-button clear'>clear</button>
		</div>
	
		)
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
						onClick={e => this.setState({ isEditing: false })}>
						X
					</button>
					<button
						className='range-slider-control-button clear'
						onClick={e => this.onFilterApply(e)}>
						SAVE
					</button>
				</div>			
			</div>
		);
		else if (this.props.value[0] && this.props.value[1]) return (
			<div className='range-slider-filter-box'>
				<a onClick={e => this.setState({ isEditing: true })}
					className='range-slider-group'>
					{this.state.range.min}-{this.state.range.max} {this.props.valueDescripter}
				</a>
				<button 
					className='range-slider-button-group range-slider-control-button clear'
					onClick={e => this.onClearFilter(e)}>
					X
				</button>
			</div>
		)
		else return (
			<a onClick={e => this.setState({ isEditing: true })}
				className='range-slider-filter-box'>
				{this.props.name}
			</a>
		)
	}
}

export default RangeSlider;