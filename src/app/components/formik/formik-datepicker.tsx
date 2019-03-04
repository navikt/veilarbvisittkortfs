import React from 'react';
import {Field, FieldProps, getIn} from "formik";
import Datovelger from "nav-datovelger/dist/datovelger/Datovelger";
import SkjemaelementFeilmelding from "nav-frontend-skjema/lib/skjemaelement-feilmelding";
import "./datovelger.less";
import classNames from 'classnames';
import moment from 'moment';


interface FormikDatepickerProps {
    name: string;
}

export const erGyldigISODato = (isoDato: Date) => isoDato && moment(isoDato, moment.ISO_8601).isValid();

function FormikDatoVelger({name}: FormikDatepickerProps) {

    const validerDatoFeldt = (input: Date, fra: Date, valgfritt:boolean) => {
        let error;
        const inputDato = moment(new Date(input));
        const fraDato = moment(new Date(fra));
        if (!valgfritt && !input) {
            error = 'Du må angi en frist';

        } else if (input && !erGyldigISODato(input)) {
            error = 'Ugyldig dato';
        } else if (
            fra &&
            (fraDato.isAfter(inputDato, 'day'))
        ) {

            error = 'Fristen må være i dag eller senere'
        }
        return error;
    };

    return (
        <Field
            validate={(value:Date) => validerDatoFeldt(value, new Date(), true)}
            name={name}
            id={name}
        >
            {({ field, form: {errors, setFieldValue, values}}: FieldProps) => {
                const error = getIn(errors, name);
                const datePickerClassName = classNames( 'skjemaelement', 'datovelger', { 'datovelger--harFeil': error });
                return(
                    <div className={datePickerClassName}>
                        <Datovelger
                            input={{
                                id: name,
                                name,
                                placeholder: 'dd.mm.åååå',
                                ariaLabel: 'Frist:',
                                onChange: (value: string, evt: React.ChangeEvent<HTMLInputElement>) => {
                                    if(!value) {
                                        setFieldValue(field.name, '')
                                    }
                                    else {
                                        setFieldValue(field.name, value)
                                    }
                                }
                            }}
                            id="fristDatovelger"
                            onChange={(date: string) => {
                                console.log('inputdate changing', date);
                                setFieldValue(field.name, date)}}
                            valgtDato={field.value}
                        />
                        <SkjemaelementFeilmelding feil={error ? {feilmelding: error}: undefined}/>
                    </div>
                )
            }}
        </Field>
    )
}


export default FormikDatoVelger;
