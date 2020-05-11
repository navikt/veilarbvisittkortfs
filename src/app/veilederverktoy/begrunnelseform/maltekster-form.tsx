import React, { ChangeEvent } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { BegrunnelseTextArea } from './begrunnelse-textarea';
import BegrunnelseFooter from './begrunnelse-form-footer';
import { Form, useFormikContext } from 'formik';
import { BegrunnelseValues } from './begrunnelse-form';
import { Select } from 'nav-frontend-skjema';
import './maltekster-form.less';

interface OwnProps<T extends BegrunnelseValues> {
    isLoading: boolean;
    maxLength?: number;
    tekstariaLabel: string;
    initialValues: T;
}

type MalteksterFormProps<T extends BegrunnelseValues> = OwnProps<T> & InjectedIntlProps;

function MalteksterForm(props: MalteksterFormProps<any>) {

    function onChange(e: ChangeEvent<HTMLSelectElement>) {
        if (e.target.value) {
            const message = props.intl.formatMessage({ id: 'innstillinger.modal.start-eskalering-' + e.target.value});
            props.initialValues.begrunnelse = message;
            props.initialValues.tekst = message;
            context.resetForm();
        } else {
            props.initialValues.begrunnelse = '';
            props.initialValues.tekst = '';
            context.resetForm();
        }
    }

    const context = useFormikContext();
    return (
        <div>
            <Form>
                <Select className="malvelger" onChange={onChange}>
                    <option value="">Velg en mal</option>
                    <option value="dagpenger">Dagpenger</option>
                    <option value="ikke-møtt-møte">Arbeidsavklaringspenger: Ikke møtt til møte</option>
                    <option value="ikke-deltatt-aktivitet">Arbeidsavklaringspenger: Ikke deltatt på planlagt aktivitet eller bidrar ikke for å komme i arbeid</option>
                    <option value="ikke-deltatt-tiltak">Arbeidsavklaringspenger: Ikke deltatt på tiltak</option>
                    <option value="overgangsstønad">Overgangsstønad</option>
                    <option value="sykepenger">Sykepenger</option>
                </Select>
                <BegrunnelseTextArea tekstariaLabel={props.tekstariaLabel} maxLength={props.maxLength} />
                <BegrunnelseFooter spinner={props.isLoading} />
            </Form>
        </div>
    );
}

export default injectIntl(MalteksterForm);
