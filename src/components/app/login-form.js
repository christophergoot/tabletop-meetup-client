import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
// import Input from './input';
import { TextField } from 'redux-form-material-ui';
import Button from '@material-ui/core/Button';
import { login } from '../../actions/auth';
import { required, nonEmpty } from '../../validators';

export class LoginForm extends React.Component {
	onSubmit(values) {
		return this.props.dispatch(login(values.username, values.password));
	}

	render() {
		let error;
		if (this.props.error) {
			error = (
				<div className="form-error" aria-live="polite">
					{this.props.error}
				</div>
			);
		}
		return (
			<form
				className="login-form"
				onSubmit={this.props.handleSubmit(values =>
					this.onSubmit(values))}
			>
				{error}
				<div>
					<Field
						floatingLabelText='Username'
						component={TextField}
						type="text"
						name="username"
						id="username"
						validate={[required, nonEmpty]}
					/>
				</div>
				<div>
					<Field
						floatingLabelText='Password'
						component={TextField}
						type="password"
						name="password"
						id="password"
						validate={[required, nonEmpty]}
					/>
				</div>
				<div>
					<Button 
						type="submit"
						variant='outlined'
						disabled={this.props.pristine || this.props.submitting}>
						Log in
					</Button>
				</div>
			</form>
		);
	}
}

export default reduxForm({
	form: 'login',
	onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username')),
})(LoginForm);
