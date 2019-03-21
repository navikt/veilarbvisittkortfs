import FormikTekstArea from '../../../components/formik/formik-textarea';
import React from 'react';

export function BegrunnelseTextArea(props: {tekstariaLabel: string, maxLength?: number}) {
    return (
        <FormikTekstArea
            labelId={props.tekstariaLabel}
            name="begrunnelse"
            maxLength={props.maxLength || 500}
        />
    );
}