import React from "react";
import FormikDatoVelger from "../../../../components/formik/formik-datepicker";



function OpprettOppgaveVelgDatoer () {
    return (
        <div className="apabepa">
            <label className="skjemaelement__label">Aktiv fra*</label>
            <FormikDatoVelger name='fraDato'/>
            <label className="className">Frist* </label>
            <FormikDatoVelger name='tilDato'/>
        </div>
    )
}

export default OpprettOppgaveVelgDatoer;