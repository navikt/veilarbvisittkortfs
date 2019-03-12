import React from "react";
import FormikDatoVelger from "../../../../components/formik/formik-datepicker";
import {validerOppgaveDatoFeldt} from "../../../../utils/formik-validation";

function OpprettOppgaveVelgDatoer () {
    return (
       <div className="velg-oppgave-datoer">
        <FormikDatoVelger
            name='fraDato'
            validate={validerOppgaveDatoFeldt}
            label="Aktiv fra*"
            ariaLabel="Datoen oppgaven er aktiv fra"
        />
        <FormikDatoVelger
            name='tilDato'
            validate={validerOppgaveDatoFeldt}
            label="Frist* "
            ariaLabel="Datoen ppgaven er aktiv til"
        />
       </div>
    )
}

export default OpprettOppgaveVelgDatoer;