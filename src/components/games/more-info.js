import React, { Component } from 'react';

import PropTypes from 'prop-types';
import './more-info.css';

class MoreInfo extends Component {
	render() {
		return (
			<div
				className='more-info'
				alt={this.props.info} 
				title={this.props.info}
			>
				? 
			</div>
		);
	}
}

MoreInfo.propTypes = {
	info: PropTypes.string
};

export default MoreInfo;