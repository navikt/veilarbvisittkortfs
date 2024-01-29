import React from 'react';
import FormikTekstArea from '../../components/formik/formik-textarea';
import { validerFristFelt, validerHuskelappKommentarFelt } from '../../../util/formik-validation';
import FormikDatoVelger from '../../components/formik/formik-datepicker';
import '../huskelapp.less';

export function HuskelappForm() {
    return (
        <>
            <FormikTekstArea
                name="kommentar"
                label=""
                maxLength={100}
                validate={validerHuskelappKommentarFelt}
                className="margin-bottom-s"
                size="medium"
            />
            <FormikDatoVelger
                className="navds-form-field margin-bottom-xxs"
                name="frist"
                validate={validerFristFelt}
                label="Frist"
                ariaLabel="Frist for huskelapp"
            />
        </>
    );
}

export default HuskelappForm;
