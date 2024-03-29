import { Heading } from '@navikt/ds-react';
import { HuskelappInformasjonsmelding } from '../huskelapp-informasjonsmelding';
import { Form } from 'formik';
import FormikTekstArea from '../../components/formik/formik-textarea';
import { validerFristFelt, validerHuskelappKommentarFelt } from '../../../util/formik-validation';
import FormikDatoVelger from '../../components/formik/formik-datepicker';

export const HuskelappEditForm = () => (
    <div className="rediger-huskelapp-skjema">
        <Heading size="medium" visuallyHidden={true}>
            Huskelappinnhold
        </Heading>
        <HuskelappInformasjonsmelding />
        <Form id="huskelapp-form">
            <FormikTekstArea
                name="kommentar"
                label="Huskelapp"
                hideLabel={true}
                maxLength={100}
                validate={validerHuskelappKommentarFelt}
                size="small"
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
    </div>
);
