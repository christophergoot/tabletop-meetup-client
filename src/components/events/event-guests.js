import React from 'react';
import './event-guests.css';
import { changeRsvp } from '../../actions/events';

export default class EventGuests extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isEditing: false };
	}

	handleRsvp = (eventId, rsvp, e) => {
		e.preventDefault();
		e.stopPropagation();
		this.props.dispatch(changeRsvp(eventId, rsvp));
		this.setState({isEditing: false});
	}

	handleEditRsvp = e => {
		e.preventDefault();
		e.stopPropagation();
		this.setState({isEditing: true});	
	}

	render() {
		const { guests, userId, eventId } = this.props;
		const guestList = [];
		let inviteResponse = '';

		guests.forEach((guest, i) => {
			let userName = `Guest ${i+1}`;
			const user = guest.user[0];
			if (user) userName = user.firstName + user.lastName || user.username;
			let status;
			switch (guest.rsvp) {
			case 'invited':
				status = {
					status: 'Invited',
					class: 'rsvp invited'
				};
				break;
			case 'maybe':
				status = {
					status: 'Maybe',
					class: 'rsvp maybe'
				};
				break;
			case 'no':
				status = {
					status: 'Declined',
					class: 'rsvp declined'
				};
				break;
			case 'yes':
				status = {
					status: 'Confirmed',
					class: 'rsvp confirmed'
				};
				break;
			case 'host':
				status = {
					status: 'Host',
					class: 'rsvp confirmed'
				};
				break;
			default: 
				status = {
					status: '',
					class: 'rsvp'
				};
			}

			if (guest.userId === userId) {
				if (this.state.isEditing === false) inviteResponse = (
					<span 
						onClick={e => this.handleEditRsvp(e)}
						className='change-rsvp'
						>
					Update RSVP
					</span>
				);
				else if (this.state.isEditing === true) {
					const possibleChoices = ['maybe', 'yes', 'no']; 
					inviteResponse = possibleChoices.map((opt, i) => 
						<div 
							className='change-rsvp'	
							onClick={e => this.handleRsvp(eventId, opt, e)} 
							key={i} >
							{opt}
						</div>
					);
				}
				guestList.splice(0,0,(
					<div key={i}>
						{userName} <span className={status.class}>({status.status})
						</span>
					</div>
				));
	
			} else guestList.push(
				<div key={i}>
					{userName} <span
						className={status.class}>({status.status})</span>
				</div>
			);
		});
		return (
			<div className="event-guests-wrapper">
				<div>
					{inviteResponse}
				</div>
				<div className="event-guestlist">
					{guestList}
				</div>
			</div>
		);
	}

}
