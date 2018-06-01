import React from 'react';
import { Formik } from 'formik';

function NewLocation() {
	return (
		<div>
			<p>Add Location</p>
			<Formik 
				initialValues={{
					name: '',
					address: '',
					description: ''
				}}
				validate={values => {
					let errors = {};
					if (!values.name) {
						errors.name = 'Required';
					} 
					return errors;
				}}
				onSubmit={(
					values,
					{ setSubmitting, setErrors }
				) => {
					alert(values)
						.then(() => {
							setSubmitting(false);
						},
						errors => {
							setSubmitting(false);
							// Maybe transform your API's errors into the same shape as Formik's
							setErrors(alert(errors));
						});
				}
				}
				render={({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Location Name"
							name="name"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.name}
						/>
						{touched.name && errors.name && <div>{errors.name}</div>}
						<input
							type="text"
							placeholder="Address"
							name="address"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.address}
						/>
						{touched.address && errors.address && <div>{errors.address}</div>}
						<input
							type="textArea"
							placeholder="Description"
							name="description"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.description}
						/>
						{touched.description && errors.description && <div>{errors.description}</div>}
						<button type="submit" disabled={isSubmitting}>
						Submit
						</button>
					</form>
				)}
			/>
		</div>
	);

}

export default NewLocation;