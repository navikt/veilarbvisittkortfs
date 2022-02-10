import React from 'react';
import { Field, FieldProps } from 'formik';
import { Input, InputProps } from 'nav-frontend-skjema';
import { getErrors } from './formik-utils';

interface FormikInputProps {
	name: string;
	validate: (value: string) => string | undefined;
	label: string;
}

function FormikInput({
	name,
	validate,
	...inputProps
}: FormikInputProps & InputProps): React.ReactElement<FieldProps & InputProps> {
	return (
		<Field validate={validate} name={name}>
			{({ field, form }: FieldProps) => {
				const feil = getErrors(form.errors, form.touched, name);
				return (
					<Input
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						name={name}
						feil={feil && feil.feilmelding}
						value={field.value}
						{...inputProps}
					/>
				);
			}}
		</Field>
	);
}

export default FormikInput;
