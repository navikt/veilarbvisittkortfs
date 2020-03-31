import React from 'react';
import { Textarea, TextareaProps } from 'nav-frontend-skjema';
import { Field, FieldProps } from 'formik';
import { getErrors } from './formik-utils';
import { Omit } from '../../../types/omit-type';
import { injectIntl, InjectedIntlProps } from 'react-intl';

interface TekstAreaProps {
    name: string;
    validate?: (value: string) => string | undefined;
    label: string;
}

type OmitProps = 'onChange' | 'value' | 'feil' | 'onBlur' | 'label';

function FormikTekstArea({
    name,
    validate,
    label,
    intl,
    ...textAreaProps
}: TekstAreaProps & InjectedIntlProps & Omit<TextareaProps, OmitProps>) {
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
                        feil={feil}
                        label={label}

                        {...textAreaProps}
                    />
                );
            }}
        </Field>
    );
}

export default injectIntl(FormikTekstArea);
