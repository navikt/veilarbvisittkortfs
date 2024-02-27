import { Heading } from '@navikt/ds-react';
import { HuskelappInformasjonsmelding } from '../huskelapp-informasjonsmelding';
import { Form } from 'formik';
import HuskelappForm from './huskelapp-form';
import { EksisterendeArbeidsliste } from '../eksisterendeArbeidsliste';
import { OrNothing } from '../../../util/type/utility-types';
import { Arbeidsliste } from '../../../api/veilarbportefolje';

interface HuskelappMedArbeidslisteFormProps {
    onRequestClose: () => void;
    huskelapFrist?: OrNothing<Date>;
    huskelapInnhold?: OrNothing<String>;
    arbeidsliste: Arbeidsliste;
}

export function HuskelappMedArbeidslisteEditForm(formValues: HuskelappMedArbeidslisteFormProps) {
    return (
        <div className="huskelappmodal-med-arbeidsliste-innhold">
            <div>
                <Heading size="medium" visuallyHidden={true}>
                    Huskelappinnhold
                </Heading>
                <HuskelappInformasjonsmelding />
                <Form id="huskelapp-form">
                    <HuskelappForm />
                </Form>
            </div>
            <EksisterendeArbeidsliste arbeidsliste={formValues.arbeidsliste} />
        </div>
    );
}
