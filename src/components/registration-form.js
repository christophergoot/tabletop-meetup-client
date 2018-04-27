import React from 'react';

export default function RegistrationForm(props) {
    return (
		<form>
			<input type="text" placeholder="Name" />
			<input type="text" placeholder="Username for boardgamegeek.com" />
			<input type="email" placeholder="E-Mail" />
			<input type="password" placeholder="Password" />
			<input type="submit" />
		</form>
	);
};