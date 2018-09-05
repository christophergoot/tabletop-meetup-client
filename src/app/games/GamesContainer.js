import React from 'react';
import { connect } from 'react-redux';
import { fetchCollection } from '../../actions/collections';
import requiresLogin from '../common/requires-login';
import GamesComponent from './GamesComponent';

export class Games extends React.Component {
	componentDidMount() {
		this.props.dispatch(fetchCollection(this.props.userId));
	}
	updateList = (limit,page,sort,filter) => {
		this.props.dispatch(fetchCollection(this.props.userId, limit, page, sort, filter));
	}

	render() {
		return <GamesComponent
			collection={this.props.collection}
			userId={this.props.userId}
			updateList={this.updateList}
			dispatch={this.props.dispatch}
		/>;
	}
}

const mapStateToProps = state => {
	return ({
		collection: state.collections.list,
		userId: state.auth.currentUser.userId
	});
};

export default requiresLogin()(connect(mapStateToProps)(Games));