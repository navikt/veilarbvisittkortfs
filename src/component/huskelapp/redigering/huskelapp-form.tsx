import React from 'react';
import FormikTekstArea from '../../components/formik/formik-textarea';
import FormikDatoVelger from '../../components/formik/formik-datepicker';
import { validerFristFelt, validerHuskelappKommentarFelt } from '../../../util/formik-validation';
import { Alert } from '@navikt/ds-react';
import { useDataStore } from '../../../store/data-store';

interface Props {
    visManglerFristOgKommentarHuskelapp: boolean;
}

export function HuskelappForm(props: Props) {
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
            <FormikDatoVelger name="frist" validate={validerFristFelt} label="Frist" ariaLabel="Frist for huskelapp" />
        </>
    );
}

export default HuskelappForm;
