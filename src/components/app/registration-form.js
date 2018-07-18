import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../../actions/users';
import { login } from '../../actions/auth';
import {
	// Checkbox,
	// RadioButtonGroup,
	// SelectField,
	TextField,
	// Toggle,
	// DatePicker
} from 'redux-form-material-ui';
// import Input from './input';
import { Button } from '@material-ui/core';

import {required, nonEmpty, matches, length, isTrimmed, 
	isBggUser
} from '../../validators';
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
	onSubmit(values) {
		const {username, password, firstName, lastName, bggUsername} = values;
		const user = {username, password, firstName, lastName, bggUsername};
		return this.props
			.dispatch(registerUser(user))
			.then(() => this.props.dispatch(login(username, password)));
	}

	render() {
		return (
			<form
				className="login-form"
				onSubmit={this.props.handleSubmit(values =>
					this.onSubmit(values)
				)}>
				<div>
					<Field 
						floatingLabelText='First Name'
						component={TextField}
						type="text" 
						name="firstName" />

				</div>
				<div>
					<Field 
						floatingLabelText='Last Name'
						component={TextField}
						type="text" 
						name="lastName" />
				</div>
				<div>
					<Field
						floatingLabelText='BGG Username'
						component={TextField}
						type="text"
						name="bggUsername"
						// validate={isBggUser}
					/>
				</div>
				<div>
					<Field
						floatingLabelText='Username *'
						component={TextField}
						type="text"
						name="username"
						validate={[required, nonEmpty, isTrimmed]}
					/>
				</div>
				<div>
					<Field
						floatingLabelText='Password *'
						component={TextField}
						type="password"
						name="password"
						validate={[required, passwordLength, isTrimmed]}
					/>
				</div>
				<div>
					<Field
						floatingLabelText='Confirm Password *'
						component={TextField}
						type="password"
						name="passwordConfirm"
						validate={[required, nonEmpty, matchesPassword]}
					/>
				</div>
				<div>
					<Button
						type="submit"
						variant='outlined'
						disabled={this.props.pristine || this.props.submitting}>
							Register
					</Button>
				</div>
			</form>
		);
	}
}

export default reduxForm({
	form: 'registration',
	onSubmitFail: (errors, dispatch) =>
		dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);