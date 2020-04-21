import FormikTekstArea from '../../../components/formik/formik-textarea';
import { validerBeskrivelse } from '../../../utils/formik-validation';
import React from 'react';

function OpprettOppgaveBeskrivelseTekstArea() {
    return (
        <FormikTekstArea name="beskrivelse" label="Beskrivelse *" validate={validerBeskrivelse(250)} maxLength={250} />
    );
}

export default OpprettOppgaveBeskrivelseTekstArea;
