import React from 'react';
// import { Formik } from 'formik';
import { TextField } from 'redux-form-material-ui';
import { Field } from 'redux-form';
// import { Button } from '@material-ui/core';

function NewLocation() {
	return (
		// <form>
		// 	<p>Add Location</p>
		<div>
			<div>
				<Field
					floatingLabelText='Location Name'
					component={TextField}
					type="text"
					name="locationName"
				/>
			</div>
			<div>
				<Field
					floatingLabelText='Address'
					component={TextField}
					type="text"
					name="locationAddress"
				/>
			</div>
			<div>
				<Field
					floatingLabelText='Description'
					component={TextField}
					type="text"
					name="locationDescription"
				/>
			</div>
			{/* <Button
				type="submit"
				variant='outlined'
			>
					Submit
			</Button> */}
		</div>
		// </form>
	);

}

export default NewLocation;