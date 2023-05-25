import React from 'react';
import { Field, FieldProps } from 'formik';
import { getErrors } from './formik-utils';
import {Textarea, TextareaProps} from "@navikt/ds-react";

interface TekstAreaProps {
    name: string;
    validate?: (value: string) => string | undefined;
    label: string;
}

type OmitProps = 'onChange' | 'value' | 'feil' | 'onBlur' | 'label';

function FormikTekstArea({ name, validate, label, ...textAreaProps }: TekstAreaProps & Omit<TextareaProps, OmitProps>) {
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                const feil = getErrors(form.errors, form.touched, name);
                return (
                    <Textarea
                        id={name}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        value={field.value}
                        error={feil && feil.feilmelding}
                        label={label}
                        {...textAreaProps}
                    />
                );
            }}
        </Field>
    );
}

export default FormikTekstArea;
