import React from 'react';
import { validerBeskrivelse, validerBeskrivelse500TegnFelt } from '../../../util/formik-validation';
import FormikTekstArea from '../../components/formik/formik-textarea';

export function BegrunnelseTextArea(props: { tekstariaLabel: string; maxLength?: number }) {
    return (
        <FormikTekstArea
            label={props.tekstariaLabel}
            name="begrunnelse"
            maxLength={props.maxLength || 500}
            validate={props.maxLength ? validerBeskrivelse(props.maxLength) : validerBeskrivelse500TegnFelt}
        />
    );
}
