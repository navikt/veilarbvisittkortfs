import { Form } from 'formik';
import { Detail } from '@navikt/ds-react';
import { HuskelappInformasjonsmelding } from '../huskelapp-informasjonsmelding';
import FormikTekstArea from '../../components/formik/formik-textarea';
import { validerFristFelt, validerHuskelappKommentarFelt } from '../../../util/formik-validation';
import FormikDatoVelger from '../../components/formik/formik-datepicker';
import './../huskelapp-postitstyling.less';

interface Props {
    endretAv: string;
}

export const HuskelappEditForm = ({ endretAv }: Props) => (
    <div className="huskelapp-skjema huskelapp-postitstyling">
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
        {endretAv.length > 0 && (
            <Detail>
                <i>{endretAv}</i>
            </Detail>
        )}
        <HuskelappInformasjonsmelding />
    </div>
);
