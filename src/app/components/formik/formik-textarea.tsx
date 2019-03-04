import React from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Field, getIn, FieldProps } from 'formik';

interface FormikTekstAreaProps {
    name: string;
    validate?: (value: string) => string | undefined;
}

function FormikTekstArea({name, validate}: FormikTekstAreaProps) {

    const defaultValidation = (value: string): string|undefined  => {
        let error: undefined | string;
        if (!value) {
            error = 'Påkreved';
        } else if (value.length > 500) {
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
            {({field, form}: FieldProps) => {
                const touched = getIn(form.touched, name);
                const errors = getIn(form.errors, name);
                return (
                    <Textarea
                        id={name}
                        textareaClass="skjemaelement__input input--fullbredde arbeidslistekommentar"
                        label="Kommentar"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        value={field.value}
                        name={name}
                        maxLength={500}
                        feil={errors && touched ? {feilmelding: errors} : undefined}
                    />);
            }}
        </Field>
    );
}

export default FormikTekstArea;