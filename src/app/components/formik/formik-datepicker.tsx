import React from 'react';
import { Field, FieldProps, getIn } from 'formik';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import './datovelger.less';
import classNames from 'classnames';
import moment from 'moment';

interface FormikDatepickerProps {
    name: string;
    validate: (value: string) => string | undefined;
    label: string;
    ariaLabel: string;
}

function FormikDatoVelger({name, validate, label, ariaLabel}: FormikDatepickerProps) {
    return (
        <Field
            validate={validate}
            name={name}
            id={name}
        >
            {({ field, form: {errors, setFieldValue}}: FieldProps) => {
                const error = getIn(errors, name);
                const datePickerClassName = classNames( 'skjemaelement', 'datovelger', { 'datovelger--harFeil': error });
                return(
                    <div className={datePickerClassName}>
                        <span className="skjemaelement__label">{label}</span>
                        <Datovelger
                            input={{
                                id: name,
                                name,
                                placeholder: 'dd.mm.åååå',
                                ariaLabel,
                                onChange: (value: string) => {
                                    console.log('value', value);
                                    setFieldValue(field.name, value)
                                }
                            }}
                            id="fristDatovelger"
                            onChange={(date: string) => {
                                // HAKS FØR ATT NAV-DATOVELGER  IKKE STØTTER OPTIONAL DATO
                                console.log('isValid', moment(date).isValid());
                                console.log('data', date);
                                if (!field.value && !moment(date).isValid()) {
                                    return;
                                }
                                setFieldValue(field.name, date); }
                            }
                            valgtDato={field.value}
                        />
                        <SkjemaelementFeilmelding feil={error ? {feilmelding: error} : undefined}/>
                    </div>
                );
            }}
        </Field>
    );
}

export default FormikDatoVelger;
