import React from 'react';
import FormikTekstArea from '../../components/formik/formik-textarea';
import FormikDatoVelger from '../../components/formik/formik-datepicker';
import { validerFristFelt, validerHuskelappKommentarFelt } from '../../../util/formik-validation';

function HuskelappForm() {
    return (
        <div className="huskelapp__bruker">
            <div className="blokk-s">
                <FormikTekstArea name="kommentar" label="" maxLength={100} validate={validerHuskelappKommentarFelt} />
            </div>
            <div className="dato-kategori-wrapper">
                <FormikDatoVelger
                    name="frist"
                    validate={validerFristFelt}
                    label="Frist"
                    ariaLabel="Frist for huskelapp"
                />
            </div>
        </div>
    );
}

export default HuskelappForm;
