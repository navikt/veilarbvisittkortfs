import React from 'react';
import {Field, FieldProps} from "formik";
import {Select} from "nav-frontend-skjema";
import {injectIntl, InjectedIntlProps}  from 'react-intl';
import {getErrors} from "./formik-utils";

interface FormikInputProps {
    name: string;
    validate?: (value: string) => string | undefined;
    label: string;
    options: {value: string, label: string}[]
}

function FormikSelect ({name, validate, intl, label, options}: FormikInputProps & InjectedIntlProps) {
    return (
        <Field validate={validate} name={name}>
            {({ field, form}: FieldProps)  => {
                return(
                    <Select
                        id={name}
                        label= {intl.formatMessage({id: label})}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        name={name}
                        bredde="fullbredde"
                        feil={getErrors(form.errors,form.touched, name)}
                        value={field.value}
                    >
                        {options.map(  (option) => <option value={option.value}>{option.label}</option>)}
                    </Select>
                )
            }}
        </Field>
    )
}

export default injectIntl(FormikSelect);