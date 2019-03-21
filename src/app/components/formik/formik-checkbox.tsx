import React from 'react';
import { Field, FieldProps } from 'formik';
import { Checkbox } from 'nav-frontend-skjema';

interface FormikCheckboxProps {
    name: string;
    validate?: (value: string) => string | undefined;
    label: React.ReactNode;
}

function FormikCheckBox<P>({name, validate, label}: FormikCheckboxProps) {
    return (
        <Field name={name}>
            {({ field, form }: FieldProps)  => {
                return (
                    <Checkbox
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        name={name}
                        value={field.value}
                        label={label}
                    />
                );
            }}
        </Field>
    );
}

export default FormikCheckBox;