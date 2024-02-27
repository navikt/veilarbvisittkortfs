import { EksisterendeArbeidsliste } from '../eksisterendeArbeidsliste';
import { OrNothing } from '../../../util/type/utility-types';
import { Arbeidsliste } from '../../../api/veilarbportefolje';
import { HuskelappEditForm } from './huskelapp-edit-form';

interface HuskelappMedArbeidslisteFormProps {
    onRequestClose: () => void;
    huskelapFrist?: OrNothing<Date>;
    huskelapInnhold?: OrNothing<String>;
    arbeidsliste: Arbeidsliste;
}

export function HuskelappMedArbeidslisteEditForm(formValues: HuskelappMedArbeidslisteFormProps) {
    return (
        <div className="huskelappmodal-med-arbeidsliste-innhold">
            <HuskelappEditForm />
            <EksisterendeArbeidsliste arbeidsliste={formValues.arbeidsliste} />
        </div>
    );
}
