import React from 'react';
import {Field, FieldProps, getIn} from "formik";
import Datovelger from "nav-datovelger/dist/datovelger/Datovelger";
import SkjemaelementFeilmelding from "nav-frontend-skjema/lib/skjemaelement-feilmelding";
import {moment} from "../../../App";


interface FormikDatepickerProps {
    name: string;
}

export const erGyldigISODato = (isoDato: Date) => isoDato && moment(isoDato, moment.ISO_8601).isValid();

function FormikDatoVelger({name}: FormikDatepickerProps) {

    const validerDatoFeldt = (input: Date, fra: Date, valgfritt:boolean) => {
        let error;
        const inputDato = moment(input);
        const fraDato = moment(fra);
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
            {({ field, form: {errors, setFieldValue}}: FieldProps) => {
                const error = getIn(errors, name);
                return(
                    <>
                        <Datovelger
                            input={{
                                id: 'fristInput',
                                name: 'frist',
                                placeholder: 'dd.mm.åååå',
                                ariaLabel: 'Frist:',
                                onChange: (value: string) => setFieldValue(field.name, new Date(value)),
                            }}
                            id="fristDatovelger"
                            onChange={(date: Date) => setFieldValue(field.name, date)}
                            dato={field.value}
                        />
                        <SkjemaelementFeilmelding feil={error ? {feilmelding: error}: undefined}/>
                    </>
                )
            }}
        </Field>
    )
}


export default FormikDatoVelger;
