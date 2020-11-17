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
            />
            <FormikDatoVelger
                name="tilDato"
                validate={validerOppgaveDatoFelt}
                label="Frist *"
                ariaLabel="Datoen ppgaven er aktiv til"
            />
        </div>
    );
}

export default OpprettOppgaveVelgDatoer;
