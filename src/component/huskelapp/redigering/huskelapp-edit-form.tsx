import { HuskelappInformasjonsmelding } from '../huskelapp-informasjonsmelding';
import { Form } from 'formik';
import FormikTekstArea from '../../components/formik/formik-textarea';
import { validerFristFelt, validerHuskelappKommentarFelt } from '../../../util/formik-validation';
import FormikDatoVelger from '../../components/formik/formik-datepicker';
import { Heading } from '@navikt/ds-react';

export const HuskelappEditForm = ({ erArbeidslistaTom }: { erArbeidslistaTom: boolean }) => (
    <div className="rediger-huskelapp-skjema">
        {!erArbeidslistaTom && <Heading size="small">Ny huskelapp</Heading>}

        <Form id="huskelapp-form" className="arbeidsliste-innhold-tekst">
            <FormikTekstArea
                name="kommentar"
                label="Tekst"
                size="small"
                maxLength={200}
                validate={validerHuskelappKommentarFelt}
            />
            <FormikDatoVelger
                name="frist"
                label="Frist"
                size="small"
                validate={validerFristFelt}
                ariaLabel="Frist for huskelapp"
                className="navds-form-field"
            />
        </Form>
        <HuskelappInformasjonsmelding />
    </div>
);
