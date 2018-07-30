import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { TextField, TimePicker, DatePicker } from 'redux-form-material-ui';
// import Input from './input';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { required } from '../../validators';
import './new-event-form.css';

import AddGuestsForm from './add-guests-form';
import { getAllUsers } from '../../actions/users';
import { createNewEvent, addAdditionalGuest, initializeGuestList, removeGuestFromGuestList } from '../../actions/events';

class EndDateTime extends React.Component {
	constructor(props) {
		super(props);
		this.state=({
			addEndTime: false,
			addEndDate: false
		});
	}
	render() {
		let fields = [];
		if (this.state.addEndDate) fields.push(
			<div className='date-time-input'>
				<Field
					floatingLabelText='End Date'
					component={DatePicker}
					format={null}
					type="text"
					name="endDate"
				/>
				<button onClick={() => this.setState({ addEndDate: false })}>
					X
				</button>
			</div>
		);
		else fields.push(
			<button onClick={() => this.setState({ addEndDate: true })}>
				+ End Date
			</button>
		);

		if (this.state.addEndTime) fields.push(
			<div className='date-time-input'>
				<Field
					floatingLabelText='End Time'
					format={null}
					component={TimePicker}
					type="text"
					name="endTime"
				/>
				<button onClick={() => this.setState({ addEndTime: false })}>
					X
				</button>
			</div>
		);
		else fields.push(
			<button onClick={() => this.setState({addEndTime: true})}>
				+ End Time
			</button>
		);
		const keyedFields = fields.map((el, i) => {
			return {...el, key:i+1};
		});
		return (
			<div>
				{keyedFields}
			</div>	
		);

	}
}

export class NewEventForm extends React.Component {
	componentDidMount() {
		this.props.dispatch(getAllUsers());
		const host = {
			userId: this.props.currentUser.userId,
			displayName: this.props.currentUser.displayName
		};
		this.props.dispatch(initializeGuestList(host));
	}

	onSubmit(values) {
		const event = {...values};
		return this.props.dispatch(createNewEvent(event));
	}

	// redirect() {
	// 	if (this.props.redirect) {
	// 		this.props.dispatch(redirectToUrl(null));
	// 		return <Redirect to={this.props.redirect} />;
	// 	}
	// }
	render() {
		const addGuest = () => this.props.dispatch(addAdditionalGuest());
		const removeGuest = (i) => this.props.dispatch(removeGuestFromGuestList(i));
		return (
			<form
				className='login-form new-event'
				onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
			>
				<div className='section'>
					<div>
						<Field
							floatingLabelText='Event Name'
							component={TextField}
							type="text"
							name="name"
							floatingLabelFocusStyle={{color: '#002A32'}} 
							// validate={[required, nonEmpty]}
						/>
					</div>
					<div className='date-time-input'>
						<Field
							floatingLabelText='Start Date'
							component={DatePicker}
							format={null}
							name="startDate"
							validate={required}
						/>
					</div>
					<div className='date-time-input'>
						<Field
							floatingLabelText='Start Time'
							component={TimePicker}
							name="startTime"
							format={null}
							validate={required}
						/>
					</div>
					<EndDateTime />

				</div>

				<div className='section'>
					<h3>Location</h3>
					<div>
						<div>
							<Field
								floatingLabelText='Location Name'
								component={TextField}
								type="text"
								name="locationName"
								floatingLabelFocusStyle={{color: '#002A32'}} 
							/>
						</div>
						<div>
							<Field
								floatingLabelText='Address'
								component={TextField}
								type="text"
								floatingLabelFocusStyle={{color: '#002A32'}} 
								name="locationAddress"
							/>
						</div>
						<div>
							<Field
								floatingLabelText='Description'
								component={TextField}
								type="text"
								floatingLabelFocusStyle={{color: '#002A32'}} 
								name="locationDescription"
							/>
						</div>
					</div>
				</div>					
				<div className='section'>
	
					<h3>Guests to Invite</h3>
					<AddGuestsForm 
						// getAllUsers={this.getAllUsers}
						removeGuest={removeGuest}
						addGuest={addGuest}
						allUsers={this.props.allUsers}
						guestList={this.props.guestList}
					/>

				</div>

				<div>
					<Field
						floatingLabelText='Additional Information'
						component={TextField}
						type="textArea"
						name="additionalInfo"
					/>
				</div>
				<div>
					<Button
						type="submit"
						variant='outlined'
						disabled={this.props.pristine || this.props.submitting}>
								Create new event
					</Button>
				</div>
				{/* {this.redirect()} */}
			</form>
		);
	}
}


const mapStateToProps = (state) => ({
	allUsers: state.events.allUsers,
	currentUser: state.auth.currentUser,
	guestList: state.events.guestList,
	redirect: state.events.redirect,
});

NewEventForm = connect(mapStateToProps)(NewEventForm);

export default reduxForm({
	form: 'newEvent',
	onsSubmitFail: (errors, dispatch) => 
		dispatch(focus('newEvent', Object.keys(errors)[0]))
})(NewEventForm);
