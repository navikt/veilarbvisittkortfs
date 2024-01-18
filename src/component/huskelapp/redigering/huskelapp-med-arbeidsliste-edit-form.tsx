import { Heading } from '@navikt/ds-react';
import { HuskelappInformasjonsmelding } from '../huskelapp-informasjonsmelding';
import { Form } from 'formik';
import HuskelappForm from './huskelapp-form';
import { EksisterendeArbeidsliste } from '../eksisterendeArbeidsliste';
import React from 'react';
import { OrNothing } from '../../../util/type/utility-types';
import { Arbeidsliste } from '../../../api/veilarbportefolje';
import HuskelappMedArbeidslisteFooter from './huskelapp-med-arbeidsliste-footer';

interface HuskelappMedArbeidslisteFormProps {
    onRequestClose: () => void;
    slettHuskelapp: () => void;
    huskelapFrist?: OrNothing<Date>;
    huskelapInnhold?: OrNothing<String>;
    arbeidsliste: Arbeidsliste;
}

export function HuskelappMedArbeidslisteEditForm(formValues: HuskelappMedArbeidslisteFormProps) {
    return (
        <>
            <div className={'huskelappmodal-med-arbeidsliste-innhold'}>
                <div className={'huskelapp-innhold'}>
                    <Heading size={'medium'} visuallyHidden={true}>
                        Huskelappinnhold
                    </Heading>
                    <HuskelappInformasjonsmelding />
                    <Form id={'huskelapp-form'}>
                        <HuskelappForm />
                    </Form>
                </div>
                <EksisterendeArbeidsliste arbeidsliste={formValues.arbeidsliste} visFjernKnapp={false} />
            </div>
            <HuskelappMedArbeidslisteFooter
                onRequestClose={formValues.onRequestClose}
                slettHuskelapp={formValues.slettHuskelapp}
            />
        </>
    );
}
