import { EksisterendeArbeidsliste } from '../eksisterendeArbeidsliste';
import { Arbeidsliste } from '../../../api/veilarbportefolje';
import { HuskelappEditForm } from './huskelapp-edit-form';

interface HuskelappMedArbeidslisteFormProps {
    arbeidsliste: Arbeidsliste;
    medArbeidsliste: boolean;
}

export function HuskelappMedArbeidslisteEditForm({ arbeidsliste, medArbeidsliste }: HuskelappMedArbeidslisteFormProps) {
    return (
        <>
            <HuskelappEditForm />

            {medArbeidsliste && <EksisterendeArbeidsliste arbeidsliste={arbeidsliste} />}
        </>
    );
}
