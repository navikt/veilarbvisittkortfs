import FormikSelect from '../../../components/formik/formik-select';
import { OppgaveTema, OppgaveType } from '../../../../api/veilarboppgave';
import { OrNothing } from '../../../../util/type/utility-types';

interface OpprettOppgaveTypeSelectorProps {
    oppgaveTema: OrNothing<OppgaveTema>;
}

interface TypeOption {
    value: OppgaveType;
    label: string;
}

function OpprettOppgaveTypeSelector({ oppgaveTema }: OpprettOppgaveTypeSelectorProps) {
    const typeOptions: TypeOption[] = [{ value: 'VURDER_HENVENDELSE', label: 'Vurder henvendelse' }];

    if (oppgaveTema && oppgaveTema !== 'OPPFOLGING') {
        typeOptions.push({ value: 'VURDER_KONSEKVENS_FOR_YTELSE', label: 'Vurder konsekvens for ytelse' });
    }

    return <FormikSelect label="Oppgavetype" name="type" options={typeOptions} />;
}

export default OpprettOppgaveTypeSelector;
