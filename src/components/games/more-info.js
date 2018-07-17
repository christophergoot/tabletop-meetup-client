import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MoreInfo extends Component {
	render() {
		return (
			<span 
				alt={this.props.info} 
				title={this.props.info}
				style={{
					margin: '0 .25em',
					border: '1px solid lightgrey',
					borderRadius: '50%',
					height: '1em',
					width: '1em',
					fontSize: '.75em',
					lineHeight: '1em',
					cursor: 'pointer'
				}}	
			>
				? 
			</span>
		);
	}
}

MoreInfo.propTypes = {
	info: PropTypes.string
};

export default MoreInfo;