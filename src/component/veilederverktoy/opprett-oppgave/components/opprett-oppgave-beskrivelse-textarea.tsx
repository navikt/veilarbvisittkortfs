import FormikTekstArea from '../../../components/formik/formik-textarea';
import { validerBeskrivelse } from '../../../../util/formik-validation';

function OpprettOppgaveBeskrivelseTekstArea() {
    return (
        <FormikTekstArea
            name="beskrivelse"
            label="Beskrivelse"
            validate={validerBeskrivelse(250)}
            maxLength={250}
            size="small"
        />
    );
}

export default OpprettOppgaveBeskrivelseTekstArea;
