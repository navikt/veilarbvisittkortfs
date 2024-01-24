import React from 'react';
import FormikTekstArea from '../../components/formik/formik-textarea';
import FormikDatoVelger from '../../components/formik/formik-datepicker';
import { validerFristFelt, validerHuskelappKommentarFelt } from '../../../util/formik-validation';
import { Alert } from '@navikt/ds-react';

interface Props {
    visManglerFristOgKommentarHuskelapp: boolean;
}

export const HuskelappForm = (props: Props) => (
    <>
        {props.visManglerFristOgKommentarHuskelapp && (
            <Alert inline variant="error">
                Du må legge til enten frist eller kommentar for å kunne lagre huskelappen
            </Alert>
        )}
        <FormikTekstArea
            name="kommentar"
            label=""
            maxLength={100}
            validate={validerHuskelappKommentarFelt}
            className="margin-bottom-s"
        />
        <FormikDatoVelger name="frist" validate={validerFristFelt} label="Frist" ariaLabel="Frist for huskelapp" />
    </>
);

export default HuskelappForm;
