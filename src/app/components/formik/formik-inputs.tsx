import React from 'react';
import { Field, FieldProps, getIn } from 'formik';
import { Input } from 'nav-frontend-skjema';

interface FormikInputProps {
    name: string;
    validate?: (value: string) => string | undefined;
}

function FormikInput ({name, validate}: FormikInputProps) {

    const defaultValidation = (value: string): string|undefined  => {
        let error: undefined | string;
        if (!value) {
            error = 'Påkreved';
        } else if (value.length > 15) {
            error = 'Før langt';
        }
        return error;
    };

    const validateFunc = (value: string): string | undefined => {
        if (validate) {
            return validate(value);
        }
        return defaultValidation(value);
    };

    return (
        <Field validate={validateFunc} name={name}>
            {({ field, form}: FieldProps)  => {
                const touched = getIn(form.touched, name);
                const errors = getIn(form.errors, name);
                return(
                    <Input
                        id={name}
                        label="Overskrift"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        name={name}
                        bredde="M"
                        feil={errors && touched ? {feilmelding: errors} : undefined}
                        value={field.value}
                    />
                );
            }}
        </Field>
    );
}

export default FormikInput;