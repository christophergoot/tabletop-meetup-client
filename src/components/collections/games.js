import React from 'react';
import { connect } from 'react-redux';
import { fetchCollection } from '../../actions/collections';
import GameFilter from '../games/game-filter';
import GameList from './game-list';
import GameListSummary from './game-list-summary';
import GameSort from '../games/game-sort';
import GamesPaginate from '../games/games-paginate';
import requiresLogin from '../app/requires-login';
import { FilterMethods } from '../games/filter-methods-base-set'
import AddGame from '../games/add-game';

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
	
		const filterMethods = [
			...FilterMethods,
			{
				name: 'Number of Plays',
				field: 'numPlays',
				range: { min: 0, max: 1000},
				step: 10,
				valueDescripter: 'Plays'
			},
		]

		return (
			<section>
				<h1>Manage Game List</h1>
				<AddGame />
				<GameFilter 
					collection={collection}
					updateList={this.updateList}
					filterMethods={filterMethods}
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