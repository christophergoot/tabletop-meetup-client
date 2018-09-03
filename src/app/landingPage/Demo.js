import React from 'react';
import {connect} from 'react-redux';
import { Redirect} from 'react-router-dom';

// import LoginForm from './login-form';
import { login } from '../../actions/auth';
import Spinner from '../common/Spinner';



export class Demo extends React.Component {
	componentDidMount() {
		this.props.dispatch(login('demo-user','demo-password'));
	}

	render() {
		if (this.props.loggedIn) {
			return <Redirect to="/dashboard" />;
		}
		return (
			<Spinner />
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Demo);