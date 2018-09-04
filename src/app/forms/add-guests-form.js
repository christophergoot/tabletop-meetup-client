import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  TextField } from 'redux-form-material-ui';
// import { AutoComplete as MUIAutoComplete } from 'material-ui';
import { Field, FieldArray } from 'redux-form';
// import { getAllUsers } from '../../actions/users';
// import { isRegisteredUser } from '../../validators';

class AddGuestsForm extends Component {

	renderField = ({ input, label, type, meta: { asyncValidating, touched, error } }) => (
		<div>
			<label>{label}</label>
			<div className={asyncValidating ? 'async-validating' : ''}>
				<input {...input} type={type} placeholder={label} />
				{touched && error && <span>{error}</span>}
			</div>
		</div>
)

	renderGuests = ({ fields, meta: { touched, error, submitFailed } }) => (
		<div>
			<ul>
			{(touched || submitFailed) && error && <span style={{ fontSize: '12px', lineHeight: '12px', color: 'rgb(244, 67, 54)' }}>{error}</span>}
				{fields.map((member, i) => (
					<li key={i}>
						<Field
							name={`${member}.username`} // sends field to server as '-0' 
							type="text"
							component={TextField}
							floatingLabelText="Tabletop Meetup Username"
							floatingLabelFocusStyle={{color: '#002A32'}} 
							autoComplete='off'
						// validate={isRegisteredUser}
						/>
						<button
							type="button"
							title="Remove Guest"
							onClick={() => fields.remove(i)}
						>X</button>
					</li>
				))}
			</ul>
					<div
						style={{ display: 'inline-block', width: '256px', cursor: 'pointer' }}
						title='Add Registered User'
						onClick={() => fields.push({})}
					>
						Add Registed User
					</div>
					<button
						type='button'
						title='Add Registered User'
						onClick={() => fields.push({})}
					>+</button>

		</div>
	);


	render() {
		// const formValues = this.props.form.registeredFields;
		return (
			<div>

				{/* {this.guestFields(this.props.guestList, this.props.allUsers)}
				<a onClick={() => this.props.addGuest()}>Add Additional Guest</a> */}
				<FieldArray name="guests" component={this.renderGuests} />
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		form: state.form.newEvent
	};
}

export default connect(mapStateToProps)(AddGuestsForm);