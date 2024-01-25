import React from 'react';
import FormikTekstArea from '../../components/formik/formik-textarea';
import { validerFristFelt, validerHuskelappKommentarFelt } from '../../../util/formik-validation';
import { ErrorMessage, useFormikContext } from 'formik';
import FormikDatoVelger from '../../components/formik/formik-datepicker';
import '../huskelapp.less';

export function HuskelappForm() {
    const { errors } = useFormikContext();

    return (
        <>
            <FormikTekstArea
                name="kommentar"
                label=""
                maxLength={100}
                validate={validerHuskelappKommentarFelt}
                className="margin-bottom-s"
            />

            <FormikDatoVelger name="frist" validate={validerFristFelt} label="Frist" ariaLabel="Frist for huskelapp" />
            {errors && (
                <div className="feilmelding-kommentar-eller-frist">
                    {' '}
                    <ErrorMessage name="huskelappId" />{' '}
                </div>
            )}
        </>
    );
}

export default HuskelappForm;
