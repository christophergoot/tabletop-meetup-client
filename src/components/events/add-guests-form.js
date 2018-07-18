import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AutoComplete, TextField } from 'redux-form-material-ui';
// import { AutoComplete as MUIAutoComplete } from 'material-ui';
import { Field, FieldArray } from 'redux-form';
import { getAllUsers } from '../../actions/users';
import { isRegisteredUser } from '../../validators';

class AddGuestsForm extends Component {
	// componentDidMount() {
	// 	this.props.dispatch(getAllUsers());
	// }
	// addGuestField(){
	// 	// write to the store new array
	// 	this.props.addGuest();
	// }

	// fuzzyFilter(searchQuery, key) {
	// 	const compareString = key.toLowerCase();
	// 	let searchText = '';
	// 	if (searchQuery) searchText = searchQuery.toLowerCase();
	// 	let searchTextIndex = 0;
	// 	for (let index = 0; index < key.length; index++) {
	// 		if (compareString[index] === searchText[searchTextIndex]) {
	// 			searchTextIndex += 1;
	// 		}
	// 	}
	// 	return searchTextIndex === searchText.length;
	// }

	// handleSearchByTextChange(text){

	// 	console.log('autocomplete text change in add guests form', text);
	// }
	// guestFields(guests, allUsers) {
	// 	const markup = guests.map((guest,i) => 
	// 		<div key={i}>
	// 			{/* <Field
	// 				name={'guest-' + i}
	// 				component={AutoComplete}
	// 				floatingLabelText="Add User"
	// 				openOnFocus
	// 				filter={this.fuzzyFilter}
	// 				dataSourceConfig={{text: 'displayName', value: 'userId'}}
	// 				dataSource={allUsers}
	// 			/> */}
	// 			<Field
	// 				name={'guest-' + i}
	// 				label="Search Suggestions"
	// 				component={AutoComplete}
	// 				floatingLabelText="Search By Suggestions"
	// 				openOnFocus
	// 				filter={this.fuzzyFilter}
	// 				dataSourceConfig={{text: 'displayName', value: 'userId'}}
	// 				dataSource={allUsers}
	// 				onChange={this.handleSearchByTextChange} //handle the onChange event by handleSearchByTextChange func
	// 				onBlur={() => {}}
	// 				// value:
	// 			/>
	// 			<button onClick={() => this.props.removeGuest(i)}>
	// 				X
	// 			</button>
	// 		</div>
	// 	);
	// 	return markup;
	// }

	// renderField = ({ input, label, type, meta: { touched, error } }) => (
	// 	<div>
	// 	  <label>{label}</label>
	// 	  <div>
	// 		<input {...input} type={type} placeholder={label} />
	// 		{touched && error && <span>{error}</span>}
	// 	  </div>
	// 	</div>
	//   );
	  
	renderField = ({ input, label, type, meta: { asyncValidating, touched, error } }) => (
		<div>
			<label>{label}</label>
			<div className={asyncValidating ? 'async-validating' : ''}>
				<input {...input} type={type} placeholder={label} />
				{touched && error && <span>{error}</span>}
			</div>
		</div>
)

	renderGuests = ({ fields, meta: { touched, error, submitFailed } }) => (
		<ul>
		  {fields.map((guest, i) => (
			<li key={i}>
			  <Field
				name={`${guest}-${i}`}
				type="text"
				component={TextField}
				floatingLabelText="Tabletop Meetup Username"
				autoComplete='off'
				// validate={isRegisteredUser}
			  />
			  <button
				type="button"
				title="Remove Guest"
				onClick={() => fields.remove(i)}
			  >X</button>
			</li>
		  ))}
		<li>
			<div 
				style={{display: 'inline-block', width: '256px', cursor: 'pointer'}}
				title='Add Registered User'
				onClick={() => fields.push({})}
			>
				Add Registed User
			</div>
			<button 
				type='button'
				title='Add Registered User'
				onClick={() => fields.push({})}
			>+</button>
			{(touched || submitFailed) && error && <span>{error}</span>}
		</li>

		</ul>
	  );
	  	

	render() {
		// const formValues = this.props.form.registeredFields;
		return (
			<div>
				{/* {this.guestFields(this.props.guestList, this.props.allUsers)}
				<a onClick={() => this.props.addGuest()}>Add Additional Guest</a> */}
				<FieldArray name="guests" component={this.renderGuests} />
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		form: state.form.newEvent
	};
}

export default connect(mapStateToProps)(AddGuestsForm);