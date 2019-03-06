import React from 'react';
import {Field, FieldProps} from "formik";
import {Input, NavFrontendInputProps} from "nav-frontend-skjema";
import {getErrors} from "./formik-utils";

interface InputProps{
    name: string;
    validate: (value: string) => string | undefined;
    label: string;
}

function FormikInput<P>({name, validate, ...inputProps}: InputProps & NavFrontendInputProps)
    : React.ReactElement<FieldProps & NavFrontendInputProps>{
    return (
        <Field validate={validate} name={name}>
            {({ field, form}: FieldProps)  => {
                const feil = getErrors(form.errors, form.touched, name);
                return (
                    <Input
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        name={name}
                        feil={feil}
                        value={field.value}
                        {...inputProps}
                    />
                )
            }}
        </Field>
    )
}

export default FormikInput;