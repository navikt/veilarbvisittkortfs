import FormikTekstArea from '../../../components/formik/formik-textarea';
import React from 'react';
import { validerBeskrivelse } from '../../../../util/formik-validation';

function OpprettOppgaveBeskrivelseTekstArea() {
    return (
        <FormikTekstArea name="beskrivelse" label="Beskrivelse *" validate={validerBeskrivelse(250)} maxLength={250} />
    );
}

export default OpprettOppgaveBeskrivelseTekstArea;
