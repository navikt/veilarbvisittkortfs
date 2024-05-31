import { Form } from 'formik';
import { Heading } from '@navikt/ds-react';
import { HuskelappInformasjonsmelding } from '../huskelapp-informasjonsmelding';
import FormikTekstArea from '../../components/formik/formik-textarea';
import { validerFristFelt, validerHuskelappKommentarFelt } from '../../../util/formik-validation';
import FormikDatoVelger from '../../components/formik/formik-datepicker';
import './../huskelapp-postitstyling.less';

export const HuskelappEditForm = ({ erArbeidslistaTom }: { erArbeidslistaTom: boolean }) => (
    <div className="ny-huskelapp huskelapp-postitstyling">
        {!erArbeidslistaTom && <Heading size="small">Ny huskelapp</Heading>}

        <Form id="huskelapp-form" className="rediger-huskelapp-skjema">
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
