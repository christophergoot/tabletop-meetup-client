import React from 'react';
import { connect } from 'react-redux';
import './collection-details.css';
import { updateGame, removeGame } from '../../actions/collections';

export class CollectionDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false
		};
	
		this.updateCollection = (e, game) => {
			e.preventDefault();
			const updatedGame = game;
			for (let i=0; i<e.currentTarget.length-2; i++) {
				const field = e.currentTarget[i];
				updatedGame[field.id] = field.checked;
			}
			this.props.dispatch(updateGame(updatedGame));
			this.setState({editing: false});
		};

		this.handleRemove = (e, game) => {
			e.preventDefault();
			this.props.dispatch(removeGame(game));
			this.setState({editing:false});			
		};

		this.createCheckbox = (label, labelId, checked) => {
			return (
				<div key={labelId}>
					<input 
						type="checkbox" 
						id={labelId}
						name={labelId}
						defaultChecked={checked} />
					<label htmlFor={labelId} >
						{label}
					</label>
				</div>
			); 
		};
	}

	render() {
		const { game } = this.props;
		const collectionFields = [
			{ owned: 'Own' },
			{ wantToPlay: 'Want to Play' },
			{ previousOwned: 'Prev. Owned' },
			{ forTrade: 'For Trade' },
			{ want: 'Want in Trade' },
			{ wantToBuy: 'Want to Buy' },
			{ preOrdered: 'Pre-ordered' },
			{ wishList: 'Wishlist' }
		];
		let collectionDetails = collectionFields.map((field, i) => {
			if (game[Object.keys(field)]) {
				const initials = (field[Object.keys(field)]).split(' ').map((word, i, arr) => {
					if (i === 0) return word[0].toUpperCase();
					if (i === arr.length-1) return word[0].toUpperCase();
					return ' ';
				}).filter(init => init !== ' ');
				return (
					// <p key={i}>{(field[Object.keys(field)])}</p>
					<span key={i}
						alt={(field[Object.keys(field)])}
						title={(field[Object.keys(field)])}
						className='collection-initials'>{initials}</span>
				);
			} 
			return ('');
		});
		if (collectionDetails.filter(el => el !== '').length === 0) {
			collectionDetails.length = 0;
			['Add','to List'].forEach((el,i) => collectionDetails.push(<p key={i}>{el}</p>));
		}
		const checkBoxes = collectionFields.map((field) => {
			return (this.createCheckbox(
				field[Object.keys(field)], 
				Object.keys(field),
				game[Object.keys(field)])
			);
		});
		if (this.state.editing) return (
			<div style={{position:'relative'}}>
				<div className='collection-details editing'>
					<form onSubmit={e => this.updateCollection(e,game)}>
						{checkBoxes}
						<button type='submit'>
				Save
						</button>
						<button onClick={() => this.setState({editing: false})}>
				Cancel
						</button>
						<button onClick={e => this.handleRemove(e,game)}>
				Remove Game
						</button>
					</form>
				</div>			

				<div 
					className='collection-details'
					onClick={() => this.setState({editing: true})} >
					{collectionDetails}
				</div>
			</div>
		);
		else return (
			<div 
				className='collection-details'
				onClick={() => this.setState({editing: true})} >
				{collectionDetails}
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		collection: state.collections.list
	};
}

export default connect(mapStateToProps)(CollectionDetails);