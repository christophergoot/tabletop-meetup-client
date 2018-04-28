import React from 'react';
import { MOCK_USER_EVENTS } from './mock-data';
import ListEvent from './list-event';


export default function Events(props) {
	const { events } = props;
	const eventList = events.map((event, i) => <ListEvent event={event} key={i} />);
	return (
		<section>
			<h2>List of Events</h2>
			{eventList}
		</section>
	);
}

Events.defaultProps = {
	events: MOCK_USER_EVENTS
};