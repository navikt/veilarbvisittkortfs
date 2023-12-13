import { Heading } from '@navikt/ds-react';
import { HuskelappInformasjonsmelding } from '../huskelapp-informasjonsmelding';
import { Form } from 'formik';
import HuskelappForm from './huskelapp-form';
import HuskelappFooter from './huskelapp-footer';
import React from 'react';

interface HuskelappMedArbeidslisteFormProps {
    onRequestClose: () => void;
    slettHuskelapp: () => void;
}

export function HuskelappEditModal(formValues: HuskelappMedArbeidslisteFormProps) {
    return (
        <>
            <div className={'huskelappmodal-innhold'}>
                <div className={'huskelapp-innhold'}>
                    <Heading size={'medium'} visuallyHidden={true}>
                        Huskelappinnhold
                    </Heading>
                    {/* TODO: ask Mathias about screen reader only component so we can add header for huskelapp  */}
                    <HuskelappInformasjonsmelding />
                    <Form id={'huskelapp-form'}>
                        <HuskelappForm />
                    </Form>
                </div>
            </div>
            <HuskelappFooter onRequestClose={formValues.onRequestClose} slettHuskelapp={formValues.slettHuskelapp} />
        </>
    );
}
