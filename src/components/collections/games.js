import React from 'react';
import { connect } from 'react-redux';
import { fetchCollection } from '../../actions/collections';
import GameFilter from '../games/game-filter';
import GameList from './game-list';
import GameSort from '../games/game-sort';
import GamesPaginate from '../games/games-paginate';
import requiresLogin from '../app/requires-login';


export class Games extends React.Component {
	componentDidMount() {
		const { userId } = this.props;
		this.props.dispatch(fetchCollection(userId));
	}

	updateList = (limit,page,sort,filter) => {
		this.props.dispatch(fetchCollection(this.props.userId, limit, page, sort, filter))
	}

	render() {
		const { collection } = this.props;
	
		return (
			<section>
				<h1>Manage Game List</h1>
				<GameFilter 
					collection={collection}
					updateList={this.updateList}
				/>
				<GameSort 
					collection={collection}
					updateList={this.updateList}
				/>
				<GamesPaginate 
					collection={collection}
					updateList={this.updateList}
				/>
				<GameList 
					games={collection.games}
				/>
			</section>
		);
	}
}

const mapStateToProps = state => {
	return ({
		// games: state.collections.list.games.find(c => c.userId === state.auth.currentUser.userId),
		collection: state.collections.list,
		userId: state.auth.currentUser.userId
	});
};

export default requiresLogin()(connect(mapStateToProps)(Games));

// number of players
//    ---[4]==[7]----
//  [no min]=======[no max]
//  [no min]====[5]---