import React, { Component } from 'react';
import './spinner.css';

class Spinner extends Component {
	render() {
		const title = this.props.tooltip || 'loading...';

		return (
			<div 
				className="lds-css ng-scope"
				style={{width:'1em', height:'1em'}}
			>
				<div 
					title={title}
					className="lds-eclipse"
				>
					<div></div>
				</div>
			</div>
		);
	}
}

export default Spinner;