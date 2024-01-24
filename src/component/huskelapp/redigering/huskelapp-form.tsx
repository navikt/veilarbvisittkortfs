import React from 'react';
import FormikTekstArea from '../../components/formik/formik-textarea';
import { validerFristFelt, validerHuskelappKommentarFelt } from '../../../util/formik-validation';
import { Alert } from '@navikt/ds-react';
import { useDataStore } from '../../../store/data-store';
import FormikDatoVelgerHuskelapp from '../../components/formik/formik-datepicker-huskelapp';

export function HuskelappForm() {
    const { visFeilHuskelapp, setVisFeilHuskelapp } = useDataStore();

    return (
        <>
            {visFeilHuskelapp && (
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
                onChangeCapture={() => setVisFeilHuskelapp(false)}
            />
            <FormikDatoVelgerHuskelapp
                name="frist"
                validate={validerFristFelt}
                label="Frist"
                ariaLabel="Frist for huskelapp"
            />
        </>
    );
}

export default HuskelappForm;
