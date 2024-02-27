import { EksisterendeArbeidsliste } from '../eksisterendeArbeidsliste';
import { Arbeidsliste } from '../../../api/veilarbportefolje';
import { HuskelappEditForm } from './huskelapp-edit-form';

interface HuskelappMedArbeidslisteFormProps {
    arbeidsliste: Arbeidsliste;
}

export function HuskelappMedArbeidslisteEditForm({ arbeidsliste }: HuskelappMedArbeidslisteFormProps) {
    return (
        <div className="huskelappmodal-med-arbeidsliste-innhold">
            <HuskelappEditForm />
            <EksisterendeArbeidsliste arbeidsliste={arbeidsliste} />
        </div>
    );
}
