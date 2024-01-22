import React from 'react';
import FormikTekstArea from '../../components/formik/formik-textarea';
import FormikDatoVelger from '../../components/formik/formik-datepicker';
import { validerFristFelt, validerHuskelappKommentarFelt } from '../../../util/formik-validation';

function HuskelappForm() {
    return (
        <>
            <FormikTekstArea name="kommentar" label="" maxLength={100} validate={validerHuskelappKommentarFelt} className="margin-bottom-s"/>
            <FormikDatoVelger
                name="frist"
                validate={validerFristFelt}
                label="Frist"
                ariaLabel="Frist for huskelapp"
            />
        </>
    );
}

export default HuskelappForm;
