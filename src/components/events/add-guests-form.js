import React, { Component } from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

function guestField(props,i) {
	return (
		<Field
			floatingLabelText='Guest'
			value={props.host}
			component={TextField}
			type="text"
			name={'guest-' + i}
		/>
	);
}

class AddGuestsForm extends Component {
	constructor(props) {
		super(props);
		this.state = ({
			guestFields: [
				(<div key='0'>
					{guestField(props,0)}
				</div>)
			]
		});
	}
	addGuestField(){
		this.setState({
			guestFields: [
				...this.state.guestFields,
				(
					<div key={this.state.guestFields.length}>
						{guestField(this.props, this.state.guestFields.length)}
					</div>
				)
			]
		});
	}

	render() {

		return (
			<div>
				{this.state.guestFields}
				<a onClick={() => this.addGuestField()}>Add Additional Guest</a>
			</div>
		);
	}
}

export default AddGuestsForm;