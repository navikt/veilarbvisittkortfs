import React, { ChangeEvent } from 'react';
import { useFormikContext } from 'formik';
import { Select } from 'nav-frontend-skjema';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import './maltekstvelger.less';

function Maltekstvelger(props: InjectedIntlProps) {

    function onChange(e: ChangeEvent<HTMLSelectElement>) {
        if (e.target.value) {
            const message = props.intl.formatMessage({ id: 'innstillinger.modal.start-eskalering-' + e.target.value});
            context.setFieldValue('begrunnelse', message);
            context.setFieldValue('tekst', message);
        } else {
            context.resetForm();
        }
    }

    const context = useFormikContext();
    return (
        <Select className="malvelger" onChange={onChange}>
            <option value="">Velg en mal</option>
            <option value="dagpenger">Dagpenger</option>
            <option value="ikke-møtt-møte">Arbeidsavklaringspenger: Ikke møtt til møte</option>
            <option value="ikke-deltatt-aktivitet">Arbeidsavklaringspenger: Ikke deltatt på planlagt
                aktivitet eller bidrar ikke for å komme i arbeid
            </option>
            <option value="ikke-deltatt-tiltak">Arbeidsavklaringspenger: Ikke deltatt på tiltak
            </option>
            <option value="overgangsstønad">Overgangsstønad</option>
            <option value="sykepenger">Sykepenger</option>
        </Select>
    );
}

export default injectIntl(Maltekstvelger);
