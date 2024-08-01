import { validerBeskrivelse, validerBeskrivelse500TegnFelt } from '../../../util/formik-validation';
import FormikTekstArea from '../../components/formik/formik-textarea';

interface Props {
    tekstariaLabel: string;
    maxLength?: number;
    hidden?: boolean;
}

export function BegrunnelseTextArea({ tekstariaLabel, maxLength, hidden }: Props) {
    if (hidden) {
        return null;
    }

    return (
        <FormikTekstArea
            label={tekstariaLabel}
            name="begrunnelse"
            maxLength={maxLength || 500}
            size="small"
            validate={maxLength ? validerBeskrivelse(maxLength) : validerBeskrivelse500TegnFelt}
        />
    );
}
