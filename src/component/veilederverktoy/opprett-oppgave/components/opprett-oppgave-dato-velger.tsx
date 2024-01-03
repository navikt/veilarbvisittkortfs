import React from 'react';
import { validerOppgaveDatoFelt } from '../../../../util/formik-validation';
import FormikDatoVelger from '../../../components/formik/formik-datepicker';

function OpprettOppgaveVelgDatoer() {
    return (
        <div className="oppgave-dato-container">
            <FormikDatoVelger
                name="fraDato"
                validate={validerOppgaveDatoFelt}
                label="Aktiv fra *"
                ariaLabel="Datoen oppgaven er aktiv fra"
                size="small"
            />
            <FormikDatoVelger
                name="tilDato"
                validate={validerOppgaveDatoFelt}
                label="Frist *"
                ariaLabel="Datoen oppgaven er aktiv til"
                size="small"
            />
        </div>
    );
}

export default OpprettOppgaveVelgDatoer;
