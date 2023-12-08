import React from 'react';
import { Field, FieldProps } from 'formik';
import { Checkbox } from '@navikt/ds-react';

interface FormikCheckboxProps {
    name: string;
    validate?: (value: string) => string | undefined;
    label: React.ReactNode;
}

function FormikCheckBox({ name, label }: FormikCheckboxProps) {
    return (
        <Field name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <Checkbox onChange={form.handleChange} onBlur={form.handleBlur} name={name} value={field.value}>
                        {label}
                    </Checkbox>
                );
            }}
        </Field>
    );
}

export default FormikCheckBox;
