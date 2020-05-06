import FormikTekstArea from '../../components/formik/formik-textarea';
import React from 'react';
import { validerBeskrivelse, validerBeskrivelse500TegnFeldt } from '../../utils/formik-validation';

export function BegrunnelseTextArea(props: { tekstariaLabel: string; maxLength?: number; content?: string }) {
    return (
        <FormikTekstArea
            label={props.tekstariaLabel}
            name="begrunnelse"
            maxLength={props.maxLength || 500}
            validate={props.maxLength ? validerBeskrivelse(props.maxLength) : validerBeskrivelse500TegnFeldt}
            content={props.content}
        />
    );
}
