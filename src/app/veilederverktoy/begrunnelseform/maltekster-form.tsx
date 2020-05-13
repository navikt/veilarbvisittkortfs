import React from 'react';
import { BegrunnelseTextArea } from './begrunnelse-textarea';
import BegrunnelseFooter from './begrunnelse-form-footer';
import { Form, useFormikContext } from 'formik';
import { BegrunnelseValues } from './begrunnelse-form';
import './maltekster-form.less';
import Maltekstvelger from './maltekstvelger';

interface MalteksterFormProps<T extends BegrunnelseValues> {
    isLoading: boolean;
    maxLength?: number;
    tekstariaLabel: string;
    initialValues: T;
}

function MalteksterForm(props: MalteksterFormProps<any>) {

    const { initialValues } = useFormikContext();
    return (
        <div>
            <Form>
                <Maltekstvelger visible={initialValues.brukMalvelger} />
                <BegrunnelseTextArea tekstariaLabel={props.tekstariaLabel} maxLength={props.maxLength} />
                <BegrunnelseFooter spinner={props.isLoading} />
            </Form>
        </div>
    );
}

export default MalteksterForm;
