import React from 'react';
import { Field, FieldProps } from 'formik';
import { TextField, TextFieldProps } from '@navikt/ds-react';
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
}: FormikInputProps & TextFieldProps): React.ReactElement<FieldProps & TextFieldProps> {
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                const feil = getErrors(form.errors, form.touched, name);
                return (
                    <TextField
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        name={name}
                        error={feil && feil.feilmelding}
                        value={field.value}
                        {...inputProps}
                    />
                );
            }}
        </Field>
    );
}

export default FormikInput;
