import React, { Component } from 'react';
import { connect } from 'react-redux';
import LandingPageComponent from './LandingPageComponent';
import { STATIC_MEDIA_FOLDER } from '../../config';
import { Redirect } from 'react-router-dom';

function mapStateToProps(state) {
	return {
		loggedIn: state.auth.currentUser !== null
	};
}

class LandingPageContainer extends Component {
	render() {
		if (this.props.loggedIn) {
			return <Redirect to="/dashboard" />;
		}
	
		return (
			<section>
				<LandingPageComponent 
					staticMediaFolder={STATIC_MEDIA_FOLDER}
				/>
			</section>
		);
	}
}

export default connect(
	mapStateToProps
)(LandingPageContainer);