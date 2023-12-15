import React from 'react';
import { Field, FieldProps } from 'formik';
import { Select, SelectProps } from '@navikt/ds-react';
import { getErrors } from './formik-utils';
import './formik.less';

interface FormikInputProps {
    name: string;
    validate?: (value: string) => string | undefined;
    label: string;
    options: { value: string; label: string }[];
}

function FormikSelect({ name, validate, label, options, ...selectProps }: FormikInputProps & Partial<SelectProps>) {
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                const feil = getErrors(form.errors, form.touched, name);
                return (
                    <Select
                        className="formik-textarea"
                        id={name}
                        label={label}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        name={name}
                        error={feil}
                        {...selectProps}
                        value={field.value}
                    >
                        {options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                );
            }}
        </Field>
    );
}

export default FormikSelect;
