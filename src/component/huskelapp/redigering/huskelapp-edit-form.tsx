import { Heading } from '@navikt/ds-react';
import { HuskelappInformasjonsmelding } from '../huskelapp-informasjonsmelding';
import { Form } from 'formik';
import FormikTekstArea from '../../components/formik/formik-textarea';
import { validerFristFelt, validerHuskelappKommentarFelt } from '../../../util/formik-validation';
import FormikDatoVelger from '../../components/formik/formik-datepicker';

export const HuskelappEditForm = () => (
    <div className="rediger-huskelapp-skjema">
        <Heading size="small">Ny huskelapp</Heading>

        <Form id="huskelapp-form" className="arbeidsliste-innhold-tekst">
            <FormikTekstArea
                name="kommentar"
                label="Huskelapp"
                hideLabel={true}
                maxLength={200}
                validate={validerHuskelappKommentarFelt}
                size="medium"
            />
            <FormikDatoVelger
                className="navds-form-field"
                name="frist"
                validate={validerFristFelt}
                label="Frist"
                ariaLabel="Frist for huskelapp"
                size="small"
            />
        </Form>
        <HuskelappInformasjonsmelding />
    </div>
);
