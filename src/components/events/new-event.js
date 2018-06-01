import React from 'react';
import NewLocation from './add-location';
// import { Formik } from 'formik';

// const EventForm = () => (
// 	<section>
// 		<h2>Create a new Event</h2>
// 		<Formik
// 		initialValues={{
// 			eventName: '',
// 			eventDate: new Date()
// 		}}
// 		onSubmit={(values) => this.createNewEvent(values)}
// 		/>
// 	</section>
// );



export default function NewEvent() {
	return (
		<section>
			<h2>Create a new Event</h2>
			<form>
				<label htmlFor="event-name">Event Name</label>
				<input type="text" id="event-name" />
				<label htmlFor="event-date">Event Date</label>
				<input type="date" id="event-date" />
				<label htmlFor="start-time">From</label>
				<input type="time" id="start-time" />
				<label htmlFor="end-time">To</label>
				<input type="time" id="end-time" />
				<h3>Location</h3>
				<NewLocation />
				<h3>Guests to Invite</h3>
				<ul>
					<li>Christopher Gutierrez (organizer)</li>
					<li>Juan Garcia (<a href="remove">remove</a>)</li>
					<li>Ampelios Berenike (<a href="remove">remove</a>)</li>
					<select name="guests">
						<option value="">Theron Iunius</option>
						<option value="">Kris Faithe</option>
						<option value="">Nazaire Nic</option>
						<option value="">Yvette Jacky</option>
						<option value=""></option>
						<option value="">add New Guest</option>
					</select>
				</ul>
				<input type="submit" />
			</form>
		</section>
	);
}