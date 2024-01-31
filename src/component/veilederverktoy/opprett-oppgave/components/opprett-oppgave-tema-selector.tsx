import FormikSelect from '../../../components/formik/formik-select';
import { OppgaveTema } from '../../../../api/veilarboppgave';

interface TemaOption {
    value: OppgaveTema | '';
    label: string;
}

function OpprettOppgaveTemaSelector() {
    const temaOptions: TemaOption[] = [
        { value: '', label: 'Velg tema' },
        { value: 'DAGPENGER', label: 'Dagpenger' },
        { value: 'OPPFOLGING', label: 'Oppfølging' },
        { value: 'ARBEIDSAVKLARING', label: 'Arbeidsavklaringspenger' },
        { value: 'INDIVIDSTONAD', label: 'Individstønad (Tiltakspenger)' },
        { value: 'ENSLIG_FORSORGER', label: 'Enslig førsørger' },
        { value: 'TILLEGGSTONAD', label: 'Tilleggsstønad' }
    ];

    return <FormikSelect label="Legg inn hvilket tema oppgaven gjelder" name="tema" options={temaOptions} />;
}

export default OpprettOppgaveTemaSelector;
