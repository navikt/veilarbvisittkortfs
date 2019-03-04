import React from "react";
import FormikDatoVelger from "../../../../components/formik/formik-datepicker";



function OpprettOppgaveVelgDatoer () {
    return (
       <div className="apabepa">
           <span>Aktiv fra*</span>
        <FormikDatoVelger name='fraDato'/>
           <span>Frist* </span>
        <FormikDatoVelger name='tilDato'/>
       </div>
    )
}

export default OpprettOppgaveVelgDatoer;