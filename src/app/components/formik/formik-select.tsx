import React from 'react';
import {Field, FieldProps} from "formik";
import {Select, SelectProps} from "nav-frontend-skjema";
import {injectIntl, InjectedIntlProps}  from 'react-intl';
import {getErrors} from "./formik-utils";
import {Partial} from "../../../types/partial-type";

interface FormikInputProps {
    name: string;
    validate?: (value: string) => string | undefined;
    labelId: string;
    options: {value: string, label: string}[]
}

function FormikSelect ({name, validate, intl, labelId, options, ...selectProps}: FormikInputProps & InjectedIntlProps & Partial<SelectProps>) {
    return (
        <Field validate={validate} name={name}>
            {({ field, form}: FieldProps)  => {
                const feil = getErrors(form.errors,form.touched, name);
                const label = intl.formatMessage({id: labelId});
                return(
                    <Select
                        id={name}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        name={name}
                        label={label}
                        feil={feil}
                        {...selectProps}
                        value={field.value}
                    >
                        {options.map(  (option) =>
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        )}
                    </Select>
                )
            }}
        </Field>
    )
}

export default injectIntl(FormikSelect);