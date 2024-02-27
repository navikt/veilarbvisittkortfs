import { EksisterendeArbeidsliste } from '../eksisterendeArbeidsliste';
import { Arbeidsliste } from '../../../api/veilarbportefolje';
import { HuskelappEditForm } from './huskelapp-edit-form';

interface HuskelappMedArbeidslisteFormProps {
    arbeidsliste?: Arbeidsliste;
}

export function HuskelappMedArbeidslisteEditForm({ arbeidsliste }: HuskelappMedArbeidslisteFormProps) {
    const erArbeidslisteTom = arbeidsliste?.sistEndretAv == null;

    return (
        <>
            <HuskelappEditForm />

            {!erArbeidslisteTom && <EksisterendeArbeidsliste arbeidsliste={arbeidsliste} />}
        </>
    );
}
