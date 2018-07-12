import React from 'react';
import './collection-details.css';
import { updateGame } from '../../actions/collections';

export default class CollectionDetails extends React.Component {
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
			if (game[Object.keys(field)]) return (
				<p key={i}>{(field[Object.keys(field)])}</p>
			);
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
			<div className='collection-details editing'>
				<form onSubmit={e => this.updateCollection(e,game)}>
					{checkBoxes}
					<button type='submit'>
						Save
					</button>
					<button onClick={() => this.setState({editing: false})}>
						Cancel
					</button>
				</form>
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