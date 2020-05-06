import React, { ChangeEvent } from 'react';
import { InjectedIntlProps } from 'react-intl';
import { BegrunnelseTextArea } from './begrunnelse-textarea';
import BegrunnelseFooter from './begrunnelse-form-footer';
import { Form } from 'formik';
import { BegrunnelseValues } from './begrunnelse-form';
import { Select } from 'nav-frontend-skjema';
import './maltekster-form.less';

interface OwnProps<T extends BegrunnelseValues> {
    isLoading: boolean;
    maxLength?: number;
    tekstariaLabel: string;
}

type MalteksterFormProps<T extends BegrunnelseValues> = OwnProps<T> & InjectedIntlProps;

function MalteksterForm(props: MalteksterFormProps<any>) {

    const [content, setContent] = React.useState('');

    function test(e: ChangeEvent<HTMLSelectElement>) {
        if (e.target.value) {
            const message = props.intl.formatMessage({ id: 'innstillinger.modal.start-eskalering-' + e.target.value});
            setContent(message);
        } else {
            setContent('');
        }
    }

    return (
        <div>
            <Form>
                <Select className="malvelger" onChange={test}>
                    <option value="">Velg en mal</option>
                    <option value="A">Dagpenger</option>
                    <option value="B">Arbeidsavklaringspenger: ikke møtt til møte</option>
                    <option value="C">Arbeidsavklaringspenger: ikke deltatt på planlagt aktivitet eller bidrar ikke for å komme i arbeid</option>
                    <option value="D">Arbeidsavklaringspenger: ikke deltatt på tiltak</option>
                    <option value="E">Overgangsstønad</option>
                    <option value="F">Sykepenger</option>
                </Select>
                <BegrunnelseTextArea tekstariaLabel={props.tekstariaLabel} maxLength={props.maxLength} content={content} />
                <BegrunnelseFooter spinner={props.isLoading} />
            </Form>
        </div>
    );
}

export default MalteksterForm;
