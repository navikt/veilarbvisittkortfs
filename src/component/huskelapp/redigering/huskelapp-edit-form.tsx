import { Form } from 'formik';
import { Detail, Heading } from '@navikt/ds-react';
import { HuskelappInformasjonsmelding } from '../huskelapp-informasjonsmelding';
import FormikTekstArea from '../../components/formik/formik-textarea';
import { validerFristFelt, validerHuskelappKommentarFelt } from '../../../util/formik-validation';
import FormikDatoVelger from '../../components/formik/formik-datepicker';
import './../huskelapp-postitstyling.less';

export interface HuskelappEditFormProps {
    endretAv: string;
    erArbeidslistaTom: boolean;
}
export const HuskelappEditForm = (props: HuskelappEditFormProps) => (
    <div className="ny-huskelapp huskelapp-postitstyling">
        {!props.erArbeidslistaTom && <Heading size="small">Ny huskelapp</Heading>}

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
        {props.endretAv.length > 0 && (
            <Detail>
                <i>{props.endretAv}</i>
            </Detail>
        )}
        <HuskelappInformasjonsmelding />
    </div>
);
