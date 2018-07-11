import React, { Component } from 'react';
import './spinner.css';

class Spinner extends Component {
	render() {
		const title = this.props.tooltip || 'loading...';

		return (
			<div title={title} className="lds-css ng-scope" style={{position:'relative'}}>
				<div style={{width:'100%',height:'100%'}} className="lds-disk">
					<div>
						<div>
						</div>
						<div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Spinner;

